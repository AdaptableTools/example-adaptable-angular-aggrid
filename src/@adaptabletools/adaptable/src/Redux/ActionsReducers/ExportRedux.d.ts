import { ExportState, Report, ReportSchedule } from '../../PredefinedConfig/ExportState';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import * as Redux from 'redux';
export declare const EXPORT_APPLY = "EXPORT_APPLY";
export declare const REPORT_SELECT = "REPORT_SELECT";
export declare const REPORT_ADD = "REPORT_ADD";
export declare const REPORT_EDIT = "REPORT_EDIT";
export declare const REPORT_DELETE = "REPORT_DELETE";
export declare const REPORT_SCHEDULE_ADD = "REPORT_SCHEDULE_ADD";
export declare const REPORT_SCHEDULE_EDIT = "REPORT_SCHEDULE_EDIT";
export declare const REPORT_SCHEDULE_DELETE = "REPORT_SCHEDULE_DELETE";
export interface ExportApplyAction extends Redux.Action {
    Report: Report;
    ExportDestination: ExportDestination;
}
export interface ReportAction extends Redux.Action {
    report: Report;
}
export interface ReportSelectAction extends Redux.Action {
    SelectedReport: string;
}
export interface ReportAddAction extends ReportAction {
}
export interface ReportEditAction extends ReportAction {
}
export interface ReportDeleteAction extends ReportAction {
}
export interface ReportScheduleAction extends Redux.Action {
    reportSchedule: ReportSchedule;
}
export interface ReportScheduleAddAction extends ReportScheduleAction {
}
export interface ReportScheduleEditAction extends ReportScheduleAction {
}
export interface ReportScheduleDeleteAction extends ReportScheduleAction {
}
export declare const ReportSelect: (SelectedReport: string) => ReportSelectAction;
export declare const ReportAdd: (report: Report) => ReportAddAction;
export declare const ReportEdit: (report: Report) => ReportEditAction;
export declare const ReportDelete: (report: Report) => ReportDeleteAction;
export declare const ReportScheduleAdd: (reportSchedule: ReportSchedule) => ReportScheduleAddAction;
export declare const ReportScheduleEdit: (reportSchedule: ReportSchedule) => ReportScheduleEditAction;
export declare const ReportScheduleDelete: (reportSchedule: ReportSchedule) => ReportScheduleDeleteAction;
export declare const ExportApply: (Report: Report, ExportDestination: ExportDestination) => ExportApplyAction;
export declare const ExportReducer: Redux.Reducer<ExportState>;
