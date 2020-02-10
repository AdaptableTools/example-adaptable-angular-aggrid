"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var _ = require("lodash");
var LoggingHelper_1 = require("../Utilities/Helpers/LoggingHelper");
var GeneralConstants_1 = require("../Utilities/Constants/GeneralConstants");
var Glue42Strategy = /** @class */ (function (_super) {
    tslib_1.__extends(Glue42Strategy, _super);
    function Glue42Strategy(adaptable) {
        var _this = _super.call(this, StrategyConstants.Glue42StrategyId, adaptable) || this;
        _this.isSendingData = false;
        _this.adaptable.api.eventApi.on('AdaptableReady', function () {
            setTimeout(function () {
                _this.throttledRecomputeAndSendLiveDataEvent = _.throttle(function () { return _this.sendNewLiveData(); }, _this.getThrottleTimeFromState());
            }, 1000);
        });
        // if a piece of data has updated then update any live reports except cell or row selected
        // currently we DONT send deltas or even check if the updated cell is in the current report  - we should
        // we simply send everything to iGlue42 every time any cell ticks....
        _this.adaptable.DataService.on('DataChanged', function (dataChangedInfo) {
            if (_this.adaptable.api.glue42Api.isGlue42Running()) {
                var currentLiveIGlue42Report = _this.adaptable.api.glue42Api.getCurrentLiveGlue42Report();
                if (currentLiveIGlue42Report &&
                    currentLiveIGlue42Report.ReportName !== GeneralConstants_1.SELECTED_CELLS_REPORT &&
                    currentLiveIGlue42Report.ReportName !== GeneralConstants_1.SELECTED_ROWS_REPORT) {
                    _this.throttledRecomputeAndSendLiveDataEvent();
                }
            }
        });
        // if the grid has refreshed then update all live reports
        _this.adaptable._on('GridRefreshed', function () {
            if (_this.adaptable.api.glue42Api.isGlue42Running()) {
                //   this.throttledRecomputeAndSendLiveDataEvent();
            }
        });
        // if the grid filters have changed then update any live reports except cell or row selected
        _this.adaptable._on('GridFiltered', function () {
            // Rerun all reports except selected cells / rows when filter changes
            if (_this.adaptable.api.glue42Api.isGlue42Running()) {
                var currentLiveIGlue42Report = _this.adaptable.api.glue42Api.getCurrentLiveGlue42Report();
                if (currentLiveIGlue42Report &&
                    currentLiveIGlue42Report.ReportName !== GeneralConstants_1.SELECTED_CELLS_REPORT &&
                    currentLiveIGlue42Report.ReportName !== GeneralConstants_1.SELECTED_ROWS_REPORT) {
                    _this.throttledRecomputeAndSendLiveDataEvent();
                }
            }
        });
        // if grid selection has changed and the iGlue42 Live report is 'Selected Cells' or 'Selected Rows' then send updated data
        _this.adaptable.api.eventApi.on('SelectionChanged', function () {
            if (_this.adaptable.api.glue42Api.isGlue42Running()) {
                var currentLiveIGlue42Report = _this.adaptable.api.glue42Api.getCurrentLiveGlue42Report();
                if (currentLiveIGlue42Report &&
                    (currentLiveIGlue42Report.ReportName === GeneralConstants_1.SELECTED_CELLS_REPORT ||
                        currentLiveIGlue42Report.ReportName === GeneralConstants_1.SELECTED_ROWS_REPORT)) {
                    _this.throttledRecomputeAndSendLiveDataEvent();
                }
            }
        });
        return _this;
    }
    Glue42Strategy.prototype.addFunctionMenuItem = function () {
        if (this.adaptable.api.glue42Api.isGlue42Available()) {
            return this.createMainMenuItemShowPopup({
                Label: StrategyConstants.Glue42StrategyFriendlyName,
                ComponentName: ScreenPopups.Glue42Popup,
                Icon: StrategyConstants.Glue42Glyph,
            });
        }
    };
    Glue42Strategy.prototype.sendNewLiveData = function () {
        var _this = this;
        //we wait for the last sendNewLiveData to finish
        if (this.isSendingData == true) {
            this.throttledRecomputeAndSendLiveDataEvent();
            return;
        }
        var currentLiveIGlue42Report = this.adaptable.api.glue42Api.getCurrentLiveGlue42Report();
        if (currentLiveIGlue42Report) {
            this.isSendingData = true;
            var report_1 = this.adaptable.api.exportApi.getReportByName(currentLiveIGlue42Report.ReportName);
            Promise.resolve()
                .then(function () {
                return new Promise(function (resolve, reject) {
                    var reportAsArray = _this.ConvertReportToArray(report_1);
                    if (reportAsArray) {
                        resolve(reportAsArray);
                    }
                    else {
                        reject('no data in the report');
                    }
                });
            })
                .then(function (reportAsArray) {
                return [];
                // this.adaptable.Glue42Service.pushData(
                //  currentLiveIGlue42Report.Page,
                //  reportAsArray
                //);
            })
                .then(function () {
                return _this.adaptable.ReportService.PublishLiveLiveDataChangedEvent('Glue42', 'LiveDataUpdated', currentLiveIGlue42Report);
            })
                .catch(function (reason) {
                LoggingHelper_1.LoggingHelper.LogAdaptableWarning('Failed to send data to iGlue42 for [' + currentLiveIGlue42Report.ReportName + ']', reason);
                //      this.adaptable.api.glue42Api.stopLiveData();
                var errorMessage = 'Export Failed';
                if (reason) {
                    errorMessage += ': ' + reason;
                }
                errorMessage += '.  This live export has been cancelled.';
                _this.adaptable.api.alertApi.showAlertError('iGlue42 Export Error', errorMessage);
            });
            Promise.resolve()
                .then(function () {
                LoggingHelper_1.LoggingHelper.LogAdaptableSuccess('All live report data sent');
                _this.isSendingData = false;
            })
                .catch(function () {
                LoggingHelper_1.LoggingHelper.LogAdaptableWarning('Failed to send data');
                _this.isSendingData = false;
            });
        }
    };
    Glue42Strategy.prototype.sendSnapshot = function (glue42Report) {
        var report = this.adaptable.api.exportApi.getReportByName(glue42Report.ReportName);
        if (report) {
            var data = this.ConvertReportToArray(report);
            var gridColumns = this.adaptable.api.gridApi.getColumns();
            // for glue42 we need to pass in the pk values of the data also
            var primaryKeyValues = this.adaptable.ReportService.GetPrimaryKeysForReport(report);
            try {
                if (data) {
                    this.adaptable.Glue42Service.exportData.apply(this.adaptable.Glue42Service, [
                        data,
                        gridColumns,
                        primaryKeyValues,
                    ]);
                }
            }
            catch (error) {
                LoggingHelper_1.LoggingHelper.LogAdaptableError(error);
            }
        }
    };
    Glue42Strategy.prototype.startLiveData = function (glue42Report) {
        var _this = this;
        var report = this.adaptable.api.exportApi.getReportByName(glue42Report.ReportName);
        if (report) {
            var page = 'Excel'; // presume we should get this from Glue42 service in async way??
            var reportData = this.ConvertReportToArray(report);
            this.adaptable.Glue42Service.openSheet(reportData).then(function () {
                _this.adaptable.api.glue42Api.startLiveData(glue42Report);
                setTimeout(function () {
                    _this.throttledRecomputeAndSendLiveDataEvent();
                }, 500);
            });
        }
    };
    // Converts a Report into an array of array - first array is the column names and subsequent arrays are the values
    // Should probably use same one as Export
    Glue42Strategy.prototype.ConvertReportToArray = function (report) {
        var actionReturnObj = this.adaptable.ReportService.ConvertReportToArray(report);
        if (actionReturnObj.Alert) {
            this.adaptable.api.alertApi.displayMessageAlertPopup(actionReturnObj.Alert);
            return null;
        }
        return actionReturnObj.ActionReturn;
    };
    Glue42Strategy.prototype.getThrottleTimeFromState = function () {
        var iGlue42ThrottleTime;
        if (this.adaptable.api.glue42Api.isGlue42Running()) {
            iGlue42ThrottleTime = this.adaptable.api.glue42Api.getGlue42ThrottleTime();
        }
        return iGlue42ThrottleTime ? iGlue42ThrottleTime : GeneralConstants_1.DEFAULT_LIVE_REPORT_THROTTLE_TIME;
    };
    return Glue42Strategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.Glue42Strategy = Glue42Strategy;
