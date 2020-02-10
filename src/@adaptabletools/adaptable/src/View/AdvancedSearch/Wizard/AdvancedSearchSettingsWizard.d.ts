import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AdvancedSearch } from '../../../PredefinedConfig/AdvancedSearchState';
export interface AdvancedSearchSettingsWizardProps extends AdaptableWizardStepProps<AdvancedSearch> {
    AdvancedSearches: AdvancedSearch[];
}
export interface AdvancedSearchSettingsWizardState {
    AdvancedSearchName: string;
    ErrorMessage: string;
}
export declare class AdvancedSearchSettingsWizard extends React.Component<AdvancedSearchSettingsWizardProps, AdvancedSearchSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: AdvancedSearchSettingsWizardProps);
    render(): any;
    onAdvancedSearchNameChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
