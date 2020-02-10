"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.REMINDER_SCHEDULE_ADD = 'REMINDER_SCHEDULE_ADD';
exports.REMINDER_SCHEDULE_EDIT = 'REMINDER_SCHEDULE_EDIT';
exports.REMINDER_SCHEDULE_DELETE = 'REMINDER_SCHEDULE_DELETE';
exports.ReminderScheduleAdd = function (reminderSchedule) { return ({
    type: exports.REMINDER_SCHEDULE_ADD,
    reminderSchedule: reminderSchedule,
}); };
exports.ReminderScheduleEdit = function (reminderSchedule) { return ({
    type: exports.REMINDER_SCHEDULE_EDIT,
    reminderSchedule: reminderSchedule,
}); };
exports.ReminderScheduleDelete = function (reminderSchedule) { return ({
    type: exports.REMINDER_SCHEDULE_DELETE,
    reminderSchedule: reminderSchedule,
}); };
var initialReminderState = {
    Reminders: GeneralConstants_1.EMPTY_ARRAY,
};
exports.ReminderReducer = function (state, action) {
    if (state === void 0) { state = initialReminderState; }
    var reminderSchedules;
    switch (action.type) {
        case exports.REMINDER_SCHEDULE_ADD: {
            var actionSchedule = action.reminderSchedule;
            if (!actionSchedule.Uuid) {
                actionSchedule.Uuid = Uuid_1.createUuid();
            }
            reminderSchedules = [].concat(state.Reminders);
            reminderSchedules.push(actionSchedule);
            return tslib_1.__assign(tslib_1.__assign({}, state), { Reminders: reminderSchedules });
        }
        case exports.REMINDER_SCHEDULE_EDIT: {
            var actionSchedule_1 = action.reminderSchedule;
            return tslib_1.__assign(tslib_1.__assign({}, state), { Reminders: state.Reminders.map(function (abObject) {
                    return abObject.Uuid === actionSchedule_1.Uuid ? actionSchedule_1 : abObject;
                }) });
        }
        case exports.REMINDER_SCHEDULE_DELETE: {
            var actionSchedule_2 = action.reminderSchedule;
            return tslib_1.__assign(tslib_1.__assign({}, state), { Reminders: state.Reminders.filter(function (abObject) { return abObject.Uuid !== actionSchedule_2.Uuid; }) });
        }
        default:
            return state;
    }
};
