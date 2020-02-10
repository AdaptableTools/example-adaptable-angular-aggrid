import { ICellValidationStrategy } from './Interface/ICellValidationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class CellValidationStrategy extends AdaptableStrategyBase implements ICellValidationStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
}
