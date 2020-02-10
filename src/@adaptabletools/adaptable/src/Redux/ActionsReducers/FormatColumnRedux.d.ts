import { FormatColumnState, FormatColumn } from '../../PredefinedConfig/FormatColumnState';
import * as Redux from 'redux';
export declare const FORMAT_COLUMN_ADD = "FORMAT_COLUMN_ADD";
export declare const FORMAT_COLUMN_EDIT = "FORMAT_COLUMN_EDIT";
export declare const FORMAT_COLUMN_DELETE = "FORMAT_COLUMN_DELETE";
export interface FormatColumnAction extends Redux.Action {
    formatColumn: FormatColumn;
}
export interface FormatColumnAddAction extends FormatColumnAction {
}
export interface FormatColumnEditAction extends FormatColumnAction {
}
export interface FormatColumnDeleteAction extends FormatColumnAction {
}
export declare const FormatColumnAdd: (formatColumn: FormatColumn) => FormatColumnAddAction;
export declare const FormatColumnEdit: (formatColumn: FormatColumn) => FormatColumnEditAction;
export declare const FormatColumnDelete: (formatColumn: FormatColumn) => FormatColumnDeleteAction;
export declare const FormatColumnReducer: Redux.Reducer<FormatColumnState>;
