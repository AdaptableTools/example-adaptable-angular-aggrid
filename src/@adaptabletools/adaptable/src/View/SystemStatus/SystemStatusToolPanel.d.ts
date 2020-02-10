import * as React from 'react';
import * as SystemStatusRedux from '../../Redux/ActionsReducers/SystemStatusRedux';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
interface SystemStatusToolPanelProps extends ToolPanelStrategyViewPopupProps<SystemStatusToolPanelComponent> {
    StatusMessage: string;
    StatusType: string;
    DefaultStatusMessage: string;
    DefaultStatusType: string;
    onClearSystemStatus: () => SystemStatusRedux.SystemStatusClearAction;
}
interface SystemStatusToolbarState {
    IsMinimised: boolean;
}
declare class SystemStatusToolPanelComponent extends React.Component<SystemStatusToolPanelProps, SystemStatusToolbarState> {
    constructor(props: SystemStatusToolPanelProps);
    render(): JSX.Element;
}
export declare let SystemStatusToolPanel: import("react-redux").ConnectedComponent<typeof SystemStatusToolPanelComponent, Pick<SystemStatusToolPanelProps, "key" | "ref" | "onClick" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup" | "AdaptableApi">>;
export {};
