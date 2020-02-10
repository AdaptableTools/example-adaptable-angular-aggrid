import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IReminderStrategy } from './Interface/IReminderStrategy';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class ReminderStrategy extends AdaptableStrategyBase implements IReminderStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
}
