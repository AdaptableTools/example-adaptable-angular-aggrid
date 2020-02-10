"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.CUSTOM_SORT_ADD = 'CUSTOM_SORT_ADD';
exports.CUSTOM_SORT_EDIT = 'CUSTOM_SORT_EDIT';
exports.CUSTOM_SORT_DELETE = 'CUSTOM_SORT_DELETE';
exports.CustomSortAdd = function (customSort) { return ({
    type: exports.CUSTOM_SORT_ADD,
    customSort: customSort,
}); };
exports.CustomSortEdit = function (customSort) { return ({
    type: exports.CUSTOM_SORT_EDIT,
    customSort: customSort,
}); };
exports.CustomSortDelete = function (customSort) { return ({
    type: exports.CUSTOM_SORT_DELETE,
    customSort: customSort,
}); };
var initialCustomSortState = {
    CustomSorts: GeneralConstants_1.EMPTY_ARRAY,
};
exports.CustomSortReducer = function (state, action) {
    if (state === void 0) { state = initialCustomSortState; }
    var customSorts;
    switch (action.type) {
        case exports.CUSTOM_SORT_ADD: {
            var actionCustomSort = action.customSort;
            if (!actionCustomSort.Uuid) {
                actionCustomSort.Uuid = Uuid_1.createUuid();
            }
            customSorts = [].concat(state.CustomSorts);
            customSorts.push(actionCustomSort);
            return tslib_1.__assign(tslib_1.__assign({}, state), { CustomSorts: customSorts });
        }
        case exports.CUSTOM_SORT_EDIT: {
            var actionCustomSort_1 = action.customSort;
            return tslib_1.__assign(tslib_1.__assign({}, state), { CustomSorts: state.CustomSorts.map(function (abObject) {
                    return abObject.Uuid === actionCustomSort_1.Uuid ? actionCustomSort_1 : abObject;
                }) });
        }
        case exports.CUSTOM_SORT_DELETE: {
            var actionCustomSort_2 = action.customSort;
            return tslib_1.__assign(tslib_1.__assign({}, state), { CustomSorts: state.CustomSorts.filter(function (abObject) { return abObject.Uuid !== actionCustomSort_2.Uuid; }) });
        }
        default:
            return state;
    }
};
