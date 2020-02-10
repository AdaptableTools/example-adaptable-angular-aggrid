import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IThemeStrategy } from './Interface/IThemeStrategy';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ThemeState } from '../PredefinedConfig/ThemeState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
    private ThemeState;
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    publishThemeChanged(themeState: ThemeState): void;
    protected InitState(): void;
}
