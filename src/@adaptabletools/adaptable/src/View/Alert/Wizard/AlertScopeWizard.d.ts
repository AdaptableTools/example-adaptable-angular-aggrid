import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AlertDefinition } from '../../../PredefinedConfig/AlertState';
export interface AlertScopeWizardProps extends AdaptableWizardStepProps<AlertDefinition> {
}
export interface AlertScopeWizardState {
    ShowPopup: boolean;
    HighlightCell: boolean;
    JumpToCell: boolean;
    ShowInDiv: boolean;
}
export declare class AlertScopeWizard extends React.Component<AlertScopeWizardProps, AlertScopeWizardState> implements AdaptableWizardStep {
    constructor(props: AlertScopeWizardProps);
    render(): any;
    private onShowPopupChanged;
    private onHighlightCellChanged;
    private onJumpToCellChanged;
    private onShowInDivChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
