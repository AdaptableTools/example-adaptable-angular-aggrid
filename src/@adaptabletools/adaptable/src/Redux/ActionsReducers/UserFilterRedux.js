"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.USER_FILTER_ADD = 'USER_FILTER_ADD';
exports.USER_FILTER_EDIT = 'USER_FILTER_EDIT';
exports.USER_FILTER_DELETE = 'USER_FILTER_DELETE';
exports.USER_FILTER_CREATE_FROM_COLUMN_FILTER = 'USER_FILTER_CREATE_FROM_COLUMN_FILTER';
exports.UserFilterAdd = function (userFilter) { return ({
    type: exports.USER_FILTER_ADD,
    userFilter: userFilter,
}); };
exports.UserFilterEdit = function (userFilter) { return ({
    type: exports.USER_FILTER_EDIT,
    userFilter: userFilter,
}); };
exports.UserFilterDelete = function (userFilter) { return ({
    type: exports.USER_FILTER_DELETE,
    userFilter: userFilter,
}); };
exports.CreateUserFilterFromColumnFilter = function (ColumnFilter, InputText) { return ({
    type: exports.USER_FILTER_CREATE_FROM_COLUMN_FILTER,
    ColumnFilter: ColumnFilter,
    InputText: InputText,
}); };
var initialFilterState = {
    UserFilters: GeneralConstants_1.EMPTY_ARRAY,
};
exports.UserFilterReducer = function (state, action) {
    if (state === void 0) { state = initialFilterState; }
    var index;
    var userFilters;
    switch (action.type) {
        case exports.USER_FILTER_ADD: {
            var actionUserFilter = action.userFilter;
            if (!actionUserFilter.Uuid) {
                actionUserFilter.Uuid = Uuid_1.createUuid();
            }
            userFilters = [].concat(state.UserFilters);
            userFilters.push(actionUserFilter);
            return tslib_1.__assign(tslib_1.__assign({}, state), { UserFilters: userFilters });
        }
        case exports.USER_FILTER_EDIT: {
            var actionUserFilter_1 = action.userFilter;
            return tslib_1.__assign(tslib_1.__assign({}, state), { UserFilters: state.UserFilters.map(function (abObject) {
                    return abObject.Uuid === actionUserFilter_1.Uuid ? actionUserFilter_1 : abObject;
                }) });
        }
        case exports.USER_FILTER_DELETE: {
            var actionUserFilter_2 = action.userFilter;
            return tslib_1.__assign(tslib_1.__assign({}, state), { UserFilters: state.UserFilters.filter(function (abObject) { return abObject.Uuid !== actionUserFilter_2.Uuid; }) });
        }
        default:
            return state;
    }
};
