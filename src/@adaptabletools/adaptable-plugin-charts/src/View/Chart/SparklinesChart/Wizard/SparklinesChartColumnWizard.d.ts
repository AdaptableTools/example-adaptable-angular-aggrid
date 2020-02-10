import * as React from 'react';
import { AdaptableWizardStepProps, AdaptableWizardStep } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklinesChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { Expression } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Expression';
export interface SparklinesChartColumnWizardProps extends AdaptableWizardStepProps<SparklinesChartDefinition> {
}
export interface SparklinesChartColumnWizardState {
    ColumnId: string;
    Filtered: boolean;
    Expression?: Expression;
}
export declare class SparklinesChartColumnWizard extends React.Component<SparklinesChartColumnWizardProps, SparklinesChartColumnWizardState> implements AdaptableWizardStep {
    constructor(props: SparklinesChartColumnWizardProps);
    render(): any;
    private setFiltered;
    private onColumnChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 1 | 2;
    GetIndexStepDecrement(): number;
}
