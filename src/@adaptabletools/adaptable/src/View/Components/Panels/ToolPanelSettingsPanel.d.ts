import * as React from 'react';
import { PanelProps } from '../../../components/Panel';
export interface ToolPanelSettingsPanelProps extends PanelProps {
    button: React.ReactElement<any>;
}
export declare class ToolPanelSettingsPanel extends React.Component<ToolPanelSettingsPanelProps, {}> {
    render(): JSX.Element;
}
