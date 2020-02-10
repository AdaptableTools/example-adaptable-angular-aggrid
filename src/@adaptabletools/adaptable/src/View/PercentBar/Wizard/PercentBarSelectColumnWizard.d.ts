import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { PercentBar } from '../../../PredefinedConfig/PercentBarState';
export interface PercentBarSelectColumnWizardProps extends AdaptableWizardStepProps<PercentBar> {
}
export interface PercentBarSelectColumnWizardState {
    ColumnId: string;
    PositiveValue: number | undefined;
    NegativeValue: number | undefined;
}
export declare class PercentBarSelectColumnWizard extends React.Component<PercentBarSelectColumnWizardProps, PercentBarSelectColumnWizardState> implements AdaptableWizardStep {
    constructor(props: PercentBarSelectColumnWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
