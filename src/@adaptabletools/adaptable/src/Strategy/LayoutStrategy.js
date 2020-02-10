"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var LayoutStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutStrategy, _super);
    function LayoutStrategy(adaptable) {
        return _super.call(this, StrategyConstants.LayoutStrategyId, adaptable) || this;
    }
    LayoutStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.LayoutStrategyFriendlyName,
            ComponentName: ScreenPopups.LayoutPopup,
            Icon: StrategyConstants.LayoutGlyph,
        });
    };
    return LayoutStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.LayoutStrategy = LayoutStrategy;
