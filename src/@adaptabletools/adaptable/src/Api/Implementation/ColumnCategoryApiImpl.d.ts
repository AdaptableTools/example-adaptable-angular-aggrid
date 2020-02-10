import { ApiBase } from './ApiBase';
import { ColumnCategoryApi } from '../ColumnCategoryApi';
import { ColumnCategoryState, ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
export declare class ColumnCategoryApiImpl extends ApiBase implements ColumnCategoryApi {
    getColumnCategoryState(): ColumnCategoryState;
    getAllColumnCategory(): ColumnCategory[];
    getColumnCategoryById(columnCategoryId: string): ColumnCategory;
    addColumnCategory(columnCategory: ColumnCategory): void;
    createColumnCategory(columnCategoryId: string, columns: string[]): void;
    editColumnCategory(columnCategory: ColumnCategory): void;
    addColumnsToColumnCategory(columnCategoryId: string, columns: string[]): void;
    removeColumnsFromColumnCategory(columnCategoryId: string, columns: string[]): void;
    deleteColumnCategory(columnCategoryId: string): void;
    showColumnCategoryPopup(): void;
}
