"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var PlusMinusApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(PlusMinusApiImpl, _super);
    function PlusMinusApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlusMinusApiImpl.prototype.getPlusMinusState = function () {
        return this.getAdaptableState().PlusMinus;
    };
    PlusMinusApiImpl.prototype.getAllPlusMinus = function () {
        return this.getPlusMinusState().PlusMinusRules;
    };
    PlusMinusApiImpl.prototype.applyPlusMinus = function (cellsToUpdate) {
        var plusMinusStrategy = (this.adaptable.strategies.get(StrategyConstants.PlusMinusStrategyId));
        //   plusMinusStrategy.applyPlusMinus(this.getAllPlusMinus(),);
    };
    PlusMinusApiImpl.prototype.showPlusMinusPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.PlusMinusStrategyId, ScreenPopups.PlusMinusPopup);
    };
    return PlusMinusApiImpl;
}(ApiBase_1.ApiBase));
exports.PlusMinusApiImpl = PlusMinusApiImpl;
