import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { FormatColumn } from '../../../PredefinedConfig/FormatColumnState';
export interface FormatColumnSummaryWizardProps extends AdaptableWizardStepProps<FormatColumn> {
}
export declare class FormatColumnSummaryWizard extends React.Component<FormatColumnSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: FormatColumnSummaryWizardProps);
    render(): JSX.Element;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
