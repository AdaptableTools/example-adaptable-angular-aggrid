"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.SMARTEDIT_APPLY = 'SMARTEDIT_APPLY';
exports.SMARTEDIT_CHANGE_VALUE = 'SMARTEDIT_CHANGE_VALUE';
exports.SMARTEDIT_CHANGE_OPERATION = 'SMARTEDIT_CHANGE_OPERATION';
exports.SmartEditApply = function (bypassCellValidationWarnings) { return ({
    type: exports.SMARTEDIT_APPLY,
    bypassCellValidationWarnings: bypassCellValidationWarnings,
}); };
exports.SmartEditChangeValue = function (value) { return ({
    type: exports.SMARTEDIT_CHANGE_VALUE,
    value: value,
}); };
exports.SmartEditChangeOperation = function (MathOperation) { return ({
    type: exports.SMARTEDIT_CHANGE_OPERATION,
    MathOperation: MathOperation,
}); };
var initialSmartEditState = {
    SmartEditValue: GeneralConstants_1.SMART_EDIT_DEFAULT_VALUE,
    MathOperation: GeneralConstants_1.SMART_EDIT_DEFAULT_OPERATION,
};
exports.SmartEditReducer = function (state, action) {
    if (state === void 0) { state = initialSmartEditState; }
    switch (action.type) {
        case exports.SMARTEDIT_CHANGE_VALUE:
            return Object.assign({}, state, {
                SmartEditValue: action.value,
            });
        case exports.SMARTEDIT_CHANGE_OPERATION:
            return Object.assign({}, state, {
                MathOperation: action.MathOperation,
            });
        default:
            return state;
    }
};
