import { AdaptableObject } from './AdaptableObject';
import { DayOfWeek } from './Enums';
export interface Schedule extends AdaptableObject {
    Hour: number;
    Minute: number;
    OneOffDate?: string;
    DaysOfWeek?: DayOfWeek[];
}
export interface BaseSchedule extends AdaptableObject {
    Schedule: Schedule;
    ScheduleType: 'Report' | 'iPushPull' | 'Glue42' | 'Reminder';
}
