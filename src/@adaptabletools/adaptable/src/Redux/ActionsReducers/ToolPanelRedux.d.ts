import * as Redux from 'redux';
import { ToolPanelState } from '../../PredefinedConfig/ToolPanelState';
import { AdaptableToolPanels, AdaptableToolPanel, AdaptableFunctionButtons } from '../../PredefinedConfig/Common/Types';
export declare const TOOLPANEL_SET_TOOLPANELS = "TOOLPANEL_SET_TOOLPANELS";
export interface ToolPanelSetAvailableToolPanelsAction extends Redux.Action {
    toolPanels: AdaptableToolPanels;
}
export interface ToolPanelSetToolPanelsAction extends Redux.Action {
    toolPanels: AdaptableToolPanels;
}
export interface ToolPanelShowToolPanelAction extends Redux.Action {
    toolPanel: AdaptableToolPanel;
}
export interface ToolPanelHideToolPanelAction extends Redux.Action {
    toolPanel: AdaptableToolPanel;
}
export interface ToolPanelSetFunctionButtonsAction extends Redux.Action {
    functionButtons: AdaptableFunctionButtons;
}
export interface ToolPanelMoveItemAction extends Redux.Action {
    toolPanel: AdaptableToolPanel;
    NewIndex: number;
}
export interface ToolPanelShowGridInfoButtonAction extends Redux.Action {
}
export interface ToolPanelHideGridInfoButtonAction extends Redux.Action {
}
export interface ToolPanelShowFunctionsDropdownAction extends Redux.Action {
}
export interface ToolPanelHideFunctionsDropdownAction extends Redux.Action {
}
export interface ToolPanelShowColumnsDropdownAction extends Redux.Action {
}
export interface ToolPanelHideColumnsDropdownAction extends Redux.Action {
}
export interface ToolPanelShowToolPanelsDropdownAction extends Redux.Action {
}
export interface ToolPanelHideToolPanelsDropdownAction extends Redux.Action {
}
export interface ToolPanelSetToolPanelTitleAction extends Redux.Action {
    Title: string;
}
export declare const ToolPanelSetAvailableToolPanels: (toolPanels: AdaptableToolPanel[]) => ToolPanelSetAvailableToolPanelsAction;
export declare const ToolPanelSetToolPanels: (toolPanels: AdaptableToolPanel[]) => ToolPanelSetToolPanelsAction;
export declare const ToolPanelShowToolPanel: (toolPanel: AdaptableToolPanel) => ToolPanelShowToolPanelAction;
export declare const ToolPanelHideToolPanel: (toolPanel: AdaptableToolPanel) => ToolPanelHideToolPanelAction;
export declare const ToolPanelSetFunctionButtons: (functionButtons: import("../../PredefinedConfig/Common/Types").AdaptableFunctionButton[]) => ToolPanelSetFunctionButtonsAction;
export declare const ToolPanelMoveItem: (toolPanel: AdaptableToolPanel, NewIndex: number) => ToolPanelMoveItemAction;
export declare const ToolPanelShowGridInfoButton: () => ToolPanelShowGridInfoButtonAction;
export declare const ToolPanelHideGridInfoButton: () => ToolPanelHideGridInfoButtonAction;
export declare const ToolPanelShowFunctionsDropdown: () => ToolPanelShowFunctionsDropdownAction;
export declare const ToolPanelHideFunctionsDropdown: () => ToolPanelHideFunctionsDropdownAction;
export declare const ToolPanelShowColumnsDropdown: () => ToolPanelShowColumnsDropdownAction;
export declare const ToolPanelHideColumnsDropdown: () => ToolPanelHideColumnsDropdownAction;
export declare const ToolPanelShowToolPanelsDropdown: () => ToolPanelShowToolPanelsDropdownAction;
export declare const ToolPanelHideToolPanelsDropdown: () => ToolPanelHideToolPanelsDropdownAction;
export declare const ToolPanelSetToolPanelTitle: (Title: string) => ToolPanelSetToolPanelTitleAction;
export declare const ToolPanelReducer: Redux.Reducer<ToolPanelState>;
