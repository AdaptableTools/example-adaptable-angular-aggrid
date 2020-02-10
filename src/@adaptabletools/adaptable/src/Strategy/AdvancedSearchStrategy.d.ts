import { IAdvancedSearchStrategy } from './Interface/IAdvancedSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class AdvancedSearchStrategy extends AdaptableStrategyBase implements IAdvancedSearchStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
}
