import * as React from 'react';
import { PanelProps } from '../../../components/Panel';
export interface PanelWithImageThreeButtonsProps extends PanelProps {
    firstButton?: React.ReactElement<any>;
    secondButton?: React.ReactElement<any>;
    thirdButton?: React.ReactElement<any>;
    infoBody?: any[];
}
export declare class PanelWithImageThreeButtons extends React.Component<PanelWithImageThreeButtonsProps, {}> {
    render(): JSX.Element;
}
