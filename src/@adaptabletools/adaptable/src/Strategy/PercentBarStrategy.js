"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var PercentBarStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(PercentBarStrategy, _super);
    function PercentBarStrategy(adaptable) {
        return _super.call(this, StrategyConstants.PercentBarStrategyId, adaptable) || this;
    }
    PercentBarStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.PercentBarStrategyFriendlyName,
            ComponentName: ScreenPopups.PercentBarPopup,
            Icon: StrategyConstants.PercentBarGlyph,
        });
    };
    PercentBarStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable, 'numeric')) {
            var percentBarExists = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.PercentBarState.PercentBars.map(function (f) { return f.ColumnId; }), column.ColumnId);
            var label = percentBarExists ? 'Edit ' : 'Create ';
            var popupParam = {
                columnId: column.ColumnId,
                action: percentBarExists ? 'Edit' : 'New',
                source: 'ColumnMenu',
            };
            return this.createColumnMenuItemShowPopup(label + StrategyConstants.PercentBarStrategyFriendlyName, ScreenPopups.PercentBarPopup, StrategyConstants.PercentBarGlyph, popupParam);
        }
    };
    PercentBarStrategy.prototype.addContextMenuItem = function (menuInfo) {
        var menuItemShowPopup = undefined;
        var percentBarExists = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.PercentBarState.PercentBars.map(function (f) { return f.ColumnId; }), menuInfo.Column.ColumnId);
        if (menuInfo.Column && percentBarExists) {
            var popUpParams = {
                source: 'ContextMenu',
            };
            menuItemShowPopup = this.createMainMenuItemShowPopup({
                Label: 'Edit Percent Bar',
                ComponentName: ScreenPopups.PercentBarPopup,
                Icon: StrategyConstants.PercentBarGlyph,
                PopupParams: popUpParams,
            });
        }
        return menuItemShowPopup;
    };
    PercentBarStrategy.prototype.InitState = function () {
        var _this = this;
        if (this.PercentBarState != this.GetPercentBarState()) {
            if (this.adaptable.isInitialised) {
                // if we have made any changes then first delete them all
                this.PercentBarState.PercentBars.forEach(function (pb) {
                    _this.adaptable.removePercentBar(pb);
                });
                this.GetPercentBarState().PercentBars.forEach(function (pb) {
                    _this.adaptable.editPercentBar(pb);
                });
                this.adaptable.redraw();
            }
            this.PercentBarState = this.GetPercentBarState();
        }
    };
    PercentBarStrategy.prototype.GetPercentBarState = function () {
        return this.adaptable.api.percentBarApi.getPercentBarState();
    };
    return PercentBarStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.PercentBarStrategy = PercentBarStrategy;
