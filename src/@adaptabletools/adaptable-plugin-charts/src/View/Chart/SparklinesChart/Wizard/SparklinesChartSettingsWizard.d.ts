import * as React from 'react';
import { AdaptableWizardStepProps, AdaptableWizardStep } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklinesChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
export interface SparklinesChartSettingsWizardProps extends AdaptableWizardStepProps<SparklinesChartDefinition> {
    ChartNames: string[];
}
export interface SparklinesChartSettingsWizardState {
    Name: string;
    Description: string;
    ErrorMessage: string;
    VisibleRowsOnly: boolean;
}
export declare class SparklinesChartSettingsWizard extends React.Component<SparklinesChartSettingsWizardProps, SparklinesChartSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: SparklinesChartSettingsWizardProps);
    onChartNameChange(event: React.FormEvent<any>): void;
    render(): any;
    onChartDescriptionChange(event: React.FormEvent<any>): void;
    private onVisibleRowsChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): 1 | 2;
}
