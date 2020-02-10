import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { FormatColumn } from '../../../PredefinedConfig/FormatColumnState';
export interface FormatColumnScopeWizardProps extends AdaptableWizardStepProps<FormatColumn> {
}
export interface FormatColumnScopeWizardState {
    ColumnId: string;
}
export declare class FormatColumnScopeWizard extends React.Component<FormatColumnScopeWizardProps, FormatColumnScopeWizardState> implements AdaptableWizardStep {
    constructor(props: FormatColumnScopeWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
