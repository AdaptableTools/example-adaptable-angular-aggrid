"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PopupRedux = require("../Redux/ActionsReducers/PopupRedux");
// A menu item which performs a Redux Action when it is clicke
var MenuItemDoReduxAction = /** @class */ (function () {
    function MenuItemDoReduxAction(label, functionName, reduxAaction, icon, isVisible) {
        this.Label = label;
        this.FunctionName = functionName;
        this.IsVisible = isVisible;
        this.Icon = icon;
        this.ReduxAction = reduxAaction;
    }
    return MenuItemDoReduxAction;
}());
exports.MenuItemDoReduxAction = MenuItemDoReduxAction;
var MenuItemDoClickFunction = /** @class */ (function () {
    function MenuItemDoClickFunction(label, functionName, clickFunction, icon, isVisible) {
        this.Label = label;
        this.FunctionName = functionName;
        this.IsVisible = isVisible;
        this.Icon = icon;
        this.ClickFunction = clickFunction;
    }
    return MenuItemDoClickFunction;
}());
exports.MenuItemDoClickFunction = MenuItemDoClickFunction;
// A menu item which shows a popup screen when it is clieked
var MenuItemShowPopup = /** @class */ (function () {
    function MenuItemShowPopup(label, functionName, componentName, icon, isVisible, popupParams) {
        this.Label = label;
        this.FunctionName = functionName;
        this.IsVisible = isVisible;
        this.Icon = icon;
        this.ReduxAction = PopupRedux.PopupShowScreen(functionName, componentName, popupParams);
    }
    return MenuItemShowPopup;
}());
exports.MenuItemShowPopup = MenuItemShowPopup;
