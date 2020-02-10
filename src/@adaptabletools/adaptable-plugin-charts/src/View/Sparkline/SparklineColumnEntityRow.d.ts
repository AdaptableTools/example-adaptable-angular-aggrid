import * as React from 'react';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import { SharedEntityExpressionRowProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/ConfigEntityRowProps';
import { SparklineColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/SparklineColumnState';
import { SparklineTypeEnum } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
export interface SparklineColumnEntityRowProps extends SharedEntityExpressionRowProps<SparklineColumnEntityRow> {
    Column: AdaptableColumn;
    ColorPalette: string[];
    onSparklineTypeChange: (sparklineColumn: SparklineColumn, sparklineType: SparklineTypeEnum) => void;
    onMinimumValueChanged: (sparklineColumn: SparklineColumn, minimumValue: number) => void;
    onMaximumValueChanged: (sparklineColumn: SparklineColumn, maximumValue: number) => void;
    onLineColorChanged: (sparklineColumn: SparklineColumn, positiveColor: string) => void;
}
export declare class SparklineColumnEntityRow extends React.Component<SparklineColumnEntityRowProps, {}> {
    render(): any;
    onMinimumValueChanged(event: React.FormEvent<any>): void;
    onMaximumValueChanged(event: React.FormEvent<any>): void;
    onLineColorChanged(event: React.FormEvent<any>): void;
}
