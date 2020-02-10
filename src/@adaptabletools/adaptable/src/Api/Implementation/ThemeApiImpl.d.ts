import { ApiBase } from './ApiBase';
import { ThemeApi } from '../ThemeApi';
import { ThemeState, AdaptableTheme } from '../../PredefinedConfig/ThemeState';
export declare class ThemeApiImpl extends ApiBase implements ThemeApi {
    getThemeState(): ThemeState;
    loadTheme(theme: string): void;
    loadLightTheme(): void;
    loadDarkTheme(): void;
    getCurrentTheme(): string;
    setSystemThemes(systemThemes: AdaptableTheme[]): void;
    setUserThemes(userThemes: AdaptableTheme[]): void;
    getAllSystemTheme(): AdaptableTheme[];
    getAllUserTheme(): AdaptableTheme[];
    getAllTheme(): AdaptableTheme[];
    showThemePopup(): void;
}
