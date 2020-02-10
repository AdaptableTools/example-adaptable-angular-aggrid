import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ICalculatedColumnStrategy } from './Interface/ICalculatedColumnStrategy';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class CalculatedColumnStrategy extends AdaptableStrategyBase implements ICalculatedColumnStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
}
