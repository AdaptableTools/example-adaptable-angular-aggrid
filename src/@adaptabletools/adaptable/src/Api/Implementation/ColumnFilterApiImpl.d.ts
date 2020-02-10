import { ApiBase } from './ApiBase';
import { ColumnFilterApi } from '../ColumnFilterApi';
import { ColumnFilterState, ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
export declare class ColumnFilterApiImpl extends ApiBase implements ColumnFilterApi {
    getColumnFilterState(): ColumnFilterState;
    setColumnFilter(columnFilters: ColumnFilter[]): void;
    clearColumnFilter(columnFilter: ColumnFilter): void;
    clearColumnFilterByColumns(columns: string[]): void;
    clearColumnFilterByColumn(column: string): void;
    clearAllColumnFilter(): void;
    getAllColumnFilter(): ColumnFilter[];
    getAllColumnFilterForColumn(column: string): ColumnFilter[];
    createColumnFilterForCell(column: string, primarykeyValues: any[]): void;
}
