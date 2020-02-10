"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilterService_1 = require("../../Utilities/Services/FilterService");
exports.SYSTEM_FILTER_SET = 'SYSTEM_FILTER_SET';
exports.SystemFilterSet = function (SystemFilters) { return ({
    type: exports.SYSTEM_FILTER_SET,
    SystemFilters: SystemFilters,
}); };
var initialFilterState = {
    SystemFilters: [
        FilterService_1.BLANKS_SYSTEM_FILTER,
        FilterService_1.NON_BLANKS_SYSTEM_FILTER,
        FilterService_1.TODAY_SYSTEM_FILTER,
        FilterService_1.IN_PAST_SYSTEM_FILTER,
        FilterService_1.IN_FUTURE_SYSTEM_FILTER,
        FilterService_1.YESTERDAY_SYSTEM_FILTER,
        FilterService_1.TOMORROW_SYSTEM_FILTER,
        FilterService_1.NEXT_WORKING_DAY_SYSTEM_FILTER,
        FilterService_1.PREVIOUS_WORKING_DAY_SYSTEM_FILTER,
        FilterService_1.THIS_YEAR_SYSTEM_FILTER,
        FilterService_1.POSITIVE_SYSTEM_FILTER,
        FilterService_1.NEGATIVE_SYSTEM_FILTER,
        FilterService_1.ZERO_SYSTEM_FILTER,
        FilterService_1.TRUE_SYSTEM_FILTER,
        FilterService_1.FALSE_SYSTEM_FILTER,
    ],
};
exports.SystemFilterReducer = function (state, action) {
    if (state === void 0) { state = initialFilterState; }
    switch (action.type) {
        case exports.SYSTEM_FILTER_SET:
            return Object.assign({}, state, {
                SystemFilters: action.SystemFilters,
            });
        default:
            return state;
    }
};
