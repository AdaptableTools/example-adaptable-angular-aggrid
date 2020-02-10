"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.PERCENT_BAR_ADD = 'PERCENT_BAR_ADD';
exports.PERCENT_BAR_EDIT = 'PERCENT_BAR_EDIT';
exports.PERCENT_BAR_DELETE = 'PERCENT_BAR_DELETE';
exports.PercentBarAdd = function (percentBar) { return ({
    type: exports.PERCENT_BAR_ADD,
    percentBar: percentBar,
}); };
exports.PercentBarEdit = function (percentBar) { return ({
    type: exports.PERCENT_BAR_EDIT,
    percentBar: percentBar,
}); };
exports.PercentBarDelete = function (percentBar) { return ({
    type: exports.PERCENT_BAR_DELETE,
    percentBar: percentBar,
}); };
var initialPercentBarState = {
    PercentBars: GeneralConstants_1.EMPTY_ARRAY,
};
exports.PercentBarReducer = function (state, action) {
    if (state === void 0) { state = initialPercentBarState; }
    var percentBars;
    switch (action.type) {
        case exports.PERCENT_BAR_ADD: {
            var actionPercentBar = action.percentBar;
            if (!actionPercentBar.Uuid) {
                actionPercentBar.Uuid = Uuid_1.createUuid();
            }
            percentBars = [].concat(state.PercentBars);
            percentBars.push(actionPercentBar);
            return tslib_1.__assign(tslib_1.__assign({}, state), { PercentBars: percentBars });
        }
        case exports.PERCENT_BAR_EDIT: {
            var actionPercentBar_1 = action.percentBar;
            return tslib_1.__assign(tslib_1.__assign({}, state), { PercentBars: state.PercentBars.map(function (abObject) {
                    return abObject.Uuid === actionPercentBar_1.Uuid ? actionPercentBar_1 : abObject;
                }) });
        }
        case exports.PERCENT_BAR_DELETE: {
            var actionPercentBar_2 = action.percentBar;
            return tslib_1.__assign(tslib_1.__assign({}, state), { PercentBars: state.PercentBars.filter(function (abObject) { return abObject.Uuid !== actionPercentBar_2.Uuid; }) });
        }
        default:
            return state;
    }
};
