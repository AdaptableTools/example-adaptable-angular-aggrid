import { PlusMinusState, PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
import * as Redux from 'redux';
import { GridCell } from '../../PredefinedConfig/Selection/GridCell';
export declare const PLUS_MINUS_APPLY = "PLUS_MINUS_APPLY";
export declare const PLUS_MINUS_RULE_ADD = "PLUS_MINUS_RULE_ADD";
export declare const PLUS_MINUS_RULE_EDIT = "PLUS_MINUS_RULE_EDIT";
export declare const PLUS_MINUS_RULE_DELETE = "PLUS_MINUS_RULE_DELETE";
export interface PlusMinusApplyAction extends Redux.Action {
    GridCells: GridCell[];
}
export interface PlusMinusRuleAction extends Redux.Action {
    plusMinusRule: PlusMinusRule;
}
export interface PlusMinusRuleAddAction extends PlusMinusRuleAction {
}
export interface PlusMinusRuleEditAction extends PlusMinusRuleAction {
}
export interface PlusMinusRuleDeleteAction extends PlusMinusRuleAction {
}
export declare const PlusMinusApply: (GridCells: GridCell[]) => PlusMinusApplyAction;
export declare const PlusMinusRuleAdd: (plusMinusRule: PlusMinusRule) => PlusMinusRuleAddAction;
export declare const PlusMinusRuleEdit: (plusMinusRule: PlusMinusRule) => PlusMinusRuleEditAction;
export declare const PlusMinusRuleDelete: (plusMinusRule: PlusMinusRule) => PlusMinusRuleDeleteAction;
export declare const PlusMinusReducer: Redux.Reducer<PlusMinusState>;
