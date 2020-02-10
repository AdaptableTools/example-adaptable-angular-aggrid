import { ICellRendererFunc, ColDef, GridOptions, SideBarDef, ToolPanelDef, MenuItemDef, GetContextMenuItemsParams, Column } from '@ag-grid-community/all-modules';
import { IStrategy } from '../Strategy/Interface/IStrategy';
import { PercentBar } from '../PredefinedConfig/PercentBarState';
import { UserMenuItem } from '../PredefinedConfig/UserInterfaceState';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { SparklineColumn } from '../PredefinedConfig/SparklineColumnState';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
/**
 * Adaptable ag-Grid implementation is getting really big and unwieldy
 * So lets put some of the more obvious 'Helper' functions here
 * This is a bit crap - it should take a GridOptions object...
 */
export declare class agGridHelper {
    private adaptable;
    private gridOptions;
    constructor(adaptable: IAdaptable, gridOptions: GridOptions);
    getVendorLightThemeName(): string;
    getVendorDarkThemeName(): string;
    setUpStrategies(): Map<AdaptableFunctionName, IStrategy>;
    TrySetUpNodeIds(): boolean;
    createSparklineCellRendererComp(sparkline: SparklineColumn, adaptableId: string): ICellRendererFunc | void;
    createPercentBarCellRendererFunc(pcr: PercentBar, adaptableId: string): ICellRendererFunc;
    getCleanValue(value: string): string | undefined;
    getRenderedValue(percentBars: PercentBar[], colDef: ColDef, valueToRender: any): any;
    createAdaptableColumnFromVendorColumn(vendorColumn: Column): AdaptableColumn;
    createAdaptableSideBarDefs(showFilterPanel: boolean, showColumnsPanel: boolean): SideBarDef;
    createAdaptableToolPanel(): ToolPanelDef;
    reselectSelectedCells(): void;
    clearRowStyles(): void;
    setUpRowStyles(): void;
    fireSelectionChangedEvent(): void;
    createMenuInfo(params: GetContextMenuItemsParams, column: AdaptableColumn): MenuInfo;
    createAgGridMenuDefFromAdaptableMenu(x: AdaptableMenuItem): MenuItemDef;
    createAgGridMenuDefFromUsereMenu(x: UserMenuItem, menuInfo: MenuInfo): MenuItemDef;
    isColumnReadonly(colDef: ColDef): boolean;
    isColumnSortable(colDef: ColDef): boolean;
    isColumnGroupable(colDef: ColDef): boolean;
    isColumnPivotable(colDef: ColDef): boolean;
    isColumnAggregetable(colDef: ColDef): boolean;
    isColumnFilterable(colDef: ColDef): boolean;
    getColumnDataType(column: Column): 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown';
    private getabColDefValue;
    isModulePresent(moduleName: string): boolean;
    createGroupedColumnCustomSort(colId: string): void;
}
