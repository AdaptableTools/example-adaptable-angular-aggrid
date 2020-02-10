import { FlashingCellsStrategy } from '../../Strategy/FlashingCellsStrategy';
import { Adaptable } from '../Adaptable';
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy';
export declare class FlashingCellStrategyagGrid extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(adaptable: Adaptable);
    private currentFlashing;
    initStyles(): void;
}
