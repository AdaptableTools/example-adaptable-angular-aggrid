import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ITeamSharingStrategy } from './Interface/ITeamSharingStrategy';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
}
