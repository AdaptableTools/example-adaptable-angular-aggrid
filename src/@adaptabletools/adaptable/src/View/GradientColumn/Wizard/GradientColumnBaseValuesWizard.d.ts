import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { GradientColumn } from '../../../PredefinedConfig/GradientColumnState';
export interface GradientColumnBaseValuesWizardProps extends AdaptableWizardStepProps<GradientColumn> {
}
export interface GradientColumnBaseValuesWizardState {
    BaseValue: number;
}
export declare class GradientColumnBaseValuesWizard extends React.Component<GradientColumnBaseValuesWizardProps, GradientColumnBaseValuesWizardState> implements AdaptableWizardStep {
    constructor(props: GradientColumnBaseValuesWizardProps);
    render(): any;
    private onBaseValueChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
