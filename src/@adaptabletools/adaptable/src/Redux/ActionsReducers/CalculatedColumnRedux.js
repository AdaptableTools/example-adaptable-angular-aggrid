"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.CALCULATEDCOLUMN_ADD = 'CALCULATEDCOLUMN_ADD';
exports.CALCULATEDCOLUMN_EDIT = 'CALCULATEDCOLUMN_EDIT';
exports.CALCULATEDCOLUMN_DELETE = 'CALCULATEDCOLUMN_DELETE';
exports.CalculatedColumnAdd = function (calculatedColumn) { return ({
    type: exports.CALCULATEDCOLUMN_ADD,
    calculatedColumn: calculatedColumn,
}); };
exports.CalculatedColumnEdit = function (calculatedColumn) { return ({
    type: exports.CALCULATEDCOLUMN_EDIT,
    calculatedColumn: calculatedColumn,
}); };
exports.CalculatedColumnDelete = function (calculatedColumn) { return ({
    type: exports.CALCULATEDCOLUMN_DELETE,
    calculatedColumn: calculatedColumn,
}); };
var initialCalculatedColumnState = {
    CalculatedColumns: GeneralConstants_1.EMPTY_ARRAY,
};
exports.CalculatedColumnReducer = function (state, action) {
    if (state === void 0) { state = initialCalculatedColumnState; }
    var calculatedColumns;
    switch (action.type) {
        case exports.CALCULATEDCOLUMN_ADD: {
            var actionCalculatedColumn = action
                .calculatedColumn;
            if (!actionCalculatedColumn.Uuid) {
                actionCalculatedColumn.Uuid = Uuid_1.createUuid();
            }
            calculatedColumns = [].concat(state.CalculatedColumns);
            calculatedColumns.push(actionCalculatedColumn);
            return tslib_1.__assign(tslib_1.__assign({}, state), { CalculatedColumns: calculatedColumns });
        }
        case exports.CALCULATEDCOLUMN_EDIT: {
            var actionCalculatedColumn_1 = action
                .calculatedColumn;
            return tslib_1.__assign(tslib_1.__assign({}, state), { CalculatedColumns: state.CalculatedColumns.map(function (abObject) {
                    return abObject.Uuid === actionCalculatedColumn_1.Uuid ? actionCalculatedColumn_1 : abObject;
                }) });
        }
        case exports.CALCULATEDCOLUMN_DELETE: {
            var actionCalculatedColumn_2 = action
                .calculatedColumn;
            return tslib_1.__assign(tslib_1.__assign({}, state), { CalculatedColumns: state.CalculatedColumns.filter(function (abObject) { return abObject.Uuid !== actionCalculatedColumn_2.Uuid; }) });
        }
        default:
            return state;
    }
};
