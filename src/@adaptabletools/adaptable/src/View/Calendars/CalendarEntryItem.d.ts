import * as React from 'react';
import { CalendarEntry } from '../../PredefinedConfig/CalendarState';
export interface CalendarEntryItemProps extends React.ClassAttributes<CalendarEntryItem> {
    CalendarEntry: CalendarEntry;
}
export declare class CalendarEntryItem extends React.Component<CalendarEntryItemProps, {}> {
    render(): any;
}
