import * as React from 'react';
import { AdaptableWizardStepProps, AdaptableWizardStep } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { CategoryChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
export interface CategoryChartSummaryWizardProps extends AdaptableWizardStepProps<CategoryChartDefinition> {
}
export declare class CategoryChartSummaryWizard extends React.Component<CategoryChartSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CategoryChartSummaryWizardProps);
    render(): any;
    private getExpressionString;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
