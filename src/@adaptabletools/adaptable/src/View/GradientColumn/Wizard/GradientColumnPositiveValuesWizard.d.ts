import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { GradientColumn } from '../../../PredefinedConfig/GradientColumnState';
export interface GradientColumnPositiveValuesWizardProps extends AdaptableWizardStepProps<GradientColumn> {
    ColorPalette: Array<string>;
}
export interface GradientColumnPositiveValuesWizardState {
    PositiveValue: number;
    PositiveColor: string;
}
export declare class GradientColumnPositiveValuesWizard extends React.Component<GradientColumnPositiveValuesWizardProps, GradientColumnPositiveValuesWizardState> implements AdaptableWizardStep {
    constructor(props: GradientColumnPositiveValuesWizardProps);
    render(): any;
    private onPositiveValueChanged;
    private onPositiveColorSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
