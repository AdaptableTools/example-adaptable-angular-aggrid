"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.CELL_SUMMARY_CHANGE_OPERATION = 'CELL_SUMMARY_CHANGE_OPERATION';
exports.CELL_SUMMARY_OPERATION_DEFINITIONS_SET = 'CELL_SUMMARY_OPERATION_DEFINITIONS_SET';
exports.CellSummaryChangeOperation = function (SummaryOperation) { return ({
    type: exports.CELL_SUMMARY_CHANGE_OPERATION,
    SummaryOperation: SummaryOperation,
}); };
exports.CellSummaryOperationDefinitionsSet = function (operationDefinitions) { return ({
    type: exports.CELL_SUMMARY_OPERATION_DEFINITIONS_SET,
    operationDefinitions: operationDefinitions,
}); };
var initialCellSummaryState = {
    SummaryOperation: GeneralConstants_1.CELL_SUMMARY_DEFAULT_OPERATION,
    CellSummaryOperationDefinitions: GeneralConstants_1.EMPTY_ARRAY,
};
exports.CellSummaryReducer = function (state, action) {
    if (state === void 0) { state = initialCellSummaryState; }
    switch (action.type) {
        case exports.CELL_SUMMARY_CHANGE_OPERATION:
            return Object.assign({}, state, {
                SummaryOperation: action.SummaryOperation,
            });
        case exports.CELL_SUMMARY_OPERATION_DEFINITIONS_SET: {
            return tslib_1.__assign(tslib_1.__assign({}, state), { CellSummaryOperationDefinitions: action
                    .operationDefinitions });
        }
        default:
            return state;
    }
};
