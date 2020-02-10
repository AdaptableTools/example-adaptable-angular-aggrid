import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklineColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/SparklineColumnState';
export interface SparklineColumnSelectColumnWizardProps extends AdaptableWizardStepProps<SparklineColumn> {
}
export interface SparklineColumnSelectColumnWizardState extends SparklineColumn {
}
export declare class SparklineColumnSelectColumnWizard extends React.Component<SparklineColumnSelectColumnWizardProps, SparklineColumnSelectColumnWizardState> implements AdaptableWizardStep {
    constructor(props: SparklineColumnSelectColumnWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
