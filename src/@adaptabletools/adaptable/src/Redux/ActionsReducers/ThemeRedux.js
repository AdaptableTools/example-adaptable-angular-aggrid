"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var THEME_SET_SYSTEM_THEMES = 'THEME_SET_SYSTEM_THEMES';
var THEME_SET_USER_THEMES = 'THEME_SET_USER_THEMES';
exports.THEME_SELECT = 'THEME_SELECT';
exports.ThemeSetSystemThemes = function (SystemThemes) { return ({
    type: THEME_SET_SYSTEM_THEMES,
    SystemThemes: SystemThemes,
}); };
exports.ThemeSetUserThemes = function (UserThemes) { return ({
    type: THEME_SET_USER_THEMES,
    UserThemes: UserThemes,
}); };
exports.ThemeSelect = function (Theme) { return ({
    type: exports.THEME_SELECT,
    Theme: Theme,
}); };
var initialThemeState = {
    CurrentTheme: GeneralConstants_1.THEME_DEFAULT_CURRENT_THEME,
    SystemThemes: GeneralConstants_1.SYSTEM_THEMES,
    UserThemes: GeneralConstants_1.EMPTY_ARRAY,
};
exports.ThemeReducer = function (state, action) {
    if (state === void 0) { state = initialThemeState; }
    switch (action.type) {
        case THEME_SET_SYSTEM_THEMES:
            return Object.assign({}, state, {
                SystemThemes: action.SystemThemes,
            });
        case THEME_SET_USER_THEMES:
            return Object.assign({}, state, {
                UserThemes: action.UserThemes,
            });
        case exports.THEME_SELECT:
            return Object.assign({}, state, { CurrentTheme: action.Theme });
        default:
            return state;
    }
};
