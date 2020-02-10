import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { CustomSort } from '../../../PredefinedConfig/CustomSortState';
export interface CustomSortColumnWizardProps extends AdaptableWizardStepProps<CustomSort> {
    SortedColumns: AdaptableColumn[];
}
export interface CustomSortColumnWizardState {
    SelectedColumnId: string;
}
export declare class CustomSortColumnWizard extends React.Component<CustomSortColumnWizardProps, CustomSortColumnWizardState> implements AdaptableWizardStep {
    constructor(props: CustomSortColumnWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
