"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.FREE_TEXT_COLUMN_ADD = 'FREE_TEXT_COLUMN_ADD';
exports.FREE_TEXT_COLUMN_EDIT = 'FREE_TEXT_COLUMN_EDIT';
exports.FREE_TEXT_COLUMN_DELETE = 'FREE_TEXT_COLUMN_DELETE';
exports.FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE = 'FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE';
exports.FreeTextColumnAdd = function (freeTextColumn) { return ({
    type: exports.FREE_TEXT_COLUMN_ADD,
    freeTextColumn: freeTextColumn,
}); };
exports.FreeTextColumnEdit = function (freeTextColumn) { return ({
    type: exports.FREE_TEXT_COLUMN_EDIT,
    freeTextColumn: freeTextColumn,
}); };
exports.FreeTextColumnDelete = function (freeTextColumn) { return ({
    type: exports.FREE_TEXT_COLUMN_DELETE,
    freeTextColumn: freeTextColumn,
}); };
exports.FreeTextColumnAddEditStoredValue = function (FreeTextColumn, FreeTextStoredValue) { return ({
    type: exports.FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE,
    FreeTextColumn: FreeTextColumn,
    FreeTextStoredValue: FreeTextStoredValue,
}); };
var initialFreeTextColumnState = {
    FreeTextColumns: GeneralConstants_1.EMPTY_ARRAY,
};
exports.FreeTextColumnReducer = function (state, action) {
    if (state === void 0) { state = initialFreeTextColumnState; }
    var freeTextColumns;
    switch (action.type) {
        case exports.FREE_TEXT_COLUMN_ADD: {
            var actionFreeTextColumn_1 = action.freeTextColumn;
            if (!actionFreeTextColumn_1.Uuid) {
                actionFreeTextColumn_1.Uuid = Uuid_1.createUuid();
            }
            freeTextColumns = [].concat(state.FreeTextColumns);
            freeTextColumns.push(actionFreeTextColumn_1);
            return tslib_1.__assign(tslib_1.__assign({}, state), { FreeTextColumns: freeTextColumns });
        }
        case exports.FREE_TEXT_COLUMN_EDIT:
            var actionFreeTextColumn_2 = action.freeTextColumn;
            return tslib_1.__assign(tslib_1.__assign({}, state), { FreeTextColumns: state.FreeTextColumns.map(function (abObject) {
                    return abObject.Uuid === actionFreeTextColumn_2.Uuid ? actionFreeTextColumn_2 : abObject;
                }) });
        case exports.FREE_TEXT_COLUMN_DELETE: {
            var actionFreeTextColumn_3 = action.freeTextColumn;
            return tslib_1.__assign(tslib_1.__assign({}, state), { FreeTextColumns: state.FreeTextColumns.filter(function (abObject) { return abObject.Uuid !== actionFreeTextColumn_3.Uuid; }) });
        }
        case exports.FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE: {
            var actionTypedAddEditStoredValue_1 = action;
            var existingIndex = actionTypedAddEditStoredValue_1.FreeTextColumn.FreeTextStoredValues.findIndex(function (ftsv) { return ftsv.PrimaryKey == actionTypedAddEditStoredValue_1.FreeTextStoredValue.PrimaryKey; });
            if (existingIndex != -1) {
                actionTypedAddEditStoredValue_1.FreeTextColumn.FreeTextStoredValues[existingIndex] =
                    actionTypedAddEditStoredValue_1.FreeTextStoredValue;
            }
            else {
                actionTypedAddEditStoredValue_1.FreeTextColumn.FreeTextStoredValues.push(actionTypedAddEditStoredValue_1.FreeTextStoredValue);
            }
            freeTextColumns = [].concat(state.FreeTextColumns);
            var index = freeTextColumns.findIndex(function (x) { return x.ColumnId == actionTypedAddEditStoredValue_1.FreeTextColumn.ColumnId; });
            freeTextColumns[index] = actionTypedAddEditStoredValue_1.FreeTextColumn;
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        }
        default:
            return state;
    }
};
