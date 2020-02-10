import * as React from 'react';
import * as CalendarsRedux from '../../Redux/ActionsReducers/CalendarRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { Calendar } from '../../PredefinedConfig/CalendarState';
interface CalendarsPopupProps extends StrategyViewPopupProps<CalendarsPopupComponent> {
    CurrentCalendar: string;
    AvailableCalendars: Calendar[];
    onSelectCalendar: (selectedCalendar: Calendar) => CalendarsRedux.CalendarSelectAction;
}
interface CalendarsPopupInternalState {
    DisplayedCalendar: Calendar;
    DisplayedYear: Number;
}
declare class CalendarsPopupComponent extends React.Component<CalendarsPopupProps, CalendarsPopupInternalState> {
    constructor(props: CalendarsPopupProps);
    render(): JSX.Element;
    closeInformationModal(): void;
    private onShowInformation;
    private onClickCalendarYear;
}
export declare let CalendarsPopup: import("react-redux").ConnectedComponent<typeof CalendarsPopupComponent, any>;
export {};
