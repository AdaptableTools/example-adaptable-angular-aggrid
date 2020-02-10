import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
export interface LayoutAggregationColumnWizardProps extends AdaptableWizardStepProps<Layout> {
    AggregetableColumns: AdaptableColumn[];
}
export interface LayoutAggregationColumnWizardState {
    SelectedColumns: Array<string>;
}
export declare class LayoutAggregationColumnWizard extends React.Component<LayoutAggregationColumnWizardProps, LayoutAggregationColumnWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutAggregationColumnWizardProps);
    render(): any;
    OnSelectedValuesChange(newValues: Array<string>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
