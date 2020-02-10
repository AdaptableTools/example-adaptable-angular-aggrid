import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
export interface ColumnCategorySummaryWizardProps extends AdaptableWizardStepProps<ColumnCategory> {
}
export declare class ColumnCategorySummaryWizard extends React.Component<ColumnCategorySummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ColumnCategorySummaryWizardProps);
    render(): any;
    canNext(): boolean;
    private getColumnNames;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
