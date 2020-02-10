import { IConditionalStyleStrategy } from './Interface/IConditionalStyleStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { DataChangedInfo } from '../PredefinedConfig/Common/DataChangedInfo';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare abstract class ConditionalStyleStrategy extends AdaptableStrategyBase implements IConditionalStyleStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
    protected abstract handleDataSourceChanged(dataChangedEvent: DataChangedInfo): void;
    abstract initStyles(): void;
}
