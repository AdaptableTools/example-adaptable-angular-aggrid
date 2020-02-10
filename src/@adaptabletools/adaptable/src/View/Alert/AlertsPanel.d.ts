import * as React from 'react';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
export interface AlertsPanelProps extends React.ClassAttributes<AlertsPanel> {
    Alerts: AdaptableAlert[];
    ShowPanel: boolean;
    ShowHeader: boolean;
    onClearAlert: (alert: AdaptableAlert) => void;
    onClearAllAlerts: (alerts: AdaptableAlert[]) => void;
    onRender: () => void;
}
export declare class AlertsPanel extends React.Component<AlertsPanelProps, {}> {
    componentWillUnmount(): void;
    render(): any;
}
