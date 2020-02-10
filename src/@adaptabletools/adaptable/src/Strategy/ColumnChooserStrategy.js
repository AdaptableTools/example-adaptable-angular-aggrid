"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ColumnChooserStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnChooserStrategy, _super);
    function ColumnChooserStrategy(adaptable) {
        return _super.call(this, StrategyConstants.ColumnChooserStrategyId, adaptable) || this;
    }
    ColumnChooserStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.ColumnChooserStrategyFriendlyName,
            ComponentName: ScreenPopups.ColumnChooserPopup,
            Icon: StrategyConstants.ColumnChooserGlyph,
        });
    };
    ColumnChooserStrategy.prototype.addColumnMenuItem = function (column) {
        return this.createColumnMenuItemShowPopup('Show ' + StrategyConstants.ColumnChooserStrategyFriendlyName, ScreenPopups.ColumnChooserPopup, StrategyConstants.ColumnChooserGlyph);
    };
    ColumnChooserStrategy.prototype.addContextMenuItem = function (menuInfo) {
        var popUpParams = {
            source: 'ContextMenu',
        };
        return this.createMainMenuItemShowPopup({
            Label: 'Show ' + StrategyConstants.ColumnChooserStrategyFriendlyName,
            ComponentName: ScreenPopups.ColumnChooserPopup,
            Icon: StrategyConstants.ColumnChooserGlyph,
            PopupParams: popUpParams,
        });
    };
    return ColumnChooserStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.ColumnChooserStrategy = ColumnChooserStrategy;
