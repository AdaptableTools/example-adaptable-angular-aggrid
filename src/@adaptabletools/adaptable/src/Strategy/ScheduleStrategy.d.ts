import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { IScheduleStrategy } from './Interface/IScheduleStrategy';
export declare class ScheduleStrategy extends AdaptableStrategyBase implements IScheduleStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
}
