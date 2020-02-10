import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
export interface LayoutPivotColumnWizardProps extends AdaptableWizardStepProps<Layout> {
    PivotableColumns: AdaptableColumn[];
}
export interface LayoutPivotColumnWizardState {
    SelectedColumns: Array<string>;
}
export declare class LayoutPivotColumnWizard extends React.Component<LayoutPivotColumnWizardProps, LayoutPivotColumnWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutPivotColumnWizardProps);
    render(): any;
    OnSelectedValuesChange(newValues: Array<string>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
