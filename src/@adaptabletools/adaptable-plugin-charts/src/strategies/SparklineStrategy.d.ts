import { AdaptableStrategyBase } from '@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase';
import { IAdaptable } from '@adaptabletools/adaptable/src/AdaptableInterfaces/IAdaptable';
import { ISparklineStrategy } from './ISparklineStrategy';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem, MenuInfo } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Menu';
export declare class SparklineStrategy extends AdaptableStrategyBase implements ISparklineStrategy {
    constructor(adaptable: IAdaptable);
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
}
