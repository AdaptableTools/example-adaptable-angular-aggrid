import { ReminderState, ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import * as Redux from 'redux';
export declare const REMINDER_SCHEDULE_ADD = "REMINDER_SCHEDULE_ADD";
export declare const REMINDER_SCHEDULE_EDIT = "REMINDER_SCHEDULE_EDIT";
export declare const REMINDER_SCHEDULE_DELETE = "REMINDER_SCHEDULE_DELETE";
export interface ReminderScheduleAction extends Redux.Action {
    reminderSchedule: ReminderSchedule;
}
export interface ReminderScheduleAddAction extends ReminderScheduleAction {
}
export interface ReminderScheduleEditAction extends ReminderScheduleAction {
}
export interface ReminderScheduleDeleteAction extends ReminderScheduleAction {
}
export declare const ReminderScheduleAdd: (reminderSchedule: ReminderSchedule) => ReminderScheduleAddAction;
export declare const ReminderScheduleEdit: (reminderSchedule: ReminderSchedule) => ReminderScheduleEditAction;
export declare const ReminderScheduleDelete: (reminderSchedule: ReminderSchedule) => ReminderScheduleDeleteAction;
export declare const ReminderReducer: Redux.Reducer<ReminderState>;
