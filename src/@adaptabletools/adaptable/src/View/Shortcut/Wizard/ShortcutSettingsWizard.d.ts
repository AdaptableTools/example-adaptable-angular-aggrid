import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { MathOperation } from '../../../PredefinedConfig/Common/Enums';
import { Shortcut } from '../../../PredefinedConfig/ShortcutState';
export interface ShortcutSettingsWizardProps extends AdaptableWizardStepProps<Shortcut> {
    NumericKeysAvailable: Array<string>;
    DateKeysAvailable: Array<string>;
}
export interface ShortcutSettingsWizardState {
    ShortcutKey: string;
    ShortcutResult: any;
    ShortcutOperation: MathOperation;
    IsDynamic: boolean;
}
export declare class ShortcutSettingsWizard extends React.Component<ShortcutSettingsWizardProps, ShortcutSettingsWizardState> implements AdaptableWizardStep {
    changeContent: (e: any) => void;
    constructor(props: ShortcutSettingsWizardProps);
    onClickShortcutOperation(shortcutOperation: MathOperation): void;
    render(): JSX.Element;
    private onShortcutKeyChanged;
    private onShortcutOperationChanged;
    private onDynamicResultChanged;
    private onDynamicSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
