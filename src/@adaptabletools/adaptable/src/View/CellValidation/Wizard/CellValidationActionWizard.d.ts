import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ActionMode } from '../../../PredefinedConfig/Common/Enums';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';
export interface CellValidationActionWizardProps extends AdaptableWizardStepProps<CellValidationRule> {
}
export interface CellValidationSettingsWizardState {
    ActionMode: ActionMode;
}
export declare class CellValidationActionWizard extends React.Component<CellValidationActionWizardProps, CellValidationSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationActionWizardProps);
    render(): any;
    private onActionModeChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
