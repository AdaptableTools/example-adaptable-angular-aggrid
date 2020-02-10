import * as Redux from 'redux';
import { UserInterfaceState, RowStyle, UserMenuItem, PermittedValuesColumn } from '../../PredefinedConfig/UserInterfaceState';
export declare const COLOR_PALETTE_SET = "COLOR_PALETTE_SET";
export declare const COLOR_PALETTE_ADD = "COLOR_PALETTE_ADD";
export declare const STYLE_CLASSNAMES_ADD = "STYLE_CLASSNAMES_ADD";
export declare const PERMITTED_VALUES_COLUMN_SET = "PERMITTED_VALUES_COLUMN_SET";
export declare const PERMITTED_VALUES_COLUMN_DELETE = "PERMITTED_VALUES_COLUMN_DELETE";
export declare const ROW_STYLES_CLEAR = "ROW_STYLES_CLEAR";
export declare const ROW_STYLES_SET = "ROW_STYLES_SET";
export declare const CONTEXT_MENU_ITEM_ADD = "CONTEXT_MENU_ITEM_ADD";
export interface ColorPaletteSetAction extends Redux.Action {
    ColorPalette: string[];
}
export interface ColorPaletteAddAction extends Redux.Action {
    ColorPalette: string[];
}
export interface StyleClassNameAddAction extends Redux.Action {
    StyleClassNames: string[];
}
export interface PermittedValuesColumnSetAction extends Redux.Action {
    PermittedValuesColumn: PermittedValuesColumn;
}
export interface PermittedValuesColumnDeleteAction extends Redux.Action {
    Column: string;
}
export interface RowStylesClearAction extends Redux.Action {
}
export interface RowStylesSetAction extends Redux.Action {
    rowStyles: RowStyle[];
}
export interface ContextMenuItemAddAction extends Redux.Action {
    contextMenuItem: UserMenuItem;
}
export declare const ColorPaletteSet: (ColorPalette: string[]) => ColorPaletteSetAction;
export declare const ColorPaletteAdd: (ColorPalette: string[]) => ColorPaletteAddAction;
export declare const StyleClassNamesAdd: (StyleClassNames: string[]) => StyleClassNameAddAction;
export declare const PermittedValuesColumnSet: (PermittedValuesColumn: PermittedValuesColumn) => PermittedValuesColumnSetAction;
export declare const PermittedValuesColumnDelete: (Column: string) => PermittedValuesColumnDeleteAction;
export declare const RowStylesClear: () => RowStylesClearAction;
export declare const RowStylesSet: (rowStyles: RowStyle[]) => RowStylesSetAction;
export declare const ContextMenuItemAdd: (contextMenuItem: UserMenuItem) => ContextMenuItemAddAction;
export declare const UserInterfaceStateReducer: Redux.Reducer<UserInterfaceState>;
