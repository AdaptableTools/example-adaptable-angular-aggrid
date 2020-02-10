import { ILayoutStrategy } from './Interface/ILayoutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { LayoutState } from '../PredefinedConfig/LayoutState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
    CurrentLayout: string;
    protected LayoutState: LayoutState;
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
}
