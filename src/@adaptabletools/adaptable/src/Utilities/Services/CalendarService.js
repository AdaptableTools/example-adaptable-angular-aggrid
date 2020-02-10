"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CalendarConstants = require("../../Utilities/Constants/CalendarConstants");
// Similar service to the one in WPF version
// This service is responsible for reading the calendars and for making them available and also for doing data calculations
// The breakdown of the various classes is as follows:
// a. CalendarStrategy:  Very little - simply a gateway to the Calendar Config.
// b. CalendarConfig:  Enables the user to see what the various calendars on offer are (and their contents) and to choose a Current Calendar
// c. Calendar State:  Stores just the name of the Current Calendar.  We dont persist the contents of the Current Calendar (similar to WPF)
// d. Calendar Service:  This class which gets the details of teh calendars and makes calendar based calculations
// N.B.  At the moment we DONT allow users to import (or edit) calendars;  to do that we need a way of reading from .csv files in Typescript
// Hence why we store the details of the shipped calendars the way we do, rather than reading from a file like we do with WPF version.
var CalendarService = /** @class */ (function () {
    function CalendarService(adaptable) {
        this.adaptable = adaptable;
        this.adaptable = adaptable;
    }
    CalendarService.prototype.GetDynamicDate = function (dynamicDateName) {
        // eventually we should use some kind of enum? or class that holds this
        var dynamicDate;
        if (dynamicDateName == CalendarConstants.TODAY) {
            dynamicDate = new Date();
        }
        else if (dynamicDateName == CalendarConstants.YESTERDAY) {
            dynamicDate = new Date();
            dynamicDate.setDate(dynamicDate.getDate() - 1);
        }
        else if (dynamicDateName == CalendarConstants.TOMORROW) {
            dynamicDate = new Date();
            dynamicDate.setDate(dynamicDate.getDate() + 1);
        }
        else if (dynamicDateName == CalendarConstants.PREVIOUS_WORK_DAY) {
            dynamicDate = this.GetPreviousWorkingDay(1);
        }
        else if (dynamicDateName == CalendarConstants.NEXT_WORK_DAY) {
            dynamicDate = this.GetNextWorkingDay(1);
        }
        return dynamicDate;
    };
    CalendarService.prototype.GetNextWorkingDay = function (days) {
        if (days === void 0) { days = 1; }
        var count = 0;
        var counterDate = new Date();
        while (count < days) {
            counterDate.setDate(counterDate.getDate() + 1);
            if (this.isNotWorkingDay(counterDate)) {
                count++;
            }
        }
        return counterDate;
    };
    CalendarService.prototype.GetPreviousWorkingDay = function (days) {
        if (days === void 0) { days = 1; }
        var count = 0;
        var counterDate = new Date();
        while (count < days) {
            counterDate.setDate(counterDate.getDate() - 1);
            if (this.isNotWorkingDay(counterDate)) {
                count++;
            }
        }
        return counterDate;
    };
    // pretty sure this can be improved as pretty expensive - though rarely used to be honest
    CalendarService.prototype.isNotWorkingDay = function (dateToCheck) {
        var e_1, _a;
        var calendarStore = this.adaptable.api.calendarApi.getCalendarState();
        var currentHoliday = this.adaptable.api.internalApi
            .getAvailableCalendars()
            .find(function (c) { return c.Name == calendarStore.CurrentCalendar; });
        try {
            for (var _b = tslib_1.__values(currentHoliday.CalendarEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                var holiday = _c.value;
                var holidayDate = new Date(holiday.HolidayDate);
                if (holidayDate.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0)) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return dateToCheck.getDay() != 0 && dateToCheck.getDay() != 6;
    };
    return CalendarService;
}());
exports.CalendarService = CalendarService;
