import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { GradientColumn } from '../../../PredefinedConfig/GradientColumnState';
export interface GradientColumnNegativeValuesWizardProps extends AdaptableWizardStepProps<GradientColumn> {
    ColorPalette: Array<string>;
}
export interface GradientColumnNegativeValuesWizardState {
    NegativeValue: number;
    NegativeColor: string;
}
export declare class GradientColumnNegativeValuesWizard extends React.Component<GradientColumnNegativeValuesWizardProps, GradientColumnNegativeValuesWizardState> implements AdaptableWizardStep {
    constructor(props: GradientColumnNegativeValuesWizardProps);
    render(): any;
    private onNegativeValueChanged;
    private onNegativeColorSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
