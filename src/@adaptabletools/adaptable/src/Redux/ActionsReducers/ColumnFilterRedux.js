"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.COLUMN_FILTER_ADD = 'COLUMN_FILTER_ADD';
exports.COLUMN_FILTER_EDIT = 'COLUMN_FILTER_EDIT';
exports.COLUMN_FILTER_SET = 'COLUMN_FILTER_SET';
exports.COLUMN_FILTER_CLEAR_ALL = 'COLUMN_FILTER_CLEAR_ALL';
exports.COLUMN_FILTER_CLEAR = 'COLUMN_FILTER_CLEAR';
exports.ColumnFilterAdd = function (columnFilter) { return ({
    type: exports.COLUMN_FILTER_ADD,
    columnFilter: columnFilter,
}); };
exports.ColumnFilterEdit = function (columnFilter) { return ({
    type: exports.COLUMN_FILTER_EDIT,
    columnFilter: columnFilter,
}); };
exports.ColumnFilterSet = function (columnFilter) { return ({
    type: exports.COLUMN_FILTER_SET,
    columnFilter: columnFilter,
}); };
exports.ColumnFilterClearAll = function () { return ({
    type: exports.COLUMN_FILTER_CLEAR_ALL,
}); };
exports.ColumnFilterClear = function (columnFilter) { return ({
    type: exports.COLUMN_FILTER_CLEAR,
    columnFilter: columnFilter,
}); };
var initialFilterState = {
    ColumnFilters: GeneralConstants_1.EMPTY_ARRAY,
};
exports.ColumnFilterReducer = function (state, action) {
    if (state === void 0) { state = initialFilterState; }
    var columnFilters;
    switch (action.type) {
        case exports.COLUMN_FILTER_SET: {
            var actionColumnFilter_1 = action.columnFilter;
            if (!actionColumnFilter_1.Uuid) {
                actionColumnFilter_1.Uuid = Uuid_1.createUuid();
            }
            var exists = state.ColumnFilters.find(function (cf) { return cf.Uuid == actionColumnFilter_1.Uuid; });
            if (exists) {
                return tslib_1.__assign(tslib_1.__assign({}, state), { ColumnFilters: state.ColumnFilters.map(function (abObject) {
                        return abObject.Uuid === actionColumnFilter_1.Uuid ? actionColumnFilter_1 : abObject;
                    }) });
            }
            else {
                columnFilters = [].concat(state.ColumnFilters);
                columnFilters.push(actionColumnFilter_1);
                return tslib_1.__assign(tslib_1.__assign({}, state), { ColumnFilters: columnFilters });
            }
        }
        case exports.COLUMN_FILTER_ADD: {
            var actionColumnFilter = action.columnFilter;
            if (!actionColumnFilter.Uuid) {
                actionColumnFilter.Uuid = Uuid_1.createUuid();
            }
            columnFilters = [].concat(state.ColumnFilters);
            columnFilters.push(actionColumnFilter);
            return tslib_1.__assign(tslib_1.__assign({}, state), { ColumnFilters: columnFilters });
        }
        case exports.COLUMN_FILTER_EDIT: {
            var actionColumnFilter_2 = action.columnFilter;
            return tslib_1.__assign(tslib_1.__assign({}, state), { ColumnFilters: state.ColumnFilters.map(function (abObject) {
                    return abObject.Uuid === actionColumnFilter_2.Uuid ? actionColumnFilter_2 : abObject;
                }) });
        }
        case exports.COLUMN_FILTER_CLEAR_ALL: {
            return Object.assign({}, state, { ColumnFilters: [] });
        }
        case exports.COLUMN_FILTER_CLEAR: {
            var actionTypedDelete_1 = action;
            columnFilters = [].concat(state.ColumnFilters);
            var index = actionTypedDelete_1.columnFilter
                ? columnFilters.findIndex(function (i) { return i.Uuid == actionTypedDelete_1.columnFilter.Uuid; })
                : -1;
            if (index != -1) {
                columnFilters.splice(index, 1);
            }
            return Object.assign({}, state, { ColumnFilters: columnFilters });
        }
        default:
            return state;
    }
};
