import * as React from 'react';
import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableTheme } from '../../PredefinedConfig/ThemeState';
interface ThemeToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ThemeToolbarControlComponent> {
    onSelectTheme: (theme: string) => ThemeRedux.ThemeSelectAction;
    SystemThemes: AdaptableTheme[];
    UserThemes: AdaptableTheme[];
    CurrentTheme: string;
}
declare class ThemeToolbarControlComponent extends React.Component<ThemeToolbarControlComponentProps, {}> {
    render(): any;
    private onSelectTheme;
}
export declare let ThemeToolbarControl: import("react-redux").ConnectedComponent<typeof ThemeToolbarControlComponent, any>;
export {};
