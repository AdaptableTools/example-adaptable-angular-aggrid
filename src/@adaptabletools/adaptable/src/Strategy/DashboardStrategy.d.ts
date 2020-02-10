import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IDashboardStrategy } from './Interface/IDashboardStrategy';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
    private visibleToolbars;
    private dashboardVisibility;
    constructor(adaptable: IAdaptable);
    protected InitState(): void;
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(): AdaptableMenuItem | undefined;
    private fireToolbarVisibilityChangedEvent;
}
