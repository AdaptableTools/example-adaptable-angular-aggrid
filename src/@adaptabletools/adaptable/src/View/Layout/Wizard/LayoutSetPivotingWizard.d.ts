import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { Layout } from '../../../PredefinedConfig/LayoutState';
export interface LayoutSetPivotingWizardProps extends AdaptableWizardStepProps<Layout> {
}
export interface LayoutSetPivotingWizardState {
    IsPivotLayout: boolean;
}
export declare class LayoutSetPivotingWizard extends React.Component<LayoutSetPivotingWizardProps, LayoutSetPivotingWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutSetPivotingWizardProps);
    render(): any;
    private onCreatePivotLayoutChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 1 | 3;
    GetIndexStepDecrement(): number;
}
