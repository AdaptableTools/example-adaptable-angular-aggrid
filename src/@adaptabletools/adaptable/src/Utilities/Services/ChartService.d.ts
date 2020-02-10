import { IChartService } from './Interface/IChartService';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { CategoryChartDefinition, ChartData, PieChartDefinition, SparklinesChartDefinition } from '../../PredefinedConfig/ChartState';
export declare class ChartService implements IChartService {
    private adaptable;
    constructor(adaptable: IAdaptable);
    BuildCategoryChartData(chartDefinition: CategoryChartDefinition, columns: AdaptableColumn[]): ChartData;
    BuildSparklinesChartData(chartDefinition: SparklinesChartDefinition, columns: AdaptableColumn[]): ChartData;
    private buildYAxisTotal;
    private getXAxisColumnValues;
    private addXAxisFromExpression;
    BuildPieChartData(chartDefinition: PieChartDefinition): ChartData;
    private createNonRangeDataItem;
    private shouldUseRange;
    private getGroupValueTotalForRow;
    private getSingleValueTotalForRow;
}
