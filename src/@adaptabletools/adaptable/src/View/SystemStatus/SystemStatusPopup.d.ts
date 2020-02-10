import * as React from 'react';
import * as SystemStatusRedux from '../../Redux/ActionsReducers/SystemStatusRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
interface SystemStatusPopupProps extends StrategyViewPopupProps<SystemStatusPopupComponent> {
    StatusMessage: string;
    StatusFurtherInformation: string;
    StatusType: MessageType;
    ShowAlert: boolean;
    onSetSystemStatusShowAlert: (showAlert: boolean) => SystemStatusRedux.SystemStatusSetShowAlertAction;
    onClearSystemStatus: () => SystemStatusRedux.SystemStatusClearAction;
}
interface SystemStatusPopupState {
}
declare class SystemStatusPopupComponent extends React.Component<SystemStatusPopupProps, SystemStatusPopupState> {
    constructor(props: SystemStatusPopupProps);
    onSystemStatusShowAlertChanged(showAlert: boolean): void;
    onSystemStatusClear(): void;
    render(): JSX.Element;
}
export declare let SystemStatusPopup: import("react-redux").ConnectedComponent<typeof SystemStatusPopupComponent, any>;
export {};
