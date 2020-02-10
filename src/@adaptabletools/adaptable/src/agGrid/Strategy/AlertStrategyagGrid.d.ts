import { AlertStrategy } from '../../Strategy/AlertStrategy';
import { Adaptable } from '../Adaptable';
import { IAlertStrategy } from '../../Strategy/Interface/IAlertStrategy';
export declare class AlertStrategyagGrid extends AlertStrategy implements IAlertStrategy {
    constructor(adaptable: Adaptable);
    initStyles(): void;
}
