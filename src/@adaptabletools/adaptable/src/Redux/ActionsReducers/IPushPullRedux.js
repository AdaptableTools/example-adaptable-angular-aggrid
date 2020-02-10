"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.IPUSHPULL_SET_THROTTLE_TIME = 'IPUSHPULL_SET_THROTTLE_TIME';
exports.IPUSHPULL_SEND_SNAPSHOT = 'IPUSHPULL_SEND_SNAPSHOT';
exports.IPUSHPULL_REPORT_SELECT = 'IPUSHPULL_REPORT_SELECT';
exports.IPUSHPULL_START_LIVE_DATA = 'IPUSHPULL_START_LIVE_DATA';
exports.IPUSHPULL_STOP_LIVE_DATA = 'IPUSHPULL_STOP_LIVE_DATA';
exports.IPUSHPULL_SCHEDULE_ADD = 'IPUSHPULL_SCHEDULE_ADD';
exports.IPUSHPULL_SCHEDULE_EDIT = 'IPUSHPULL_SCHEDULE_EDIT';
exports.IPUSHPULL_SCHEDULE_DELETE = 'IPUSHPULL_SCHEDULE_DELETE';
exports.IPUSHPULL_ADD_PAGE = 'IPUSHPULL_ADD_PAGE';
exports.IPUSHPULL_LOGIN = 'IPUSHPULL_LOGIN';
exports.IPUSHPULL_SET_LOGIN_ERROR_MESSAGE = 'IPUSHPULL_SET_LOGIN_ERROR_MESSAGE';
exports.SET_IPUSHPULL_AVAILABLE_ON = 'SET_IPUSHPULL_AVAILABLE_ON';
exports.SET_IPUSHPULL_AVAILABLE_OFF = 'SET_IPUSHPULL_AVAILABLE_OFF';
exports.SET_IPUSHPULL_RUNNING_ON = 'SET_IPUSHPULL_RUNNING_ON';
exports.SET_IPUSHPULL_RUNNING_OFF = 'SET_IPUSHPULL_RUNNING_OFF';
exports.IPUSHPULL_LIVE_REPORT_SET = 'IPUSHPULL_LIVE_REPORT_SET';
exports.IPUSHPULL_LIVE_REPORT_CLEAR = 'IPUSHPULL_LIVE_REPORT_CLEAR';
exports.IPUSHPULL_DOMAIN_PAGES_SET = 'IPUSHPULL_DOMAIN_PAGES_SET';
exports.IPUSHPULL_DOMAIN_PAGES_CLEAR = 'IPUSHPULL_DOMAIN_PAGES_CLEAR';
exports.IPushPullSetThrottleTime = function (throttleTime) { return ({
    type: exports.IPUSHPULL_SET_THROTTLE_TIME,
    throttleTime: throttleTime,
}); };
exports.IPushPullSendSnapshot = function (iPushPullReport) { return ({
    type: exports.IPUSHPULL_SEND_SNAPSHOT,
    iPushPullReport: iPushPullReport,
}); };
exports.IPushPullStartLiveData = function (iPushPullReport) { return ({
    type: exports.IPUSHPULL_START_LIVE_DATA,
    iPushPullReport: iPushPullReport,
}); };
exports.IPushPullStopLiveData = function () { return ({
    type: exports.IPUSHPULL_STOP_LIVE_DATA,
}); };
exports.IPushPullLogin = function (username, password) { return ({
    type: exports.IPUSHPULL_LOGIN,
    username: username,
    password: password,
}); };
exports.IPushPullSetLoginErrorMessage = function (errorMessage) { return ({
    type: exports.IPUSHPULL_SET_LOGIN_ERROR_MESSAGE,
    errorMessage: errorMessage,
}); };
exports.IPushPullAddPage = function (folder, page) { return ({
    type: exports.IPUSHPULL_ADD_PAGE,
    folder: folder,
    page: page,
}); };
exports.IPushPullScheduleAdd = function (iPushPullSchedule) { return ({
    type: exports.IPUSHPULL_SCHEDULE_ADD,
    iPushPullSchedule: iPushPullSchedule,
}); };
exports.IPushPullScheduleEdit = function (iPushPullSchedule) { return ({
    type: exports.IPUSHPULL_SCHEDULE_EDIT,
    iPushPullSchedule: iPushPullSchedule,
}); };
exports.IPushPullScheduleDelete = function (iPushPullSchedule) { return ({
    type: exports.IPUSHPULL_SCHEDULE_DELETE,
    iPushPullSchedule: iPushPullSchedule,
}); };
exports.SetIPushPullAvailableOn = function () { return ({
    type: exports.SET_IPUSHPULL_AVAILABLE_ON,
}); };
exports.SetIPushPullAvailableOff = function () { return ({
    type: exports.SET_IPUSHPULL_AVAILABLE_OFF,
}); };
exports.SetIPushPullRunningOn = function () { return ({
    type: exports.SET_IPUSHPULL_RUNNING_ON,
}); };
exports.SetIPushPullRunningOff = function () { return ({
    type: exports.SET_IPUSHPULL_RUNNING_OFF,
}); };
exports.IPushPullSetDomainsPages = function (IPushPullDomainsPages) {
    return {
        type: exports.IPUSHPULL_DOMAIN_PAGES_SET,
        IPushPullDomainsPages: IPushPullDomainsPages,
    };
};
exports.IPushPullClearDomainsPages = function () {
    return {
        type: exports.IPUSHPULL_DOMAIN_PAGES_CLEAR,
    };
};
exports.IPushPullLiveReportSet = function (iPushPullReport) { return ({
    type: exports.IPUSHPULL_LIVE_REPORT_SET,
    iPushPullReport: iPushPullReport,
}); };
exports.IPushPullLiveReportClear = function () { return ({
    type: exports.IPUSHPULL_LIVE_REPORT_CLEAR,
}); };
var initialFilterState = {
    IPushPullSchedules: GeneralConstants_1.EMPTY_ARRAY,
    AutoLogin: false,
    IsIPushPullAvailable: false,
    IsIPushPullRunning: false,
    IPushPullDomainsPages: GeneralConstants_1.EMPTY_ARRAY,
    CurrentLiveIPushPullReport: undefined,
    IPushPullLoginErrorMessage: undefined,
};
exports.IPushPullReducer = function (state, action) {
    if (state === void 0) { state = initialFilterState; }
    var iPushPullSchedules;
    switch (action.type) {
        case exports.IPUSHPULL_SET_THROTTLE_TIME: {
            var atctionType = action;
            return Object.assign({}, state, { ThrottleTime: atctionType.throttleTime });
        }
        case exports.IPUSHPULL_SCHEDULE_ADD: {
            var actionSchedule = action
                .iPushPullSchedule;
            if (!actionSchedule.Uuid) {
                actionSchedule.Uuid = Uuid_1.createUuid();
            }
            iPushPullSchedules = [].concat(state.IPushPullSchedules);
            iPushPullSchedules.push(actionSchedule);
            return tslib_1.__assign(tslib_1.__assign({}, state), { IPushPullSchedules: iPushPullSchedules });
        }
        case exports.IPUSHPULL_SCHEDULE_EDIT: {
            var actionSchedule_1 = action
                .iPushPullSchedule;
            return tslib_1.__assign(tslib_1.__assign({}, state), { IPushPullSchedules: state.IPushPullSchedules.map(function (abObject) {
                    return abObject.Uuid === actionSchedule_1.Uuid ? actionSchedule_1 : abObject;
                }) });
        }
        case exports.IPUSHPULL_SCHEDULE_DELETE: {
            var actionSchedule_2 = action
                .iPushPullSchedule;
            return tslib_1.__assign(tslib_1.__assign({}, state), { IPushPullSchedules: state.IPushPullSchedules.filter(function (abObject) { return abObject.Uuid !== actionSchedule_2.Uuid; }) });
        }
        case exports.SET_IPUSHPULL_AVAILABLE_ON:
            return Object.assign({}, state, { IsIPushPullAvailable: true });
        case exports.SET_IPUSHPULL_AVAILABLE_OFF:
            return Object.assign({}, state, { IsIPushPullAvailable: false });
        case exports.SET_IPUSHPULL_RUNNING_ON:
            return Object.assign({}, state, { IsIPushPullRunning: true });
        case exports.SET_IPUSHPULL_RUNNING_OFF:
            return Object.assign({}, state, { IsIPushPullRunning: false });
        case exports.IPUSHPULL_LOGIN: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { IPushPullLoginErrorMessage: undefined });
        }
        case exports.IPUSHPULL_SET_LOGIN_ERROR_MESSAGE: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { IPushPullLoginErrorMessage: action.errorMessage });
        }
        case exports.IPUSHPULL_DOMAIN_PAGES_SET: {
            return Object.assign({}, state, {
                IPushPullDomainsPages: action.IPushPullDomainsPages,
            });
        }
        case exports.IPUSHPULL_DOMAIN_PAGES_CLEAR: {
            return Object.assign({}, state, {
                IPushPullDomainsPages: [],
            });
        }
        case exports.IPUSHPULL_LIVE_REPORT_SET: {
            var atctionType = action;
            return Object.assign({}, state, { CurrentLiveIPushPullReport: atctionType.iPushPullReport });
        }
        case exports.IPUSHPULL_LIVE_REPORT_CLEAR: {
            // const atctionType = action as IPushPullLiveReportSetAction;
            return Object.assign({}, state, { CurrentLiveIPushPullReport: undefined });
        }
        default:
            return state;
    }
};
