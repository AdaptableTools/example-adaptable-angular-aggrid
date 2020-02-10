import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ISystemStatusStrategy } from './Interface/ISystemStatusStrategy';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
export declare class SystemStatusStrategy extends AdaptableStrategyBase implements ISystemStatusStrategy {
    private systemStatusState;
    constructor(adaptable: IAdaptable);
    protected setSystemMessage(): void;
    protected InitStateOld(): void;
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
}
