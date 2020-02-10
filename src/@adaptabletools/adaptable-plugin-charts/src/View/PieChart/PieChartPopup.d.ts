import * as React from 'react';
import { StrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import { IgrItemLegend } from 'igniteui-react-charts/ES2015/igr-item-legend';
import { IgrDoughnutChart } from 'igniteui-react-charts/ES2015/igr-doughnut-chart';
import { IgrPieChart } from 'igniteui-react-charts/ES2015/igr-pie-chart';
import { PieChartDefinition, PieChartDataItem } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { SliceSortOption, OthersCategoryType } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
interface PieChartPopupProps extends StrategyViewPopupProps<PieChartPopupComponent> {
}
interface PieChartPopupState {
    PieChartDefinition: PieChartDefinition;
    ErrorMessage: string;
    DataSource: PieChartDataItem[];
    OthersCategoryType: OthersCategoryType;
    OthersCategoryThreshold: number;
    ShowAsDoughnut: boolean;
    SliceLabelsPosition: string;
    SliceLabelsMapping: string;
    SliceLegendMapping: string;
    SliceValuesMapping: string;
    SliceSortOption: SliceSortOption;
    SliceBrushes: string[];
}
declare class PieChartPopupComponent extends React.Component<PieChartPopupProps, PieChartPopupState> {
    doughnutChart: IgrDoughnutChart;
    doughnutLegend: IgrItemLegend;
    pieChart: IgrPieChart;
    pieChartLegend: IgrItemLegend;
    constructor(props: PieChartPopupProps);
    componentDidMount(): void;
    getOptionsForLabelsPosition(): {
        label: string;
        value: string;
    }[];
    SliceValueOptions: string[];
    SliceLabelOptions: string[];
    getOptionsForSliceLabelsMapping(): {
        value: string;
        label: string;
    }[];
    getOptionsForSliceValuesMapping(): {
        value: string;
        label: string;
    }[];
    SliceSorByOptions: string[];
    getOptionsForSliceSortOrders(): {
        value: string;
        label: string;
    }[];
    hasValidDataSelection(): boolean;
    render(): JSX.Element;
    private onDataValueColumnChanged;
    private onDataGroupColumnChanged;
    private updateDataSource;
    onDoughnutChartRef(doughnutChart: IgrDoughnutChart): void;
    onPieChartRef(pieChart: IgrPieChart): void;
    onDoughnutLegendRef(legend: IgrItemLegend): void;
    onPieChartLegendRef(legend: IgrItemLegend): void;
    private onOthersCategoryThresholdChanged;
    private onShowDoughnutChanged;
    private onThresholdAsPercentChanged;
    onSliceLabelsPositionChanged(value: string): void;
    onSliceLabelsMappingChanged(value: string): void;
    onSliceValuesMappingChanged(event: React.FormEvent<any>): void;
    onSliceSortByColumnChanged(value: string): void;
}
export declare let PieChartPopup: import("react-redux").ConnectedComponentClass<typeof PieChartPopupComponent, any>;
export {};
