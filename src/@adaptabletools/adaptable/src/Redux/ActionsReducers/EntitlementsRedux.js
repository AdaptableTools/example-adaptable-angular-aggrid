"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.ENTITLEMENT_ADD = 'ENTITLEMENT_ADD';
exports.ENTITLEMENT_UPDATE = 'ENTITLEMENT_UPDATE';
exports.ENTITLEMENT_DELETE = 'ENTITLEMENT_DELETE';
exports.EntitlementAdd = function (entitlement) { return ({
    type: exports.ENTITLEMENT_ADD,
    entitlement: entitlement,
}); };
exports.EntitlementUpdate = function (entitlement) { return ({
    type: exports.ENTITLEMENT_UPDATE,
    entitlement: entitlement,
}); };
exports.EntitlementDelete = function (functionName) { return ({
    type: exports.ENTITLEMENT_DELETE,
    functionName: functionName,
}); };
var initialEntitlementState = {
    FunctionEntitlements: GeneralConstants_1.EMPTY_ARRAY,
};
exports.EntitlementsReducer = function (state, action) {
    if (state === void 0) { state = initialEntitlementState; }
    var index;
    var functionEntitlements;
    switch (action.type) {
        case exports.ENTITLEMENT_ADD:
            var actionTypedAdd = action;
            functionEntitlements = [].concat(state.FunctionEntitlements);
            functionEntitlements.push(actionTypedAdd.entitlement);
            return Object.assign({}, state, { FunctionEntitlements: functionEntitlements });
        case exports.ENTITLEMENT_UPDATE:
            var actionTypedUpdate_1 = action;
            functionEntitlements = [].concat(state.FunctionEntitlements);
            index = functionEntitlements.findIndex(function (fe) { return fe.FunctionName == actionTypedUpdate_1.entitlement.FunctionName; });
            functionEntitlements[index] = actionTypedUpdate_1.entitlement;
            return Object.assign({}, state, { FunctionEntitlements: functionEntitlements });
        case exports.ENTITLEMENT_DELETE:
            var actionTypedDelete_1 = action;
            functionEntitlements = [].concat(state.FunctionEntitlements);
            index = functionEntitlements.findIndex(function (a) { return a.FunctionName == actionTypedDelete_1.functionName; });
            functionEntitlements.splice(index, 1);
            return Object.assign({}, state, { FunctionEntitlements: functionEntitlements });
        default:
            return state;
    }
};
