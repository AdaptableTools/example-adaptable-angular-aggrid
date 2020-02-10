import * as Redux from 'redux';
import { Visibility } from '../../PredefinedConfig/Common/Enums';
import { ButtonStyle } from '../../PredefinedConfig/Common/ToolbarButton';
import { AdaptableDashboardToolbars, AdaptableDashboardToolbar, AdaptableFunctionButtons } from '../../PredefinedConfig/Common/Types';
import { DashboardState, CustomToolbar } from '../../PredefinedConfig/DashboardState';
export declare const DASHBOARD_SET_TOOLBARS = "DASHBOARD_SET_TOOLBARS";
export interface DashboardSetAvailableToolbarsAction extends Redux.Action {
    toolbars: AdaptableDashboardToolbars;
}
export interface DashboardSetToolbarsAction extends Redux.Action {
    toolbars: AdaptableDashboardToolbars | string[];
}
export interface DashboardShowToolbarAction extends Redux.Action {
    toolbar: AdaptableDashboardToolbar | string;
}
export interface DashboardHideToolbarAction extends Redux.Action {
    toolbar: AdaptableDashboardToolbar | string;
}
export interface DashboardMoveItemAction extends Redux.Action {
    toolbar: AdaptableDashboardToolbar;
    NewIndex: number;
}
export interface DashboardSetFunctionButtonsAction extends Redux.Action {
    functionButtons: AdaptableFunctionButtons;
}
export interface DashboardSetVisibilityAction extends Redux.Action {
    Visibility: Visibility;
}
export interface DashboardShowSystemStatusButtonAction extends Redux.Action {
}
export interface DashboardHideSystemStatusButtonAction extends Redux.Action {
}
export interface DashboardShowGridInfoButtonAction extends Redux.Action {
}
export interface DashboardHideGridInfoButtonAction extends Redux.Action {
}
export interface DashboardShowFunctionsDropdownAction extends Redux.Action {
}
export interface DashboardHideFunctionsDropdownAction extends Redux.Action {
}
export interface DashboardShowColumnsDropdownAction extends Redux.Action {
}
export interface DashboardHideColumnsDropdownAction extends Redux.Action {
}
export interface DashboardShowToolbarsDropdownAction extends Redux.Action {
}
export interface DashboardHideToolbarsDropdownAction extends Redux.Action {
}
export interface DashboardSetHomeToolbarTitleAction extends Redux.Action {
    Title: string;
}
export interface DashboardSetMinimisedHomeToolbarButtonStyleAction extends Redux.Action {
    ButtonStyle: ButtonStyle;
}
export interface DashboardCustomToolbarEditAction extends Redux.Action {
    customToolbar: CustomToolbar;
}
export declare const DashboardSetAvailableToolbars: (toolbars: AdaptableDashboardToolbar[]) => DashboardSetAvailableToolbarsAction;
export declare const DashboardSetToolbars: (toolbars: string[] | AdaptableDashboardToolbar[]) => DashboardSetToolbarsAction;
export declare const DashboardShowToolbar: (toolbar: string) => DashboardShowToolbarAction;
export declare const DashboardHideToolbar: (toolbar: string) => DashboardHideToolbarAction;
export declare const DashboardMoveItem: (toolbar: AdaptableDashboardToolbar, NewIndex: number) => DashboardMoveItemAction;
export declare const DashboardSetFunctionButtons: (functionButtons: import("../../PredefinedConfig/Common/Types").AdaptableFunctionButton[]) => DashboardSetFunctionButtonsAction;
export declare const DashboardSetVisibility: (Visibility: Visibility) => DashboardSetVisibilityAction;
export declare const DashboardShowSystemStatusButton: () => DashboardShowSystemStatusButtonAction;
export declare const DashboardHideSystemStatusButton: () => DashboardHideSystemStatusButtonAction;
export declare const DashboardShowGridInfoButton: () => DashboardShowGridInfoButtonAction;
export declare const DashboardHideGridInfoButton: () => DashboardHideGridInfoButtonAction;
export declare const DashboardShowFunctionsDropdown: () => DashboardShowFunctionsDropdownAction;
export declare const DashboardHideFunctionsDropdown: () => DashboardHideFunctionsDropdownAction;
export declare const DashboardShowColumnsDropdown: () => DashboardShowColumnsDropdownAction;
export declare const DashboardHideColumnsDropdown: () => DashboardHideColumnsDropdownAction;
export declare const DashboardShowToolbarsDropdown: () => DashboardShowToolbarsDropdownAction;
export declare const DashboardHideToolbarsDropdown: () => DashboardHideToolbarsDropdownAction;
export declare const DashboardSetHomeToolbarTitle: (Title: string) => DashboardSetHomeToolbarTitleAction;
export declare const DashboardSetMinimisedHomeToolbarButtonStyle: (ButtonStyle: ButtonStyle) => DashboardSetMinimisedHomeToolbarButtonStyleAction;
export declare const DashboardCustomToolbarEdit: (customToolbar: CustomToolbar) => DashboardCustomToolbarEditAction;
export declare const DashboardReducer: Redux.Reducer<DashboardState>;
