import * as React from 'react';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
/**
 * The most simple of the alert type popups - just shows a message with a close button.  No user action required.
 */
export interface AdaptablePopupAlertProps extends React.ClassAttributes<AdaptablePopupAlert> {
    ShowPopup: boolean;
    onClose: () => void;
    Msg: string;
    Header: string;
    MessageType: MessageType;
    Adaptable: IAdaptable;
}
export declare class AdaptablePopupAlert extends React.Component<AdaptablePopupAlertProps, {}> {
    render(): JSX.Element;
}
