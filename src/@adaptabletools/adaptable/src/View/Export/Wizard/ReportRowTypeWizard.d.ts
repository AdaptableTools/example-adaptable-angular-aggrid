import { Report } from '../../../PredefinedConfig/ExportState';
import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ReportRowScope } from '../../../PredefinedConfig/Common/Enums';
export interface ReportRowTypeWizardProps extends AdaptableWizardStepProps<Report> {
}
export interface ReportRowsWizardState {
    ReportRowScope: ReportRowScope;
}
export declare class ReportRowTypeWizard extends React.Component<ReportRowTypeWizardProps, ReportRowsWizardState> implements AdaptableWizardStep {
    constructor(props: ReportRowTypeWizardProps);
    render(): JSX.Element;
    private onScopeSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 1 | 2;
    GetIndexStepDecrement(): 1 | 2;
}
