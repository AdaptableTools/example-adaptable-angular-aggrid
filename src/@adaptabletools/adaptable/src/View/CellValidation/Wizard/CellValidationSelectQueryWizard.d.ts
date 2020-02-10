import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';
export interface CellValidationSelectQueryWizardProps extends AdaptableWizardStepProps<CellValidationRule> {
}
export interface CellValidationSelectQueryWizardState {
    HasExpression: boolean;
}
export declare class CellValidationSelectQueryWizard extends React.Component<CellValidationSelectQueryWizardProps, CellValidationSelectQueryWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationSelectQueryWizardProps);
    render(): any;
    private onOtherExpressionOptionChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 1 | 2;
    GetIndexStepDecrement(): number;
}
