import * as Redux from 'redux';
import { CellValidationState, CellValidationRule } from '../../PredefinedConfig/CellValidationState';
export declare const CELL_VALIDATION_ADD = "CELL_VALIDATION_ADD";
export declare const CELL_VALIDATION_EDIT = "CELL_VALIDATION_EDIT";
export declare const CELL_VALIDATION_DELETE = "CELL_VALIDATION_DELETE";
export declare const CELL_VALIDATION_CHANGE_MODE = "CELL_VALIDATION_CHANGE_MODE";
export interface CellValidationAction extends Redux.Action {
    cellValidationRule: CellValidationRule;
}
export interface CellValidationAddAction extends CellValidationAction {
}
export interface CellValidationEditAction extends CellValidationAction {
}
export interface CellValidationDeleteAction extends CellValidationAction {
}
export declare const CellValidationAdd: (cellValidationRule: CellValidationRule) => CellValidationAddAction;
export declare const CellValidationEdit: (cellValidationRule: CellValidationRule) => CellValidationEditAction;
export declare const CellValidationDelete: (cellValidationRule: CellValidationRule) => CellValidationDeleteAction;
export declare const CellValidationReducer: Redux.Reducer<CellValidationState>;
