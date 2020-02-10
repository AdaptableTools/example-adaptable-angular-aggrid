import { CalculatedColumnState, CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
import * as Redux from 'redux';
export declare const CALCULATEDCOLUMN_ADD = "CALCULATEDCOLUMN_ADD";
export declare const CALCULATEDCOLUMN_EDIT = "CALCULATEDCOLUMN_EDIT";
export declare const CALCULATEDCOLUMN_DELETE = "CALCULATEDCOLUMN_DELETE";
export interface CalculatedColumnAction extends Redux.Action {
    calculatedColumn: CalculatedColumn;
}
export interface CalculatedColumnAddAction extends CalculatedColumnAction {
}
export interface CalculatedColumnEditAction extends CalculatedColumnAction {
}
export interface CalculatedColumnDeleteAction extends CalculatedColumnAction {
}
export declare const CalculatedColumnAdd: (calculatedColumn: CalculatedColumn) => CalculatedColumnAddAction;
export declare const CalculatedColumnEdit: (calculatedColumn: CalculatedColumn) => CalculatedColumnEditAction;
export declare const CalculatedColumnDelete: (calculatedColumn: CalculatedColumn) => CalculatedColumnDeleteAction;
export declare const CalculatedColumnReducer: Redux.Reducer<CalculatedColumnState>;
