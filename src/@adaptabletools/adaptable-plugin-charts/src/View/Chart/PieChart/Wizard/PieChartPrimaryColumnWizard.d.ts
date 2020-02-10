import * as React from 'react';
import { AdaptableWizardStepProps, AdaptableWizardStep } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { PieChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
export interface PieChartPrimaryColumnWizardProps extends AdaptableWizardStepProps<PieChartDefinition> {
}
export interface PieChartPrimaryColumnWizardState {
    PrimaryColumnId: string;
}
export declare class PieChartPrimaryColumnWizard extends React.Component<PieChartPrimaryColumnWizardProps, PieChartPrimaryColumnWizardState> implements AdaptableWizardStep {
    constructor(props: PieChartPrimaryColumnWizardProps);
    render(): any;
    private onPrimaryColumnChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
