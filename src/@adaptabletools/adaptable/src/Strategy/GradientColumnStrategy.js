"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var GradientColumnStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(GradientColumnStrategy, _super);
    function GradientColumnStrategy(adaptable) {
        return _super.call(this, StrategyConstants.GradientColumnStrategyId, adaptable) || this;
    }
    GradientColumnStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.GradientColumnStrategyFriendlyName,
            ComponentName: ScreenPopups.GradientColumnPopup,
            Icon: StrategyConstants.GradientColumnGlyph,
        });
    };
    GradientColumnStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable, 'numeric')) {
            var GradientColumnExists = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.GradientColumnState.GradientColumns.map(function (f) { return f.ColumnId; }), column.ColumnId);
            var label = GradientColumnExists ? 'Edit ' : 'Create ';
            var popupParam = {
                columnId: column.ColumnId,
                action: GradientColumnExists ? 'Edit' : 'New',
                source: 'ColumnMenu',
            };
            return this.createColumnMenuItemShowPopup(label + StrategyConstants.GradientColumnStrategyFriendlyName, ScreenPopups.GradientColumnPopup, StrategyConstants.GradientColumnGlyph, popupParam);
        }
    };
    GradientColumnStrategy.prototype.addContextMenuItem = function (menuInfo) {
        var menuItemShowPopup = undefined;
        var GradientColumnExists = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.GradientColumnState.GradientColumns.map(function (f) { return f.ColumnId; }), menuInfo.Column.ColumnId);
        if (menuInfo.Column && GradientColumnExists) {
            var popUpParams = {
                source: 'ContextMenu',
            };
            menuItemShowPopup = this.createMainMenuItemShowPopup({
                Label: 'Edit Percent Bar',
                ComponentName: ScreenPopups.GradientColumnPopup,
                Icon: StrategyConstants.GradientColumnGlyph,
                PopupParams: popUpParams,
            });
        }
        return menuItemShowPopup;
    };
    GradientColumnStrategy.prototype.InitState = function () {
        var _this = this;
        if (this.GradientColumnState != this.GetGradientColumnState()) {
            if (this.adaptable.isInitialised) {
                // if we have made any changes then first delete them all
                this.GradientColumnState.GradientColumns.forEach(function (pb) {
                    _this.adaptable.removeGradientColumn(pb);
                });
                this.GetGradientColumnState().GradientColumns.forEach(function (pb) {
                    _this.adaptable.editGradientColumn(pb);
                });
                this.adaptable.redraw();
            }
            this.GradientColumnState = this.GetGradientColumnState();
        }
    };
    GradientColumnStrategy.prototype.GetGradientColumnState = function () {
        return this.adaptable.api.gradientColumnApi.getGradientColumnState();
    };
    return GradientColumnStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.GradientColumnStrategy = GradientColumnStrategy;
