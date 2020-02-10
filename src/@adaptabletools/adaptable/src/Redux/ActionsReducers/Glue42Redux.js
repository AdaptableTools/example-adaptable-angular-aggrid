"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.GLUE42_LOGIN = 'GLUE42_LOGIN';
exports.GLUE42_SET_LOGIN_ERROR_MESSAGE = 'GLUE42_SET_LOGIN_ERROR_MESSAGE';
exports.GLUE42_SET_THROTTLE_TIME = 'GLUE42_SET_THROTTLE_TIME';
exports.GLUE42_SEND_SNAPSHOT = 'GLUE42_SEND_SNAPSHOT';
exports.GLUE42_START_LIVE_DATA = 'GLUE42_START_LIVE_DATA';
exports.GLUE42_STOP_LIVE_DATA = 'GLUE42_STOP_LIVE_DATA';
exports.GLUE42_LIVE_REPORT_SET = 'GLUE42_LIVE_REPORT_SET';
exports.GLUE42_LIVE_REPORT_CLEAR = 'GLUE42_LIVE_REPORT_CLEAR';
exports.SET_GLUE42_AVAILABLE_ON = 'SET_GLUE42_AVAILABLE_ON';
exports.SET_GLUE42_AVAILABLE_OFF = 'SET_GLUE42_AVAILABLE_OFF';
exports.SET_GLUE42_RUNNING_ON = 'SET_GLUE42_RUNNING_ON';
exports.SET_GLUE42_RUNNING_OFF = 'SET_GLUE42_RUNNING_OFF';
exports.GLUE42_SCHEDULE_ADD = 'GLUE42_SCHEDULE_ADD';
exports.GLUE42_SCHEDULE_EDIT = 'GLUE42_SCHEDULE_EDIT';
exports.GLUE42_SCHEDULE_DELETE = 'GLUE42_SCHEDULE_DELETE';
exports.Glue42Login = function (username, password) { return ({
    type: exports.GLUE42_LOGIN,
    username: username,
    password: password,
}); };
exports.Glue42SetLoginErrorMessage = function (errorMessage) { return ({
    type: exports.GLUE42_SET_LOGIN_ERROR_MESSAGE,
    errorMessage: errorMessage,
}); };
exports.Glue42SetThrottleTime = function (throttleTime) { return ({
    type: exports.GLUE42_SET_THROTTLE_TIME,
    throttleTime: throttleTime,
}); };
exports.Glue42SendSnapshot = function (glue42Report) { return ({
    type: exports.GLUE42_SEND_SNAPSHOT,
    glue42Report: glue42Report,
}); };
exports.Glue42StartLiveData = function (glue42Report) { return ({
    type: exports.GLUE42_START_LIVE_DATA,
    glue42Report: glue42Report,
}); };
exports.Glue42StopLiveData = function () { return ({
    type: exports.GLUE42_STOP_LIVE_DATA,
}); };
exports.Glue42LiveReportSet = function (glue42Report) { return ({
    type: exports.GLUE42_LIVE_REPORT_SET,
    glue42Report: glue42Report,
}); };
exports.Glue42LiveReportClear = function () { return ({
    type: exports.GLUE42_LIVE_REPORT_CLEAR,
}); };
exports.SetGlue42AvailableOn = function () { return ({
    type: exports.SET_GLUE42_AVAILABLE_ON,
}); };
exports.SetGlue42AvailableOff = function () { return ({
    type: exports.SET_GLUE42_AVAILABLE_OFF,
}); };
exports.SetGlue42RunningOn = function () { return ({
    type: exports.SET_GLUE42_RUNNING_ON,
}); };
exports.SetGlue42RunningOff = function () { return ({
    type: exports.SET_GLUE42_RUNNING_OFF,
}); };
exports.Glue42ScheduleAdd = function (glue42Schedule) { return ({
    type: exports.GLUE42_SCHEDULE_ADD,
    glue42Schedule: glue42Schedule,
}); };
exports.Glue42ScheduleEdit = function (glue42Schedule) { return ({
    type: exports.GLUE42_SCHEDULE_EDIT,
    glue42Schedule: glue42Schedule,
}); };
exports.Glue42ScheduleDelete = function (glue42Schedule) { return ({
    type: exports.GLUE42_SCHEDULE_DELETE,
    glue42Schedule: glue42Schedule,
}); };
var initialFilterState = {
    // Glue42: undefined,
    Glue42LoginErrorMessage: GeneralConstants_1.EMPTY_STRING,
    Glue42Schedules: GeneralConstants_1.EMPTY_ARRAY,
    IsGlue42Available: false,
    IsGlue42Running: false,
    CurrentLiveGlue42Report: undefined,
};
exports.Glue42Reducer = function (state, action) {
    if (state === void 0) { state = initialFilterState; }
    var Glue42Schedules;
    switch (action.type) {
        case exports.GLUE42_LOGIN: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { Glue42LoginErrorMessage: undefined });
        }
        case exports.GLUE42_SET_LOGIN_ERROR_MESSAGE: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { Glue42LoginErrorMessage: action.errorMessage });
        }
        case exports.GLUE42_SET_THROTTLE_TIME: {
            var atctionType = action;
            return Object.assign({}, state, { ThrottleTime: atctionType.throttleTime });
        }
        case exports.GLUE42_LIVE_REPORT_SET: {
            var atctionType = action;
            return Object.assign({}, state, { CurrentLiveGlue42Report: atctionType.glue42Report });
        }
        case exports.GLUE42_LIVE_REPORT_CLEAR: {
            // const atctionType = action as Glue42LiveReportSetAction;
            return Object.assign({}, state, { CurrentLiveGlue42Report: undefined });
        }
        case exports.SET_GLUE42_AVAILABLE_ON:
            return Object.assign({}, state, { IsGlue42Available: true });
        case exports.SET_GLUE42_AVAILABLE_OFF:
            return Object.assign({}, state, { IsGlue42Available: false });
        case exports.SET_GLUE42_RUNNING_ON:
            return Object.assign({}, state, { IsGlue42Running: true });
        case exports.SET_GLUE42_RUNNING_OFF:
            return Object.assign({}, state, { IsGlue42Running: false });
        case exports.GLUE42_SCHEDULE_ADD: {
            var actionSchedule = action.glue42Schedule;
            if (!actionSchedule.Uuid) {
                actionSchedule.Uuid = Uuid_1.createUuid();
            }
            Glue42Schedules = [].concat(state.Glue42Schedules);
            Glue42Schedules.push(actionSchedule);
            return tslib_1.__assign(tslib_1.__assign({}, state), { Glue42Schedules: Glue42Schedules });
        }
        case exports.GLUE42_SCHEDULE_EDIT: {
            var actionSchedule_1 = action.glue42Schedule;
            return tslib_1.__assign(tslib_1.__assign({}, state), { Glue42Schedules: state.Glue42Schedules.map(function (abObject) {
                    return abObject.Uuid === actionSchedule_1.Uuid ? actionSchedule_1 : abObject;
                }) });
        }
        case exports.GLUE42_SCHEDULE_DELETE: {
            var actionSchedule_2 = action.glue42Schedule;
            return tslib_1.__assign(tslib_1.__assign({}, state), { Glue42Schedules: state.Glue42Schedules.filter(function (abObject) { return abObject.Uuid !== actionSchedule_2.Uuid; }) });
        }
        default:
            return state;
    }
};
