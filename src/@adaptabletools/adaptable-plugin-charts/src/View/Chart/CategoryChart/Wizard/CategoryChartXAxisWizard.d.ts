import * as React from 'react';
import { AdaptableWizardStepProps, AdaptableWizardStep } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { CategoryChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { Expression } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Expression';
export interface CategoryChartXAxisWizardProps extends AdaptableWizardStepProps<CategoryChartDefinition> {
}
export interface CategoryChartXAxisWizardState {
    XAxisColumnId: string;
    UseAllXAsisColumnValues: boolean;
    XAxisExpression?: Expression;
}
export declare class CategoryChartXAxisWizard extends React.Component<CategoryChartXAxisWizardProps, CategoryChartXAxisWizardState> implements AdaptableWizardStep {
    constructor(props: CategoryChartXAxisWizardProps);
    render(): any;
    private onUseAllColumnValuesChanged;
    private onXAxisColumnChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 1 | 2;
    GetIndexStepDecrement(): number;
}
