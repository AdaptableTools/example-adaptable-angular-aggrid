"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants = require("../Constants/GeneralConstants");
var ColumnHelper_1 = require("../Helpers/ColumnHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var AdaptableHelper_1 = require("../Helpers/AdaptableHelper");
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var LayoutService = /** @class */ (function () {
    function LayoutService(adaptable) {
        this.adaptable = adaptable;
        this.adaptable = adaptable;
    }
    LayoutService.prototype.getLayoutDescription = function (layout, columns) {
        var returnString = '';
        returnString += layout.Columns.length + ' Columns; ';
        returnString += '\n';
        returnString += ' Sort: ' + this.getColumnSort(layout.ColumnSorts, columns);
        return returnString;
    };
    LayoutService.prototype.getColumnSort = function (columnSorts, columns) {
        var _this = this;
        if (ArrayExtensions_1.default.IsNullOrEmpty(columnSorts)) {
            return 'None';
        }
        var returnString = '';
        columnSorts.forEach(function (gs) {
            returnString +=
                ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) +
                    _this.getSortOrder(gs.SortOrder);
        });
        return returnString;
    };
    LayoutService.prototype.getSortOrder = function (sortOrder) {
        return sortOrder == Enums_1.SortOrder.Ascending ? ' [asc] ' : ' [desc] ';
    };
    LayoutService.prototype.autoSaveLayout = function () {
        var currentLayoutName = this.adaptable.api.layoutApi.getCurrentLayoutName();
        if (this.adaptable.isInitialised && currentLayoutName != GeneralConstants.DEFAULT_LAYOUT) {
            if (this.adaptable.adaptableOptions.layoutOptions != null &&
                this.adaptable.adaptableOptions.layoutOptions.autoSaveLayouts != null &&
                this.adaptable.adaptableOptions.layoutOptions.autoSaveLayouts) {
                var layout = this.adaptable.api.layoutApi.getCurrentLayout();
                if (layout != null) {
                    var visibleColumns = this.adaptable.api.gridApi.getVisibleColumns();
                    var currentGridVendorInfo = this.adaptable.getVendorGridLayoutInfo(visibleColumns.map(function (vc) { return vc.ColumnId; }));
                    var layoutToSave = {
                        Uuid: layout.Uuid,
                        Name: currentLayoutName,
                        Columns: layout.Columns,
                        ColumnSorts: layout.ColumnSorts,
                        GroupedColumns: layout.GroupedColumns,
                        PivotDetails: layout.PivotDetails,
                        VendorGridInfo: currentGridVendorInfo,
                        AdaptableGridInfo: {
                            CurrentColumns: visibleColumns ? visibleColumns.map(function (x) { return x.ColumnId; }) : [],
                            CurrentColumnSorts: this.adaptable.api.gridApi.getColumnSorts(),
                        },
                    };
                    this.adaptable.api.layoutApi.saveLayout(layoutToSave);
                }
            }
            var columnStateChangedInfo = {
                currentLayout: currentLayoutName,
            };
            var columnStateChangedEventArgs = AdaptableHelper_1.default.createFDC3Message('Column State Changed Args', columnStateChangedInfo);
            this.adaptable.api.eventApi.emit('ColumnStateChanged', columnStateChangedEventArgs);
        }
    };
    LayoutService.prototype.isPivotedLayout = function (pivotDetails) {
        return (pivotDetails != null &&
            (ArrayExtensions_1.default.IsNotNullOrEmpty(pivotDetails.PivotColumns) ||
                ArrayExtensions_1.default.IsNotNullOrEmpty(pivotDetails.AggregationColumns)));
    };
    LayoutService.prototype.isLayoutModified = function (layoutEntity) {
        if (layoutEntity) {
            if (!layoutEntity.VendorGridInfo) {
                return true;
            }
            if (layoutEntity.AdaptableGridInfo) {
                if (layoutEntity.AdaptableGridInfo &&
                    ArrayExtensions_1.default.IsNotNull(layoutEntity.Columns) &&
                    ArrayExtensions_1.default.IsNotNull(layoutEntity.AdaptableGridInfo.CurrentColumns) &&
                    !ArrayExtensions_1.default.areArraysEqualWithOrder(layoutEntity.Columns, layoutEntity.AdaptableGridInfo.CurrentColumns)) {
                    return true;
                }
                if (layoutEntity.AdaptableGridInfo &&
                    ArrayExtensions_1.default.IsNotNull(layoutEntity.ColumnSorts) &&
                    ArrayExtensions_1.default.IsNotNull(layoutEntity.AdaptableGridInfo.CurrentColumnSorts) &&
                    !ArrayExtensions_1.default.areArraysEqualWithOrderandProperties(layoutEntity.ColumnSorts, layoutEntity.AdaptableGridInfo.CurrentColumnSorts)) {
                    return true;
                }
            }
        }
        return true;
    };
    return LayoutService;
}());
exports.LayoutService = LayoutService;
