import { IShortcutStrategy } from './Interface/IShortcutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class ShortcutStrategy extends AdaptableStrategyBase implements IShortcutStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    private handleKeyDown;
    private CalculateShortcut;
    private applyShortcut;
}
