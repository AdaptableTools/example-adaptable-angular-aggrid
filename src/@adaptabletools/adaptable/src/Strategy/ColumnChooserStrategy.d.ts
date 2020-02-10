import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
export declare class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
}
