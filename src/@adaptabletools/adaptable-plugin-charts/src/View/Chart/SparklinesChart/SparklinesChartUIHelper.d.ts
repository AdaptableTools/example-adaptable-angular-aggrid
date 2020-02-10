import { SparklinesChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { SparklinesChartComponentState } from './SparklinesChartComponentState';
import { SparklineTypeEnum } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
export declare function setChartDisplayPopupState(chartDefinition: SparklinesChartDefinition): SparklinesChartComponentState;
export declare function getChartTypeOptions(): {
    label: SparklineTypeEnum;
    value: SparklineTypeEnum;
}[];
export declare function getDataProperties(chartData: any): string[];
export declare function getNumericProperties(chartData: any): string[];
export declare const SparklinesChartUIHelper: {
    setChartDisplayPopupState: typeof setChartDisplayPopupState;
    getChartTypeOptions: typeof getChartTypeOptions;
    getDataProperties: typeof getDataProperties;
    getNumericProperties: typeof getNumericProperties;
};
export default SparklinesChartUIHelper;
