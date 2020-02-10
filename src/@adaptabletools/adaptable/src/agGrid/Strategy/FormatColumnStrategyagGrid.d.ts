import { IFormatColumnStrategy } from '../../Strategy/Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from '../../Strategy/FormatColumnStrategy';
import { Adaptable } from '../Adaptable';
export declare class FormatColumnStrategyagGrid extends FormatColumnStrategy implements IFormatColumnStrategy {
    private adaptableBypass;
    constructor(adaptableBypass: Adaptable);
    initStyles(): void;
}
