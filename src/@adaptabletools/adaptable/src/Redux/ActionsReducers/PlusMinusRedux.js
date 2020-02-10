"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.PLUS_MINUS_APPLY = 'PLUS_MINUS_APPLY';
exports.PLUS_MINUS_RULE_ADD = 'PLUS_MINUS_RULE_ADD';
exports.PLUS_MINUS_RULE_EDIT = 'PLUS_MINUS_RULE_EDIT';
exports.PLUS_MINUS_RULE_DELETE = 'PLUS_MINUS_RULE_DELETE';
exports.PlusMinusApply = function (GridCells) { return ({
    type: exports.PLUS_MINUS_APPLY,
    GridCells: GridCells,
}); };
exports.PlusMinusRuleAdd = function (plusMinusRule) { return ({
    type: exports.PLUS_MINUS_RULE_ADD,
    plusMinusRule: plusMinusRule,
}); };
exports.PlusMinusRuleEdit = function (plusMinusRule) { return ({
    type: exports.PLUS_MINUS_RULE_EDIT,
    plusMinusRule: plusMinusRule,
}); };
exports.PlusMinusRuleDelete = function (plusMinusRule) { return ({
    type: exports.PLUS_MINUS_RULE_DELETE,
    plusMinusRule: plusMinusRule,
}); };
var initialPlusMinusState = {
    PlusMinusRules: GeneralConstants_1.EMPTY_ARRAY,
};
exports.PlusMinusReducer = function (state, action) {
    if (state === void 0) { state = initialPlusMinusState; }
    var plusMinusRules;
    switch (action.type) {
        case exports.PLUS_MINUS_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state);
        case exports.PLUS_MINUS_RULE_ADD: {
            var actionPlusMinusRule = action.plusMinusRule;
            if (!actionPlusMinusRule.Uuid) {
                actionPlusMinusRule.Uuid = Uuid_1.createUuid();
            }
            plusMinusRules = [].concat(state.PlusMinusRules);
            plusMinusRules.push(actionPlusMinusRule);
            return tslib_1.__assign(tslib_1.__assign({}, state), { PlusMinusRules: plusMinusRules });
        }
        case exports.PLUS_MINUS_RULE_EDIT: {
            var actionPlusMinusRule_1 = action.plusMinusRule;
            return tslib_1.__assign(tslib_1.__assign({}, state), { PlusMinusRules: state.PlusMinusRules.map(function (abObject) {
                    return abObject.Uuid === actionPlusMinusRule_1.Uuid ? actionPlusMinusRule_1 : abObject;
                }) });
        }
        case exports.PLUS_MINUS_RULE_DELETE: {
            var actionPlusMinusRule_2 = action.plusMinusRule;
            return tslib_1.__assign(tslib_1.__assign({}, state), { PlusMinusRules: state.PlusMinusRules.filter(function (abObject) { return abObject.Uuid !== actionPlusMinusRule_2.Uuid; }) });
        }
        default:
            return state;
    }
};
