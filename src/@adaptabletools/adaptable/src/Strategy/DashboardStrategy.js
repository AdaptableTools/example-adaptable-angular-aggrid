"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var DashboardRedux = require("../Redux/ActionsReducers/DashboardRedux");
var Helper_1 = require("../Utilities/Helpers/Helper");
var AdaptableHelper_1 = require("../Utilities/Helpers/AdaptableHelper");
var DashboardStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardStrategy, _super);
    function DashboardStrategy(adaptable) {
        return _super.call(this, StrategyConstants.DashboardStrategyId, adaptable) || this;
    }
    DashboardStrategy.prototype.InitState = function () {
        var _this = this;
        if (this.visibleToolbars != this.adaptable.api.dashboardApi.getDashboardState().VisibleToolbars) {
            var oldVisibleToolbars_1 = Helper_1.arrayToKeyMap(this.visibleToolbars);
            var newVisibleToolbars_1 = Helper_1.arrayToKeyMap(this.adaptable.api.dashboardApi.getDashboardState().VisibleToolbars);
            tslib_1.__spread((this.adaptable.api.dashboardApi.getDashboardState().VisibleToolbars || [])).forEach(function (toolbar) {
                if (!oldVisibleToolbars_1[toolbar]) {
                    if (_this.adaptable.api.dashboardApi.getDashboardState().DashboardVisibility ==
                        Enums_1.Visibility.Visible) {
                        _this.fireToolbarVisibilityChangedEvent(toolbar, 'Visible');
                    }
                }
            });
            tslib_1.__spread((this.visibleToolbars || [])).forEach(function (toolbar) {
                if (!newVisibleToolbars_1[toolbar]) {
                    _this.fireToolbarVisibilityChangedEvent(toolbar, 'Hidden');
                }
            });
            this.visibleToolbars = this.adaptable.api.dashboardApi.getDashboardState().VisibleToolbars;
        }
        if (this.dashboardVisibility !=
            this.adaptable.api.dashboardApi.getDashboardState().DashboardVisibility) {
            this.dashboardVisibility = this.adaptable.api.dashboardApi.getDashboardState()
                .DashboardVisibility;
            if (this.dashboardVisibility == Enums_1.Visibility.Visible) {
                tslib_1.__spread((this.adaptable.api.dashboardApi.getDashboardState().VisibleToolbars || [])).forEach(function (toolbar) {
                    if (_this.adaptable.api.dashboardApi.getDashboardState().DashboardVisibility ==
                        Enums_1.Visibility.Visible) {
                        _this.fireToolbarVisibilityChangedEvent(toolbar, 'Visible');
                    }
                });
            }
        }
    };
    DashboardStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.DashboardStrategyFriendlyName,
            ComponentName: ScreenPopups.DashboardPopup,
            Icon: StrategyConstants.DashboardGlyph,
        });
    };
    DashboardStrategy.prototype.addColumnMenuItem = function () {
        // for now just show / hide = lets worry about minimise later..
        if (this.adaptable.api.dashboardApi.getDashboardState().DashboardVisibility == Enums_1.Visibility.Hidden) {
            return this.createColumnMenuItemReduxAction('Show Dashboard', StrategyConstants.DashboardGlyph, DashboardRedux.DashboardSetVisibility(Enums_1.Visibility.Visible));
        }
        else {
            return this.createColumnMenuItemReduxAction('Hide Dashboard', StrategyConstants.DashboardGlyph, DashboardRedux.DashboardSetVisibility(Enums_1.Visibility.Hidden));
        }
    };
    DashboardStrategy.prototype.fireToolbarVisibilityChangedEvent = function (toolbar, visibility) {
        var toolbarVisibilityChangedInfo = {
            toolbar: toolbar,
            visibility: visibility,
        };
        var toolbarVisibilityChangedEventArgs = AdaptableHelper_1.default.createFDC3Message('Toolbar Visibility Changed Args', toolbarVisibilityChangedInfo);
        this.adaptable.api.eventApi.emit('ToolbarVisibilityChanged', toolbarVisibilityChangedEventArgs);
    };
    return DashboardStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.DashboardStrategy = DashboardStrategy;
