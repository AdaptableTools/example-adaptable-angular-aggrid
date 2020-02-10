"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.CONDITIONAL_STYLE_ADD = 'CONDITIONAL_STYLE_ADD';
exports.CONDITIONAL_STYLE_EDIT = 'CONDITIONAL_STYLE_EDIT';
exports.CONDITIONAL_STYLE_DELETE = 'CONDITIONAL_STYLE_DELETE';
exports.ConditionalStyleAdd = function (conditionalStyle) { return ({
    type: exports.CONDITIONAL_STYLE_ADD,
    conditionalStyle: conditionalStyle,
}); };
exports.ConditionalStyleEdit = function (conditionalStyle) { return ({
    type: exports.CONDITIONAL_STYLE_EDIT,
    conditionalStyle: conditionalStyle,
}); };
exports.ConditionalStyleDelete = function (conditionalStyle) { return ({
    type: exports.CONDITIONAL_STYLE_DELETE,
    conditionalStyle: conditionalStyle,
}); };
var initialConditionalStyleState = {
    ConditionalStyles: GeneralConstants_1.EMPTY_ARRAY,
};
exports.ConditionalStyleReducer = function (state, action) {
    if (state === void 0) { state = initialConditionalStyleState; }
    var conditions;
    switch (action.type) {
        case exports.CONDITIONAL_STYLE_ADD: {
            var actionConditionalStyle_1 = action
                .conditionalStyle;
            if (!actionConditionalStyle_1.Uuid) {
                actionConditionalStyle_1.Uuid = Uuid_1.createUuid();
            }
            conditions = [].concat(state.ConditionalStyles);
            conditions.push(actionConditionalStyle_1);
            return tslib_1.__assign(tslib_1.__assign({}, state), { ConditionalStyles: conditions });
        }
        case exports.CONDITIONAL_STYLE_EDIT:
            var actionConditionalStyle_2 = action
                .conditionalStyle;
            return tslib_1.__assign(tslib_1.__assign({}, state), { ConditionalStyles: state.ConditionalStyles.map(function (abObject) {
                    return abObject.Uuid === actionConditionalStyle_2.Uuid ? actionConditionalStyle_2 : abObject;
                }) });
        case exports.CONDITIONAL_STYLE_DELETE: {
            var actionConditionalStyle_3 = action
                .conditionalStyle;
            return tslib_1.__assign(tslib_1.__assign({}, state), { ConditionalStyles: state.ConditionalStyles.filter(function (abObject) { return abObject.Uuid !== actionConditionalStyle_3.Uuid; }) });
        }
        default:
            return state;
    }
};
