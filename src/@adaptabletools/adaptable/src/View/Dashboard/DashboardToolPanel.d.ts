import * as React from 'react';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { Visibility } from '../../PredefinedConfig/Common/Enums';
interface DashboardToolPanelComponentProps extends ToolPanelStrategyViewPopupProps<DashboardToolPanelComponentProps> {
    DashboardVisibility: Visibility;
    onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction;
}
interface DashboardToolPanelComponentState {
    IsMinimised: boolean;
}
declare class DashboardToolPanelComponent extends React.Component<DashboardToolPanelComponentProps, DashboardToolPanelComponentState> {
    constructor(props: DashboardToolPanelComponentProps);
    render(): JSX.Element;
}
export declare let DashboardToolPanel: import("react-redux").ConnectedComponent<typeof DashboardToolPanelComponent, any>;
export {};
