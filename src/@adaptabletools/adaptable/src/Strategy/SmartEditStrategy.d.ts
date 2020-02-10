import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { MathOperation } from '../PredefinedConfig/Common/Enums';
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ISmartEditStrategy } from './Interface/ISmartEditStrategy';
import { IPreviewInfo } from '../Utilities/Interface/IPreview';
import { GridCell } from '../PredefinedConfig/Selection/GridCell';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
export declare class SmartEditStrategy extends AdaptableStrategyBase implements ISmartEditStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
    ApplySmartEdit(newValues: GridCell[]): void;
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): IPreviewInfo;
}
