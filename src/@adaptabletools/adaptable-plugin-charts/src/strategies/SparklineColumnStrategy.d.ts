import { AdaptableStrategyBase } from '@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase';
import { IAdaptable } from '@adaptabletools/adaptable/src/AdaptableInterfaces/IAdaptable';
import { ISparklineColumnStrategy } from './ISparklineColumnStrategy';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import { SparklineColumnState } from '@adaptabletools/adaptable/src/PredefinedConfig/SparklineColumnState';
import { AdaptableMenuItem, MenuInfo } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Menu';
export declare class SparklineColumnStrategy extends AdaptableStrategyBase implements ISparklineColumnStrategy {
    protected SparklinesState: SparklineColumnState;
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
    protected InitState(): void;
    protected GetSparklinesState(): SparklineColumnState;
}
