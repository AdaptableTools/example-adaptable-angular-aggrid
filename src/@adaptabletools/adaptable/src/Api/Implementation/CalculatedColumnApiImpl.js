"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CalculatedColumnRedux = require("../../Redux/ActionsReducers/CalculatedColumnRedux");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var CalculatedColumnApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(CalculatedColumnApiImpl, _super);
    function CalculatedColumnApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalculatedColumnApiImpl.prototype.getCalculatedColumnState = function () {
        return this.getAdaptableState().CalculatedColumn;
    };
    CalculatedColumnApiImpl.prototype.getAllCalculatedColumn = function () {
        return this.getCalculatedColumnState().CalculatedColumns;
    };
    CalculatedColumnApiImpl.prototype.addCalculatedColumn = function (calculatedColumn) {
        this.dispatchAction(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn));
    };
    CalculatedColumnApiImpl.prototype.editCalculatedColumnExpression = function (column, columnExpression) {
        var calcColumn = this.getAllCalculatedColumn().find(function (cc) { return cc.ColumnId == column; });
        calcColumn.ColumnExpression = columnExpression;
        this.dispatchAction(CalculatedColumnRedux.CalculatedColumnEdit(calcColumn));
    };
    CalculatedColumnApiImpl.prototype.deleteCalculatedColumn = function (column) {
        var calcColumn = this.getAllCalculatedColumn().find(function (cc) { return cc.ColumnId == column; });
        this.dispatchAction(CalculatedColumnRedux.CalculatedColumnDelete(calcColumn));
    };
    CalculatedColumnApiImpl.prototype.showCalculatedColumnPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.CalculatedColumnStrategyId, ScreenPopups.CalculatedColumnPopup);
    };
    return CalculatedColumnApiImpl;
}(ApiBase_1.ApiBase));
exports.CalculatedColumnApiImpl = CalculatedColumnApiImpl;
