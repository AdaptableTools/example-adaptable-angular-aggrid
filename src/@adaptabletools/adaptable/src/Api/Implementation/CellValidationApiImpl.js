"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CellValidationRedux = require("../../Redux/ActionsReducers/CellValidationRedux");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var CellValidationApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(CellValidationApiImpl, _super);
    function CellValidationApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellValidationApiImpl.prototype.getCellValidationState = function () {
        return this.getAdaptableState().CellValidation;
    };
    CellValidationApiImpl.prototype.getAllCellValidation = function () {
        return this.getCellValidationState().CellValidations;
    };
    CellValidationApiImpl.prototype.addCellValidation = function (cellValidationRule) {
        this.dispatchAction(CellValidationRedux.CellValidationAdd(cellValidationRule));
    };
    CellValidationApiImpl.prototype.deleteCellValidation = function (cellValidationRule) {
        this.dispatchAction(CellValidationRedux.CellValidationDelete(cellValidationRule));
    };
    CellValidationApiImpl.prototype.showCellValidationPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.CellValidationStrategyId, ScreenPopups.CellValidationPopup);
    };
    return CellValidationApiImpl;
}(ApiBase_1.ApiBase));
exports.CellValidationApiImpl = CellValidationApiImpl;
