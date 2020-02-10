"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ConditionalStyleApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionalStyleApiImpl, _super);
    function ConditionalStyleApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConditionalStyleApiImpl.prototype.getConditionalStyleState = function () {
        return this.getAdaptableState().ConditionalStyle;
    };
    ConditionalStyleApiImpl.prototype.getAllConditionalStyle = function () {
        return this.getConditionalStyleState().ConditionalStyles;
    };
    ConditionalStyleApiImpl.prototype.showConditionalStylePopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.ConditionalStyleStrategyId, ScreenPopups.ConditionalStylePopup);
    };
    return ConditionalStyleApiImpl;
}(ApiBase_1.ApiBase));
exports.ConditionalStyleApiImpl = ConditionalStyleApiImpl;
