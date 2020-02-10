import { PlusMinusRule } from '../PredefinedConfig/PlusMinusState';
import { IPlusMinusStrategy } from './Interface/IPlusMinusStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { GridCell } from '../PredefinedConfig/Selection/GridCell';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class PlusMinusStrategy extends AdaptableStrategyBase implements IPlusMinusStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
    private handleKeyDown;
    applyPlusMinus(plusMinusRules: PlusMinusRule[], cellsToUpdate: GridCell[], side: number): boolean;
    private ShowErrorPreventMessage;
    private ShowWarningMessages;
}
