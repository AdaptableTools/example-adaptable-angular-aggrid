"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var FreeTextColumnStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(FreeTextColumnStrategy, _super);
    function FreeTextColumnStrategy(adaptable) {
        return _super.call(this, StrategyConstants.FreeTextColumnStrategyId, adaptable) || this;
    }
    FreeTextColumnStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.FreeTextColumnStrategyFriendlyName,
            ComponentName: ScreenPopups.FreeTextColumnPopup,
            Icon: StrategyConstants.FreeTextColumnGlyph,
        });
    };
    FreeTextColumnStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable)) {
            if (this.adaptable.api.freeTextColumnApi
                .getAllFreeTextColumn()
                .find(function (ftc) { return ftc.ColumnId == column.ColumnId; })) {
                var popupParam = {
                    columnId: column.ColumnId,
                    action: 'Edit',
                    source: 'ColumnMenu',
                };
                return this.createColumnMenuItemShowPopup('Edit ' + StrategyConstants.FreeTextColumnStrategyFriendlyName, ScreenPopups.FreeTextColumnPopup, StrategyConstants.FreeTextColumnGlyph, popupParam);
            }
        }
    };
    return FreeTextColumnStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.FreeTextColumnStrategy = FreeTextColumnStrategy;
