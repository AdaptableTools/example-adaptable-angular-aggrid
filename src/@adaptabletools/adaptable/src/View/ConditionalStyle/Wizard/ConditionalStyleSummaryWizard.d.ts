import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
export interface ConditionalStyleSummaryWizardProps extends AdaptableWizardStepProps<ConditionalStyle> {
    UserFilters: UserFilter[];
}
export declare class ConditionalStyleSummaryWizard extends React.Component<ConditionalStyleSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ConditionalStyleSummaryWizardProps);
    render(): any;
    private getScope;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
