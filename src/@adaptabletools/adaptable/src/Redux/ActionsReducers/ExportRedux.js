"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.EXPORT_APPLY = 'EXPORT_APPLY';
exports.REPORT_SELECT = 'REPORT_SELECT';
exports.REPORT_ADD = 'REPORT_ADD';
exports.REPORT_EDIT = 'REPORT_EDIT';
exports.REPORT_DELETE = 'REPORT_DELETE';
exports.REPORT_SCHEDULE_ADD = 'REPORT_SCHEDULE_ADD';
exports.REPORT_SCHEDULE_EDIT = 'REPORT_SCHEDULE_EDIT';
exports.REPORT_SCHEDULE_DELETE = 'REPORT_SCHEDULE_DELETE';
exports.ReportSelect = function (SelectedReport) { return ({
    type: exports.REPORT_SELECT,
    SelectedReport: SelectedReport,
}); };
exports.ReportAdd = function (report) { return ({
    type: exports.REPORT_ADD,
    report: report,
}); };
exports.ReportEdit = function (report) { return ({
    type: exports.REPORT_EDIT,
    report: report,
}); };
exports.ReportDelete = function (report) { return ({
    type: exports.REPORT_DELETE,
    report: report,
}); };
// Report
exports.ReportScheduleAdd = function (reportSchedule) { return ({
    type: exports.REPORT_SCHEDULE_ADD,
    reportSchedule: reportSchedule,
}); };
exports.ReportScheduleEdit = function (reportSchedule) { return ({
    type: exports.REPORT_SCHEDULE_EDIT,
    reportSchedule: reportSchedule,
}); };
exports.ReportScheduleDelete = function (reportSchedule) { return ({
    type: exports.REPORT_SCHEDULE_DELETE,
    reportSchedule: reportSchedule,
}); };
exports.ExportApply = function (Report, ExportDestination) { return ({
    type: exports.EXPORT_APPLY,
    Report: Report,
    ExportDestination: ExportDestination,
}); };
var initialExportState = {
    Reports: GeneralConstants_1.EMPTY_ARRAY,
    CurrentReport: GeneralConstants_1.EMPTY_STRING,
    ReportSchedules: GeneralConstants_1.EMPTY_ARRAY,
};
exports.ExportReducer = function (state, action) {
    if (state === void 0) { state = initialExportState; }
    var reports;
    var reportSchedules;
    switch (action.type) {
        case exports.REPORT_SELECT:
            return Object.assign({}, state, {
                CurrentReport: action.SelectedReport,
            });
        case exports.REPORT_ADD: {
            var actionReport_1 = action.report;
            if (!actionReport_1.Uuid) {
                actionReport_1.Uuid = Uuid_1.createUuid();
            }
            reports = [].concat(state.Reports);
            reports.push(actionReport_1);
            return tslib_1.__assign(tslib_1.__assign({}, state), { Reports: reports });
        }
        case exports.REPORT_EDIT:
            var actionReport_2 = action.report;
            return tslib_1.__assign(tslib_1.__assign({}, state), { Reports: state.Reports.map(function (abObject) {
                    return abObject.Uuid === actionReport_2.Uuid ? actionReport_2 : abObject;
                }) });
        case exports.REPORT_DELETE: {
            var actionReport_3 = action.report;
            return tslib_1.__assign(tslib_1.__assign({}, state), { Reports: state.Reports.filter(function (abObject) { return abObject.Uuid !== actionReport_3.Uuid; }) });
        }
        case exports.REPORT_SCHEDULE_ADD: {
            var actionSchedule = action.reportSchedule;
            if (!actionSchedule.Uuid) {
                actionSchedule.Uuid = Uuid_1.createUuid();
            }
            reportSchedules = [].concat(state.ReportSchedules);
            reportSchedules.push(actionSchedule);
            return tslib_1.__assign(tslib_1.__assign({}, state), { ReportSchedules: reportSchedules });
        }
        case exports.REPORT_SCHEDULE_EDIT: {
            var actionSchedule_1 = action.reportSchedule;
            return tslib_1.__assign(tslib_1.__assign({}, state), { ReportSchedules: state.ReportSchedules.map(function (abObject) {
                    return abObject.Uuid === actionSchedule_1.Uuid ? actionSchedule_1 : abObject;
                }) });
        }
        case exports.REPORT_SCHEDULE_DELETE: {
            var actionSchedule_2 = action.reportSchedule;
            return tslib_1.__assign(tslib_1.__assign({}, state), { ReportSchedules: state.ReportSchedules.filter(function (abObject) { return abObject.Uuid !== actionSchedule_2.Uuid; }) });
        }
        default:
            return state;
    }
};
