import { UpdatedRowStrategy } from '../../Strategy/UpdatedRowStrategy';
import { Adaptable } from '../Adaptable';
import { IUpdatedRowStrategy } from '../../Strategy/Interface/IUpdatedRowStrategy';
export declare class UpdatedRowStrategyagGrid extends UpdatedRowStrategy implements IUpdatedRowStrategy {
    constructor(adaptable: Adaptable);
    initStyles(): void;
}
