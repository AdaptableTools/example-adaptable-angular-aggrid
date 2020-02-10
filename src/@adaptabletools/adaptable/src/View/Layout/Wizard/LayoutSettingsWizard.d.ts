import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { Layout } from '../../../PredefinedConfig/LayoutState';
export interface LayoutSettingsWizardProps extends AdaptableWizardStepProps<Layout> {
    Layouts: Layout[];
}
export interface LayoutSettingsWizardState {
    LayoutName: string;
    ErrorMessage: string;
}
export declare class LayoutSettingsWizard extends React.Component<LayoutSettingsWizardProps, LayoutSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutSettingsWizardProps);
    render(): any;
    onLayoutNameChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): 1 | 3;
}
