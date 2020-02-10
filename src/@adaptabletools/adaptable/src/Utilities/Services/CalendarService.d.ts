import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { ICalendarService } from './Interface/ICalendarService';
export declare class CalendarService implements ICalendarService {
    private adaptable;
    constructor(adaptable: IAdaptable);
    GetDynamicDate(dynamicDateName: string): Date;
    GetNextWorkingDay(days?: number): Date;
    GetPreviousWorkingDay(days?: number): Date;
    private isNotWorkingDay;
}
