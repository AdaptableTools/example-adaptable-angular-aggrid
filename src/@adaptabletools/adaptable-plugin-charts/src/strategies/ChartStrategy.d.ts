import { AdaptableStrategyBase } from '@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase';
import { IAdaptable } from '@adaptabletools/adaptable/src/AdaptableInterfaces/IAdaptable';
import { IChartStrategy } from './IChartStrategy';
import { DataChangedInfo } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/DataChangedInfo';
import { AdaptableMenuItem } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Menu';
export declare class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {
    private ChartState;
    private SystemState;
    private throttleSetChartData;
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    protected InitState(): void;
    private doChartDefinitionChangesRequireDataUpdate;
    private doCategoryChartDefinitionChangesRequireDataUpdate;
    private doPieChartDefinitionChangesRequireDataUpdate;
    private doSparklinesChartDefinitionChangesRequireDataUpdate;
    protected handleSearchChanged(): void;
    protected handleDataSourceChanged(dataChangedInfo: DataChangedInfo): void;
    private isCurrentChartVisibiilityMaximised;
    private isChartDataChanged;
    private setChartData;
    private clearChartData;
    private GetSystemState;
    private GetChartState;
    private GetColumnState;
    private GetCurrentChartDefinition;
}
