import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { GradientColumn } from '../../../PredefinedConfig/GradientColumnState';
export interface GradientColumnSummaryWizardProps extends AdaptableWizardStepProps<GradientColumn> {
}
export declare class GradientColumnSummaryWizard extends React.Component<GradientColumnSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: GradientColumnSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
