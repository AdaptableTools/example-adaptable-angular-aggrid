"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ReminderStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ReminderStrategy, _super);
    function ReminderStrategy(adaptable) {
        return _super.call(this, StrategyConstants.ReminderStrategyId, adaptable) || this;
    }
    ReminderStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.ReminderStrategyFriendlyName,
            ComponentName: ScreenPopups.ReminderPopup,
            Icon: StrategyConstants.ReminderGlyph,
        });
    };
    return ReminderStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.ReminderStrategy = ReminderStrategy;
