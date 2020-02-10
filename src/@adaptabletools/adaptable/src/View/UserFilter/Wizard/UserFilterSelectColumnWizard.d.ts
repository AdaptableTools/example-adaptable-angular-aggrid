import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
export interface UserFilterSelectColumnWizardProps extends AdaptableWizardStepProps<UserFilter> {
}
export interface UserFilterSelectColumnWizardState {
    ColumnId: string;
}
export declare class UserFilterSelectColumnWizard extends React.Component<UserFilterSelectColumnWizardProps, UserFilterSelectColumnWizardState> implements AdaptableWizardStep {
    constructor(props: UserFilterSelectColumnWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
