import * as React from 'react';
import { PanelProps, HeaderProps } from '../../../components/Panel';
export interface PanelWithInfoProps extends PanelProps {
    infoBody: any[];
    headerProps?: HeaderProps;
}
export declare class PanelWithInfo extends React.Component<PanelWithInfoProps, {}> {
    render(): JSX.Element;
}
