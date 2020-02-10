"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.COLUMN_CATEGORY_ADD = 'COLUMN_CATEGORY_ADD';
exports.COLUMN_CATEGORY_EDIT = 'COLUMN_CATEGORY_EDIT';
exports.COLUMN_CATEGORY_DELETE = 'COLUMN_CATEGORY_DELETE';
exports.ColumnCategoryAdd = function (columnCategory) { return ({
    type: exports.COLUMN_CATEGORY_ADD,
    columnCategory: columnCategory,
}); };
exports.ColumnCategoryEdit = function (columnCategory) { return ({
    type: exports.COLUMN_CATEGORY_EDIT,
    columnCategory: columnCategory,
}); };
exports.ColumnCategoryDelete = function (columnCategory) { return ({
    type: exports.COLUMN_CATEGORY_DELETE,
    columnCategory: columnCategory,
}); };
var initialColumnCategoryState = {
    ColumnCategories: GeneralConstants_1.EMPTY_ARRAY,
};
exports.ColumnCategoryReducer = function (state, action) {
    if (state === void 0) { state = initialColumnCategoryState; }
    var columnCategories;
    switch (action.type) {
        case exports.COLUMN_CATEGORY_ADD: {
            var actionColumnCategory = action.columnCategory;
            if (!actionColumnCategory.Uuid) {
                actionColumnCategory.Uuid = Uuid_1.createUuid();
            }
            columnCategories = [].concat(state.ColumnCategories);
            columnCategories.push(actionColumnCategory);
            return tslib_1.__assign(tslib_1.__assign({}, state), { ColumnCategories: columnCategories });
        }
        case exports.COLUMN_CATEGORY_EDIT: {
            var actionColumnCategory_1 = action.columnCategory;
            return tslib_1.__assign(tslib_1.__assign({}, state), { ColumnCategories: state.ColumnCategories.map(function (abObject) {
                    return abObject.Uuid === actionColumnCategory_1.Uuid ? actionColumnCategory_1 : abObject;
                }) });
        }
        case exports.COLUMN_CATEGORY_DELETE: {
            var actionColumnCategory_2 = action.columnCategory;
            return tslib_1.__assign(tslib_1.__assign({}, state), { ColumnCategories: state.ColumnCategories.filter(function (abObject) { return abObject.Uuid !== actionColumnCategory_2.Uuid; }) });
        }
        default:
            return state;
    }
};
