import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { PercentBar } from '../../../PredefinedConfig/PercentBarState';
export interface PercentBarPositiveValuesWizardProps extends AdaptableWizardStepProps<PercentBar> {
    ColorPalette: Array<string>;
}
export interface PercentBarPositiveValuesWizardState {
    PositiveColor: string;
    PositiveValue: number | undefined;
    PositiveValueColumnId: string | undefined;
    UseColumn: boolean;
}
export declare class PercentBarPositiveValuesWizard extends React.Component<PercentBarPositiveValuesWizardProps, PercentBarPositiveValuesWizardState> implements AdaptableWizardStep {
    constructor(props: PercentBarPositiveValuesWizardProps);
    render(): any;
    private onUsePositiveColumnSelectChanged;
    private onMaxValueChanged;
    private onPositiveColumnSelectedChanged;
    private onPositiveColorSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
