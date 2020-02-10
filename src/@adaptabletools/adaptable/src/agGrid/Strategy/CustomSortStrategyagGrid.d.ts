import { CustomSortStrategy } from '../../Strategy/CustomSortStrategy';
import { CustomSort, CustomSortComparerFunction } from '../../PredefinedConfig/CustomSortState';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
export declare class CustomSortStrategyagGrid extends CustomSortStrategy {
    constructor(adaptable: IAdaptable);
    getComparerFunction(customSort: CustomSort): CustomSortComparerFunction;
}
