"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ColumnCategoryRedux = require("../../Redux/ActionsReducers/ColumnCategoryRedux");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ColumnCategoryApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnCategoryApiImpl, _super);
    function ColumnCategoryApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnCategoryApiImpl.prototype.getColumnCategoryState = function () {
        return this.getAdaptableState().ColumnCategory;
    };
    ColumnCategoryApiImpl.prototype.getAllColumnCategory = function () {
        return this.getColumnCategoryState().ColumnCategories;
    };
    ColumnCategoryApiImpl.prototype.getColumnCategoryById = function (columnCategoryId) {
        return this.getAllColumnCategory().find(function (cc) { return cc.ColumnCategoryId == columnCategoryId; });
    };
    ColumnCategoryApiImpl.prototype.addColumnCategory = function (columnCategory) {
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryAdd(columnCategory));
    };
    ColumnCategoryApiImpl.prototype.createColumnCategory = function (columnCategoryId, columns) {
        var columnCategory = {
            ColumnCategoryId: columnCategoryId,
            ColumnIds: columns,
        };
        this.addColumnCategory(columnCategory);
    };
    ColumnCategoryApiImpl.prototype.editColumnCategory = function (columnCategory) {
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(columnCategory));
    };
    ColumnCategoryApiImpl.prototype.addColumnsToColumnCategory = function (columnCategoryId, columns) {
        var columnCategory = this.getColumnCategoryById(columnCategoryId);
        columns.forEach(function (c) {
            columnCategory.ColumnIds.push(c);
        });
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(columnCategory));
    };
    ColumnCategoryApiImpl.prototype.removeColumnsFromColumnCategory = function (columnCategoryId, columns) {
        var columnCategory = this.getAllColumnCategory().find(function (cc) { return cc.ColumnCategoryId == columnCategoryId; });
        columns.forEach(function (c) {
            var ccIndex = columnCategory.ColumnIds.findIndex(function (cc) { return cc == c; });
            columnCategory.ColumnIds.splice(ccIndex, 1);
        });
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(columnCategory));
    };
    ColumnCategoryApiImpl.prototype.deleteColumnCategory = function (columnCategoryId) {
        var columnCategory = this.getAllColumnCategory().find(function (cc) { return cc.ColumnCategoryId == columnCategoryId; });
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryDelete(columnCategory));
    };
    ColumnCategoryApiImpl.prototype.showColumnCategoryPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.ColumnCategoryStrategyId, ScreenPopups.ColumnCategoryPopup);
    };
    return ColumnCategoryApiImpl;
}(ApiBase_1.ApiBase));
exports.ColumnCategoryApiImpl = ColumnCategoryApiImpl;
