"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.APPLICATION_DATA_ENTRY_ADD = 'APPLICATION_DATA_ENTRY_ADD';
exports.APPLICATION_DATA_ENTRY_EDIT = 'APPLICATION_DATA_ENTRY_EDIT';
exports.APPLICATION_DATA_ENTRY_DELETE = 'APPLICATION_DATA_ENTRY_DELETE';
exports.ApplicationDataEntryAdd = function (applicationDataEntry) { return ({
    type: exports.APPLICATION_DATA_ENTRY_ADD,
    applicationDataEntry: applicationDataEntry,
}); };
exports.ApplicationDataEntryEdit = function (applicationDataEntry) { return ({
    type: exports.APPLICATION_DATA_ENTRY_EDIT,
    applicationDataEntry: applicationDataEntry,
}); };
exports.ApplicationDataEntryDelete = function (applicationDataEntry) { return ({
    type: exports.APPLICATION_DATA_ENTRY_DELETE,
    applicationDataEntry: applicationDataEntry,
}); };
var initialFilterState = {
    ApplicationDataEntries: GeneralConstants_1.EMPTY_ARRAY,
};
exports.ApplicationReducer = function (state, action) {
    if (state === void 0) { state = initialFilterState; }
    var applicationDataEntries;
    var index;
    switch (action.type) {
        case exports.APPLICATION_DATA_ENTRY_ADD:
            var actionTypedAdd = action;
            applicationDataEntries = [].concat(state.ApplicationDataEntries);
            applicationDataEntries.push(actionTypedAdd.applicationDataEntry);
            return Object.assign({}, state, { ApplicationDataEntries: applicationDataEntries });
        case exports.APPLICATION_DATA_ENTRY_EDIT:
            var actionTypedUpdate_1 = action;
            applicationDataEntries = [].concat(state.ApplicationDataEntries);
            index = applicationDataEntries.findIndex(function (fe) { return fe.Key == actionTypedUpdate_1.applicationDataEntry.Key; });
            applicationDataEntries[index] = actionTypedUpdate_1.applicationDataEntry;
            return Object.assign({}, state, { ApplicationDataEntries: applicationDataEntries });
        case exports.APPLICATION_DATA_ENTRY_DELETE:
            var actionTypedDelete_1 = action;
            applicationDataEntries = [].concat(state.ApplicationDataEntries);
            index = applicationDataEntries.findIndex(function (a) { return a.Key == actionTypedDelete_1.applicationDataEntry.Key; });
            applicationDataEntries.splice(index, 1);
            return Object.assign({}, state, { ApplicationDataEntries: applicationDataEntries });
        default:
            return state;
    }
};
