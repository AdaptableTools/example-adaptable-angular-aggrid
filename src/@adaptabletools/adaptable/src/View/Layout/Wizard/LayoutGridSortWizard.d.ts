import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { ColumnSort } from '../../../PredefinedConfig/Common/ColumnSort';
export interface LayoutGridSortWizardProps extends AdaptableWizardStepProps<Layout> {
    SortableColumns: AdaptableColumn[];
}
export interface LayoutGridSortWizardState {
    ColumnSorts: ColumnSort[];
}
export declare class LayoutGridSortWizard extends React.Component<LayoutGridSortWizardProps, LayoutGridSortWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutGridSortWizardProps);
    render(): any;
    addSort(): any;
    private onColumnSelectedChanged;
    private onSortOrderChanged;
    private onDeleteGridSort;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
