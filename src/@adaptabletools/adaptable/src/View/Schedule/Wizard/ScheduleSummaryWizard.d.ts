import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { BaseSchedule } from '../../../PredefinedConfig/Common/Schedule';
export interface ScheduleSummaryWizardProps extends AdaptableWizardStepProps<BaseSchedule> {
}
export declare class ScheduleSummaryWizard extends React.Component<ScheduleSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ScheduleSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
