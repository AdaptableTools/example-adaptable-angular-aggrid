import * as React from 'react';
import { PanelProps } from '../../../../components/Panel';
export interface PanelDashboardProps extends PanelProps {
    headerText: string;
    glyphicon: string;
    onClose: () => void;
    onConfigure: () => void;
    onMinimise?: () => void;
    showCloseButton?: boolean;
    showConfigureButton?: boolean;
    showMinimiseButton?: boolean;
    showGlyphIcon?: boolean;
    useDefaultPanelStyle?: boolean;
}
export declare class PanelDashboard extends React.Component<PanelDashboardProps, {}> {
    static defaultProps: PanelDashboardProps;
    render(): JSX.Element;
}
