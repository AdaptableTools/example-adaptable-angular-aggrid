import * as React from 'react';
import { DialogProps } from './Dialog';
/**
 * This is the main popup that we use - so all function popups will appear here.
 */
export interface IPopupWithFooterProps extends DialogProps {
    showModal: boolean;
    onHide?: () => void;
    modal?: boolean;
    footer: React.ReactNode;
    children: React.ReactNode;
}
export declare class PopupWithFooter extends React.Component<IPopupWithFooterProps, {}> {
    render(): JSX.Element;
}
