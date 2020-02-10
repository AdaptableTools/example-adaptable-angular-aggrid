"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var AdaptableHelper_1 = require("../Utilities/Helpers/AdaptableHelper");
var ThemeStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ThemeStrategy, _super);
    function ThemeStrategy(adaptable) {
        return _super.call(this, StrategyConstants.ThemeStrategyId, adaptable) || this;
    }
    ThemeStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.ThemeStrategyFriendlyName,
            ComponentName: ScreenPopups.ThemePopup,
            Icon: StrategyConstants.ThemeGlyph,
        });
    };
    ThemeStrategy.prototype.publishThemeChanged = function (themeState) {
        var themeName = themeState.CurrentTheme;
        var themeChangedInfo = {
            themeName: themeState.CurrentTheme,
        };
        var themeChangedEventArgs = AdaptableHelper_1.default.createFDC3Message('Theme Changed Args', themeChangedInfo);
        this.adaptable.api.eventApi.emit('ThemeChanged', themeChangedEventArgs);
    };
    ThemeStrategy.prototype.InitState = function () {
        var _this = this;
        if (this.ThemeState != this.adaptable.api.themeApi.getThemeState()) {
            this.ThemeState = this.adaptable.api.themeApi.getThemeState();
            var allThemeNames = tslib_1.__spread((this.ThemeState.SystemThemes || []), (this.ThemeState.UserThemes || []));
            var currentTheme = allThemeNames.filter(function (theme) {
                return typeof theme === 'string'
                    ? theme === _this.ThemeState.CurrentTheme
                    : theme.Name === _this.ThemeState.CurrentTheme;
            })[0];
            if (!currentTheme) {
                return;
            }
            this.adaptable.applyAdaptableTheme(currentTheme);
            // publish the theme changed event even on initialization
            this.publishThemeChanged(this.ThemeState);
        }
    };
    return ThemeStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.ThemeStrategy = ThemeStrategy;
