"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var StateManagementStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(StateManagementStrategy, _super);
    function StateManagementStrategy(adaptable) {
        return _super.call(this, StrategyConstants.StateManagementStrategyId, adaptable) || this;
    }
    StateManagementStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.StateManagementStrategyFriendlyName,
            ComponentName: ScreenPopups.StateManagementPopup,
            Icon: StrategyConstants.StateManagementGlyph,
        });
    };
    return StateManagementStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.StateManagementStrategy = StateManagementStrategy;
