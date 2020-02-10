"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var Helper_1 = require("../Utilities/Helpers/Helper");
var OpenfinHelper_1 = require("../Utilities/Helpers/OpenfinHelper");
var _ = require("lodash");
var LoggingHelper_1 = require("../Utilities/Helpers/LoggingHelper");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var GeneralConstants_1 = require("../Utilities/Constants/GeneralConstants");
var ExportStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ExportStrategy, _super);
    function ExportStrategy(adaptable) {
        var _this = _super.call(this, StrategyConstants.ExportStrategyId, adaptable) || this;
        _this.isSendingData = false;
        _this.workAroundOpenfinExcelDataDimension = new Map();
        _this.adaptable.api.eventApi.on('AdaptableReady', function () {
            setTimeout(function () {
                _this.throttledRecomputeAndSendLiveDataEvent = _.throttle(function () { return _this.sendNewLiveData(); }, GeneralConstants_1.DEFAULT_LIVE_REPORT_THROTTLE_TIME);
            }, 1000);
        });
        // ideally this OpenFin stuff should come out and be put in an OpenFin Service
        // and that will manage this and only call the strategy as required
        OpenfinHelper_1.OpenfinHelper.OnExcelDisconnected().Subscribe(function () {
            LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Excel closed stopping all Live Excel');
            _this.adaptable.api.internalApi.getLiveReports().forEach(function (cle) {
                _this.adaptable.api.internalApi.stopLiveReport(cle.Report, Enums_1.ExportDestination.OpenfinExcel);
            });
        });
        OpenfinHelper_1.OpenfinHelper.OnWorkbookDisconnected().Subscribe(function (sender, workbook) {
            LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Workbook closed:' + workbook.name + ', Stopping Openfin Live Excel');
            var liveReport = _this.adaptable.api.internalApi
                .getLiveReports()
                .find(function (x) { return x.PageName == workbook.name; });
            if (liveReport) {
                _this.adaptable.api.internalApi.stopLiveReport(liveReport.Report, Enums_1.ExportDestination.OpenfinExcel);
            }
        });
        OpenfinHelper_1.OpenfinHelper.OnWorkbookSaved().Subscribe(function (sender, workbookSavedEvent) {
            LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Workbook Saved', workbookSavedEvent);
            var liveReport = _this.adaptable.api.internalApi
                .getLiveReports()
                .find(function (x) { return x.PageName == workbookSavedEvent.OldName; });
            _this.adaptable.api.internalApi.stopLiveReport(liveReport.Report, Enums_1.ExportDestination.OpenfinExcel);
            _this.adaptable.api.internalApi.startLiveReport(liveReport.Report, workbookSavedEvent.NewName, Enums_1.ExportDestination.OpenfinExcel);
        });
        // if a piece of data has updated then update any live reports
        _this.adaptable.DataService.on('DataChanged', function (dataChangedInfo) {
            // we currently always refresh - is that right??
            _this.refreshLiveReports();
        });
        // if the grid has refreshed then update any live reports
        _this.adaptable._on('GridRefreshed', function () {
            _this.refreshLiveReports();
        });
        // if cell selection has changed and we have selected cells as one of the live reports then send updated data
        _this.adaptable._on('CellsSelected', function () {
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(_this.adaptable.api.internalApi.getLiveReports())) {
                var liveReport = _this.adaptable.api.internalApi
                    .getLiveReports()
                    .find(function (x) { return x.Report.Name == GeneralConstants_1.SELECTED_CELLS_REPORT; });
                if (liveReport) {
                    _this.throttledRecomputeAndSendLiveDataEvent();
                }
            }
        });
        return _this;
    }
    ExportStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.ExportStrategyFriendlyName,
            ComponentName: ScreenPopups.ExportPopup,
            Icon: StrategyConstants.ExportGlyph,
        });
    };
    ExportStrategy.prototype.sendNewLiveData = function () {
        var _this = this;
        //we wait for the last sendNewLiveData to finish
        if (this.isSendingData == true) {
            this.throttledRecomputeAndSendLiveDataEvent();
            return;
        }
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.adaptable.api.internalApi.getLiveReports())) {
            this.isSendingData = true;
            var promises_1 = [];
            this.adaptable.api.internalApi.getLiveReports().forEach(function (liveReport) {
                if (liveReport.ReportDestination == Enums_1.ExportDestination.OpenfinExcel) {
                    promises_1.push(Promise.resolve()
                        .then(function () {
                        return new Promise(function (resolve, reject) {
                            //we want to erase old cells in case we are sending less data
                            //we don't want to call clearCellContent as it makes the excel sheet to blink
                            //and also is incorrrect as until we call setcells again we've lost all values in excel which might upset
                            //some macros
                            var previousDimension = _this.workAroundOpenfinExcelDataDimension.get(liveReport.Report.Uuid);
                            var ReportAsArray = _this.ConvertReportToArray(liveReport.Report);
                            var newDimension = { x: ReportAsArray[0].length, y: ReportAsArray.length };
                            if (previousDimension) {
                                var missingNumberOfRows = previousDimension.y - newDimension.y;
                                var missingNumberOfColumns_1 = previousDimension.x - newDimension.x;
                                if (missingNumberOfRows > 0) {
                                    for (var i = 0; i < missingNumberOfRows; i++) {
                                        var newRow = [];
                                        for (var j = 0; j < newDimension.x; j++) {
                                            newRow.push(null);
                                        }
                                        ReportAsArray.push(newRow);
                                    }
                                }
                                if (missingNumberOfColumns_1 > 0) {
                                    //missing column
                                    ReportAsArray.forEach(function (row) {
                                        for (var j = 0; j < missingNumberOfColumns_1; j++) {
                                            row.push(null);
                                        }
                                    });
                                }
                            }
                            if (ReportAsArray) {
                                _this.workAroundOpenfinExcelDataDimension.set(liveReport.Report.Uuid, newDimension);
                                resolve(ReportAsArray);
                            }
                            else {
                                reject();
                            }
                        });
                    })
                        .then(function (ReportAsArray) {
                        return OpenfinHelper_1.OpenfinHelper.pushData(liveReport.PageName, ReportAsArray);
                    })
                        .catch(function (reason) {
                        LoggingHelper_1.LoggingHelper.LogAdaptableWarning('Live Excel failed to send data for [' + liveReport.Report + ']', reason);
                        _this.adaptable.api.internalApi.stopLiveReport(liveReport.Report, Enums_1.ExportDestination.OpenfinExcel);
                        _this.adaptable.api.alertApi.showAlertError('Live Excel Error', 'Failed to send data for [' +
                            liveReport.Report +
                            ']. This live export has been stopped');
                    }));
                }
            });
            Promise.all(promises_1)
                .then(function () {
                LoggingHelper_1.LoggingHelper.LogAdaptableSuccess('All live report data sent');
                _this.isSendingData = false;
            })
                .catch(function () {
                LoggingHelper_1.LoggingHelper.LogAdaptableWarning('One live Excel failed to send data');
                _this.isSendingData = false;
            });
        }
    };
    ExportStrategy.prototype.export = function (report, exportDestination) {
        var _this = this;
        switch (exportDestination) {
            case Enums_1.ExportDestination.Clipboard:
                this.copyToClipboard(report);
                break;
            case Enums_1.ExportDestination.CSV:
                this.convertReportToCsv(report);
                break;
            case Enums_1.ExportDestination.JSON:
                this.convertReportToJSON(report);
                break;
            case Enums_1.ExportDestination.OpenfinExcel:
                OpenfinHelper_1.OpenfinHelper.initOpenFinExcel() //.then((workbook) => OpenfinHelper.addReportWorkSheet(workbook, ReportName))
                    .then(function (pageName) {
                    _this.adaptable.api.internalApi.startLiveReport(report, pageName, Enums_1.ExportDestination.OpenfinExcel);
                    setTimeout(function () {
                        _this.throttledRecomputeAndSendLiveDataEvent();
                    }, 500);
                });
                break;
        }
    };
    ExportStrategy.prototype.convertReportToJSON = function (report) {
        var reportAsArray = this.ConvertReportToArray(report);
        if (reportAsArray) {
            var reportAsJSON = JSON.stringify(reportAsArray);
            if (reportAsJSON) {
                var csvFileName = report.Name + '.json';
                Helper_1.Helper.createDownloadedFile(reportAsJSON, csvFileName, 'application/json');
            }
        }
    };
    ExportStrategy.prototype.convertReportToCsv = function (report) {
        var csvContent = this.createCSVContent(report);
        if (csvContent) {
            var csvFileName = report.Name + '.csv';
            Helper_1.Helper.createDownloadedFile(csvContent, csvFileName, 'text/csv;encoding:utf-8');
        }
    };
    ExportStrategy.prototype.copyToClipboard = function (report) {
        var csvContent = this.createTabularContent(report);
        if (csvContent) {
            Helper_1.Helper.copyToClipboard(csvContent);
        }
    };
    ExportStrategy.prototype.createCSVContent = function (report) {
        var reportAsArray = this.ConvertReportToArray(report);
        if (reportAsArray) {
            return Helper_1.Helper.convertArrayToCsv(reportAsArray, ',');
        }
        return null;
    };
    ExportStrategy.prototype.createTabularContent = function (report) {
        var ReportAsArray = this.ConvertReportToArray(report);
        if (ReportAsArray) {
            return Helper_1.Helper.convertArrayToCsv(ReportAsArray, '\t');
        }
        return null;
    };
    // Converts a Report into an array of array - first array is the column names and subsequent arrays are the values
    ExportStrategy.prototype.ConvertReportToArray = function (report) {
        var actionReturnObj = this.adaptable.ReportService.ConvertReportToArray(report);
        if (actionReturnObj.Alert) {
            this.adaptable.api.alertApi.displayMessageAlertPopup(actionReturnObj.Alert);
            return null;
        }
        return actionReturnObj.ActionReturn;
    };
    // we assume that we are only ever sending to one destination so we just get the throttle time of the first live report
    // if thats wrong then its not the end of the world tbh
    ExportStrategy.prototype.refreshLiveReports = function () {
        var firstLiveReport = this.getFirstLiveReport();
        if (firstLiveReport) {
            this.throttledRecomputeAndSendLiveDataEvent();
        }
    };
    ExportStrategy.prototype.getFirstLiveReport = function () {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.adaptable.api.internalApi.getLiveReports())) {
            return this.adaptable.api.internalApi.getLiveReports()[0];
        }
        return undefined;
    };
    return ExportStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.ExportStrategy = ExportStrategy;
