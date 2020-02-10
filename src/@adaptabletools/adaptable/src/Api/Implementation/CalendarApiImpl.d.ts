import { ApiBase } from './ApiBase';
import { CalendarApi } from '../CalendarApi';
import { CalendarState } from '../../PredefinedConfig/CalendarState';
export declare class CalendarApiImpl extends ApiBase implements CalendarApi {
    getCalendarState(): CalendarState;
    setCurrentCalendar(calendar: string): void;
    getCurrentCalendar(): string;
}
