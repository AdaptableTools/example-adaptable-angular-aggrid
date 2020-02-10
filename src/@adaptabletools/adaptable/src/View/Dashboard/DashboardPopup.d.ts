import * as React from 'react';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { Entitlement } from '../../PredefinedConfig/EntitlementState';
import { GridState } from '../../PredefinedConfig/GridState';
import { DashboardState } from '../../PredefinedConfig/DashboardState';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
interface DashboardPopupComponentProps extends StrategyViewPopupProps<DashboardPopupComponent> {
    DashboardState: DashboardState;
    GridState: GridState;
    Entitlements: Entitlement[];
    onDashboardSetFunctionButtons: (StrategyConstants: string[]) => DashboardRedux.DashboardSetFunctionButtonsAction;
    onDashboardShowFunctionsDropdown: () => DashboardRedux.DashboardShowFunctionsDropdownAction;
    onDashboardHideFunctionsDropdown: () => DashboardRedux.DashboardHideFunctionsDropdownAction;
    onDashboardShowColumnsDropdown: () => DashboardRedux.DashboardShowColumnsDropdownAction;
    onDashboardHideColumnsDropdown: () => DashboardRedux.DashboardHideColumnsDropdownAction;
    onDashboardShowToolbarsDropdown: () => DashboardRedux.DashboardShowToolbarsDropdownAction;
    onDashboardHideToolbarsDropdown: () => DashboardRedux.DashboardHideToolbarsDropdownAction;
    onDashboardShowSystemStatusButton: () => DashboardRedux.DashboardShowSystemStatusButtonAction;
    onDashboardHideSystemStatusButton: () => DashboardRedux.DashboardHideSystemStatusButtonAction;
    onDashboardShowGridInfoButton: () => DashboardRedux.DashboardShowGridInfoButtonAction;
    onDashboardHideGridInfoButton: () => DashboardRedux.DashboardHideGridInfoButtonAction;
    onDashboardSetToolbars: (StrategyConstants: string[]) => DashboardRedux.DashboardSetToolbarsAction;
}
export declare enum DashboardConfigView {
    General = "General",
    Buttons = "Buttons",
    Toolbars = "Toolbars"
}
export interface DashboardPopupState {
    DashboardConfigView: DashboardConfigView;
}
declare class DashboardPopupComponent extends React.Component<DashboardPopupComponentProps, DashboardPopupState> {
    constructor(props: DashboardPopupComponentProps);
    render(): JSX.Element;
    onShowGridPropertiesChanged(event: React.FormEvent<any>): void;
    onShowFunctionsDropdownChanged(checked: boolean): void;
    onShowColumnsDropdownChanged(checked: boolean): void;
    onShowToolbarsDropdownChanged(checked: boolean): void;
    onShowSystemStatusButtonChanged(checked: boolean): void;
    onShowGridInfoButtonChanged(checked: boolean): void;
    onDashboardButtonsChanged(selectedValues: string[]): void;
    onDashboardToolbarsChanged(selectedValues: string[]): void;
    isVisibleStrategy(functionName: AdaptableFunctionName): boolean;
}
export declare let DashboardPopup: import("react-redux").ConnectedComponent<typeof DashboardPopupComponent, any>;
export {};
