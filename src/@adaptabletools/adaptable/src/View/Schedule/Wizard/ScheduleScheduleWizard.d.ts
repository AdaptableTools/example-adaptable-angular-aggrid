import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { DayOfWeek } from '../../../PredefinedConfig/Common/Enums';
import { BaseSchedule } from '../../../PredefinedConfig/Common/Schedule';
export interface ScheduleScheduleWizardProps extends AdaptableWizardStepProps<BaseSchedule> {
}
export interface ScheduleScheduleWizardState {
    IsRecurringDate: boolean;
    Hour: number;
    Minute: number;
    DaysOfWeek: DayOfWeek[];
    OneOffDate: any;
}
export declare class ScheduleScheduleWizard extends React.Component<ScheduleScheduleWizardProps, ScheduleScheduleWizardState> implements AdaptableWizardStep {
    constructor(props: ScheduleScheduleWizardProps);
    render(): any;
    private onDayChecked;
    private onOneOffDateChanged;
    private onRecurringDateChanged;
    private onHourChanged;
    private onMinuteChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
