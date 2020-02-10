"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.QUICK_SEARCH_APPLY = 'QUICK_SEARCH_APPLY';
exports.QUICK_SEARCH_SET_DISPLAY = 'QUICK_SEARCH_SET_DISPLAY';
exports.QUICK_SEARCH_SET_STYLE = 'QUICK_SEARCH_SET_STYLE';
exports.QuickSearchApply = function (quickSearchText) { return ({
    type: exports.QUICK_SEARCH_APPLY,
    quickSearchText: quickSearchText,
}); };
exports.QuickSearchSetDisplay = function (DisplayAction) { return ({
    type: exports.QUICK_SEARCH_SET_DISPLAY,
    DisplayAction: DisplayAction,
}); };
exports.QuickSearchSetStyle = function (style) { return ({
    type: exports.QUICK_SEARCH_SET_STYLE,
    style: style,
}); };
var initialQuickSearchState = {
    QuickSearchText: GeneralConstants_1.EMPTY_STRING,
    DisplayAction: GeneralConstants_1.QUICK_SEARCH_DEFAULT_DISPLAY_ACTION,
    Style: {
        BackColor: GeneralConstants_1.QUICK_SEARCH_DEFAULT_BACK_COLOR,
        ForeColor: GeneralConstants_1.QUICK_SEARCH_DEFAULT_FORE_COLOR,
    },
};
exports.QuickSearchReducer = function (state, action) {
    if (state === void 0) { state = initialQuickSearchState; }
    switch (action.type) {
        case exports.QUICK_SEARCH_APPLY:
            return Object.assign({}, state, {
                QuickSearchText: action.quickSearchText,
            });
        case exports.QUICK_SEARCH_SET_DISPLAY:
            return Object.assign({}, state, {
                DisplayAction: action.DisplayAction,
            });
        case exports.QUICK_SEARCH_SET_STYLE:
            return Object.assign({}, state, { Style: action.style });
        default:
            return state;
    }
};
