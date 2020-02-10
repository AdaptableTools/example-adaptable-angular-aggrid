import * as React from 'react';
import { PanelProps } from '../../../components/Panel';
export interface PanelWithTwoButtonsProps extends PanelProps {
    firstButtonContent?: React.ReactNode;
    firstButton?: React.ReactElement<any>;
    secondButtonContent?: React.ReactNode;
    secondButton?: React.ReactElement<any>;
    headerText: string;
}
export declare class PanelWithTwoButtons extends React.Component<PanelWithTwoButtonsProps, {}> {
    render(): JSX.Element;
}
