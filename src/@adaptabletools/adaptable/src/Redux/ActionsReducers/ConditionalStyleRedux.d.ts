import * as Redux from 'redux';
import { ConditionalStyleState, ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
export declare const CONDITIONAL_STYLE_ADD = "CONDITIONAL_STYLE_ADD";
export declare const CONDITIONAL_STYLE_EDIT = "CONDITIONAL_STYLE_EDIT";
export declare const CONDITIONAL_STYLE_DELETE = "CONDITIONAL_STYLE_DELETE";
export interface ConditionalStyleAction extends Redux.Action {
    conditionalStyle: ConditionalStyle;
}
export interface ConditionalStyleAddAction extends ConditionalStyleAction {
}
export interface ConditionalStyleEditAction extends ConditionalStyleAction {
}
export interface ConditionalStyleDeleteAction extends ConditionalStyleAction {
}
export declare const ConditionalStyleAdd: (conditionalStyle: ConditionalStyle) => ConditionalStyleAction;
export declare const ConditionalStyleEdit: (conditionalStyle: ConditionalStyle) => ConditionalStyleAction;
export declare const ConditionalStyleDelete: (conditionalStyle: ConditionalStyle) => ConditionalStyleAction;
export declare const ConditionalStyleReducer: Redux.Reducer<ConditionalStyleState>;
