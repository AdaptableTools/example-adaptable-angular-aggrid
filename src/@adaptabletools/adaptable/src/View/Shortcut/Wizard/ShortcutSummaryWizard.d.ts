import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { Shortcut } from '../../../PredefinedConfig/ShortcutState';
export interface ShortcutSummaryWizardProps extends AdaptableWizardStepProps<Shortcut> {
}
export declare class ShortcutSummaryWizard extends React.Component<ShortcutSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ShortcutSummaryWizardProps);
    render(): JSX.Element;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
