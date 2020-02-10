import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IPercentBarStrategy } from './Interface/IPercentBarStrategy';
import { PercentBarState } from '../PredefinedConfig/PercentBarState';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
export declare class PercentBarStrategy extends AdaptableStrategyBase implements IPercentBarStrategy {
    protected PercentBarState: PercentBarState;
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
    protected InitState(): void;
    protected GetPercentBarState(): PercentBarState;
}
