import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../Strategy/ConditionalStyleStrategy';
import { Adaptable } from '../Adaptable';
import { DataChangedInfo } from '../../PredefinedConfig/Common/DataChangedInfo';
export declare class ConditionalStyleStrategyagGrid extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(adaptable: Adaptable);
    private conditionalStyleColumnIds;
    private columnsForConditionalStyles;
    protected handleDataSourceChanged(dataChangedEvent: DataChangedInfo): void;
    initStyles(): void;
}
