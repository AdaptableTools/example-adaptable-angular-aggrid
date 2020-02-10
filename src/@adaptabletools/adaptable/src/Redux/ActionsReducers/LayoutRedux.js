"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.LAYOUT_ADD = 'LAYOUT_ADD';
exports.LAYOUT_EDIT = 'LAYOUT_EDIT';
exports.LAYOUT_DELETE = 'LAYOUT_DELETE';
exports.LAYOUT_SELECT = 'LAYOUT_SELECT';
exports.LAYOUT_SAVE = 'LAYOUT_SAVE';
exports.LAYOUT_RESTORE = 'LAYOUT_RESTORE';
exports.LayoutAdd = function (layout) { return ({
    type: exports.LAYOUT_ADD,
    layout: layout,
}); };
exports.LayoutEdit = function (layout) { return ({
    type: exports.LAYOUT_EDIT,
    layout: layout,
}); };
exports.LayoutDelete = function (layout) { return ({
    type: exports.LAYOUT_DELETE,
    layout: layout,
}); };
exports.LayoutSave = function (layout) { return ({
    type: exports.LAYOUT_SAVE,
    layout: layout,
}); };
exports.LayoutSelect = function (LayoutName) { return ({
    type: exports.LAYOUT_SELECT,
    LayoutName: LayoutName,
}); };
exports.LayoutRestore = function (layout) { return ({
    type: exports.LAYOUT_RESTORE,
    layout: layout,
}); };
var initialLayoutState = {
    CurrentLayout: GeneralConstants_1.EMPTY_STRING,
    Layouts: GeneralConstants_1.EMPTY_ARRAY,
};
exports.LayoutReducer = function (state, action) {
    if (state === void 0) { state = initialLayoutState; }
    var layouts;
    switch (action.type) {
        //  case LAYOUT_SAVE: // we do nothing here as its all done in the store
        //      return state
        case exports.LAYOUT_SELECT:
            return Object.assign({}, state, { CurrentLayout: action.LayoutName });
        case exports.LAYOUT_ADD: {
            var actionLayout = action.layout;
            if (!actionLayout.Uuid) {
                actionLayout.Uuid = Uuid_1.createUuid();
            }
            layouts = [].concat(state.Layouts);
            layouts.push(actionLayout);
            return tslib_1.__assign(tslib_1.__assign({}, state), { Layouts: layouts });
        }
        case exports.LAYOUT_EDIT: {
            var actionLayout_1 = action.layout;
            return tslib_1.__assign(tslib_1.__assign({}, state), { Layouts: state.Layouts.map(function (abObject) {
                    return abObject.Uuid === actionLayout_1.Uuid ? actionLayout_1 : abObject;
                }) });
        }
        case exports.LAYOUT_DELETE: {
            var actionLayout_2 = action.layout;
            return tslib_1.__assign(tslib_1.__assign({}, state), { Layouts: state.Layouts.filter(function (abObject) { return abObject.Uuid !== actionLayout_2.Uuid; }) });
        }
        default:
            return state;
    }
};
