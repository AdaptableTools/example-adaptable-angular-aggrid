"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIHelper_1 = require("../../View/UIHelper");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.UPDATED_ROW_ENABLE_DISABLE = 'UPDATED_ROW_ENABLE_DISABLE';
exports.JUMP_TO_ROW_ENABLE_DISABLE = 'JUMP_TO_ROW_ENABLE_DISABLE';
exports.UP_COLOR_SET = 'UP_COLOR_SET';
exports.DOWN_COLOR_SET = 'DOWN_COLOR_SET';
exports.NEUTRAL_COLOR_SET = 'NEUTRAL_COLOR_SET';
exports.MAX_ITEMS_SET = 'MAX_ITEMS_SET';
exports.UpdatedRowEnableDisable = function (shouldEnable) { return ({
    type: exports.UPDATED_ROW_ENABLE_DISABLE,
    shouldEnable: shouldEnable,
}); };
exports.JumpToRowEnableDisable = function (shouldEnable) { return ({
    type: exports.JUMP_TO_ROW_ENABLE_DISABLE,
    shouldEnable: shouldEnable,
}); };
exports.UpColorSet = function (upColor) { return ({
    type: exports.UP_COLOR_SET,
    upColor: upColor,
}); };
exports.DownColorSet = function (downColor) { return ({
    type: exports.DOWN_COLOR_SET,
    downColor: downColor,
}); };
exports.NeutralColorSet = function (neutralColor) { return ({
    type: exports.NEUTRAL_COLOR_SET,
    neutralColor: neutralColor,
}); };
exports.MaxItemsSet = function (maxItems) { return ({
    type: exports.MAX_ITEMS_SET,
    maxItems: maxItems,
}); };
var initialUpdatedRowState = {
    EnableUpdatedRow: false,
    UpColor: UIHelper_1.getHexForName(UIHelper_1.GREEN),
    DownColor: UIHelper_1.getHexForName(UIHelper_1.RED),
    NeutralColor: UIHelper_1.getHexForName(UIHelper_1.GRAY),
    Duration: GeneralConstants_1.UPDATED_ROWS_DEFAULT_DURATION,
    JumpToRow: false,
    MaxUpdatedRowsInStore: GeneralConstants_1.UPDATED_ROW_DEFAULT_MAX_ALERTS_IN_STORE,
};
exports.UpdatedRowReducer = function (state, action) {
    if (state === void 0) { state = initialUpdatedRowState; }
    switch (action.type) {
        case exports.UPDATED_ROW_ENABLE_DISABLE: {
            var shouldEnable = action.shouldEnable;
            return Object.assign({}, state, {
                EnableUpdatedRow: shouldEnable,
            });
        }
        case exports.JUMP_TO_ROW_ENABLE_DISABLE: {
            var shouldEnable = action.shouldEnable;
            return Object.assign({}, state, {
                JumpToRow: shouldEnable,
            });
        }
        case exports.UP_COLOR_SET: {
            var upColor = action.upColor;
            return Object.assign({}, state, {
                UpColor: upColor,
            });
        }
        case exports.DOWN_COLOR_SET: {
            var downColor = action.downColor;
            return Object.assign({}, state, {
                DownColor: downColor,
            });
        }
        case exports.NEUTRAL_COLOR_SET: {
            var neutralColor = action.neutralColor;
            return Object.assign({}, state, {
                NeutralColor: neutralColor,
            });
        }
        case exports.MAX_ITEMS_SET: {
            var maxItems = action.maxItems;
            return Object.assign({}, state, {
                MaxUpdatedRowsInStore: maxItems,
            });
        }
        default:
            return state;
    }
};
