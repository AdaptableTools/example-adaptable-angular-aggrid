"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var FlashingCellApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(FlashingCellApiImpl, _super);
    function FlashingCellApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlashingCellApiImpl.prototype.getFlashingCellState = function () {
        return this.getAdaptableState().FlashingCell;
    };
    FlashingCellApiImpl.prototype.getAllFlashingCell = function () {
        return this.getFlashingCellState().FlashingCells;
    };
    FlashingCellApiImpl.prototype.showFlashingCellPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.FlashingCellsStrategyId, ScreenPopups.FlashingCellsPopup);
    };
    return FlashingCellApiImpl;
}(ApiBase_1.ApiBase));
exports.FlashingCellApiImpl = FlashingCellApiImpl;
