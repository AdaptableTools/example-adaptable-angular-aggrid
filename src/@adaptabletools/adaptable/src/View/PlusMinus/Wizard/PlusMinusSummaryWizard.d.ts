import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { PlusMinusRule } from '../../../PredefinedConfig/PlusMinusState';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
export interface PlusMinusSummaryWizardProps extends AdaptableWizardStepProps<PlusMinusRule> {
    UserFilters: UserFilter[];
}
export declare class PlusMinusSummaryWizard extends React.Component<PlusMinusSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: PlusMinusSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): 1 | 2;
}
