"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var CellSummaryRedux = require("../../Redux/ActionsReducers/CellSummaryRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var CellSummaryApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(CellSummaryApiImpl, _super);
    function CellSummaryApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellSummaryApiImpl.prototype.getCellSummaryState = function () {
        return this.getAdaptableState().CellSummary;
    };
    CellSummaryApiImpl.prototype.getCellSummaryOperation = function () {
        return this.getCellSummaryState().SummaryOperation;
    };
    CellSummaryApiImpl.prototype.getCellSummaryOperationDefinitions = function () {
        return this.getCellSummaryState().CellSummaryOperationDefinitions;
    };
    CellSummaryApiImpl.prototype.addCellSummaryOperationDefinitions = function (cellSummaryOperationDefinitions) {
        var operationDefinitions = tslib_1.__spread(this.getCellSummaryOperationDefinitions(), cellSummaryOperationDefinitions);
        this.dispatchAction(CellSummaryRedux.CellSummaryOperationDefinitionsSet(operationDefinitions));
    };
    CellSummaryApiImpl.prototype.showCellSummaryPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.CellSummaryStrategyId, ScreenPopups.CellSummaryPopup);
    };
    return CellSummaryApiImpl;
}(ApiBase_1.ApiBase));
exports.CellSummaryApiImpl = CellSummaryApiImpl;
