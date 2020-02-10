"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var CalculatedColumnStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(CalculatedColumnStrategy, _super);
    function CalculatedColumnStrategy(adaptable) {
        return _super.call(this, StrategyConstants.CalculatedColumnStrategyId, adaptable) || this;
    }
    CalculatedColumnStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.CalculatedColumnStrategyFriendlyName,
            ComponentName: ScreenPopups.CalculatedColumnPopup,
            Icon: StrategyConstants.CalculatedColumnGlyph,
        });
    };
    CalculatedColumnStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable)) {
            if (this.adaptable.api.calculatedColumnApi
                .getAllCalculatedColumn()
                .find(function (cc) { return cc.ColumnId == column.ColumnId; })) {
                var popupParam = {
                    columnId: column.ColumnId,
                    action: 'Edit',
                    source: 'ColumnMenu',
                };
                return this.createColumnMenuItemShowPopup('Edit ' + StrategyConstants.CalculatedColumnStrategyFriendlyName, ScreenPopups.CalculatedColumnPopup, StrategyConstants.CalculatedColumnGlyph, popupParam);
            }
        }
    };
    return CalculatedColumnStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.CalculatedColumnStrategy = CalculatedColumnStrategy;
