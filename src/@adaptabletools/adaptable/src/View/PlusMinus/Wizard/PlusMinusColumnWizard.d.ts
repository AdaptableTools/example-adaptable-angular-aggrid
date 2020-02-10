import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { PlusMinusRule } from '../../../PredefinedConfig/PlusMinusState';
export interface PlusMinusColumnWizardProps extends AdaptableWizardStepProps<PlusMinusRule> {
    NumericColumns: Array<AdaptableColumn>;
}
export interface PlusMinusColumnWizardState {
    SelectedColumnId: string;
}
export declare class PlusMinusColumnWizard extends React.Component<PlusMinusColumnWizardProps, PlusMinusColumnWizardState> implements AdaptableWizardStep {
    constructor(props: PlusMinusColumnWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
