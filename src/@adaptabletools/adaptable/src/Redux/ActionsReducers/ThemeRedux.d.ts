import * as Redux from 'redux';
import { ThemeState, AdaptableTheme } from '../../PredefinedConfig/ThemeState';
export declare const THEME_SELECT = "THEME_SELECT";
export interface ThemeSetSystemThemesAction extends Redux.Action {
    SystemThemes: AdaptableTheme[];
}
export interface ThemeSetUserThemesAction extends Redux.Action {
    UserThemes: AdaptableTheme[];
}
export interface ThemeSelectAction extends Redux.Action {
    Theme: string;
}
export declare const ThemeSetSystemThemes: (SystemThemes: AdaptableTheme[]) => ThemeSetSystemThemesAction;
export declare const ThemeSetUserThemes: (UserThemes: AdaptableTheme[]) => ThemeSetUserThemesAction;
export declare const ThemeSelect: (Theme: string) => ThemeSelectAction;
export declare const ThemeReducer: Redux.Reducer<ThemeState>;
