import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
export interface LayoutGroupedColumnWizardProps extends AdaptableWizardStepProps<Layout> {
    GroupableColumns: AdaptableColumn[];
}
export interface LayoutGroupedColumnWizardState {
    SelectedColumns: Array<string>;
}
export declare class LayoutGroupedColumnWizard extends React.Component<LayoutGroupedColumnWizardProps, LayoutGroupedColumnWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutGroupedColumnWizardProps);
    render(): any;
    OnSelectedValuesChange(newValues: Array<string>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
