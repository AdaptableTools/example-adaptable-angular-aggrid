import * as Redux from 'redux';
import { ColumnFilterState, ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
export declare const COLUMN_FILTER_ADD = "COLUMN_FILTER_ADD";
export declare const COLUMN_FILTER_EDIT = "COLUMN_FILTER_EDIT";
export declare const COLUMN_FILTER_SET = "COLUMN_FILTER_SET";
export declare const COLUMN_FILTER_CLEAR_ALL = "COLUMN_FILTER_CLEAR_ALL";
export declare const COLUMN_FILTER_CLEAR = "COLUMN_FILTER_CLEAR";
export interface ColumnFilterAction extends Redux.Action {
    columnFilter: ColumnFilter;
}
export interface ColumnFilterAddAction extends ColumnFilterAction {
}
export interface ColumnFilterEditAction extends ColumnFilterAction {
}
export interface ColumnFilterSetAction extends ColumnFilterAction {
}
export interface ColumnFilterClearAllAction extends Redux.Action {
}
export interface ColumnFilterClearAction extends Redux.Action {
    columnFilter: ColumnFilter;
}
export declare const ColumnFilterAdd: (columnFilter: ColumnFilter) => ColumnFilterAddAction;
export declare const ColumnFilterEdit: (columnFilter: ColumnFilter) => ColumnFilterEditAction;
export declare const ColumnFilterSet: (columnFilter: ColumnFilter) => ColumnFilterSetAction;
export declare const ColumnFilterClearAll: () => ColumnFilterClearAllAction;
export declare const ColumnFilterClear: (columnFilter: ColumnFilter) => ColumnFilterClearAction;
export declare const ColumnFilterReducer: Redux.Reducer<ColumnFilterState>;
