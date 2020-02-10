import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklineColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/SparklineColumnState';
import { DropdownProps } from '@adaptabletools/adaptable/src/components/Dropdown';
import { SparklineTypeEnum } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
export interface SparklineColumnSettingsWizardProps extends AdaptableWizardStepProps<SparklineColumn> {
    ColorPalette: string[];
}
export interface SparklineColumnSettingsWizardState {
    MinimumValue: number;
    MaximumValue: number;
    SparklineType: SparklineTypeEnum;
    UseMinStaticValue: boolean;
    UseMaxStaticValue: boolean;
    UseMinCurrentValue: boolean;
    UseMaxCurrentValue: boolean;
    ShowToolTip: boolean;
    LineColor: string;
}
export declare const SparklineTypeDropdown: ({ value, onChange, ...props }: {
    value: SparklineTypeEnum;
    onChange: (sparklineType: SparklineTypeEnum) => void;
} & Partial<DropdownProps>) => JSX.Element;
export declare class SparklineColumnSettingsWizard extends React.Component<SparklineColumnSettingsWizardProps, SparklineColumnSettingsWizardState> implements AdaptableWizardStep {
    private _prefix;
    constructor(props: SparklineColumnSettingsWizardProps);
    render(): any;
    private onUseMinChanged;
    private onSparklineTypeChange;
    private onBrushColorChange;
    private onShowTooltipChanged;
    private onUseMaxChanged;
    private onMinValueChanged;
    private onMaxValueChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
