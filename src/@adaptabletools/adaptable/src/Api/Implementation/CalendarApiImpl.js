"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CalendarRedux = require("../../Redux/ActionsReducers/CalendarRedux");
var ApiBase_1 = require("./ApiBase");
var CalendarApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarApiImpl, _super);
    function CalendarApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarApiImpl.prototype.getCalendarState = function () {
        return this.getAdaptableState().Calendar;
    };
    CalendarApiImpl.prototype.setCurrentCalendar = function (calendar) {
        this.dispatchAction(CalendarRedux.CalendarSelect(calendar));
    };
    CalendarApiImpl.prototype.getCurrentCalendar = function () {
        return this.getAdaptableState().Calendar.CurrentCalendar;
    };
    return CalendarApiImpl;
}(ApiBase_1.ApiBase));
exports.CalendarApiImpl = CalendarApiImpl;
