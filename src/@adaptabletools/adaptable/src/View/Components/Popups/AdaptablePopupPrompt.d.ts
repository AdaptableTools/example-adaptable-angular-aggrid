import * as React from 'react';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
export interface AdaptablePopupPromptProps extends React.ClassAttributes<AdaptablePopupPrompt> {
    ShowPopup: boolean;
    Header: string;
    Msg: string;
    onClose: () => void;
    onConfirm: Function;
    Adaptable: IAdaptable;
}
export interface AdaptablePopupPromptState {
    PromptText: string;
}
export declare class AdaptablePopupPrompt extends React.Component<AdaptablePopupPromptProps, AdaptablePopupPromptState> {
    constructor(props: AdaptablePopupPromptProps);
    render(): JSX.Element;
    onCloseForm(): void;
    onConfirmmForm(): void;
    changeContent: (e: any) => void;
}
