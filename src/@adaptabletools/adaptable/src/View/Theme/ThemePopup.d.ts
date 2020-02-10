import * as React from 'react';
import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableTheme } from '../../PredefinedConfig/ThemeState';
interface ThemePopupProps extends StrategyViewPopupProps<ThemePopupComponent> {
    SystemThemes: Array<AdaptableTheme>;
    UserThemes: Array<AdaptableTheme>;
    CurrentTheme: string;
    SelectTheme: (newTheme: string) => ThemeRedux.ThemeSelectAction;
}
declare class ThemePopupComponent extends React.Component<ThemePopupProps, {}> {
    render(): JSX.Element;
    onChangeTheme(value: string): void;
}
export declare let ThemePopup: import("react-redux").ConnectedComponent<typeof ThemePopupComponent, any>;
export {};
