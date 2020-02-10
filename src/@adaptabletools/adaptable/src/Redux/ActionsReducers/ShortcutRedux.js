"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.SHORTCUT_APPLY = 'SHORTCUT_APPLY';
exports.SHORTCUT_ADD = 'SHORTCUT_ADD';
exports.SHORTCUT_EDIT = 'SHORTCUT_EDIT';
exports.SHORTCUT_DELETE = 'SHORTCUT_DELETE';
exports.ShortcutApply = function (Shortcut, GridCell, KeyEventString, NewValue) { return ({
    type: exports.SHORTCUT_APPLY,
    Shortcut: Shortcut,
    GridCell: GridCell,
    KeyEventString: KeyEventString,
    NewValue: NewValue,
}); };
exports.ShortcutAdd = function (shortcut) { return ({
    type: exports.SHORTCUT_ADD,
    shortcut: shortcut,
}); };
exports.ShortcutEdit = function (shortcut) { return ({
    type: exports.SHORTCUT_EDIT,
    shortcut: shortcut,
}); };
exports.ShortcutDelete = function (shortcut) { return ({
    type: exports.SHORTCUT_DELETE,
    shortcut: shortcut,
}); };
var initialShortcutState = {
    Shortcuts: GeneralConstants_1.EMPTY_ARRAY,
};
exports.ShortcutReducer = function (state, action) {
    if (state === void 0) { state = initialShortcutState; }
    var shortcuts;
    switch (action.type) {
        case exports.SHORTCUT_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state);
        case exports.SHORTCUT_ADD: {
            var actionShortcut = action.shortcut;
            if (!actionShortcut.Uuid) {
                actionShortcut.Uuid = Uuid_1.createUuid();
            }
            shortcuts = [].concat(state.Shortcuts);
            shortcuts.push(actionShortcut);
            return tslib_1.__assign(tslib_1.__assign({}, state), { Shortcuts: shortcuts });
        }
        case exports.SHORTCUT_EDIT: {
            var actionShortcut_1 = action.shortcut;
            return tslib_1.__assign(tslib_1.__assign({}, state), { Shortcuts: state.Shortcuts.map(function (abObject) {
                    return abObject.Uuid === actionShortcut_1.Uuid ? actionShortcut_1 : abObject;
                }) });
        }
        case exports.SHORTCUT_DELETE: {
            var actionShortcut_2 = action.shortcut;
            return tslib_1.__assign(tslib_1.__assign({}, state), { Shortcuts: state.Shortcuts.filter(function (abObject) { return abObject.Uuid !== actionShortcut_2.Uuid; }) });
        }
        default:
            return state;
    }
};
