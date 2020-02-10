import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IUpdatedRowStrategy } from './Interface/IUpdatedRowStrategy';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { DataChangedInfo } from '../PredefinedConfig/Common/DataChangedInfo';
export declare abstract class UpdatedRowStrategy extends AdaptableStrategyBase implements IUpdatedRowStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
    protected handleDataSourceChanged(dataChangedInfo: DataChangedInfo): void;
    private getChangeDirection;
    abstract initStyles(): void;
}
