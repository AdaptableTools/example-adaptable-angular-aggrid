import * as React from 'react';
import { AdaptableWizardStepProps, AdaptableWizardStep } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklinesChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
export interface SparklinesChartSummaryWizardProps extends AdaptableWizardStepProps<SparklinesChartDefinition> {
}
export declare class SparklinesChartSummaryWizard extends React.Component<SparklinesChartSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: SparklinesChartSummaryWizardProps);
    render(): any;
    private getExpressionString;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
