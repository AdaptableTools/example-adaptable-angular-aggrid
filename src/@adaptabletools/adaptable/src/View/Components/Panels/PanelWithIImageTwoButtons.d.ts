import * as React from 'react';
import { PanelProps } from '../../../components/Panel';
export interface PanelWithImageTwoButtonsProps extends PanelProps {
    firstButtonContent?: React.ReactNode;
    firstButton?: React.ReactElement<any>;
    secondButtonContent?: React.ReactNode;
    secondButton?: React.ReactElement<any>;
    glyphicon?: string;
    infoBody?: any[];
}
export declare class PanelWithImageTwoButtons extends React.Component<PanelWithImageTwoButtonsProps, {}> {
    render(): JSX.Element;
}
