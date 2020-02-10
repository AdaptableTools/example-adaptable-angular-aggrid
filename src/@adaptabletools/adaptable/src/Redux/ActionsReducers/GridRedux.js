"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.GRID_SELECT_COLUMN = 'GRID_SELECT_COLUMN';
exports.GRID_SET_COLUMNS = 'GRID_SET_COLUMNS';
exports.GRID_ADD_COLUMN = 'GRID_ADD_COLUMN';
exports.GRID_EDIT_COLUMN = 'GRID_EDIT_COLUMN';
exports.GRID_HIDE_COLUMN = 'GRID_HIDE_COLUMN';
exports.GRID_SET_VALUE_LIKE_EDIT = 'GRID_SET_VALUE_LIKE_EDIT';
exports.GRID_SET_VALUE_LIKE_EDIT_BATCH = 'GRID_SET_VALUE_LIKE_EDIT_BATCH';
exports.GRID_SET_SORT = 'GRID_SET_SORT';
exports.GRID_SET_SELECTED_CELLS = 'GRID_SET_SELECTED_CELLS';
exports.GRID_SET_SELECTED_ROWS = 'GRID_SET_SELECTED_ROWS';
exports.GRID_CREATE_CELLS_SUMMARY = 'GRID_CREATE_CELLS_SUMMARY';
exports.GRID_SET_CELLS_SUMMARY = 'GRID_SET_CELLS_SUMMARY';
exports.GRID_QUICK_FILTER_BAR_SHOW = 'GRID_QUICK_FILTER_BAR_SHOW';
exports.GRID_QUICK_FILTER_BAR_HIDE = 'GRID_QUICK_FILTER_BAR_HIDE';
exports.GRID_REFRESH_CELLS = 'GRID_REFRESH_CELLS';
exports.FILTER_FORM_HIDE = 'FILTER_FORM_HIDE';
exports.SET_MAIN_MENUITEMS = 'SET_MAIN_MENUITEMS';
exports.SET_LIVE_REPORT_RUNNING_ON = 'SET_LIVE_REPORT_RUNNING_ON';
exports.SET_LIVE_REPORT_RUNNING_OFF = 'SET_LIVE_REPORT_RUNNING_OFF';
exports.SET_PIVOT_MODE_ON = 'SET_PIVOT_MODE_ON';
exports.SET_PIVOT_MODE_OFF = 'SET_PIVOT_MODE_OFF';
exports.GridSetColumns = function (Columns) { return ({
    type: exports.GRID_SET_COLUMNS,
    Columns: Columns,
}); };
exports.GridAddColumn = function (Column) { return ({
    type: exports.GRID_ADD_COLUMN,
    Column: Column,
}); };
exports.GridEditColumn = function (Column) { return ({
    type: exports.GRID_EDIT_COLUMN,
    Column: Column,
}); };
exports.GridHideColumn = function (ColumnId) { return ({
    type: exports.GRID_HIDE_COLUMN,
    ColumnId: ColumnId,
}); };
exports.GridSetValueLikeEdit = function (DataChangedInfo) { return ({
    type: exports.GRID_SET_VALUE_LIKE_EDIT,
    DataChangedInfo: DataChangedInfo,
}); };
exports.GridSetValueLikeEditBatch = function (DataChangedInfoBatch) { return ({
    type: exports.GRID_SET_VALUE_LIKE_EDIT_BATCH,
    DataChangedInfoBatch: DataChangedInfoBatch,
}); };
exports.GridSelectColumn = function (ColumnId) { return ({
    type: exports.GRID_SELECT_COLUMN,
    ColumnId: ColumnId,
}); };
exports.GridSetSort = function (ColumnSorts) { return ({
    type: exports.GRID_SET_SORT,
    ColumnSorts: ColumnSorts,
}); };
exports.GridSetSelectedCells = function (SelectedCellInfo) { return ({
    type: exports.GRID_SET_SELECTED_CELLS,
    SelectedCellInfo: SelectedCellInfo,
}); };
exports.GridSetSelectedRows = function (SelectedRowInfo) { return ({
    type: exports.GRID_SET_SELECTED_ROWS,
    SelectedRowInfo: SelectedRowInfo,
}); };
exports.GridCreateCellSummary = function () { return ({
    type: exports.GRID_CREATE_CELLS_SUMMARY,
}); };
exports.GridSetCellSummary = function (CellSummary) { return ({
    type: exports.GRID_SET_CELLS_SUMMARY,
    CellSummary: CellSummary,
}); };
exports.GridRefreshCells = function (rows, columnIds) { return ({
    type: exports.GRID_REFRESH_CELLS,
    rows: rows,
    columnIds: columnIds,
}); };
exports.QuickFilterBarShow = function () { return ({
    type: exports.GRID_QUICK_FILTER_BAR_SHOW,
}); };
exports.QuickFilterBarHide = function () { return ({
    type: exports.GRID_QUICK_FILTER_BAR_HIDE,
}); };
exports.FilterFormHide = function () { return ({
    type: exports.FILTER_FORM_HIDE,
}); };
exports.SetLiveReportRunningOn = function () { return ({
    type: exports.SET_LIVE_REPORT_RUNNING_ON,
}); };
exports.SetLiveReportRunningOff = function () { return ({
    type: exports.SET_LIVE_REPORT_RUNNING_OFF,
}); };
exports.SetPivotModeOn = function () { return ({
    type: exports.SET_PIVOT_MODE_ON,
}); };
exports.SetPivotModeOff = function () { return ({
    type: exports.SET_PIVOT_MODE_OFF,
}); };
exports.SetMainMenuItems = function (MenuItems) { return ({
    type: exports.SET_MAIN_MENUITEMS,
    MenuItems: MenuItems,
}); };
var initialGridState = {
    Columns: GeneralConstants_1.EMPTY_ARRAY,
    ColumnSorts: GeneralConstants_1.EMPTY_ARRAY,
    SelectedCellInfo: null,
    SelectedRowInfo: null,
    CellSummary: null,
    IsQuickFilterActive: false,
    MainMenuItems: GeneralConstants_1.EMPTY_ARRAY,
    IsLiveReportRunning: false,
    IsGridInPivotMode: false,
};
exports.GridReducer = function (state, action) {
    if (state === void 0) { state = initialGridState; }
    switch (action.type) {
        case exports.GRID_SET_COLUMNS:
            return Object.assign({}, state, {
                Columns: [].concat(action.Columns),
            });
        case exports.GRID_ADD_COLUMN:
            var actionTypedAdd = action;
            var columns = [].concat(state.Columns);
            columns.push(actionTypedAdd.Column);
            return Object.assign({}, state, { Columns: columns });
        case exports.GRID_EDIT_COLUMN:
            var actioncolumn_1 = action.Column;
            return tslib_1.__assign(tslib_1.__assign({}, state), { Columns: state.Columns.map(function (abObject) {
                    return abObject.Uuid === actioncolumn_1.Uuid ? actioncolumn_1 : abObject;
                }) });
        case exports.GRID_SET_SORT:
            return Object.assign({}, state, { ColumnSorts: action.ColumnSorts });
        case exports.GRID_SET_SELECTED_CELLS:
            return Object.assign({}, state, {
                SelectedCellInfo: action.SelectedCellInfo,
            });
        case exports.GRID_SET_SELECTED_ROWS:
            return Object.assign({}, state, {
                SelectedRowInfo: action.SelectedRowInfo,
            });
        case exports.GRID_SET_CELLS_SUMMARY:
            return Object.assign({}, state, {
                CellSummary: action.CellSummary,
            });
        case exports.GRID_QUICK_FILTER_BAR_SHOW:
            return Object.assign({}, state, { IsQuickFilterActive: true });
        case exports.GRID_QUICK_FILTER_BAR_HIDE:
            return Object.assign({}, state, { IsQuickFilterActive: false });
        case exports.SET_MAIN_MENUITEMS: {
            var actionTyped = action;
            var menuItems = actionTyped.MenuItems.sort(function (a, b) {
                return a.Label < b.Label ? -1 : a.Label > b.Label ? 1 : 0;
            });
            return Object.assign({}, state, { MainMenuItems: menuItems });
        }
        case exports.SET_LIVE_REPORT_RUNNING_ON:
            return Object.assign({}, state, { IsLiveReportRunning: true });
        case exports.SET_LIVE_REPORT_RUNNING_OFF:
            return Object.assign({}, state, { IsLiveReportRunning: false });
        case exports.SET_PIVOT_MODE_ON:
            return Object.assign({}, state, { IsGridInPivotMode: true });
        case exports.SET_PIVOT_MODE_OFF:
            return Object.assign({}, state, { IsGridInPivotMode: false });
        default:
            return state;
    }
};
