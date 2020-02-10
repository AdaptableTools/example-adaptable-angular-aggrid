import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptableStyle } from '../../../PredefinedConfig/Common/AdaptableStyle';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
export interface ConditionalStyleStyleWizardProps extends AdaptableWizardStepProps<ConditionalStyle> {
    ColorPalette: string[];
    StyleClassNames: string[];
}
export interface ConditionalStyleStyleWizardState {
    Style: AdaptableStyle;
}
export declare class ConditionalStyleStyleWizard extends React.Component<ConditionalStyleStyleWizardProps, ConditionalStyleStyleWizardState> implements AdaptableWizardStep {
    constructor(props: ConditionalStyleStyleWizardProps);
    render(): JSX.Element;
    private onUpdateStyle;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
