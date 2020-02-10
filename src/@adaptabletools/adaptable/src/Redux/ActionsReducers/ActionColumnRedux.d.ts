import * as Redux from 'redux';
import { ActionColumnState, ActionColumn } from '../../PredefinedConfig/ActionColumnState';
export declare const ACTION_COLUMNS_SET = "ACTION_COLUMNS_SET";
export interface ActionColumnsSetAction extends Redux.Action {
    ActionColumns: ActionColumn[];
}
export declare const ActionColumnsSet: (ActionColumns: ActionColumn[]) => ActionColumnsSetAction;
export declare const ActionColumnReducer: Redux.Reducer<ActionColumnState>;
