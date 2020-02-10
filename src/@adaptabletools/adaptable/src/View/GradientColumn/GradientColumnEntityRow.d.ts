import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { GradientColumn } from '../../PredefinedConfig/GradientColumnState';
export interface GradientColumnEntityRowProps extends SharedEntityExpressionRowProps<GradientColumnEntityRow> {
    Column: AdaptableColumn;
    ColorPalette: string[];
    onNegativeValueChanged: (GradientColumn: GradientColumn, minimumValue: number) => void;
    onPositiveValueChanged: (GradientColumn: GradientColumn, maximumValue: number) => void;
    onBaseValueChanged: (GradientColumn: GradientColumn, maximumValue: number) => void;
    onPositiveColorChanged: (GradientColumn: GradientColumn, positiveColor: string) => void;
    onNegativeColorChanged: (GradientColumn: GradientColumn, negativeColor: string) => void;
}
export declare class GradientColumnEntityRow extends React.Component<GradientColumnEntityRowProps, {}> {
    render(): any;
    onNegativeValueChanged(event: React.FormEvent<any>): void;
    onPositiveValueChanged(event: React.FormEvent<any>): void;
    onBaseValueChanged(event: React.FormEvent<any>): void;
    onPositiveColorChanged(event: React.FormEvent<any>): void;
    onNegativeColorChanged(event: React.FormEvent<any>): void;
}
