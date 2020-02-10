import { IScheduleService } from './Interface/IScheduleService';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { ReportSchedule } from '../../PredefinedConfig/ExportState';
import { IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import { Glue42Schedule } from '../../PredefinedConfig/Glue42State';
/**
 * This class is used for managing scheduling of Reports and Reminders
 * It listens to any changes in the Reminder or the Export state and tells the respective stragies to refresh
 * It also createsa daily job to run at midnight that will refresh Adaptable - this is so that date-based schedules can jump to the new day
 *
 * TODO - we need to implement a way to make sure that if the user doesn't reload the browser for 5 days and has a reminder for each of those days,
 * we need to make sure all of those occurences are triggered
 */
export declare class ScheduleService implements IScheduleService {
    private adaptable;
    private reminderJobs;
    private exportJobs;
    private iPushPullJobs;
    private glue42Jobs;
    constructor(adaptable: IAdaptable);
    private updateReminderJobs;
    private updateReportJobs;
    private updateIPushPullJobs;
    private updateGlue42Jobs;
    AddReminderSchedule(reminderSchedule: ReminderSchedule): void;
    AddReportSchedule(reportSchedule: ReportSchedule): void;
    AddIPushPullSchedule(iPushPullSchedule: IPushPullSchedule): void;
    AddGlue42Schedule(glue42Schedule: Glue42Schedule): void;
    private AddMidnightRefreshSchedule;
    private getDateFromSchedule;
    private clearAllReminderJobs;
    private clearAllExportJobs;
    private clearAllIPushPullJobs;
    private clearAllGlue42Jobs;
}
