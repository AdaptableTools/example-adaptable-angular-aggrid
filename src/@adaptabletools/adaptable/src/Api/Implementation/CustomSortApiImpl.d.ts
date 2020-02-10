import { ApiBase } from './ApiBase';
import { CustomSortApi } from '../CustomSortApi';
import { CustomSortState, CustomSort } from '../../PredefinedConfig/CustomSortState';
export declare class CustomSortApiImpl extends ApiBase implements CustomSortApi {
    getCustomSortState(): CustomSortState;
    getAllCustomSort(): CustomSort[];
    getCustomSortByColumn(column: string): CustomSort;
    addCustomSort(customSort: CustomSort): void;
    createCustomSort(columnId: string, values: string[]): void;
    editCustomSort(columnId: string, values: string[]): void;
    deleteCustomSort(column: string): void;
    showCustomSortPopup(): void;
}
