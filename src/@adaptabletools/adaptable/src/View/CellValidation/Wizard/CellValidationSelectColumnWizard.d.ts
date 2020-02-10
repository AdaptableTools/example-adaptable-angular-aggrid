import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';
export interface CellValidationSelectColumnWizardProps extends AdaptableWizardStepProps<CellValidationRule> {
}
export interface CellValidationSelectColumnWizardState {
    ColumnId: string;
}
export declare class CellValidationSelectColumnWizard extends React.Component<CellValidationSelectColumnWizardProps, CellValidationSelectColumnWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationSelectColumnWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
