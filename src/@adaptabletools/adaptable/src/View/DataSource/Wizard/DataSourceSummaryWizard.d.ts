import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { DataSource } from '../../../PredefinedConfig/DataSourceState';
export interface DataSourceSummaryWizardProps extends AdaptableWizardStepProps<DataSource> {
}
export declare class DataSourceSummaryWizard extends React.Component<DataSourceSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: DataSourceSummaryWizardProps);
    render(): JSX.Element;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
