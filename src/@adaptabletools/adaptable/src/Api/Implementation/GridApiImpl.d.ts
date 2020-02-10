import { ApiBase } from './ApiBase';
import { GridApi } from '../GridApi';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { GridState } from '../../PredefinedConfig/GridState';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { SelectedCellInfo } from '../../PredefinedConfig/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../../PredefinedConfig/Selection/SelectedRowInfo';
import { AdaptableOptions } from '../../types';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
export declare class GridApiImpl extends ApiBase implements GridApi {
    getGridState(): GridState;
    setGridData(dataSource: any): void;
    updateGridData(dataRows: any[], config?: {
        batchUpdate?: boolean;
        callback?: (res: any) => void;
    }): void;
    addGridData(dataRows: any[]): void;
    deleteGridData(dataRows: any[]): void;
    setCellValue(columnId: string, newValue: any, primaryKeyValue: any, forceFilter?: boolean): void;
    getColumns(): AdaptableColumn[];
    getSelectedCellInfo(): SelectedCellInfo;
    getSelectedRowInfo(): SelectedRowInfo;
    getVisibleColumns(): AdaptableColumn[];
    getNumericColumns(): AdaptableColumn[];
    getNumericArrayColumns(): AdaptableColumn[];
    getDateColumns(): AdaptableColumn[];
    getStringColumns(): AdaptableColumn[];
    getBooleanColumns(): AdaptableColumn[];
    getColumnsOfType(dataType: DataType): AdaptableColumn[];
    getCellDisplayValue(primaryKeyValue: any, columnId: string): string;
    hideFilterForm(): void;
    applyGridFiltering(): void;
    clearGridFiltering(): void;
    getColumnSorts(): ColumnSort[];
    getVendorGrid(): any;
    getadaptableOptions(): AdaptableOptions;
    sortAdaptable(columnSorts: ColumnSort[]): void;
}
