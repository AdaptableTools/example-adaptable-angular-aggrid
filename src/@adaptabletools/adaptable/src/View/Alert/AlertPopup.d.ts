import * as React from 'react';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as AlertRedux from '../../Redux/ActionsReducers/AlertRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
interface AlertPopupProps extends StrategyViewPopupProps<AlertPopupComponent> {
    AlertDefinitions: AlertDefinition[];
    onAddAlert: (Alert: AlertDefinition) => AlertRedux.AlertDefinitionAddAction;
    onEditAlert: (Alert: AlertDefinition) => AlertRedux.AlertDefinitionEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class AlertPopupComponent extends React.Component<AlertPopupProps, EditableConfigEntityState> {
    constructor(props: AlertPopupProps);
    componentDidMount(): void;
    render(): JSX.Element;
    createAlertDefinition(): void;
    onMessageTypeChanged(alertDefinition: AlertDefinition, messageType: MessageType): void;
    onEdit(alert: AlertDefinition): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let AlertPopup: import("react-redux").ConnectedComponent<typeof AlertPopupComponent, any>;
export {};
