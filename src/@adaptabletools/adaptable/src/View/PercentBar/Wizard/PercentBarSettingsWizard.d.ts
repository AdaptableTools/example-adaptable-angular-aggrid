import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { PercentBar } from '../../../PredefinedConfig/PercentBarState';
export interface PercentBarSettingsWizardProps extends AdaptableWizardStepProps<PercentBar> {
}
export interface PercentBarSettingsWizardState {
    ShowValue: boolean;
    ShowTooltip: boolean;
}
export declare class PercentBarSettingsWizard extends React.Component<PercentBarSettingsWizardProps, PercentBarSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PercentBarSettingsWizardProps);
    render(): any;
    private onShowValueChanged;
    private onShowTooltipChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
