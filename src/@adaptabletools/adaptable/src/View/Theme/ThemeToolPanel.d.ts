import * as React from 'react';
import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux';
import { AdaptableTheme } from '../../PredefinedConfig/ThemeState';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
interface ThemeToolPanelComponentProps extends ToolPanelStrategyViewPopupProps<ThemeToolPanelComponent> {
    onSelectTheme: (theme: string) => ThemeRedux.ThemeSelectAction;
    SystemThemes: AdaptableTheme[];
    UserThemes: AdaptableTheme[];
    CurrentTheme: string;
}
interface ThemeToolPanelComponentState {
    IsMinimised: boolean;
}
declare class ThemeToolPanelComponent extends React.Component<ThemeToolPanelComponentProps, ThemeToolPanelComponentState> {
    constructor(props: ThemeToolPanelComponentProps);
    render(): any;
    private onSelectTheme;
}
export declare let ThemeToolPanel: import("react-redux").ConnectedComponent<typeof ThemeToolPanelComponent, any>;
export {};
