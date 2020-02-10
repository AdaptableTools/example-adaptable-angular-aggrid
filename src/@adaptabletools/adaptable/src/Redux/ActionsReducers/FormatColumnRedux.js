"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.FORMAT_COLUMN_ADD = 'FORMAT_COLUMN_ADD';
exports.FORMAT_COLUMN_EDIT = 'FORMAT_COLUMN_EDIT';
exports.FORMAT_COLUMN_DELETE = 'FORMAT_COLUMN_DELETE';
exports.FormatColumnAdd = function (formatColumn) { return ({
    type: exports.FORMAT_COLUMN_ADD,
    formatColumn: formatColumn,
}); };
exports.FormatColumnEdit = function (formatColumn) { return ({
    type: exports.FORMAT_COLUMN_EDIT,
    formatColumn: formatColumn,
}); };
exports.FormatColumnDelete = function (formatColumn) { return ({
    type: exports.FORMAT_COLUMN_DELETE,
    formatColumn: formatColumn,
}); };
var initialFormatColumnState = {
    FormatColumns: GeneralConstants_1.EMPTY_ARRAY,
};
exports.FormatColumnReducer = function (state, action) {
    if (state === void 0) { state = initialFormatColumnState; }
    var formatColumns;
    switch (action.type) {
        case exports.FORMAT_COLUMN_ADD: {
            var actionFormatColumn_1 = action.formatColumn;
            if (!actionFormatColumn_1.Uuid) {
                actionFormatColumn_1.Uuid = Uuid_1.createUuid();
            }
            formatColumns = [].concat(state.FormatColumns);
            formatColumns.push(actionFormatColumn_1);
            return tslib_1.__assign(tslib_1.__assign({}, state), { FormatColumns: formatColumns });
        }
        case exports.FORMAT_COLUMN_EDIT:
            var actionFormatColumn_2 = action.formatColumn;
            return tslib_1.__assign(tslib_1.__assign({}, state), { FormatColumns: state.FormatColumns.map(function (abObject) {
                    return abObject.Uuid === actionFormatColumn_2.Uuid ? actionFormatColumn_2 : abObject;
                }) });
        case exports.FORMAT_COLUMN_DELETE: {
            var actionFormatColumn_3 = action.formatColumn;
            return tslib_1.__assign(tslib_1.__assign({}, state), { FormatColumns: state.FormatColumns.filter(function (abObject) { return abObject.Uuid !== actionFormatColumn_3.Uuid; }) });
        }
        default:
            return state;
    }
};
