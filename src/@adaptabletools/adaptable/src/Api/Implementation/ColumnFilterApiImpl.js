"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ColumnFilterRedux = require("../../Redux/ActionsReducers/ColumnFilterRedux");
var ApiBase_1 = require("./ApiBase");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var ColumnFilterApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnFilterApiImpl, _super);
    function ColumnFilterApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnFilterApiImpl.prototype.getColumnFilterState = function () {
        return this.getAdaptableState().ColumnFilter;
    };
    ColumnFilterApiImpl.prototype.setColumnFilter = function (columnFilters) {
        var _this = this;
        columnFilters.forEach(function (columnFilter) {
            if (_this.getAllColumnFilter().find(function (cf) { return cf.ColumnId == columnFilter.ColumnId; })) {
                _this.dispatchAction(ColumnFilterRedux.ColumnFilterEdit(columnFilter));
            }
            else {
                _this.dispatchAction(ColumnFilterRedux.ColumnFilterAdd(columnFilter));
            }
        });
    };
    ColumnFilterApiImpl.prototype.clearColumnFilter = function (columnFilter) {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(columnFilter));
    };
    ColumnFilterApiImpl.prototype.clearColumnFilterByColumns = function (columns) {
        var _this = this;
        columns.forEach(function (c) {
            _this.clearColumnFilterByColumn(c);
        });
    };
    ColumnFilterApiImpl.prototype.clearColumnFilterByColumn = function (column) {
        var _this = this;
        var columnFiltersForColumn = this.getAllColumnFilterForColumn(column);
        if (columnFiltersForColumn) {
            columnFiltersForColumn.forEach(function (cf) {
                _this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(cf));
            });
        }
    };
    ColumnFilterApiImpl.prototype.clearAllColumnFilter = function () {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterClearAll());
    };
    ColumnFilterApiImpl.prototype.getAllColumnFilter = function () {
        return this.getAdaptableState().ColumnFilter.ColumnFilters;
    };
    ColumnFilterApiImpl.prototype.getAllColumnFilterForColumn = function (column) {
        var columnFilters = this.getAdaptableState().ColumnFilter
            .ColumnFilters;
        if (columnFilters) {
            return columnFilters.filter(function (cf) { return cf.ColumnId == column; });
        }
        else {
            return [];
        }
    };
    ColumnFilterApiImpl.prototype.createColumnFilterForCell = function (column, primarykeyValues) {
        var _this = this;
        var displayValues = [];
        var rawValues = [];
        primarykeyValues.forEach(function (pk) {
            var rowNode = _this.adaptable.getRowNodeForPrimaryKey(pk);
            displayValues.push(_this.adaptable.getDisplayValueFromRowNode(rowNode, column));
            rawValues.push(_this.adaptable.getRawValueFromRowNode(rowNode, column));
        });
        var filter = {
            ColumnId: column,
            Filter: ExpressionHelper_1.default.CreateSingleColumnExpression(column, tslib_1.__spread(new Set(displayValues)), tslib_1.__spread(new Set(rawValues)), [], []),
        };
        this.setColumnFilter([filter]);
    };
    return ColumnFilterApiImpl;
}(ApiBase_1.ApiBase));
exports.ColumnFilterApiImpl = ColumnFilterApiImpl;
