import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import { AlertDefinition } from '../../../PredefinedConfig/AlertState';
export interface AlertTypeWizardProps extends AdaptableWizardStepProps<AlertDefinition> {
}
export interface AlertTypeWizardState {
    MessageType: MessageType;
}
export declare class AlertTypeWizard extends React.Component<AlertTypeWizardProps, AlertTypeWizardState> implements AdaptableWizardStep {
    constructor(props: AlertTypeWizardProps);
    render(): any;
    private onMessageTypeSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
