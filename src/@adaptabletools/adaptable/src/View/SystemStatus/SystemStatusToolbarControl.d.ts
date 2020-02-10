import * as React from 'react';
import * as SystemStatusRedux from '../../Redux/ActionsReducers/SystemStatusRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
interface SystemStatusToolbarControlProps extends ToolbarStrategyViewPopupProps<SystemStatusToolbarControlComponent> {
    StatusMessage: string;
    StatusType: string;
    DefaultStatusMessage: string;
    DefaultStatusType: string;
    onClearSystemStatus: () => SystemStatusRedux.SystemStatusClearAction;
}
interface SystemStatusToolbarState {
}
declare class SystemStatusToolbarControlComponent extends React.Component<SystemStatusToolbarControlProps, SystemStatusToolbarState> {
    constructor(props: SystemStatusToolbarControlProps);
    render(): JSX.Element;
}
export declare let SystemStatusToolbarControl: import("react-redux").ConnectedComponent<typeof SystemStatusToolbarControlComponent, Pick<SystemStatusToolbarControlProps, "key" | "ref" | "onClick" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
