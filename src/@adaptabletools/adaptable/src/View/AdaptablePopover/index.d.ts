import * as React from 'react';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
export interface AdaptablePopoverProps extends React.ClassAttributes<AdaptablePopover> {
    headerText?: string;
    showEvent?: string;
    hideEvent?: string;
    className?: string;
    bodyText: any[];
    MessageType?: MessageType;
    triggerAction?: string;
    useButton?: boolean;
    tooltipText?: string;
    popoverMinWidth?: number;
}
export declare class AdaptablePopover extends React.Component<AdaptablePopoverProps, {}> {
    render(): JSX.Element;
}
