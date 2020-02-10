import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as AlertRedux from '../../Redux/ActionsReducers/AlertRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
export interface AlertSummaryProps extends StrategySummaryProps<AlertSummaryComponent> {
    Alerts: AlertDefinition[];
    onAddAlert: (Alert: AlertDefinition) => AlertRedux.AlertDefinitionAddAction;
    onEditAlert: (Alert: AlertDefinition) => AlertRedux.AlertDefinitionEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class AlertSummaryComponent extends React.Component<AlertSummaryProps, EditableConfigEntityState> {
    constructor(props: AlertSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(Alert: AlertDefinition): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let AlertSummary: import("react-redux").ConnectedComponent<typeof AlertSummaryComponent, any>;
