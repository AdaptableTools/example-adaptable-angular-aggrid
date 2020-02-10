import * as React from 'react';
import { Calendar } from '../../PredefinedConfig/CalendarState';
export interface CalendarsEntryRowProps extends React.ClassAttributes<CalendarsEntryRow> {
    Calendar: Calendar;
    CurrentCalendar: string;
    onSelect: (calendar: Calendar) => void;
    onShowInformation: (calendar: Calendar) => void;
}
export declare class CalendarsEntryRow extends React.Component<CalendarsEntryRowProps, {}> {
    render(): any;
}
