"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ShortcutRedux = require("../../Redux/ActionsReducers/ShortcutRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ApiBase_1 = require("./ApiBase");
var ShortcutApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ShortcutApiImpl, _super);
    function ShortcutApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShortcutApiImpl.prototype.getShortcutState = function () {
        return this.getAdaptableState().Shortcut;
    };
    ShortcutApiImpl.prototype.getAllShortcut = function () {
        return this.getAdaptableState().Shortcut.Shortcuts;
    };
    ShortcutApiImpl.prototype.addShortcut = function (shortcut) {
        this.dispatchAction(ShortcutRedux.ShortcutAdd(shortcut));
    };
    ShortcutApiImpl.prototype.deleteShortcut = function (shortcut) {
        this.dispatchAction(ShortcutRedux.ShortcutDelete(shortcut));
    };
    ShortcutApiImpl.prototype.deleteAllShortcut = function () {
        var _this = this;
        this.getAllShortcut().forEach(function (s) {
            _this.deleteShortcut(s);
        });
    };
    ShortcutApiImpl.prototype.showShortcutPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.ShortcutStrategyId, ScreenPopups.ShortcutPopup);
    };
    return ShortcutApiImpl;
}(ApiBase_1.ApiBase));
exports.ShortcutApiImpl = ShortcutApiImpl;
