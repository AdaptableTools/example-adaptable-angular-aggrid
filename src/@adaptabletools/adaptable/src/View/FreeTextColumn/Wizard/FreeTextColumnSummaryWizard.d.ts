import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { FreeTextColumn } from '../../../PredefinedConfig/FreeTextColumnState';
export interface FreeTextColumnSummaryWizardProps extends AdaptableWizardStepProps<FreeTextColumn> {
}
export declare class FreeTextColumnSummaryWizard extends React.Component<FreeTextColumnSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: FreeTextColumnSummaryWizardProps);
    render(): JSX.Element;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
