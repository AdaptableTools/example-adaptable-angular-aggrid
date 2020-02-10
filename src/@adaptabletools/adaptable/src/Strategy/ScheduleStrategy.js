"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ScheduleStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ScheduleStrategy, _super);
    function ScheduleStrategy(adaptable) {
        var _this = _super.call(this, StrategyConstants.ScheduleStrategyId, adaptable) || this;
        _this.adaptable._on('GridReloaded', function () { });
        return _this;
    }
    ScheduleStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.ScheduleStrategyFriendlyName,
            ComponentName: ScreenPopups.SchedulePopup,
            Icon: StrategyConstants.ScheduleGlyph,
        });
    };
    return ScheduleStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.ScheduleStrategy = ScheduleStrategy;
