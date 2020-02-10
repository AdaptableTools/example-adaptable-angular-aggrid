import { ShortcutState, Shortcut } from '../../PredefinedConfig/ShortcutState';
import * as Redux from 'redux';
import { GridCell } from '../../PredefinedConfig/Selection/GridCell';
export declare const SHORTCUT_APPLY = "SHORTCUT_APPLY";
export declare const SHORTCUT_ADD = "SHORTCUT_ADD";
export declare const SHORTCUT_EDIT = "SHORTCUT_EDIT";
export declare const SHORTCUT_DELETE = "SHORTCUT_DELETE";
export interface ShortcutApplyAction extends Redux.Action {
    Shortcut: Shortcut;
    GridCell: GridCell;
    KeyEventString: string;
    NewValue: any;
}
export interface ShortcutAction extends Redux.Action {
    shortcut: Shortcut;
}
export interface ShortcutAddAction extends ShortcutAction {
}
export interface ShortcutEditAction extends ShortcutAction {
}
export interface ShortcutDeleteAction extends ShortcutAction {
}
export declare const ShortcutApply: (Shortcut: Shortcut, GridCell: GridCell, KeyEventString: string, NewValue: any) => ShortcutApplyAction;
export declare const ShortcutAdd: (shortcut: Shortcut) => ShortcutAddAction;
export declare const ShortcutEdit: (shortcut: Shortcut) => ShortcutEditAction;
export declare const ShortcutDelete: (shortcut: Shortcut) => ShortcutDeleteAction;
export declare const ShortcutReducer: Redux.Reducer<ShortcutState>;
