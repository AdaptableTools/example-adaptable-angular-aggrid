import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptableStyle } from '../../../PredefinedConfig/Common/AdaptableStyle';
import { FormatColumn } from '../../../PredefinedConfig/FormatColumnState';
export interface FormatColumnStyleWizardProps extends AdaptableWizardStepProps<FormatColumn> {
    ColorPalette: string[];
    StyleClassNames: string[];
}
export interface FormatColumnStyleWizardState {
    Style: AdaptableStyle;
}
export declare class FormatColumnStyleWizard extends React.Component<FormatColumnStyleWizardProps, FormatColumnStyleWizardState> implements AdaptableWizardStep {
    constructor(props: FormatColumnStyleWizardProps);
    render(): JSX.Element;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    private onUpdateStyle;
}
