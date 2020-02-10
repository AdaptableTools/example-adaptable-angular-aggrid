import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { IStateManagementStrategy } from './Interface/IStateManagementStrategy';
export declare class StateManagementStrategy extends AdaptableStrategyBase implements IStateManagementStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
}
