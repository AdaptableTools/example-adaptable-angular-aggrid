"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
var MenuItem_1 = require("../Utilities/MenuItem");
/**
 * Base class for all strategies and does most of the work of creating menus
 * Each strategy is reponsible for managing state (through InitState())
 */
var AdaptableStrategyBase = /** @class */ (function () {
    function AdaptableStrategyBase(Id, adaptable) {
        this.Id = Id;
        this.adaptable = adaptable;
        this.Id = Id;
        this.adaptable = adaptable;
    }
    AdaptableStrategyBase.prototype.initializeWithRedux = function () {
        var _this = this;
        this.InitState();
        this.adaptable.AdaptableStore.TheStore.subscribe(function () { return _this.InitState(); });
    };
    AdaptableStrategyBase.prototype.setStrategyEntitlement = function () {
        this.isVisible = this.isVisibleStrategy();
        this.isReadOnly = this.isReadOnlyStrategy();
    };
    AdaptableStrategyBase.prototype.InitState = function () {
        /**
         *  derived in each strategy that needs to manage state
         * Most now have been taken elsewhere into services.  All that is left is:
         *  Chart Strategy - lots
         *  Custom Sort
         *  Percent Bar
         *  Sparkline Column
         *  Theme
         */
    };
    AdaptableStrategyBase.prototype.addFunctionMenuItem = function () {
        // base class implementation which is empty
        return undefined;
    };
    AdaptableStrategyBase.prototype.addColumnMenuItem = function (column) {
        // base class implementation which is empty
        return undefined;
    };
    AdaptableStrategyBase.prototype.addContextMenuItem = function (menuInfo) {
        // base class implementation which is empty
        return undefined;
    };
    AdaptableStrategyBase.prototype.getStrategyEntitlement = function () {
        var _this = this;
        var functionEntitlements = this.adaptable.api.entitlementsApi.getEntitlementsState()
            .FunctionEntitlements;
        return functionEntitlements.find(function (x) { return x.FunctionName == _this.Id; });
    };
    AdaptableStrategyBase.prototype.isVisibleStrategy = function () {
        var entitlement = this.getStrategyEntitlement();
        if (entitlement) {
            return entitlement.AccessLevel != 'Hidden';
        }
        return true;
    };
    AdaptableStrategyBase.prototype.isReadOnlyStrategy = function () {
        var entitlement = this.getStrategyEntitlement();
        if (entitlement) {
            return entitlement.AccessLevel == 'ReadOnly';
        }
        return false;
    };
    // creates the menu items in the main dropdown
    AdaptableStrategyBase.prototype.createMainMenuItemShowPopup = function (_a) {
        var Label = _a.Label, ComponentName = _a.ComponentName, Icon = _a.Icon, PopupParams = _a.PopupParams;
        if (!PopupParams) {
            PopupParams = {
                source: 'FunctionMenu',
            };
        }
        if (this.isVisible && !this.isReadOnly) {
            return new MenuItem_1.MenuItemShowPopup(Label, this.Id, ComponentName, Icon, this.isVisible, PopupParams);
        }
    };
    // direct actions called by the column menu - invisible if strategy is hidden or readonly
    AdaptableStrategyBase.prototype.createColumnMenuItemClickFunction = function (Label, Icon, ClickFunction) {
        if (this.isVisible && !this.isReadOnly) {
            return new MenuItem_1.MenuItemDoClickFunction(Label, this.Id, ClickFunction, Icon, true);
        }
    };
    AdaptableStrategyBase.prototype.createColumnMenuItemReduxAction = function (Label, Icon, Action) {
        if (this.isVisible && !this.isReadOnly) {
            return new MenuItem_1.MenuItemDoReduxAction(Label, this.Id, Action, Icon, true);
        }
    };
    // popups called by the column menu - invisible if strategy is hidden or readonly
    AdaptableStrategyBase.prototype.createColumnMenuItemShowPopup = function (Label, ComponentName, Icon, PopupParams) {
        if (this.isVisible && !this.isReadOnly) {
            return new MenuItem_1.MenuItemShowPopup(Label, this.Id, ComponentName, Icon, true, PopupParams);
        }
    };
    AdaptableStrategyBase.prototype.canCreateColumnMenuItem = function (column, adaptable, functionType) {
        if (this.isReadOnly) {
            return false;
        }
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(functionType)) {
            if (functionType == 'sort' && !column.IsSparkline) {
                return column.Sortable;
            }
            else if (functionType == 'editable') {
                return !column.ReadOnly;
            }
            else if (functionType == 'style') {
                return !column.IsSparkline;
            }
            else if (functionType == 'sparkline') {
                return column.IsSparkline;
            }
            else if (functionType == 'numeric') {
                return column.DataType == Enums_1.DataType.Number;
            }
            else if (functionType == 'columnfilter') {
                return column.Filterable;
            }
            else if (functionType == 'quickfilter') {
                return adaptable.adaptableOptions.filterOptions.useAdaptableQuickFilter;
            }
        }
        return true;
    };
    return AdaptableStrategyBase;
}());
exports.AdaptableStrategyBase = AdaptableStrategyBase;
