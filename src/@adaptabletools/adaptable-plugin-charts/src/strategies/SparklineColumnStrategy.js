"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var ScreenPopups = require("@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups");
var SparklineColumnStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(SparklineColumnStrategy, _super);
    function SparklineColumnStrategy(adaptable) {
        return _super.call(this, StrategyConstants.SparklineColumnStrategyId, adaptable) || this;
    }
    SparklineColumnStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.SparklineColumnStrategyFriendlyName,
            ComponentName: ScreenPopups.SparklineColumnPopup,
            Icon: StrategyConstants.SparklineColumnGlyph,
        });
    };
    SparklineColumnStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable, 'sparkline')) {
            var popUpParams = {
                columnId: column.ColumnId,
                source: 'ColumnMenu',
            };
            return this.createColumnMenuItemShowPopup('Edit Sparkline Column', ScreenPopups.SparklineColumnPopup, StrategyConstants.SparklineColumnGlyph, popUpParams);
        }
    };
    SparklineColumnStrategy.prototype.addContextMenuItem = function (menuInfo) {
        var menuItemShowPopup = undefined;
        if (menuInfo.Column &&
            this.canCreateColumnMenuItem(menuInfo.Column, this.adaptable, 'sparkline')) {
            var popUpParams = {
                source: 'ContextMenu',
            };
            menuItemShowPopup = this.createMainMenuItemShowPopup({
                Label: 'Edit Sparkline Column',
                ComponentName: ScreenPopups.SparklineColumnPopup,
                Icon: StrategyConstants.SparklineColumnGlyph,
                PopupParams: popUpParams,
            });
        }
        return menuItemShowPopup;
    };
    SparklineColumnStrategy.prototype.InitState = function () {
        var _this = this;
        if (this.SparklinesState != this.GetSparklinesState()) {
            if (this.adaptable.isInitialised) {
                // if we have made any changes then first delete them all
                this.SparklinesState.SparklineColumns.forEach(function (sparklineColumn) {
                    _this.adaptable.removeSparklineColumn(sparklineColumn);
                });
                this.GetSparklinesState().SparklineColumns.forEach(function (sparklineColumn) {
                    _this.adaptable.editSparklineColumn(sparklineColumn);
                });
                this.adaptable.redraw();
            }
            this.SparklinesState = this.GetSparklinesState();
        }
    };
    SparklineColumnStrategy.prototype.GetSparklinesState = function () {
        return this.adaptable.api.sparklineColumnApi.getSparklineColumnState();
    };
    return SparklineColumnStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.SparklineColumnStrategy = SparklineColumnStrategy;
