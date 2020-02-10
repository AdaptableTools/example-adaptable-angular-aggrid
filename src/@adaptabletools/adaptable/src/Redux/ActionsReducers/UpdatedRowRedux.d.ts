import * as Redux from 'redux';
import { UpdatedRowState } from '../../PredefinedConfig/UpdatedRowState';
export declare const UPDATED_ROW_ENABLE_DISABLE = "UPDATED_ROW_ENABLE_DISABLE";
export declare const JUMP_TO_ROW_ENABLE_DISABLE = "JUMP_TO_ROW_ENABLE_DISABLE";
export declare const UP_COLOR_SET = "UP_COLOR_SET";
export declare const DOWN_COLOR_SET = "DOWN_COLOR_SET";
export declare const NEUTRAL_COLOR_SET = "NEUTRAL_COLOR_SET";
export declare const MAX_ITEMS_SET = "MAX_ITEMS_SET";
export interface UpdatedRowEnableDisableAction extends Redux.Action {
    shouldEnable: boolean;
}
export interface JumpToRowEnableDisableAction extends Redux.Action {
    shouldEnable: boolean;
}
export interface UpColorSetAction extends Redux.Action {
    upColor: string;
}
export interface DownColorSetAction extends Redux.Action {
    downColor: string;
}
export interface NeutralColorSetAction extends Redux.Action {
    neutralColor: string;
}
export interface MaxItemsSetAction extends Redux.Action {
    maxItems: number;
}
export declare const UpdatedRowEnableDisable: (shouldEnable: boolean) => UpdatedRowEnableDisableAction;
export declare const JumpToRowEnableDisable: (shouldEnable: boolean) => JumpToRowEnableDisableAction;
export declare const UpColorSet: (upColor: string) => UpColorSetAction;
export declare const DownColorSet: (downColor: string) => DownColorSetAction;
export declare const NeutralColorSet: (neutralColor: string) => NeutralColorSetAction;
export declare const MaxItemsSet: (maxItems: number) => MaxItemsSetAction;
export declare const UpdatedRowReducer: Redux.Reducer<UpdatedRowState>;
