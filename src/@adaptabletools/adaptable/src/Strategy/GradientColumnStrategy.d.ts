import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IGradientColumnStrategy } from './Interface/IGradientColumnStrategy';
import { GradientColumnState } from '../PredefinedConfig/GradientColumnState';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
export declare class GradientColumnStrategy extends AdaptableStrategyBase implements IGradientColumnStrategy {
    protected GradientColumnState: GradientColumnState;
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
    protected InitState(): void;
    protected GetGradientColumnState(): GradientColumnState;
}
