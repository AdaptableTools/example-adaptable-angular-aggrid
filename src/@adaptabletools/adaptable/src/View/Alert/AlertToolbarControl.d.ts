import * as React from 'react';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
interface AlertToolbarControlProps extends ToolbarStrategyViewPopupProps<AlertToolbarControlComponent> {
    AlertDefinitions: AlertDefinition[];
    AdaptableAlerts: AdaptableAlert[];
    onDeleteAlert: (alert: AdaptableAlert) => SystemRedux.SystemAlertDeleteAction;
    onDeleteAllAlert: (alerts: AdaptableAlert[]) => SystemRedux.SystemAlertDeleteAllAction;
}
interface AlertToolbarState {
    ShowMessage: boolean;
    Alerts: AdaptableAlert[];
}
declare class AlertToolbarControlComponent extends React.Component<AlertToolbarControlProps, AlertToolbarState> {
    constructor(props: AlertToolbarControlProps);
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export declare let AlertToolbarControl: import("react-redux").ConnectedComponent<typeof AlertToolbarControlComponent, any>;
export {};
