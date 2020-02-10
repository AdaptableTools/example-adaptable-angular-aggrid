import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { CalculatedColumn } from '../../../PredefinedConfig/CalculatedColumnState';
export interface CalculatedColumnExpressionWizardProps extends AdaptableWizardStepProps<CalculatedColumn> {
    IsExpressionValid: (expression: string) => void;
    GetErrorMessage: () => string;
}
export interface CalculatedColumnExpressionWizardState {
    ColumnExpression: string;
}
export declare class CalculatedColumnExpressionWizard extends React.Component<CalculatedColumnExpressionWizardProps, CalculatedColumnExpressionWizardState> implements AdaptableWizardStep {
    constructor(props: CalculatedColumnExpressionWizardProps);
    render(): any;
    handleExpressionChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
