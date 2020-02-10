"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.GRADIENT_COLUMN_ADD = 'GRADIENT_COLUMN_ADD';
exports.GRADIENT_COLUMN_EDIT = 'GRADIENT_COLUMN_EDIT';
exports.GRADIENT_COLUMN_DELETE = 'GRADIENT_COLUMN_DELETE';
exports.GradientColumnAdd = function (GradientColumn) { return ({
    type: exports.GRADIENT_COLUMN_ADD,
    GradientColumn: GradientColumn,
}); };
exports.GradientColumnEdit = function (GradientColumn) { return ({
    type: exports.GRADIENT_COLUMN_EDIT,
    GradientColumn: GradientColumn,
}); };
exports.GradientColumnDelete = function (GradientColumn) { return ({
    type: exports.GRADIENT_COLUMN_DELETE,
    GradientColumn: GradientColumn,
}); };
var initialGradientColumnState = {
    GradientColumns: GeneralConstants_1.EMPTY_ARRAY,
};
exports.GradientColumnReducer = function (state, action) {
    if (state === void 0) { state = initialGradientColumnState; }
    var GradientColumns;
    switch (action.type) {
        case exports.GRADIENT_COLUMN_ADD: {
            var actionGradientColumn = action.GradientColumn;
            if (!actionGradientColumn.Uuid) {
                actionGradientColumn.Uuid = Uuid_1.createUuid();
            }
            GradientColumns = [].concat(state.GradientColumns);
            GradientColumns.push(actionGradientColumn);
            return tslib_1.__assign(tslib_1.__assign({}, state), { GradientColumns: GradientColumns });
        }
        case exports.GRADIENT_COLUMN_EDIT: {
            var actionGradientColumn_1 = action.GradientColumn;
            return tslib_1.__assign(tslib_1.__assign({}, state), { GradientColumns: state.GradientColumns.map(function (abObject) {
                    return abObject.Uuid === actionGradientColumn_1.Uuid ? actionGradientColumn_1 : abObject;
                }) });
        }
        case exports.GRADIENT_COLUMN_DELETE: {
            var actionGradientColumn_2 = action.GradientColumn;
            return tslib_1.__assign(tslib_1.__assign({}, state), { GradientColumns: state.GradientColumns.filter(function (abObject) { return abObject.Uuid !== actionGradientColumn_2.Uuid; }) });
        }
        default:
            return state;
    }
};
