"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ChartApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ChartApiImpl, _super);
    function ChartApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChartApiImpl.prototype.getChartState = function () {
        return this.getAdaptableState().Chart;
    };
    ChartApiImpl.prototype.getAllChartDefinitions = function () {
        return this.getChartState().ChartDefinitions;
    };
    ChartApiImpl.prototype.showChartPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup);
    };
    return ChartApiImpl;
}(ApiBase_1.ApiBase));
exports.ChartApiImpl = ChartApiImpl;
