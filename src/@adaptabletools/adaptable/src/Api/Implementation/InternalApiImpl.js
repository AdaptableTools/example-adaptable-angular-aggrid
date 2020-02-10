"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var GridRedux = require("../../Redux/ActionsReducers/GridRedux");
var ApiBase_1 = require("./ApiBase");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var InternalApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(InternalApiImpl, _super);
    function InternalApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalApiImpl.prototype.startLiveReport = function (report, pageName, exportDestination) {
        this.dispatchAction(SystemRedux.ReportStartLive(report, pageName, exportDestination));
    };
    InternalApiImpl.prototype.stopLiveReport = function (report, exportDestination) {
        this.dispatchAction(SystemRedux.ReportStopLive(report, exportDestination));
    };
    InternalApiImpl.prototype.getSystemState = function () {
        return this.getAdaptableState().System;
    };
    InternalApiImpl.prototype.getAvailableCalendars = function () {
        return this.getSystemState().AvailableCalendars;
    };
    InternalApiImpl.prototype.setChartData = function (chartData) {
        this.dispatchAction(SystemRedux.ChartSetChartData(chartData));
    };
    InternalApiImpl.prototype.setChartVisibility = function (chartVisbility) {
        this.dispatchAction(SystemRedux.ChartSetChartVisibility(chartVisbility));
    };
    InternalApiImpl.prototype.getSystemReports = function () {
        return this.getSystemState().SystemReports;
    };
    InternalApiImpl.prototype.getLiveReports = function () {
        return this.getSystemState().CurrentLiveReports;
    };
    InternalApiImpl.prototype.getAdaptableAlerts = function () {
        return this.getSystemState().AdaptableAlerts;
    };
    // Popup Redux Actions
    InternalApiImpl.prototype.showPopupConfirmation = function (confirmation) {
        this.dispatchAction(PopupRedux.PopupShowConfirmation(confirmation));
    };
    InternalApiImpl.prototype.showLoadingScreen = function () {
        this.dispatchAction(PopupRedux.PopupShowLoading());
    };
    InternalApiImpl.prototype.hideLoadingScreen = function () {
        this.dispatchAction(PopupRedux.PopupHideLoading());
    };
    InternalApiImpl.prototype.showPopupScreen = function (functionName, componentName, popupParams, popupProps) {
        this.dispatchAction(PopupRedux.PopupShowScreen(functionName, componentName, popupParams, popupProps));
    };
    InternalApiImpl.prototype.hidePopupScreen = function () {
        this.dispatchAction(PopupRedux.PopupHideScreen());
    };
    InternalApiImpl.prototype.setColumns = function (columns) {
        this.dispatchAction(GridRedux.GridSetColumns(columns));
    };
    InternalApiImpl.prototype.setMainMenuItems = function (menuItems) {
        this.dispatchAction(GridRedux.SetMainMenuItems(menuItems));
    };
    InternalApiImpl.prototype.setSelectedCells = function (selectedCellInfo) {
        this.dispatchAction(GridRedux.GridSetSelectedCells(selectedCellInfo));
    };
    InternalApiImpl.prototype.setSelectedRows = function (selectedRowInfo) {
        this.dispatchAction(GridRedux.GridSetSelectedRows(selectedRowInfo));
    };
    InternalApiImpl.prototype.showQuickFilterBar = function () {
        this.dispatchAction(GridRedux.QuickFilterBarShow());
    };
    InternalApiImpl.prototype.setPivotModeOn = function () {
        this.dispatchAction(GridRedux.SetPivotModeOn());
    };
    InternalApiImpl.prototype.setPivotModeOff = function () {
        this.dispatchAction(GridRedux.SetPivotModeOff());
    };
    InternalApiImpl.prototype.isGridInPivotMode = function () {
        return this.getAdaptableState().Grid.IsGridInPivotMode;
    };
    InternalApiImpl.prototype.addAdaptableColumn = function (AdaptableColumn) {
        this.dispatchAction(GridRedux.GridAddColumn(AdaptableColumn));
    };
    InternalApiImpl.prototype.setColumnSorts = function (columnSorts) {
        this.dispatchAction(GridRedux.GridSetSort(columnSorts));
    };
    InternalApiImpl.prototype.getUpdatedRowInfos = function () {
        return this.getSystemState().UpdatedRowInfos;
    };
    InternalApiImpl.prototype.isRowInUpdatedRowInfo = function (primaryKeyValue, changeDirection) {
        var foundUpdatedRowInfo = this.getSystemState().UpdatedRowInfos.find(function (uri) { return uri.primaryKeyValue == primaryKeyValue && uri.changeDirection == changeDirection; });
        return Helper_1.default.objectExists(foundUpdatedRowInfo);
    };
    InternalApiImpl.prototype.getCurrentLiveReports = function () {
        return this.getAdaptableState().System.CurrentLiveReports;
    };
    InternalApiImpl.prototype.isLiveReportRunning = function () {
        return this.getAdaptableState().Grid.IsLiveReportRunning;
    };
    InternalApiImpl.prototype.isOpenFinAvailable = function () {
        return false; // TODO
    };
    InternalApiImpl.prototype.setGridCells = function (gridCells, internalUpdate, validateChange) {
        var _this = this;
        gridCells.forEach(function (gc) {
            _this.setGridCell(gc, internalUpdate, validateChange);
        });
    };
    InternalApiImpl.prototype.setGridCell = function (gridCell, internalUpdate, validateChange) {
        var _this = this;
        var dataChangedInfo = this.createDataChangedInfoFromGridCell(gridCell);
        if (validateChange) {
            if (!this.adaptable.ValidationService.PerformCellValidation(dataChangedInfo)) {
                return;
            }
        }
        var onServerValidationCompleted = function () {
            _this.adaptable.setValue(dataChangedInfo, internalUpdate);
        };
        var mimicPromise = this.adaptable.adaptableOptions.editOptions.validateOnServer
            ? this.adaptable.ValidationService.PerformServerValidation(dataChangedInfo, {
                onServerValidationCompleted: onServerValidationCompleted,
            })
            : onServerValidationCompleted;
        mimicPromise();
    };
    InternalApiImpl.prototype.createDataChangedInfoFromGridCell = function (gridCell) {
        var currentValue = this.adaptable.getDisplayValue(gridCell.primaryKeyValue, gridCell.columnId);
        var currentRowNode = this.adaptable.getRowNodeForPrimaryKey(gridCell.primaryKeyValue);
        var dataChangedInfo = {
            OldValue: currentValue,
            NewValue: gridCell.rawValue,
            ColumnId: gridCell.columnId,
            PrimaryKeyValue: gridCell.primaryKeyValue,
            RowNode: currentRowNode,
        };
        return dataChangedInfo;
    };
    // General way to get to store from inside Adaptable...
    InternalApiImpl.prototype.dispatchReduxAction = function (action) {
        this.dispatchAction(action);
    };
    return InternalApiImpl;
}(ApiBase_1.ApiBase));
exports.InternalApiImpl = InternalApiImpl;
