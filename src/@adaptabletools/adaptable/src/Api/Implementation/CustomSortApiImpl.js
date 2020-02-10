"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var CustomSortRedux = require("../../Redux/ActionsReducers/CustomSortRedux");
var ApiBase_1 = require("./ApiBase");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var CustomSortApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(CustomSortApiImpl, _super);
    function CustomSortApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomSortApiImpl.prototype.getCustomSortState = function () {
        return this.getAdaptableState().CustomSort;
    };
    CustomSortApiImpl.prototype.getAllCustomSort = function () {
        return this.getAdaptableState().CustomSort.CustomSorts;
    };
    CustomSortApiImpl.prototype.getCustomSortByColumn = function (column) {
        return this.getAdaptableState().CustomSort.CustomSorts.find(function (cs) { return cs.ColumnId == column; });
    };
    CustomSortApiImpl.prototype.addCustomSort = function (customSort) {
        this.dispatchAction(CustomSortRedux.CustomSortAdd(customSort));
    };
    CustomSortApiImpl.prototype.createCustomSort = function (columnId, values) {
        var customSort = { ColumnId: columnId, SortedValues: values };
        this.addCustomSort(customSort);
    };
    CustomSortApiImpl.prototype.editCustomSort = function (columnId, values) {
        var customSort = { ColumnId: columnId, SortedValues: values };
        if (this.checkItemExists(customSort, columnId, StrategyConstants.CustomSortStrategyId)) {
            this.dispatchAction(CustomSortRedux.CustomSortEdit(customSort));
        }
    };
    CustomSortApiImpl.prototype.deleteCustomSort = function (column) {
        var customSort = this.getCustomSortByColumn(column);
        this.dispatchAction(CustomSortRedux.CustomSortDelete(customSort));
    };
    CustomSortApiImpl.prototype.showCustomSortPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.CustomSortStrategyId, ScreenPopups.CustomSortPopup);
    };
    return CustomSortApiImpl;
}(ApiBase_1.ApiBase));
exports.CustomSortApiImpl = CustomSortApiImpl;
