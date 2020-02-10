import * as React from 'react';
import { PanelProps } from '../../../../components/Panel';
export interface PanelToolPanelProps extends PanelProps {
    headerText: string;
    onConfigure: () => void;
    onClose: () => void;
    onMinimiseChanged?: () => void;
    isMinimised: boolean;
    useDefaultPanelStyle?: boolean;
}
export declare class PanelToolPanel extends React.Component<PanelToolPanelProps, {}> {
    static defaultProps: PanelToolPanelProps;
    render(): JSX.Element;
}
