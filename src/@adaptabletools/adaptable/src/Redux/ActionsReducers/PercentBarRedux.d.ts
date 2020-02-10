import { PercentBarState, PercentBar } from '../../PredefinedConfig/PercentBarState';
import * as Redux from 'redux';
export declare const PERCENT_BAR_ADD = "PERCENT_BAR_ADD";
export declare const PERCENT_BAR_EDIT = "PERCENT_BAR_EDIT";
export declare const PERCENT_BAR_DELETE = "PERCENT_BAR_DELETE";
export interface PercentBarAction extends Redux.Action {
    percentBar: PercentBar;
}
export interface PercentBarAddAction extends PercentBarAction {
}
export interface PercentBarEditAction extends PercentBarAction {
}
export interface PercentBarDeleteAction extends PercentBarAction {
}
export declare const PercentBarAdd: (percentBar: PercentBar) => PercentBarAddAction;
export declare const PercentBarEdit: (percentBar: PercentBar) => PercentBarEditAction;
export declare const PercentBarDelete: (percentBar: PercentBar) => PercentBarDeleteAction;
export declare const PercentBarReducer: Redux.Reducer<PercentBarState>;
