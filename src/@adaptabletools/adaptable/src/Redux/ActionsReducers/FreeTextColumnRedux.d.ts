import { FreeTextColumnState, FreeTextColumn, FreeTextStoredValue } from '../../PredefinedConfig/FreeTextColumnState';
import * as Redux from 'redux';
export declare const FREE_TEXT_COLUMN_ADD = "FREE_TEXT_COLUMN_ADD";
export declare const FREE_TEXT_COLUMN_EDIT = "FREE_TEXT_COLUMN_EDIT";
export declare const FREE_TEXT_COLUMN_DELETE = "FREE_TEXT_COLUMN_DELETE";
export declare const FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE = "FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE";
export interface FreeTextColumnAction extends Redux.Action {
    freeTextColumn: FreeTextColumn;
}
export interface FreeTextColumnAddAction extends FreeTextColumnAction {
}
export interface FreeTextColumnEditAction extends FreeTextColumnAction {
}
export interface FreeTextColumnDeleteAction extends FreeTextColumnAction {
}
export interface FreeTextColumnAddEditStoredValueAction extends Redux.Action {
    FreeTextColumn: FreeTextColumn;
    FreeTextStoredValue: FreeTextStoredValue;
}
export declare const FreeTextColumnAdd: (freeTextColumn: FreeTextColumn) => FreeTextColumnAddAction;
export declare const FreeTextColumnEdit: (freeTextColumn: FreeTextColumn) => FreeTextColumnEditAction;
export declare const FreeTextColumnDelete: (freeTextColumn: FreeTextColumn) => FreeTextColumnDeleteAction;
export declare const FreeTextColumnAddEditStoredValue: (FreeTextColumn: FreeTextColumn, FreeTextStoredValue: FreeTextStoredValue) => FreeTextColumnAddEditStoredValueAction;
export declare const FreeTextColumnReducer: Redux.Reducer<FreeTextColumnState>;
