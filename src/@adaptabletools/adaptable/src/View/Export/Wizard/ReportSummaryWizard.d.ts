import { Report } from '../../../PredefinedConfig/ExportState';
import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface ReportSummaryWizardProps extends AdaptableWizardStepProps<Report> {
}
export declare class ReportSummaryWizard extends React.Component<ReportSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ReportSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
