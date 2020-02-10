import * as React from 'react';
import { IColItem } from '../../UIInterfaces';
import { PanelProps } from '../../../components/Panel';
export interface PanelWithRowProps extends PanelProps {
    colItems: IColItem[];
}
export declare class PanelWithRow extends React.Component<PanelWithRowProps, {}> {
    render(): JSX.Element;
}
