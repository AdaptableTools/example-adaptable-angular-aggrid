import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
export interface ConditionalStyleScopeWizardProps extends AdaptableWizardStepProps<ConditionalStyle> {
    ColumnCategories: Array<ColumnCategory>;
}
export interface ConditionalStyleScopeWizardState {
    ColumnId: string;
    ColumnCategoryId: string;
    ConditionalStyleScope: 'Column' | 'Row' | 'ColumnCategory';
}
export declare class ConditionalStyleScopeWizard extends React.Component<ConditionalStyleScopeWizardProps, ConditionalStyleScopeWizardState> implements AdaptableWizardStep {
    constructor(props: ConditionalStyleScopeWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    private onColumnCategorySelectedChanged;
    private onScopeSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
