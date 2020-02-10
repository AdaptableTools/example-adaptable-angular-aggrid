import * as React from 'react';
import { AdaptableWizardStepProps, AdaptableWizardStep } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { CategoryChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { AxisTotal } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
export interface CategoryChartYAxisWizardProps extends AdaptableWizardStepProps<CategoryChartDefinition> {
}
export interface CategoryChartYAxisWizardState {
    YAxisColumnIds: string[];
    YAxisTotal: AxisTotal;
}
export declare class CategoryChartYAxisWizard extends React.Component<CategoryChartYAxisWizardProps, CategoryChartYAxisWizardState> implements AdaptableWizardStep {
    constructor(props: CategoryChartYAxisWizardProps);
    render(): any;
    OnSelectedValuesChange(newValues: Array<string>): void;
    private onYAisTotalChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
