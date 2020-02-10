import { ApiBase } from './ApiBase';
import { ChartApi } from '../ChartApi';
import { ChartState, ChartDefinition } from '../../PredefinedConfig/ChartState';
export declare class ChartApiImpl extends ApiBase implements ChartApi {
    getChartState(): ChartState;
    getAllChartDefinitions(): ChartDefinition[];
    showChartPopup(): void;
}
