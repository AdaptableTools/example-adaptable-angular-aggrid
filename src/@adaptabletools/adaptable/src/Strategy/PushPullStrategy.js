"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var _ = require("lodash");
var LoggingHelper_1 = require("../Utilities/Helpers/LoggingHelper");
var GeneralConstants_1 = require("../Utilities/Constants/GeneralConstants");
var PushPullStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(PushPullStrategy, _super);
    function PushPullStrategy(adaptable) {
        var _this = _super.call(this, StrategyConstants.IPushPullStrategyId, adaptable) || this;
        _this.isSendingData = false;
        _this.adaptable.api.eventApi.on('AdaptableReady', function () {
            setTimeout(function () {
                _this.throttledRecomputeAndSendLiveDataEvent = _.throttle(function () { return _this.sendNewLiveData(); }, _this.getThrottleTimeFromState());
            }, 1000);
        });
        // if a piece of data has updated then update any live reports except cell or row selected
        // currently we DONT send deltas or even check if the updated cell is in the current report  - we should
        // we simply send everything to ipushpull every time any cell ticks....
        _this.adaptable.DataService.on('DataChanged', function (dataChangedInfo) {
            if (_this.adaptable.api.iPushPullApi.isIPushPullLiveDataRunning()) {
                var currentLiveIPushPullReport = _this.adaptable.api.iPushPullApi.getCurrentLiveIPushPullReport();
                if (currentLiveIPushPullReport &&
                    currentLiveIPushPullReport.ReportName !== GeneralConstants_1.SELECTED_CELLS_REPORT &&
                    currentLiveIPushPullReport.ReportName !== GeneralConstants_1.SELECTED_ROWS_REPORT) {
                    _this.throttledRecomputeAndSendLiveDataEvent();
                }
            }
        });
        // if the grid has refreshed then update all live reports
        _this.adaptable._on('GridRefreshed', function () {
            if (_this.adaptable.api.iPushPullApi.isIPushPullLiveDataRunning()) {
                _this.throttledRecomputeAndSendLiveDataEvent();
            }
        });
        // if the grid filters have changed then update any live reports except cell or row selected
        _this.adaptable._on('GridFiltered', function () {
            // Rerun all reports except selected cells / rows when filter changes
            if (_this.adaptable.api.iPushPullApi.isIPushPullLiveDataRunning()) {
                var currentLiveIPushPullReport = _this.adaptable.api.iPushPullApi.getCurrentLiveIPushPullReport();
                if (currentLiveIPushPullReport &&
                    currentLiveIPushPullReport.ReportName !== GeneralConstants_1.SELECTED_CELLS_REPORT &&
                    currentLiveIPushPullReport.ReportName !== GeneralConstants_1.SELECTED_ROWS_REPORT) {
                    _this.throttledRecomputeAndSendLiveDataEvent();
                }
            }
        });
        // if grid selection has changed and the ipushpull Live report is 'Selected Cells' or 'Selected Rows' then send updated data
        _this.adaptable.api.eventApi.on('SelectionChanged', function () {
            if (_this.adaptable.api.iPushPullApi.isIPushPullLiveDataRunning()) {
                var currentLiveIPushPullReport = _this.adaptable.api.iPushPullApi.getCurrentLiveIPushPullReport();
                if (currentLiveIPushPullReport &&
                    (currentLiveIPushPullReport.ReportName === GeneralConstants_1.SELECTED_CELLS_REPORT ||
                        currentLiveIPushPullReport.ReportName === GeneralConstants_1.SELECTED_ROWS_REPORT)) {
                    _this.throttledRecomputeAndSendLiveDataEvent();
                }
            }
        });
        return _this;
    }
    PushPullStrategy.prototype.addFunctionMenuItem = function () {
        if (this.adaptable.api.iPushPullApi.isIPushPullAvailable()) {
            return this.createMainMenuItemShowPopup({
                Label: StrategyConstants.IPushPullStrategyFriendlyName,
                ComponentName: ScreenPopups.IPushPullPopup,
                Icon: StrategyConstants.IPushPullGlyph,
            });
        }
    };
    PushPullStrategy.prototype.sendNewLiveData = function () {
        var _this = this;
        //we wait for the last sendNewLiveData to finish
        if (this.isSendingData == true) {
            this.throttledRecomputeAndSendLiveDataEvent();
            return;
        }
        var currentLiveIPushPullReport = this.adaptable.api.iPushPullApi.getCurrentLiveIPushPullReport();
        if (currentLiveIPushPullReport) {
            this.isSendingData = true;
            var report_1 = this.adaptable.api.exportApi.getReportByName(currentLiveIPushPullReport.ReportName);
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
                return _this.adaptable.PushPullService.pushData(currentLiveIPushPullReport.Page, reportAsArray);
            })
                .then(function () {
                return _this.adaptable.ReportService.PublishLiveLiveDataChangedEvent('iPushPull', 'LiveDataUpdated', currentLiveIPushPullReport);
            })
                .catch(function (reason) {
                LoggingHelper_1.LoggingHelper.LogAdaptableWarning('Failed to send data to ipushpull for [' + currentLiveIPushPullReport.ReportName + ']', reason);
                _this.adaptable.api.iPushPullApi.stopLiveData();
                var errorMessage = 'Export Failed';
                if (reason) {
                    errorMessage += ': ' + reason;
                }
                errorMessage += '.  This live export has been cancelled.';
                _this.adaptable.api.alertApi.showAlertError('ipushpull Export Error', errorMessage);
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
    PushPullStrategy.prototype.sendSnapshot = function (iPushPullReport) {
        var _this = this;
        this.adaptable.PushPullService.loadPage(iPushPullReport.Folder, iPushPullReport.Page).then(function () {
            var report = _this.adaptable.api.exportApi.getReportByName(iPushPullReport.ReportName);
            if (report) {
                var reportAsArray = _this.ConvertReportToArray(report);
                if (reportAsArray) {
                    _this.adaptable.PushPullService.pushData(iPushPullReport.Page, reportAsArray);
                }
            }
        });
    };
    PushPullStrategy.prototype.startLiveData = function (iPushPullReport) {
        var _this = this;
        this.adaptable.PushPullService.loadPage(iPushPullReport.Folder, iPushPullReport.Page).then(function () {
            _this.adaptable.api.iPushPullApi.startLiveData(iPushPullReport);
            setTimeout(function () {
                _this.throttledRecomputeAndSendLiveDataEvent();
            }, 500);
        });
    };
    // Converts a Report into an array of array - first array is the column names and subsequent arrays are the values
    // Should probably use same one as Export
    PushPullStrategy.prototype.ConvertReportToArray = function (report) {
        var actionReturnObj = this.adaptable.ReportService.ConvertReportToArray(report);
        if (actionReturnObj.Alert) {
            this.adaptable.api.alertApi.displayMessageAlertPopup(actionReturnObj.Alert);
            return null;
        }
        return actionReturnObj.ActionReturn;
    };
    PushPullStrategy.prototype.getThrottleTimeFromState = function () {
        var iPushPullThrottleTime;
        if (this.adaptable.api.iPushPullApi.isIPushPullRunning()) {
            iPushPullThrottleTime = this.adaptable.api.iPushPullApi.getIPushPullThrottleTime();
        }
        return iPushPullThrottleTime ? iPushPullThrottleTime : GeneralConstants_1.DEFAULT_LIVE_REPORT_THROTTLE_TIME;
    };
    return PushPullStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.PushPullStrategy = PushPullStrategy;
