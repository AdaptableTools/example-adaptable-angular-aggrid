import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ICellSummaryStrategy } from './Interface/ICellSummaryStrategy';
import { SelectedCellInfo } from '../PredefinedConfig/Selection/SelectedCellInfo';
import { CellSummmary } from '../PredefinedConfig/Selection/CellSummmary';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
export declare class CellSummaryStrategy extends AdaptableStrategyBase implements ICellSummaryStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
    CreateCellSummary(selectedCellInfo: SelectedCellInfo): CellSummmary;
}
