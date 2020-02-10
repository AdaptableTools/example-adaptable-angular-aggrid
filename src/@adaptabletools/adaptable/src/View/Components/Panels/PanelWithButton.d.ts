import * as React from 'react';
import { PanelProps } from '../../../components/Panel';
import { BoxProps } from 'rebass';
export interface PanelWithButtonProps extends PanelProps {
    buttonContent?: React.ReactNode;
    buttonClick?: () => void;
    button?: React.ReactElement<any>;
    headerText: string;
    bodyProps?: BoxProps;
    glyphicon?: string;
    buttonDisabled?: boolean;
    buttonStyle?: string;
    borderRadius?: string;
    infoBody?: any[];
}
export declare class PanelWithButton extends React.Component<PanelWithButtonProps & PanelProps, {}> {
    render(): JSX.Element;
}
