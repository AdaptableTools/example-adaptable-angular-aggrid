import * as React from 'react';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
interface AlertToolPanelProps extends ToolPanelStrategyViewPopupProps<AlertToolPanelComponent> {
    AlertDefinitions: AlertDefinition[];
    AdaptableAlerts: AdaptableAlert[];
    onDeleteAlert: (alert: AdaptableAlert) => SystemRedux.SystemAlertDeleteAction;
    onDeleteAllAlert: (alerts: AdaptableAlert[]) => SystemRedux.SystemAlertDeleteAllAction;
}
interface AlertToolbarState {
    ShowMessage: boolean;
    Alerts: AdaptableAlert[];
    IsMinimised: boolean;
}
declare class AlertToolPanelComponent extends React.Component<AlertToolPanelProps, AlertToolbarState> {
    constructor(props: AlertToolPanelProps);
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export declare let AlertToolPanel: import("react-redux").ConnectedComponent<typeof AlertToolPanelComponent, any>;
export {};
