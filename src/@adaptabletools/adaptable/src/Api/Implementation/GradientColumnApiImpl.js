"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var GradientColumnApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(GradientColumnApiImpl, _super);
    function GradientColumnApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GradientColumnApiImpl.prototype.getGradientColumnState = function () {
        return this.getAdaptableState().GradientColumn;
    };
    GradientColumnApiImpl.prototype.getAllGradientColumn = function () {
        return this.getAdaptableState().GradientColumn.GradientColumns;
    };
    GradientColumnApiImpl.prototype.showGradientColumnPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.GradientColumnStrategyId, ScreenPopups.GradientColumnPopup);
    };
    return GradientColumnApiImpl;
}(ApiBase_1.ApiBase));
exports.GradientColumnApiImpl = GradientColumnApiImpl;
