import { IColumnCategoryStrategy } from './Interface/IColumnCategoryStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class ColumnCategoryStrategy extends AdaptableStrategyBase implements IColumnCategoryStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
}
