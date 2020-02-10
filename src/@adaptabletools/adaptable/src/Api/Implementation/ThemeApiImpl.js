"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ThemeRedux = require("../../Redux/ActionsReducers/ThemeRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ApiBase_1 = require("./ApiBase");
var ThemeApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ThemeApiImpl, _super);
    function ThemeApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThemeApiImpl.prototype.getThemeState = function () {
        return this.getAdaptableState().Theme;
    };
    ThemeApiImpl.prototype.loadTheme = function (theme) {
        this.dispatchAction(ThemeRedux.ThemeSelect(theme));
    };
    ThemeApiImpl.prototype.loadLightTheme = function () {
        this.loadTheme('light');
    };
    ThemeApiImpl.prototype.loadDarkTheme = function () {
        this.loadTheme('dark');
    };
    ThemeApiImpl.prototype.getCurrentTheme = function () {
        return this.getAdaptableState().Theme.CurrentTheme;
    };
    ThemeApiImpl.prototype.setSystemThemes = function (systemThemes) {
        this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes));
    };
    ThemeApiImpl.prototype.setUserThemes = function (userThemes) {
        this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes));
    };
    ThemeApiImpl.prototype.getAllSystemTheme = function () {
        var themes = this.getAdaptableState().Theme.SystemThemes;
        return themes.map(function (theme) {
            if (typeof theme === 'string') {
                return {
                    Name: theme,
                    Description: theme,
                };
            }
            return theme;
        });
    };
    ThemeApiImpl.prototype.getAllUserTheme = function () {
        return this.getAdaptableState().Theme.UserThemes;
    };
    ThemeApiImpl.prototype.getAllTheme = function () {
        return tslib_1.__spread(this.getAllSystemTheme(), this.getAllUserTheme());
    };
    ThemeApiImpl.prototype.showThemePopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.ThemeStrategyId, ScreenPopups.ThemePopup);
    };
    return ThemeApiImpl;
}(ApiBase_1.ApiBase));
exports.ThemeApiImpl = ThemeApiImpl;
