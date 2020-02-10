"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var AdvancedSearchStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(AdvancedSearchStrategy, _super);
    function AdvancedSearchStrategy(adaptable) {
        return _super.call(this, StrategyConstants.AdvancedSearchStrategyId, adaptable) || this;
    }
    AdvancedSearchStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.AdvancedSearchStrategyFriendlyName,
            ComponentName: ScreenPopups.AdvancedSearchPopup,
            Icon: StrategyConstants.AdvancedSearchGlyph,
        });
    };
    return AdvancedSearchStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.AdvancedSearchStrategy = AdvancedSearchStrategy;
