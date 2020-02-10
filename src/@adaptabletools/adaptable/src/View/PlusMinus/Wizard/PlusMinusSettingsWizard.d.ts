import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { PlusMinusRule } from '../../../PredefinedConfig/PlusMinusState';
export interface PlusMinusSettingsWizardProps extends AdaptableWizardStepProps<PlusMinusRule> {
}
export interface PlusMinusSettingsWizardState {
    NudgeValue: number;
    IsDefaultNudge: boolean;
}
export declare class PlusMinusSettingsWizard extends React.Component<PlusMinusSettingsWizardProps, PlusMinusSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PlusMinusSettingsWizardProps);
    render(): any;
    private onExpressionOptionChange;
    onColumnDefaultNudgeValueChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 1 | 2;
    GetIndexStepDecrement(): number;
}
