import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { PercentBar } from '../../PredefinedConfig/PercentBarState';
export interface PercentBarEntityRowProps extends SharedEntityExpressionRowProps<PercentBarEntityRow> {
    Column: AdaptableColumn;
    ColorPalette: string[];
    onMinimumValueChanged: (PercentBar: PercentBar, minimumValue: number) => void;
    onMaximumValueChanged: (PercentBar: PercentBar, maximumValue: number) => void;
    onPositiveColorChanged: (PercentBar: PercentBar, positiveColor: string) => void;
    onNegativeColorChanged: (PercentBar: PercentBar, negativeColor: string) => void;
}
export declare class PercentBarEntityRow extends React.Component<PercentBarEntityRowProps, {}> {
    render(): any;
    onMinimumValueChanged(event: React.FormEvent<any>): void;
    onMaximumValueChanged(event: React.FormEvent<any>): void;
    onPositiveColorChanged(event: React.FormEvent<any>): void;
    onNegativeColorChanged(event: React.FormEvent<any>): void;
}
