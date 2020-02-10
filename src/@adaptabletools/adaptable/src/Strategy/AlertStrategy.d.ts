import { IAlertStrategy } from './Interface/IAlertStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { DataChangedInfo } from '../PredefinedConfig/Common/DataChangedInfo';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
export declare abstract class AlertStrategy extends AdaptableStrategyBase implements IAlertStrategy {
    constructor(adaptable: IAdaptable);
    abstract initStyles(): void;
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
    protected handleDataSourceChanged(dataChangedInfo: DataChangedInfo): void;
    private getAlertDefinitionsForDataChange;
    private isAlertTriggered;
}
