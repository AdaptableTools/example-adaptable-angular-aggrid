"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.CELL_VALIDATION_ADD = 'CELL_VALIDATION_ADD';
exports.CELL_VALIDATION_EDIT = 'CELL_VALIDATION_EDIT';
exports.CELL_VALIDATION_DELETE = 'CELL_VALIDATION_DELETE';
exports.CELL_VALIDATION_CHANGE_MODE = 'CELL_VALIDATION_CHANGE_MODE';
exports.CellValidationAdd = function (cellValidationRule) { return ({
    type: exports.CELL_VALIDATION_ADD,
    cellValidationRule: cellValidationRule,
}); };
exports.CellValidationEdit = function (cellValidationRule) { return ({
    type: exports.CELL_VALIDATION_EDIT,
    cellValidationRule: cellValidationRule,
}); };
exports.CellValidationDelete = function (cellValidationRule) { return ({
    type: exports.CELL_VALIDATION_DELETE,
    cellValidationRule: cellValidationRule,
}); };
var initialCellValidationState = {
    CellValidations: GeneralConstants_1.EMPTY_ARRAY,
};
exports.CellValidationReducer = function (state, action) {
    if (state === void 0) { state = initialCellValidationState; }
    var cellValidations;
    switch (action.type) {
        case exports.CELL_VALIDATION_ADD: {
            var actionCellValidationRule = action
                .cellValidationRule;
            if (!actionCellValidationRule.Uuid) {
                actionCellValidationRule.Uuid = Uuid_1.createUuid();
            }
            cellValidations = [].concat(state.CellValidations);
            cellValidations.push(actionCellValidationRule);
            return tslib_1.__assign(tslib_1.__assign({}, state), { CellValidations: cellValidations });
        }
        case exports.CELL_VALIDATION_EDIT: {
            var actionCellValidationRule_1 = action
                .cellValidationRule;
            return tslib_1.__assign(tslib_1.__assign({}, state), { CellValidations: state.CellValidations.map(function (abObject) {
                    return abObject.Uuid === actionCellValidationRule_1.Uuid ? actionCellValidationRule_1 : abObject;
                }) });
        }
        case exports.CELL_VALIDATION_DELETE: {
            var actionCellValidationRule_2 = action
                .cellValidationRule;
            return tslib_1.__assign(tslib_1.__assign({}, state), { CellValidations: state.CellValidations.filter(function (abObject) { return abObject.Uuid !== actionCellValidationRule_2.Uuid; }) });
        }
        default:
            return state;
    }
};
