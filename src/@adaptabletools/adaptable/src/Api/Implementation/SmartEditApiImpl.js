"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SmartEditRedux = require("../../Redux/ActionsReducers/SmartEditRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ApiBase_1 = require("./ApiBase");
var SmartEditApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(SmartEditApiImpl, _super);
    function SmartEditApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartEditApiImpl.prototype.getSmartEditState = function () {
        return this.getAdaptableState().SmartEdit;
    };
    SmartEditApiImpl.prototype.setSmartEditMathOperation = function (mathOperation) {
        this.dispatchAction(SmartEditRedux.SmartEditChangeOperation(mathOperation));
    };
    SmartEditApiImpl.prototype.getSmartEditMathOperation = function () {
        return this.getAdaptableState().SmartEdit.MathOperation;
    };
    SmartEditApiImpl.prototype.setSmartEditValue = function (smartEditValue) {
        this.dispatchAction(SmartEditRedux.SmartEditChangeValue(smartEditValue));
    };
    SmartEditApiImpl.prototype.getSmartEditValue = function () {
        return this.getAdaptableState().SmartEdit.SmartEditValue;
    };
    SmartEditApiImpl.prototype.showSmartEditPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.SmartEditStrategyId, ScreenPopups.SmartEditPopup);
    };
    return SmartEditApiImpl;
}(ApiBase_1.ApiBase));
exports.SmartEditApiImpl = SmartEditApiImpl;
