import { ApiBase } from './ApiBase';
import { ReminderApi } from '../ReminderApi';
import { ReminderState, ReminderSchedule } from '../../PredefinedConfig/ReminderState';
export declare class ReminderApiImpl extends ApiBase implements ReminderApi {
    getReminderState(): ReminderState;
    getAllReminder(): ReminderSchedule[];
    showReminderPopup(): void;
}
