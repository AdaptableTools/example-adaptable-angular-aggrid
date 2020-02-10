"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var LayoutRedux = require("../../Redux/ActionsReducers/LayoutRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ApiBase_1 = require("./ApiBase");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var LayoutApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutApiImpl, _super);
    function LayoutApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutApiImpl.prototype.getLayoutState = function () {
        return this.getAdaptableState().Layout;
    };
    LayoutApiImpl.prototype.setLayout = function (layoutName) {
        if (StringExtensions_1.default.IsNotNullOrEmpty(layoutName)) {
            var layout = this.getAdaptableState().Layout.Layouts.find(function (l) { return l.Name == layoutName; });
            if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyFriendlyName)) {
                this.dispatchAction(LayoutRedux.LayoutSelect(layoutName));
            }
        }
    };
    LayoutApiImpl.prototype.clearLayout = function () {
        this.dispatchAction(LayoutRedux.LayoutSelect(GeneralConstants_1.DEFAULT_LAYOUT));
    };
    LayoutApiImpl.prototype.getCurrentLayout = function () {
        var layoutName = this.getAdaptableState().Layout.CurrentLayout;
        return this.getLayoutByName(layoutName);
    };
    LayoutApiImpl.prototype.getCurrentLayoutName = function () {
        return this.getAdaptableState().Layout.CurrentLayout;
    };
    LayoutApiImpl.prototype.isDefaultLayout = function () {
        return this.getCurrentLayoutName() == GeneralConstants_1.DEFAULT_LAYOUT;
    };
    LayoutApiImpl.prototype.getLayoutByName = function (layoutName) {
        if (StringExtensions_1.default.IsNotNullOrEmpty(layoutName)) {
            var layout = this.getAdaptableState().Layout.Layouts.find(function (l) { return l.Name == layoutName; });
            if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyFriendlyName)) {
                return layout;
            }
        }
    };
    LayoutApiImpl.prototype.getAllLayout = function () {
        return this.getAdaptableState().Layout.Layouts;
    };
    LayoutApiImpl.prototype.saveCurrentLayout = function () {
        var currentLayoutName = this.getAdaptableState().Layout.CurrentLayout;
        if (currentLayoutName != GeneralConstants_1.DEFAULT_LAYOUT) {
            var currentLayoutObject = this.getAdaptableState().Layout.Layouts.find(function (l) { return l.Name == currentLayoutName; });
            if (currentLayoutObject) {
                var gridState = currentLayoutObject ? currentLayoutObject.VendorGridInfo : null;
                var visibleColumns = this.getAdaptableState().Grid.Columns.filter(function (c) { return c.Visible; });
                var columnSorts = this.getAdaptableState().Grid.ColumnSorts;
                var layoutToSave = {
                    Uuid: currentLayoutObject.Uuid,
                    Name: currentLayoutName,
                    Columns: currentLayoutObject.Columns,
                    ColumnSorts: currentLayoutObject.ColumnSorts,
                    GroupedColumns: currentLayoutObject.GroupedColumns,
                    PivotDetails: currentLayoutObject.PivotDetails,
                    VendorGridInfo: gridState,
                    AdaptableGridInfo: {
                        CurrentColumns: visibleColumns ? visibleColumns.map(function (x) { return x.ColumnId; }) : [],
                        CurrentColumnSorts: columnSorts,
                    },
                };
                this.saveLayout(layoutToSave);
            }
        }
    };
    LayoutApiImpl.prototype.saveLayout = function (layoutToSave) {
        this.dispatchAction(LayoutRedux.LayoutSave(layoutToSave));
    };
    LayoutApiImpl.prototype.restorelayout = function (layoutToSave) {
        this.dispatchAction(LayoutRedux.LayoutRestore(layoutToSave));
    };
    LayoutApiImpl.prototype.showLayoutPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.LayoutStrategyId, ScreenPopups.LayoutPopup);
    };
    return LayoutApiImpl;
}(ApiBase_1.ApiBase));
exports.LayoutApiImpl = LayoutApiImpl;
