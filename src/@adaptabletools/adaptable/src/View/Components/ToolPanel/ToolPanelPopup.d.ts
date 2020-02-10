import * as React from 'react';
import * as ToolPanelRedux from '../../../Redux/ActionsReducers/ToolPanelRedux';
import { StrategyViewPopupProps } from '../../Components/SharedProps/StrategyViewPopupProps';
import { Entitlement } from '../../../PredefinedConfig/EntitlementState';
import { GridState } from '../../../PredefinedConfig/GridState';
import { ToolPanelState } from '../../../PredefinedConfig/ToolPanelState';
import { AdaptableFunctionButtons, AdaptableFunctionName, AdaptableToolPanels } from '../../../PredefinedConfig/Common/Types';
interface ToolPanelPopupComponentProps extends StrategyViewPopupProps<ToolPanelPopupComponent> {
    ToolPanelState: ToolPanelState;
    GridState: GridState;
    Entitlements: Entitlement[] | undefined;
    onToolPanelSetFunctionButtons: (functionButtons: AdaptableFunctionButtons) => ToolPanelRedux.ToolPanelSetFunctionButtonsAction;
    onToolPanelSetToolPanels: (toolPanels: AdaptableToolPanels) => ToolPanelRedux.ToolPanelSetToolPanelsAction;
    onToolPanelShowFunctionsDropdown: () => ToolPanelRedux.ToolPanelShowFunctionsDropdownAction;
    onToolPanelHideFunctionsDropdown: () => ToolPanelRedux.ToolPanelHideFunctionsDropdownAction;
    onToolPanelShowColumnsDropdown: () => ToolPanelRedux.ToolPanelShowColumnsDropdownAction;
    onToolPanelHideColumnsDropdown: () => ToolPanelRedux.ToolPanelHideColumnsDropdownAction;
    onToolPanelShowToolPanelsDropdown: () => ToolPanelRedux.ToolPanelShowToolPanelsDropdownAction;
    onToolPanelHideToolPanelsDropdown: () => ToolPanelRedux.ToolPanelHideToolPanelsDropdownAction;
    onToolPanelShowGridInfoButton: () => ToolPanelRedux.ToolPanelShowGridInfoButtonAction;
    onToolPanelHideGridInfoButton: () => ToolPanelRedux.ToolPanelHideGridInfoButtonAction;
}
export declare enum ToolPanelConfigView {
    General = "General",
    Buttons = "Buttons",
    ToolPanels = "ToolPanels"
}
export interface ToolPanelPopupState {
    ToolPanelConfigView: ToolPanelConfigView;
}
declare class ToolPanelPopupComponent extends React.Component<ToolPanelPopupComponentProps, ToolPanelPopupState> {
    constructor(props: ToolPanelPopupComponentProps);
    render(): JSX.Element;
    onShowGridPropertiesChanged(event: React.FormEvent<any>): void;
    onShowFunctionsDropdownChanged(checked: boolean): void;
    onShowColumnsDropdownChanged(checked: boolean): void;
    onShowToolPanelsDropdownChanged(checked: boolean): void;
    onShowGridInfoButtonChanged(checked: boolean): void;
    onToolPanelButtonsChanged(selectedValues: AdaptableFunctionButtons): void;
    onToolPanelToolPanelsChanged(selectedValues: AdaptableToolPanels): void;
    isVisibleStrategy(functionName: AdaptableFunctionName): boolean;
}
export declare let ToolPanelPopup: import("react-redux").ConnectedComponent<typeof ToolPanelPopupComponent, any>;
export {};
