"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ExportRedux = require("../../Redux/ActionsReducers/ExportRedux");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ExportApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ExportApiImpl, _super);
    function ExportApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportApiImpl.prototype.getExportState = function () {
        return this.getAdaptableState().Export;
    };
    ExportApiImpl.prototype.getCurrentReportName = function () {
        return this.getExportState().CurrentReport;
    };
    ExportApiImpl.prototype.getCurrentReport = function () {
        var reportName = this.getCurrentReportName();
        return this.getReportByName(reportName);
    };
    ExportApiImpl.prototype.getReportByName = function (reportName) {
        var report = this.getAllReports().find(function (r) { return r.Name == reportName; });
        return report;
    };
    ExportApiImpl.prototype.getAllReports = function () {
        return this.adaptable.api.internalApi.getSystemReports().concat(this.getExportState().Reports);
    };
    ExportApiImpl.prototype.getReportSchedules = function () {
        return this.getExportState().ReportSchedules;
    };
    ExportApiImpl.prototype.sendReport = function (reportName, destination) {
        var report = this.getReportByName(reportName);
        if (this.checkItemExists(report, reportName, 'Report')) {
            this.dispatchAction(ExportRedux.ExportApply(report, destination));
        }
    };
    ExportApiImpl.prototype.showExportPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup);
    };
    return ExportApiImpl;
}(ApiBase_1.ApiBase));
exports.ExportApiImpl = ExportApiImpl;
