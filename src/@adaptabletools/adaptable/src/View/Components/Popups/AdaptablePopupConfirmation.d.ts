import * as React from 'react';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
/**
 * Used when giving the user 2 choices with the option of adding text also
 */
export interface AdaptablePopupConfirmationProps extends React.ClassAttributes<AdaptablePopupConfirmation> {
    ShowPopup: boolean;
    onConfirm: (comment: string) => void;
    onCancel: () => void;
    Header: string;
    Msg: string;
    ConfirmButtonText: string;
    CancelButtonText: string;
    ShowInputBox: boolean;
    MessageType: MessageType;
    Adaptable: IAdaptable;
}
export interface AdaptablePopupConfirmationState {
    PromptText: string;
}
export declare class AdaptablePopupConfirmation extends React.Component<AdaptablePopupConfirmationProps, AdaptablePopupConfirmationState> {
    constructor(props: AdaptablePopupConfirmationProps);
    render(): JSX.Element;
    onCancelForm(): void;
    onConfirmmForm(): void;
    changeContent: (e: any) => void;
    canConfirm(): boolean;
}
