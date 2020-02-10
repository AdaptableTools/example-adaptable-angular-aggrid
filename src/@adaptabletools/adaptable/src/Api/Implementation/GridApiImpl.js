"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var GridApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(GridApiImpl, _super);
    function GridApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridApiImpl.prototype.getGridState = function () {
        return this.getAdaptableState().Grid;
    };
    GridApiImpl.prototype.setGridData = function (dataSource) {
        this.adaptable.setDataSource(dataSource);
    };
    GridApiImpl.prototype.updateGridData = function (dataRows, config) {
        this.adaptable.updateRows(dataRows, config);
    };
    GridApiImpl.prototype.addGridData = function (dataRows) {
        this.adaptable.addRows(dataRows);
    };
    GridApiImpl.prototype.deleteGridData = function (dataRows) {
        if (this.checkArrayExists(dataRows)) {
            this.adaptable.deleteRows(dataRows);
        }
    };
    GridApiImpl.prototype.setCellValue = function (columnId, newValue, primaryKeyValue, forceFilter) {
        if (forceFilter === void 0) { forceFilter = false; }
        var gridCell = {
            primaryKeyValue: primaryKeyValue,
            columnId: columnId,
            rawValue: newValue,
            displayValue: newValue,
        };
        this.adaptable.api.internalApi.setGridCell(gridCell, forceFilter, false);
    };
    GridApiImpl.prototype.getColumns = function () {
        return this.getGridState().Columns;
    };
    GridApiImpl.prototype.getSelectedCellInfo = function () {
        return this.getGridState().SelectedCellInfo;
    };
    GridApiImpl.prototype.getSelectedRowInfo = function () {
        return this.getGridState().SelectedRowInfo;
    };
    GridApiImpl.prototype.getVisibleColumns = function () {
        return this.getColumns().filter(function (c) { return c.Visible; });
    };
    GridApiImpl.prototype.getNumericColumns = function () {
        return this.getColumns().filter(function (c) { return c.DataType == Enums_1.DataType.Number; });
    };
    GridApiImpl.prototype.getNumericArrayColumns = function () {
        return this.getColumns().filter(function (c) { return c.DataType == Enums_1.DataType.NumberArray; });
    };
    GridApiImpl.prototype.getDateColumns = function () {
        return this.getColumns().filter(function (c) { return c.DataType == Enums_1.DataType.Date; });
    };
    GridApiImpl.prototype.getStringColumns = function () {
        return this.getColumns().filter(function (c) { return c.DataType == Enums_1.DataType.String; });
    };
    GridApiImpl.prototype.getBooleanColumns = function () {
        return this.getColumns().filter(function (c) { return c.DataType == Enums_1.DataType.Boolean; });
    };
    GridApiImpl.prototype.getColumnsOfType = function (dataType) {
        switch (dataType) {
            case Enums_1.DataType.Boolean:
                return this.getBooleanColumns();
            case Enums_1.DataType.Date:
                return this.getDateColumns();
            case Enums_1.DataType.Number:
                return this.getNumericColumns();
            case Enums_1.DataType.NumberArray:
                return this.getNumericArrayColumns();
            case Enums_1.DataType.String:
                return this.getStringColumns();
            case Enums_1.DataType.All:
            default:
                return this.getColumns();
        }
    };
    GridApiImpl.prototype.getCellDisplayValue = function (primaryKeyValue, columnId) {
        return this.adaptable.getDisplayValue(primaryKeyValue, columnId);
    };
    GridApiImpl.prototype.hideFilterForm = function () {
        this.adaptable.hideFilterForm();
    };
    GridApiImpl.prototype.applyGridFiltering = function () {
        this.adaptable.applyGridFiltering();
    };
    GridApiImpl.prototype.clearGridFiltering = function () {
        this.adaptable.clearGridFiltering();
    };
    GridApiImpl.prototype.getColumnSorts = function () {
        return this.getGridState().ColumnSorts;
    };
    GridApiImpl.prototype.getVendorGrid = function () {
        return this.adaptable.adaptableOptions.vendorGrid;
    };
    GridApiImpl.prototype.getadaptableOptions = function () {
        return this.adaptable.adaptableOptions;
    };
    GridApiImpl.prototype.sortAdaptable = function (columnSorts) {
        this.adaptable.setColumnSort(columnSorts);
        this.adaptable.api.internalApi.setColumnSorts(columnSorts);
    };
    return GridApiImpl;
}(ApiBase_1.ApiBase));
exports.GridApiImpl = GridApiImpl;
