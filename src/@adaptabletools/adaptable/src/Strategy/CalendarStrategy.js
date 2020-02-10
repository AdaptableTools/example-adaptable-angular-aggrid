"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var CalendarStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarStrategy, _super);
    function CalendarStrategy(adaptable) {
        return _super.call(this, StrategyConstants.CalendarStrategyId, adaptable) || this;
    }
    CalendarStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.CalendarStrategyFriendlyName,
            ComponentName: ScreenPopups.CalendarsPopup,
            Icon: StrategyConstants.CalendarGlyph,
        });
    };
    return CalendarStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.CalendarStrategy = CalendarStrategy;
