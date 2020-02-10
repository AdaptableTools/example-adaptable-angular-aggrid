import * as React from 'react';
import * as Redux from 'redux';
import * as ToolPanelRedux from '../../../Redux/ActionsReducers/ToolPanelRedux';
import * as SystemRedux from '../../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { IToolPanelParams } from '@ag-grid-community/all-modules';
import { IAdaptable } from '../../../types';
import { Entitlement } from '../../../PredefinedConfig/EntitlementState';
import { AdaptableMenuItem } from '../../../PredefinedConfig/Common/Menu';
import { AdaptableToolPanelContext } from '../../../Utilities/Interface/AdaptableToolPanelContext';
import { AdaptableToolPanels, AdaptableFunctionButtons } from '../../../PredefinedConfig/Common/Types';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
interface AdaptableToolPanelProps {
    Adaptable: IAdaptable;
    TeamSharingActivated?: boolean;
    VisibleToolsPanels: AdaptableToolPanels;
    AvailableToolPanels: AdaptableToolPanels;
    VisibleButtons: AdaptableFunctionButtons;
    ShowFunctionsDropdown: boolean;
    ShowColumnsDropdown: boolean;
    ShowToolPanelsDropdown: boolean;
    ShowGridInfoButton: boolean;
    FunctionEntitlements: Entitlement[];
    MainMenuItems: AdaptableMenuItem[];
    Columns: AdaptableColumn[];
    onClick: (action: Redux.Action) => Redux.Action;
    onNewColumnListOrder: (VisibleColumnList: AdaptableColumn[]) => SystemRedux.SetNewColumnListOrderAction;
    onSetToolPanelVisibility: (toolPanels: AdaptableToolPanels) => ToolPanelRedux.ToolPanelSetToolPanelsAction;
    onShowGridInfo: () => PopupRedux.PopupShowGridInfoAction;
}
export interface AdaptableToolPanelState {
}
declare class AdaptableToolPanelComponent extends React.Component<AdaptableToolPanelProps, AdaptableToolPanelState> {
    constructor(props: AdaptableToolPanelProps);
    render(): any;
    onClickGridInfo(): void;
    onSetColumnVisibility(name: string): void;
    onSetToolPanelVisibility(name: string, checked: boolean): void;
}
export declare const ConnectedAdaptableToolPanel: import("react-redux").ConnectedComponent<typeof AdaptableToolPanelComponent, Pick<AdaptableToolPanelProps, "Adaptable" | "TeamSharingActivated">>;
export declare const AdaptableToolPanelBuilder: (ctx: AdaptableToolPanelContext) => {
    new (): {
        gui: HTMLElement;
        ctx: AdaptableToolPanelContext;
        init(params?: IToolPanelParams): void;
        getGui(): HTMLElement;
        refresh(): void;
    };
};
export {};
