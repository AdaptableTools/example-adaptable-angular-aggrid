import * as React from 'react';
import { SparklinesChartDefinition, ChartProperties, ChartData, SparklineChartProperties } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { SparklinesChartComponentState } from './SparklinesChartComponentState';
interface SparklinesChartComponentProps {
    CurrentChartDefinition: SparklinesChartDefinition;
    ChartData: ChartData;
    onUpdateChartProperties: (chartUuid: string, chartProperties: ChartProperties) => void;
}
export declare class SparklinesChartComponent extends React.Component<SparklinesChartComponentProps, SparklinesChartComponentState> {
    seriesColors: Map<string, string>;
    constructor(props: SparklinesChartComponentProps);
    UNSAFE_componentWillReceiveProps(nextProps: SparklinesChartComponentProps, nextContext: any): void;
    render(): JSX.Element;
    onMinMaxValueChange: (minOrMax: "Minimum" | "Maximum", value: number) => void;
    onSetPropertyDefaults(): void;
    onShowChartSettings(): void;
    onHideChartSettings(): void;
    updateChartProperties(chartProperties: Partial<SparklineChartProperties>): void;
}
export {};
