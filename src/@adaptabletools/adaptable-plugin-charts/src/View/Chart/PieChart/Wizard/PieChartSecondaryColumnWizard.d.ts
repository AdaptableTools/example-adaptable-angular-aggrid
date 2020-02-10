import * as React from 'react';
import { AdaptableWizardStepProps, AdaptableWizardStep } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { PieChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { SecondaryColumnOperation } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
export interface PieChartSecondaryColumnWizardProps extends AdaptableWizardStepProps<PieChartDefinition> {
}
export interface PieChartSecondaryColumnWizardState {
    SecondaryColumnId?: string;
    SecondaryColumnOperation: SecondaryColumnOperation;
}
export declare class PieChartSecondaryColumnWizard extends React.Component<PieChartSecondaryColumnWizardProps, PieChartSecondaryColumnWizardState> implements AdaptableWizardStep {
    constructor(props: PieChartSecondaryColumnWizardProps);
    render(): any;
    private onSecondaryColumnOperationChanged;
    private onSecondaryColumnChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
