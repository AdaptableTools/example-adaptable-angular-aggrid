import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { GradientColumn } from '../../../PredefinedConfig/GradientColumnState';
export interface GradientColumnSelectColumnWizardProps extends AdaptableWizardStepProps<GradientColumn> {
}
export interface GradientColumnSelectColumnWizardState {
    ColumnId: string;
    NegativeValue: number;
    PositiveValue: number;
    BaseValue: number;
}
export declare class GradientColumnSelectColumnWizard extends React.Component<GradientColumnSelectColumnWizardProps, GradientColumnSelectColumnWizardState> implements AdaptableWizardStep {
    constructor(props: GradientColumnSelectColumnWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
