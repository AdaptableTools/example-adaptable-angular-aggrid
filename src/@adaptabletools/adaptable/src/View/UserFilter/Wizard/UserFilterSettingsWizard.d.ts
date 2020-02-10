import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
export interface UserFilterSettingsWizardProps extends AdaptableWizardStepProps<UserFilter> {
    UserFilters: UserFilter[];
}
export interface UserFilterSettingsWizardState {
    FilterName: string;
    ErrorMessage: string;
}
export declare class UserFilterSettingsWizard extends React.Component<UserFilterSettingsWizardProps, UserFilterSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: UserFilterSettingsWizardProps);
    render(): JSX.Element;
    onFilterNameChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
