import { IQuickSearchStrategy } from './Interface/IQuickSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    createQuickSearchRange(): void;
}
