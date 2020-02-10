import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { Layout, PivotDetails } from '../../PredefinedConfig/LayoutState';
import { ILayoutService } from './Interface/ILayoutService';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
export declare class LayoutService implements ILayoutService {
    private adaptable;
    constructor(adaptable: IAdaptable);
    getLayoutDescription(layout: Layout, columns: AdaptableColumn[]): string;
    getColumnSort(columnSorts: ColumnSort[], columns: AdaptableColumn[]): string;
    getSortOrder(sortOrder: 'Ascending' | 'Descending'): string;
    autoSaveLayout(): void;
    isPivotedLayout(pivotDetails: PivotDetails): boolean;
    isLayoutModified(layoutEntity: Layout): boolean;
}
