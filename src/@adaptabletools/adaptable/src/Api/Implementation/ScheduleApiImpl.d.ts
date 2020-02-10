import { ApiBase } from './ApiBase';
import { ScheduleApi } from '../ScheduleApi';
import { BaseSchedule } from '../../PredefinedConfig/Common/Schedule';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import { ReportSchedule } from '../../PredefinedConfig/ExportState';
import { IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';
import { Glue42Schedule } from '../../PredefinedConfig/Glue42State';
export declare class ScheduleApiImpl extends ApiBase implements ScheduleApi {
    getAllSchedule(): BaseSchedule[];
    getAllReminderSchedule(): ReminderSchedule[];
    getAllReportSchedule(): ReportSchedule[];
    getAllIPushPullSchedule(): IPushPullSchedule[];
    getAllGlue42Schedule(): Glue42Schedule[];
    showSchedulePopup(): void;
}
