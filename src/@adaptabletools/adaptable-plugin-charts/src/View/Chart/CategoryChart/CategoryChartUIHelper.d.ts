import { CategoryChartDefinition, CategoryChartProperties } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { CategoryChartType, AxisAngle, AxisScale } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import { CategoryChartComponentState } from './CategoryChartComponentState';
export declare function setChartDisplayPopupState(chartDefinition: CategoryChartDefinition, columns: AdaptableColumn[]): CategoryChartComponentState;
export declare function createDefaultYAxisTitle(chartDefinition: CategoryChartDefinition, columns: AdaptableColumn[]): string;
export declare function createDefaultXAxisTitle(chartDefinition: CategoryChartDefinition, columns: AdaptableColumn[]): string;
export declare function setDefaultChartDisplayPopupState(): CategoryChartComponentState;
export declare function getChartTypeOptions(): {
    label: CategoryChartType;
    value: CategoryChartType;
}[];
export declare function getToolTipOptions(): {
    label: string;
    value: string;
}[];
export declare function getCrossHairModeOptions(): {
    label: string;
    value: string;
}[];
export declare function getAlignmentOptions(): {
    label: string;
    value: string;
}[];
export declare function getMarkerTypeOptions(): {
    label: string;
    value: string;
}[];
export declare function getMarkerFromProps(chartProps: CategoryChartProperties): string;
export declare function getYAxisLabelsLocations(): {
    label: string;
    value: string;
}[];
export declare function getXAxisLabelsLocations(): JSX.Element[];
export declare function getAxisAngleOptions(): {
    label: string;
    value: string;
}[];
export declare function getAxisLabelScales(): {
    label: AxisScale;
    value: AxisScale;
}[];
export declare function getCalloutTypeOptions(): {
    label: string;
    value: string;
}[];
export declare function getAngleFromEnum(axisAngle: AxisAngle): number;
export declare function getDataProperties(chartData: any): string[];
export declare function getNumericProperties(chartData: any): string[];
export declare function getCalloutsData(chartData: any, chartProps: CategoryChartProperties): any[];
export declare function getCalloutsDataRanges(chartData: any, numericProps: string[]): any[];
export declare function getCalloutsDataChanges(chartData: any, numericProps: string[], showPercentages: boolean): any[];
export declare function getCalloutsDataPoints(chartData: any, numericProps: string[]): any[];
export declare const CategoryChartUIHelper: {
    setChartDisplayPopupState: typeof setChartDisplayPopupState;
    createDefaultYAxisTitle: typeof createDefaultYAxisTitle;
    createDefaultXAxisTitle: typeof createDefaultXAxisTitle;
    setDefaultChartDisplayPopupState: typeof setDefaultChartDisplayPopupState;
    getChartTypeOptions: typeof getChartTypeOptions;
    getToolTipOptions: typeof getToolTipOptions;
    getCrossHairModeOptions: typeof getCrossHairModeOptions;
    getAlignmentOptions: typeof getAlignmentOptions;
    getMarkerTypeOptions: typeof getMarkerTypeOptions;
    getMarkerFromProps: typeof getMarkerFromProps;
    getYAxisLabelsLocations: typeof getYAxisLabelsLocations;
    getXAxisLabelsLocations: typeof getXAxisLabelsLocations;
    getAxisAngleOptions: typeof getAxisAngleOptions;
    getAxisLabelScales: typeof getAxisLabelScales;
    getCalloutTypeOptions: typeof getCalloutTypeOptions;
    getAngleFromEnum: typeof getAngleFromEnum;
    getDataProperties: typeof getDataProperties;
    getNumericProperties: typeof getNumericProperties;
    getCalloutsData: typeof getCalloutsData;
    getCalloutsDataRanges: typeof getCalloutsDataRanges;
    getCalloutsDataChanges: typeof getCalloutsDataChanges;
    getCalloutsDataPoints: typeof getCalloutsDataPoints;
};
export default CategoryChartUIHelper;
