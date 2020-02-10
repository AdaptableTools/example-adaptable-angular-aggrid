import * as React from 'react';
import { AdaptableWizardStepProps, AdaptableWizardStep } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { CategoryChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
export interface CategoryChartSettingsWizardProps extends AdaptableWizardStepProps<CategoryChartDefinition> {
    ChartNames: string[];
}
export interface CategoryChartSettingsWizardState {
    Name: string;
    Description: string;
    ErrorMessage: string;
    VisibleRowsOnly: boolean;
}
export declare class CategoryChartSettingsWizard extends React.Component<CategoryChartSettingsWizardProps, CategoryChartSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CategoryChartSettingsWizardProps);
    render(): any;
    onChartNameChange(event: React.FormEvent<any>): void;
    onChartDescriptionChange(event: React.FormEvent<any>): void;
    private onVisibleRowsChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): 1 | 2;
}
