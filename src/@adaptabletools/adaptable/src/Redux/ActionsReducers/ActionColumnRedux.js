"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.ACTION_COLUMNS_SET = 'ACTION_COLUMNS_SET';
exports.ActionColumnsSet = function (ActionColumns) { return ({
    type: exports.ACTION_COLUMNS_SET,
    ActionColumns: ActionColumns,
}); };
var initialFilterState = {
    ActionColumns: GeneralConstants_1.EMPTY_ARRAY,
};
exports.ActionColumnReducer = function (state, action) {
    if (state === void 0) { state = initialFilterState; }
    switch (action.type) {
        case exports.ACTION_COLUMNS_SET:
            return Object.assign({}, state, {
                ActionColumns: action.ActionColumns,
            });
        default:
            return state;
    }
};
