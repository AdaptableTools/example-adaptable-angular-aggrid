"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.ALERT_DEFIINITION_ADD = 'ALERT_DEFIINITION_ADD';
exports.ALERT_DEFIINITION_EDIT = 'ALERT_DEFIINITION_EDIT';
exports.ALERT_DEFIINITION_DELETE = 'ALERT_DEFIINITION_DELETE';
exports.AlertDefinitionAdd = function (alertDefinition) { return ({
    type: exports.ALERT_DEFIINITION_ADD,
    alertDefinition: alertDefinition,
}); };
exports.AlertDefinitionEdit = function (alertDefinition) { return ({
    type: exports.ALERT_DEFIINITION_EDIT,
    alertDefinition: alertDefinition,
}); };
exports.AlertDefinitionDelete = function (alertDefinition) { return ({
    type: exports.ALERT_DEFIINITION_DELETE,
    alertDefinition: alertDefinition,
}); };
var initialAlertState = {
    AlertDefinitions: GeneralConstants_1.EMPTY_ARRAY,
    MaxAlertsInStore: GeneralConstants_1.ALERT_DEFAULT_MAX_ALERTS_IN_STORE,
    AlertDisplayDiv: GeneralConstants_1.EMPTY_STRING,
};
exports.AlertReducer = function (state, action) {
    if (state === void 0) { state = initialAlertState; }
    var alertDefinitions;
    switch (action.type) {
        case exports.ALERT_DEFIINITION_ADD: {
            var actionAlertDefinition = action
                .alertDefinition;
            if (!actionAlertDefinition.Uuid) {
                actionAlertDefinition.Uuid = Uuid_1.createUuid();
            }
            alertDefinitions = [].concat(state.AlertDefinitions);
            alertDefinitions.push(actionAlertDefinition);
            return tslib_1.__assign(tslib_1.__assign({}, state), { AlertDefinitions: alertDefinitions });
        }
        case exports.ALERT_DEFIINITION_EDIT: {
            var actionAlertDefinition_1 = action
                .alertDefinition;
            return tslib_1.__assign(tslib_1.__assign({}, state), { AlertDefinitions: state.AlertDefinitions.map(function (abObject) {
                    return abObject.Uuid === actionAlertDefinition_1.Uuid ? actionAlertDefinition_1 : abObject;
                }) });
        }
        case exports.ALERT_DEFIINITION_DELETE: {
            var actionAlertDefinition_2 = action
                .alertDefinition;
            return tslib_1.__assign(tslib_1.__assign({}, state), { AlertDefinitions: state.AlertDefinitions.filter(function (abObject) { return abObject.Uuid !== actionAlertDefinition_2.Uuid; }) });
        }
        default:
            return state;
    }
};
