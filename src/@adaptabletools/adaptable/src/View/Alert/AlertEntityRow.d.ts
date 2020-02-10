import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import { IStrategyService } from '../../Utilities/Services/StrategyService';
export interface AlertEntityRowProps extends SharedEntityExpressionRowProps<AlertEntityRow> {
    Column: AdaptableColumn;
    onChangeMessageType: (alertDefinition: AlertDefinition, Type: MessageType) => void;
    StrategyService: IStrategyService;
}
export declare class AlertEntityRow extends React.Component<AlertEntityRowProps, {}> {
    render(): any;
    setExpressionDescription(Alert: AlertDefinition): string;
    private getColumnandRule;
    onMessageTypeChanged(alertDefinition: AlertDefinition, value: MessageType): void;
}
