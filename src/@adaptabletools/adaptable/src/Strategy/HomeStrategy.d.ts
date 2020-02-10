import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IHomeStrategy } from './Interface/IHomeStrategy';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class HomeStrategy extends AdaptableStrategyBase implements IHomeStrategy {
    constructor(adaptable: IAdaptable);
    addBaseColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[];
}
