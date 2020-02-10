import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IBulkUpdateStrategy, BulkUpdateValidationResult } from './Interface/IBulkUpdateStrategy';
import { IPreviewInfo } from '../Utilities/Interface/IPreview';
import { GridCell } from '../PredefinedConfig/Selection/GridCell';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
export declare class BulkUpdateStrategy extends AdaptableStrategyBase implements IBulkUpdateStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
    applyBulkUpdate(newValues: GridCell[]): void;
    checkCorrectCellSelection(): BulkUpdateValidationResult;
    buildPreviewValues(bulkUpdateValue: any): IPreviewInfo;
}
