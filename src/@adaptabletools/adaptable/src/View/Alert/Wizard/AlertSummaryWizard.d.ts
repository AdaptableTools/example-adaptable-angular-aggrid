import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AlertDefinition } from '../../../PredefinedConfig/AlertState';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
export interface AlertSummaryWizardProps extends AdaptableWizardStepProps<AlertDefinition> {
    UserFilters: UserFilter[];
}
export declare class AlertSummaryWizard extends React.Component<AlertSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: AlertSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): 1 | 2;
}
