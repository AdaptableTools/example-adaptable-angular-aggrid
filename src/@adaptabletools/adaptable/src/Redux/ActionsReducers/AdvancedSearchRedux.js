"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.ADVANCED_SEARCH_ADD = 'ADVANCED_SEARCH_ADD';
exports.ADVANCED_SEARCH_EDIT = 'ADVANCED_SEARCH_EDIT';
exports.ADVANCED_SEARCH_DELETE = 'ADVANCED_SEARCH_DELETE';
exports.ADVANCED_SEARCH_SELECT = 'ADVANCED_SEARCH_SELECT';
exports.AdvancedSearchAdd = function (advancedSearch) { return ({
    type: exports.ADVANCED_SEARCH_ADD,
    advancedSearch: advancedSearch,
}); };
exports.AdvancedSearchEdit = function (advancedSearch) { return ({
    type: exports.ADVANCED_SEARCH_EDIT,
    advancedSearch: advancedSearch,
}); };
exports.AdvancedSearchDelete = function (advancedSearch) { return ({
    type: exports.ADVANCED_SEARCH_DELETE,
    advancedSearch: advancedSearch,
}); };
exports.AdvancedSearchSelect = function (selectedSearchName) { return ({
    type: exports.ADVANCED_SEARCH_SELECT,
    selectedSearchName: selectedSearchName,
}); };
var initialAdvancedSearchState = {
    AdvancedSearches: GeneralConstants_1.EMPTY_ARRAY,
    CurrentAdvancedSearch: GeneralConstants_1.EMPTY_STRING,
};
exports.AdvancedSearchReducer = function (state, action) {
    if (state === void 0) { state = initialAdvancedSearchState; }
    switch (action.type) {
        case exports.ADVANCED_SEARCH_ADD: {
            var actionAdvancedSearch = action.advancedSearch;
            if (!actionAdvancedSearch.Uuid) {
                actionAdvancedSearch.Uuid = Uuid_1.createUuid();
            }
            return tslib_1.__assign(tslib_1.__assign({}, state), { AdvancedSearches: tslib_1.__spread(state.AdvancedSearches, [actionAdvancedSearch]) });
        }
        case exports.ADVANCED_SEARCH_EDIT: {
            var actionAdvancedSearch_1 = action.advancedSearch;
            return tslib_1.__assign(tslib_1.__assign({}, state), { AdvancedSearches: state.AdvancedSearches.map(function (abObject) {
                    return abObject.Uuid === actionAdvancedSearch_1.Uuid ? actionAdvancedSearch_1 : abObject;
                }) });
        }
        case exports.ADVANCED_SEARCH_DELETE: {
            var actionAdvancedSearch_2 = action.advancedSearch;
            var currentActiveSearch = state.AdvancedSearches.filter(function (s) { return s.Name === state.CurrentAdvancedSearch; })[0];
            var currentAdvancedSearchName = currentActiveSearch
                ? currentActiveSearch.Name
                : GeneralConstants_1.EMPTY_STRING;
            return tslib_1.__assign(tslib_1.__assign({}, state), { AdvancedSearches: state.AdvancedSearches.filter(function (abObject) { return abObject.Uuid !== actionAdvancedSearch_2.Uuid; }), CurrentAdvancedSearch: currentActiveSearch && currentActiveSearch.Uuid === actionAdvancedSearch_2.Uuid
                    ? GeneralConstants_1.EMPTY_STRING
                    : currentAdvancedSearchName });
        }
        case exports.ADVANCED_SEARCH_SELECT:
            return Object.assign({}, state, {
                CurrentAdvancedSearch: action.selectedSearchName,
            });
        default:
            return state;
    }
};
