"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ScheduleApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ScheduleApiImpl, _super);
    function ScheduleApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScheduleApiImpl.prototype.getAllSchedule = function () {
        var allSchedules = [];
        allSchedules.push.apply(allSchedules, tslib_1.__spread(this.getAllReminderSchedule()));
        allSchedules.push.apply(allSchedules, tslib_1.__spread(this.getAllReportSchedule()));
        allSchedules.push.apply(allSchedules, tslib_1.__spread(this.getAllIPushPullSchedule()));
        allSchedules.push.apply(allSchedules, tslib_1.__spread(this.getAllGlue42Schedule()));
        return allSchedules;
    };
    ScheduleApiImpl.prototype.getAllReminderSchedule = function () {
        return this.adaptable.api.reminderApi.getAllReminder();
    };
    ScheduleApiImpl.prototype.getAllReportSchedule = function () {
        return this.adaptable.api.exportApi.getReportSchedules();
    };
    ScheduleApiImpl.prototype.getAllIPushPullSchedule = function () {
        return this.adaptable.api.iPushPullApi.getIPushPullSchedules();
    };
    ScheduleApiImpl.prototype.getAllGlue42Schedule = function () {
        return this.adaptable.api.glue42Api.getGlue42Schedules();
    };
    ScheduleApiImpl.prototype.showSchedulePopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.ScheduleStrategyId, ScreenPopups.SchedulePopup);
    };
    return ScheduleApiImpl;
}(ApiBase_1.ApiBase));
exports.ScheduleApiImpl = ScheduleApiImpl;
