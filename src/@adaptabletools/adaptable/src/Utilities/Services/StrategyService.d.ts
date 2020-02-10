import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
export interface IStrategyService {
    createAlertDescription(alertDefinition: AlertDefinition, columns: AdaptableColumn[]): string;
    getDistinctColumnValues(columnId: string): number[];
}
export declare class StrategyService implements IStrategyService {
    private adaptable;
    constructor(adaptable: IAdaptable);
    getDistinctColumnValues(columnId: string): number[];
    createAlertDescription(alertDefinition: AlertDefinition, columns: AdaptableColumn[]): string;
}
