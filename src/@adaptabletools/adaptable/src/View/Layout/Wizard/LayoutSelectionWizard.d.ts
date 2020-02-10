import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { LayoutSource } from '../../../PredefinedConfig/Common/Enums';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { ColumnSort } from '../../../PredefinedConfig/Common/ColumnSort';
export interface LayoutSelectionWizardProps extends AdaptableWizardStepProps<Layout> {
    Layouts: Array<Layout>;
    ColumnSorts: ColumnSort[];
}
export interface LayoutSelectionWizardState {
    LayoutSource: LayoutSource;
}
export declare class LayoutSelectionWizard extends React.Component<LayoutSelectionWizardProps, LayoutSelectionWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutSelectionWizardProps);
    render(): any;
    private onScopeSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 1 | 7;
    GetIndexStepDecrement(): number;
}
