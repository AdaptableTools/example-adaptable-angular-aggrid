"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.CALENDAR_SELECT = 'CALENDAR_SELECT';
exports.CalendarSelect = function (selectedCalendarName) { return ({
    type: exports.CALENDAR_SELECT,
    selectedCalendarName: selectedCalendarName,
}); };
var initialCalendarState = {
    CurrentCalendar: GeneralConstants_1.CALENDAR_DEFAULT_CURRENT_CALENDER,
};
exports.CalendarReducer = function (state, action) {
    if (state === void 0) { state = initialCalendarState; }
    switch (action.type) {
        case exports.CALENDAR_SELECT:
            return Object.assign({}, state, {
                CurrentCalendar: action.selectedCalendarName,
            });
        default:
            return state;
    }
};
