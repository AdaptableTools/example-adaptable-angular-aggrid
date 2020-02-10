import * as React from 'react';
import { AdaptableWizardStepProps, AdaptableWizardStep } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { PieChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
export interface PieChartSummaryWizardProps extends AdaptableWizardStepProps<PieChartDefinition> {
}
export declare class PieChartSummaryWizard extends React.Component<PieChartSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: PieChartSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
