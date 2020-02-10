"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ReminderApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ReminderApiImpl, _super);
    function ReminderApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReminderApiImpl.prototype.getReminderState = function () {
        return this.getAdaptableState().Reminder;
    };
    ReminderApiImpl.prototype.getAllReminder = function () {
        return this.getAdaptableState().Reminder.Reminders;
    };
    ReminderApiImpl.prototype.showReminderPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.ReminderStrategyId, ScreenPopups.ReminderPopup);
    };
    return ReminderApiImpl;
}(ApiBase_1.ApiBase));
exports.ReminderApiImpl = ReminderApiImpl;
