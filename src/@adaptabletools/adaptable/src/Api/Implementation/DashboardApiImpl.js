"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var ApiBase_1 = require("./ApiBase");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var DashboardApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardApiImpl, _super);
    function DashboardApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardApiImpl.prototype.getDashboardState = function () {
        return this.getAdaptableState().Dashboard;
    };
    DashboardApiImpl.prototype.getCustomToolbars = function () {
        return this.getDashboardState().CustomToolbars;
    };
    DashboardApiImpl.prototype.setAvailableToolbars = function (availableToolbars) {
        this.dispatchAction(DashboardRedux.DashboardSetAvailableToolbars(availableToolbars));
    };
    DashboardApiImpl.prototype.setVisibleToolbars = function (visibleToolbars) {
        var _this = this;
        visibleToolbars.forEach(function (vt) {
            _this.showToolbar(vt);
        });
    };
    DashboardApiImpl.prototype.showToolbar = function (visibleToolbar) {
        this.dispatchAction(DashboardRedux.DashboardShowToolbar(visibleToolbar));
    };
    DashboardApiImpl.prototype.hideToolbar = function (visibleToolbar) {
        this.dispatchAction(DashboardRedux.DashboardHideToolbar(visibleToolbar));
    };
    DashboardApiImpl.prototype.setVisibleButtons = function (functionButtons) {
        this.dispatchAction(DashboardRedux.DashboardSetFunctionButtons(functionButtons));
    };
    DashboardApiImpl.prototype.setVisibility = function (dashboardVisibility) {
        this.dispatchAction(DashboardRedux.DashboardSetVisibility(dashboardVisibility));
    };
    DashboardApiImpl.prototype.show = function () {
        this.setVisibility(Enums_1.Visibility.Visible);
    };
    DashboardApiImpl.prototype.hide = function () {
        this.setVisibility(Enums_1.Visibility.Hidden);
    };
    DashboardApiImpl.prototype.minimise = function () {
        this.setVisibility(Enums_1.Visibility.Minimised);
    };
    DashboardApiImpl.prototype.showSystemStatusButton = function () {
        this.dispatchAction(DashboardRedux.DashboardShowSystemStatusButton());
    };
    DashboardApiImpl.prototype.hideSystemStatusButton = function () {
        this.dispatchAction(DashboardRedux.DashboardHideSystemStatusButton());
    };
    DashboardApiImpl.prototype.showGridInfoButton = function () {
        this.dispatchAction(DashboardRedux.DashboardShowGridInfoButton());
    };
    DashboardApiImpl.prototype.hideGridInfoButton = function () {
        this.dispatchAction(DashboardRedux.DashboardHideGridInfoButton());
    };
    DashboardApiImpl.prototype.showFunctionsDropdown = function () {
        this.dispatchAction(DashboardRedux.DashboardShowFunctionsDropdown());
    };
    DashboardApiImpl.prototype.hideFunctionsDropdown = function () {
        this.dispatchAction(DashboardRedux.DashboardHideFunctionsDropdown());
    };
    DashboardApiImpl.prototype.showColumnsDropdown = function () {
        this.dispatchAction(DashboardRedux.DashboardShowColumnsDropdown());
    };
    DashboardApiImpl.prototype.hideColumnsDropdown = function () {
        this.dispatchAction(DashboardRedux.DashboardHideColumnsDropdown());
    };
    DashboardApiImpl.prototype.showToolbarsDropdown = function () {
        this.dispatchAction(DashboardRedux.DashboardShowToolbarsDropdown());
    };
    DashboardApiImpl.prototype.hideToolbarsDropdown = function () {
        this.dispatchAction(DashboardRedux.DashboardHideToolbarsDropdown());
    };
    DashboardApiImpl.prototype.setHomeToolbarTitle = function (title) {
        this.dispatchAction(DashboardRedux.DashboardSetHomeToolbarTitle(title));
    };
    DashboardApiImpl.prototype.getCustomToolbarContentsDiv = function (customToolbarName) {
        var customToolbar = this.getCustomToolbarByName(customToolbarName);
        if (customToolbar) {
            var divId = 'ab-CustomToolbar__' + customToolbar.Name + '__contents';
            return document.getElementById(divId);
        }
        return null;
    };
    DashboardApiImpl.prototype.getCustomToolbarByName = function (customToolbarName) {
        return this.getDashboardState().CustomToolbars.find(function (ct) { return ct.Name == customToolbarName; });
    };
    DashboardApiImpl.prototype.setCustomToolbarButtons = function (customToolbarName, buttons) {
        this.updateCustomToolbarButtons(customToolbarName, buttons, 'override');
    };
    DashboardApiImpl.prototype.addCustomToolbarButtons = function (customToolbarName, buttons) {
        this.updateCustomToolbarButtons(customToolbarName, buttons, 'add');
    };
    DashboardApiImpl.prototype.clearCustomToolbarButtons = function (customToolbarName) {
        this.updateCustomToolbarButtons(customToolbarName, [], 'clear');
    };
    DashboardApiImpl.prototype.updateCustomToolbarButtons = function (customToolbarName, buttons, action) {
        var _a;
        var customToolbars = this.getDashboardState().CustomToolbars;
        if (ArrayExtensions_1.default.IsNotNullOrEmpty(customToolbars)) {
            var customToolbar = customToolbars.find(function (c) { return c.Name == customToolbarName; });
            if (customToolbarName) {
                var clonedCustomToolbar = Helper_1.default.cloneObject(customToolbar);
                if (action == 'add') {
                    (_a = clonedCustomToolbar.ToolbarButtons).push.apply(_a, tslib_1.__spread(buttons));
                }
                else if (action == 'override') {
                    clonedCustomToolbar.ToolbarButtons = buttons;
                }
                else if (action == 'clear') {
                    clonedCustomToolbar.ToolbarButtons = [];
                }
                this.dispatchAction(DashboardRedux.DashboardCustomToolbarEdit(clonedCustomToolbar));
            }
        }
    };
    DashboardApiImpl.prototype.showDashboardPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.DashboardStrategyId, ScreenPopups.DashboardPopup);
    };
    return DashboardApiImpl;
}(ApiBase_1.ApiBase));
exports.DashboardApiImpl = DashboardApiImpl;
