import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { CustomSort, CustomSortComparerFunction } from '../PredefinedConfig/CustomSortState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { ICustomSortStrategy } from './Interface/ICustomSortStrategy';
export declare class CustomSortStrategy extends AdaptableStrategyBase implements ICustomSortStrategy {
    private CustomSorts;
    constructor(adaptable: IAdaptable);
    protected InitState(): void;
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
    removeCustomSorts(): void;
    applyCustomSorts(): void;
    getComparerFunction(customSort: CustomSort): CustomSortComparerFunction;
}
