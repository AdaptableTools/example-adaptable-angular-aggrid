import * as React from 'react';
import { IgrItemLegend } from 'igniteui-react-charts/ES2015/igr-item-legend';
import { IgrDoughnutChart } from 'igniteui-react-charts/ES2015/igr-doughnut-chart';
import { IgrPieChart } from 'igniteui-react-charts/ES2015/igr-pie-chart';
import { SliceClickEventArgs } from 'igniteui-react-charts/ES2015/igr-slice-click-event-args';
import { ChartProperties, PieChartDefinition, ChartData } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { PieChartComponentState } from './PieChartComponentState';
import { SliceLabelOption, SliceSortOption } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
interface PieChartComponentProps {
    CurrentChartDefinition: PieChartDefinition;
    ChartData: ChartData;
    onUpdateChartProperties: (chartUuid: string, chartProperties: ChartProperties) => void;
}
export declare class PieChartComponent extends React.Component<PieChartComponentProps, PieChartComponentState> {
    doughnutChart: IgrDoughnutChart;
    doughnutLegend: IgrItemLegend;
    pieChart: IgrPieChart;
    pieChartLegend: IgrItemLegend;
    constructor(props: PieChartComponentProps);
    UNSAFE_componentWillReceiveProps(nextProps: PieChartComponentProps, nextContext: any): void;
    render(): JSX.Element;
    onDoughnutChartRef(doughnutChart: IgrDoughnutChart): void;
    onPieChartRef(pieChart: IgrPieChart): void;
    onDoughnutLegendRef(legend: IgrItemLegend): void;
    onPieChartLegendRef(legend: IgrItemLegend): void;
    onShowGeneralProperties(): void;
    onHidePropertiesGroup(): void;
    onShowChartSettings(): void;
    onHideChartSettings(): void;
    onSetPropertyDefaults(): void;
    private updateChartProperties;
    private onPieOrDoughnutViewChanged;
    private onOthersCategoryThresholdChanged;
    private onThresholdAsPercentChanged;
    private onSliceLabelsPositionChanged;
    onSliceLabelsMappingChanged(labelMapping: SliceLabelOption): void;
    onSliceSortByColumnChanged(sliceSortOption: SliceSortOption): void;
    onSliceClick(e: SliceClickEventArgs): void;
    getOptionsForLabelsPosition(): {
        label: string;
        value: string;
    }[];
    getOptionsForSliceLabelsMapping(): {
        label: string;
        value: string;
    }[];
    getOptionsForSliceSortOrders(): {
        label: string;
        value: string;
    }[];
}
export {};
