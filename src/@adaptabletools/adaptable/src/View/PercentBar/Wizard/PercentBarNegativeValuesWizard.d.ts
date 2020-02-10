import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { PercentBar } from '../../../PredefinedConfig/PercentBarState';
export interface PercentBarNegativeValuesWizardProps extends AdaptableWizardStepProps<PercentBar> {
    ColorPalette: Array<string>;
}
export interface PercentBarNegativeValuesWizardState {
    NegativeColor: string;
    NegativeValue: number | undefined;
    NegativeValueColumnId: string | undefined;
    UseMinColumn: boolean;
}
export declare class PercentBarNegativeValuesWizard extends React.Component<PercentBarNegativeValuesWizardProps, PercentBarNegativeValuesWizardState> implements AdaptableWizardStep {
    constructor(props: PercentBarNegativeValuesWizardProps);
    render(): any;
    private onUseMinColumnSelectChanged;
    private onMinValueChanged;
    private onColumnMinValueSelectedChanged;
    private onNegativeColorSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
