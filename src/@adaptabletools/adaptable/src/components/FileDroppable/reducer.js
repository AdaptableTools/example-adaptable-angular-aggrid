"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ActionTypes;
(function (ActionTypes) {
    ActionTypes["DRAG_OVER"] = "DRAG_OVER";
    ActionTypes["DRAG_OUT"] = "DRAG_OUT";
    ActionTypes["SET_INVALID_FILE"] = "SET_INVALID_FILE";
    ActionTypes["DROP_SUCCES"] = "DROP_SUCCES";
})(ActionTypes = exports.ActionTypes || (exports.ActionTypes = {}));
var reducer = function (state, action) {
    if (action.type === ActionTypes.DRAG_OVER) {
        return tslib_1.__assign(tslib_1.__assign({}, state), { dragOver: true });
    }
    if (action.type === ActionTypes.DRAG_OUT) {
        return tslib_1.__assign(tslib_1.__assign({}, state), { dragOver: false });
    }
    if (action.type === ActionTypes.SET_INVALID_FILE) {
        return tslib_1.__assign(tslib_1.__assign({}, state), { message: action.payload.message });
    }
    if (action.type === ActionTypes.DROP_SUCCES) {
        return tslib_1.__assign(tslib_1.__assign({}, state), { dragOver: false, message: action.payload.message });
    }
    return state;
};
exports.default = reducer;
