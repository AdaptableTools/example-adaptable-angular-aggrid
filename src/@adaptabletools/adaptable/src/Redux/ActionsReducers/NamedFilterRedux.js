"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.NAMED_FILTER_SET = 'NAMED_FILTER_SET';
exports.NamedFilterSet = function (NamedFilters) { return ({
    type: exports.NAMED_FILTER_SET,
    NamedFilters: NamedFilters,
}); };
var initialFilterState = {
    NamedFilters: GeneralConstants_1.EMPTY_ARRAY,
};
exports.NamedFilterReducer = function (state, action) {
    if (state === void 0) { state = initialFilterState; }
    switch (action.type) {
        case exports.NAMED_FILTER_SET:
            return Object.assign({}, state, {
                NamedFilters: action.NamedFilters,
            });
        default:
            return state;
    }
};
