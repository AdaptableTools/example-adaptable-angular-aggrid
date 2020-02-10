import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklineColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/SparklineColumnState';
export interface SparklineColumnSummaryWizardProps extends AdaptableWizardStepProps<SparklineColumn> {
}
export declare class SparklineColumnSummaryWizard extends React.Component<SparklineColumnSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: SparklineColumnSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
