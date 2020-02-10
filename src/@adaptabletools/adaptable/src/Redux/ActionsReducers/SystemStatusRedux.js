"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.SYSTEM_SYSTEM_SET_UPDATE = 'SYSTEM_SYSTEM_SET_UPDATE';
exports.SYSTEM_SYSTEM_SET_SHOW_ALERT = 'SYSTEM_SYSTEM_SET_SHOW_ALERT';
exports.SYSTEM_STATUS_CLEAR = 'SYSTEM_STATUS_CLEAR';
exports.SystemStatusSetUpdate = function (systemStatusUpdate) { return ({
    type: exports.SYSTEM_SYSTEM_SET_UPDATE,
    systemStatusUpdate: systemStatusUpdate,
}); };
exports.SystemStatusSetShowAlert = function (showAlert) { return ({
    type: exports.SYSTEM_SYSTEM_SET_SHOW_ALERT,
    showAlert: showAlert,
}); };
exports.SystemStatusClear = function () { return ({
    type: exports.SYSTEM_STATUS_CLEAR,
}); };
var initialSystemStatusState = {
    DefaultStatusMessage: GeneralConstants_1.EMPTY_STRING,
    DefaultStatusType: undefined,
    StatusMessage: GeneralConstants_1.EMPTY_STRING,
    StatusFurtherInformation: GeneralConstants_1.EMPTY_STRING,
    StatusType: undefined,
    ShowAlert: false,
};
exports.SystemStatusReducer = function (state, action) {
    if (state === void 0) { state = initialSystemStatusState; }
    switch (action.type) {
        case exports.SYSTEM_SYSTEM_SET_UPDATE:
            var systemStatusUpdate = action
                .systemStatusUpdate;
            return Object.assign({}, state, {
                StatusMessage: systemStatusUpdate.StatusMessage,
                StatusType: systemStatusUpdate.StatusType,
                StatusFurtherInformation: systemStatusUpdate.StatusFurtherInformation,
            });
        case exports.SYSTEM_SYSTEM_SET_SHOW_ALERT:
            var showAlert = action.showAlert;
            return Object.assign({}, state, {
                ShowAlert: showAlert,
            });
        case exports.SYSTEM_STATUS_CLEAR:
            return Object.assign({}, state, {
                StatusMessage: state.DefaultStatusMessage,
                StatusType: state.DefaultStatusType,
                StatusFurtherInformation: '',
            });
        default:
            return state;
    }
};
