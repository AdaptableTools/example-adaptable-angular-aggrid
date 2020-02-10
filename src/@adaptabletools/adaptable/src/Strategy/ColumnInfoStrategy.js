"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ColumnInfoStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnInfoStrategy, _super);
    function ColumnInfoStrategy(adaptable) {
        return _super.call(this, StrategyConstants.ColumnInfoStrategyId, adaptable) || this;
    }
    ColumnInfoStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.ColumnInfoStrategyFriendlyName,
            ComponentName: ScreenPopups.ColumnInfoPopup,
            Icon: StrategyConstants.ColumnInfoGlyph,
        });
    };
    ColumnInfoStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable)) {
            var popupParam = {
                columnId: column.ColumnId,
                source: 'ColumnMenu',
            };
            return this.createColumnMenuItemShowPopup(StrategyConstants.ColumnInfoStrategyFriendlyName, ScreenPopups.ColumnInfoPopup, StrategyConstants.ColumnInfoGlyph, popupParam);
        }
    };
    ColumnInfoStrategy.prototype.addContextMenuItem = function (menuInfo) {
        var menuItemShowPopup = undefined;
        if (this.canCreateColumnMenuItem(menuInfo.Column, this.adaptable)) {
            var popupParam = {
                columnId: menuInfo.Column.ColumnId,
                source: 'ContextMenu',
            };
            if (menuInfo.Column) {
                menuItemShowPopup = this.createMainMenuItemShowPopup({
                    Label: StrategyConstants.ColumnInfoStrategyFriendlyName,
                    ComponentName: ScreenPopups.ColumnInfoPopup,
                    Icon: StrategyConstants.ColumnInfoGlyph,
                    PopupParams: popupParam,
                });
            }
        }
        return menuItemShowPopup;
    };
    return ColumnInfoStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.ColumnInfoStrategy = ColumnInfoStrategy;
