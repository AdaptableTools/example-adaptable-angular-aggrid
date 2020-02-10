import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { Layout } from '../../../PredefinedConfig/LayoutState';
export interface LayoutColumnWizardProps extends AdaptableWizardStepProps<Layout> {
}
export interface LayoutColumnWizardState {
    SelectedColumns: Array<string>;
}
export declare class LayoutColumnWizard extends React.Component<LayoutColumnWizardProps, LayoutColumnWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutColumnWizardProps);
    render(): any;
    OnSelectedValuesChange(newValues: Array<string>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
