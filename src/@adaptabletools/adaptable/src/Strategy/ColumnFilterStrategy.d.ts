import { IColumnFilterStrategy } from './Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
export declare class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
}
