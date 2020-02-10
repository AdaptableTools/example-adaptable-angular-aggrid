import * as Redux from 'redux';
import { GridState } from '../../PredefinedConfig/GridState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SelectedCellInfo } from '../../PredefinedConfig/Selection/SelectedCellInfo';
import { CellSummmary } from '../../PredefinedConfig/Selection/CellSummmary';
import { SelectedRowInfo } from '../../PredefinedConfig/Selection/SelectedRowInfo';
import { AdaptableMenuItem } from '../../PredefinedConfig/Common/Menu';
import { DataChangedInfo } from '../../PredefinedConfig/Common/DataChangedInfo';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
export declare const GRID_SELECT_COLUMN = "GRID_SELECT_COLUMN";
export declare const GRID_SET_COLUMNS = "GRID_SET_COLUMNS";
export declare const GRID_ADD_COLUMN = "GRID_ADD_COLUMN";
export declare const GRID_EDIT_COLUMN = "GRID_EDIT_COLUMN";
export declare const GRID_HIDE_COLUMN = "GRID_HIDE_COLUMN";
export declare const GRID_SET_VALUE_LIKE_EDIT = "GRID_SET_VALUE_LIKE_EDIT";
export declare const GRID_SET_VALUE_LIKE_EDIT_BATCH = "GRID_SET_VALUE_LIKE_EDIT_BATCH";
export declare const GRID_SET_SORT = "GRID_SET_SORT";
export declare const GRID_SET_SELECTED_CELLS = "GRID_SET_SELECTED_CELLS";
export declare const GRID_SET_SELECTED_ROWS = "GRID_SET_SELECTED_ROWS";
export declare const GRID_CREATE_CELLS_SUMMARY = "GRID_CREATE_CELLS_SUMMARY";
export declare const GRID_SET_CELLS_SUMMARY = "GRID_SET_CELLS_SUMMARY";
export declare const GRID_QUICK_FILTER_BAR_SHOW = "GRID_QUICK_FILTER_BAR_SHOW";
export declare const GRID_QUICK_FILTER_BAR_HIDE = "GRID_QUICK_FILTER_BAR_HIDE";
export declare const GRID_REFRESH_CELLS = "GRID_REFRESH_CELLS";
export declare const FILTER_FORM_HIDE = "FILTER_FORM_HIDE";
export declare const SET_MAIN_MENUITEMS = "SET_MAIN_MENUITEMS";
export declare const SET_LIVE_REPORT_RUNNING_ON = "SET_LIVE_REPORT_RUNNING_ON";
export declare const SET_LIVE_REPORT_RUNNING_OFF = "SET_LIVE_REPORT_RUNNING_OFF";
export declare const SET_PIVOT_MODE_ON = "SET_PIVOT_MODE_ON";
export declare const SET_PIVOT_MODE_OFF = "SET_PIVOT_MODE_OFF";
export interface GridSetColumnsAction extends Redux.Action {
    Columns: AdaptableColumn[];
}
export interface GridAddColumnAction extends Redux.Action {
    Column: AdaptableColumn;
}
export interface GridEditColumnAction extends Redux.Action {
    Column: AdaptableColumn;
}
export interface GridHideColumnAction extends Redux.Action {
    ColumnId: string;
}
export interface GridSetValueLikeEditAction extends Redux.Action {
    DataChangedInfo: DataChangedInfo;
}
export interface GridSetValueLikeEditBatchAction extends Redux.Action {
    DataChangedInfoBatch: DataChangedInfo[];
}
export interface GridSelectColumnAction extends Redux.Action {
    ColumnId: string;
}
export interface GridSetSortAction extends Redux.Action {
    ColumnSorts: ColumnSort[];
}
export interface GridSetAdaptableRestrictionsAction extends Redux.Action {
    AdaptableRestrictions: string[];
}
export interface GridSetSelectedCellsAction extends Redux.Action {
    SelectedCellInfo: SelectedCellInfo;
}
export interface GridSetSelectedRowsAction extends Redux.Action {
    SelectedRowInfo: SelectedRowInfo;
}
export interface GridCreateCellSummaryAction extends Redux.Action {
}
export interface GridSetCellSummaryAction extends Redux.Action {
    CellSummary: CellSummmary;
}
export interface GridRefreshCellsAction extends Redux.Action {
    rows: any[];
    columnIds: string[];
}
export interface QuickFilterBarShowAction extends Redux.Action {
}
export interface QuickFilterBarHideAction extends Redux.Action {
}
export interface FilterFormHideAction extends Redux.Action {
}
export interface SetMainMenuItemsAction extends Redux.Action {
    MenuItems: AdaptableMenuItem[];
}
export interface SetLiveReportRunningOnAction extends Redux.Action {
}
export interface SetLiveReportRunningOffAction extends Redux.Action {
}
export interface SetPivotModeOnAction extends Redux.Action {
}
export interface SetPivotModeOffAction extends Redux.Action {
}
export declare const GridSetColumns: (Columns: AdaptableColumn[]) => GridSetColumnsAction;
export declare const GridAddColumn: (Column: AdaptableColumn) => GridAddColumnAction;
export declare const GridEditColumn: (Column: AdaptableColumn) => GridEditColumnAction;
export declare const GridHideColumn: (ColumnId: string) => GridHideColumnAction;
export declare const GridSetValueLikeEdit: (DataChangedInfo: DataChangedInfo) => GridSetValueLikeEditAction;
export declare const GridSetValueLikeEditBatch: (DataChangedInfoBatch: DataChangedInfo[]) => GridSetValueLikeEditBatchAction;
export declare const GridSelectColumn: (ColumnId: string) => GridSelectColumnAction;
export declare const GridSetSort: (ColumnSorts: ColumnSort[]) => GridSetSortAction;
export declare const GridSetSelectedCells: (SelectedCellInfo: SelectedCellInfo) => GridSetSelectedCellsAction;
export declare const GridSetSelectedRows: (SelectedRowInfo: SelectedRowInfo) => GridSetSelectedRowsAction;
export declare const GridCreateCellSummary: () => GridCreateCellSummaryAction;
export declare const GridSetCellSummary: (CellSummary: CellSummmary) => GridSetCellSummaryAction;
export declare const GridRefreshCells: (rows: any[], columnIds: string[]) => GridRefreshCellsAction;
export declare const QuickFilterBarShow: () => QuickFilterBarShowAction;
export declare const QuickFilterBarHide: () => QuickFilterBarHideAction;
export declare const FilterFormHide: () => FilterFormHideAction;
export declare const SetLiveReportRunningOn: () => SetLiveReportRunningOnAction;
export declare const SetLiveReportRunningOff: () => SetLiveReportRunningOffAction;
export declare const SetPivotModeOn: () => SetPivotModeOnAction;
export declare const SetPivotModeOff: () => SetPivotModeOffAction;
export declare const SetMainMenuItems: (MenuItems: AdaptableMenuItem[]) => SetMainMenuItemsAction;
export declare const GridReducer: Redux.Reducer<GridState>;
