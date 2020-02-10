import * as React from 'react';
import { AdaptableWizardStepProps, AdaptableWizardStep } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { PieChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
export interface PieChartSettingsWizardProps extends AdaptableWizardStepProps<PieChartDefinition> {
    ChartNames: string[];
}
export interface PieChartSettingsWizardState {
    Name: string;
    Description: string;
    VisibleRowsOnly: boolean;
    ErrorMessage: string;
}
export declare class PieChartSettingsWizard extends React.Component<PieChartSettingsWizardProps, PieChartSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PieChartSettingsWizardProps);
    render(): any;
    onChartNameChange(event: React.FormEvent<any>): void;
    onChartDescriptionChange(event: React.FormEvent<any>): void;
    private onVisibleRowsChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
