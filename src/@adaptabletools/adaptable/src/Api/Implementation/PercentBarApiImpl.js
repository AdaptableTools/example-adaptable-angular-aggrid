"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PercentBarRedux = require("../../Redux/ActionsReducers/PercentBarRedux");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var PercentBarApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(PercentBarApiImpl, _super);
    function PercentBarApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PercentBarApiImpl.prototype.getPercentBarState = function () {
        return this.getAdaptableState().PercentBar;
    };
    PercentBarApiImpl.prototype.getAllPercentBar = function () {
        return this.getPercentBarState().PercentBars;
    };
    PercentBarApiImpl.prototype.getPercentBarByColumn = function (columnId) {
        var percentBar = this.getAdaptableState().PercentBar.PercentBars.find(function (pcb) { return pcb.ColumnId == columnId; });
        return percentBar;
    };
    PercentBarApiImpl.prototype.addPercentBar = function (percentBar) {
        this.dispatchAction(PercentBarRedux.PercentBarAdd(percentBar));
    };
    PercentBarApiImpl.prototype.createPercentBar = function (columnId, positiveValue, positiveColor, negativeValue, negativeColor, showValue) {
        var percentBar = {
            ColumnId: columnId,
            NegativeValue: negativeValue,
            PositiveValue: positiveValue,
            PositiveColor: positiveColor,
            NegativeColor: negativeColor,
            ShowValue: showValue,
        };
        this.addPercentBar(percentBar);
    };
    PercentBarApiImpl.prototype.editPercentBar = function (percentBar) {
        var index = this.getAllPercentBar().findIndex(function (pcb) { return pcb.ColumnId == percentBar.ColumnId; });
        this.dispatchAction(PercentBarRedux.PercentBarEdit(percentBar));
    };
    PercentBarApiImpl.prototype.editPercentBarNegativeValue = function (negativeValue, columnId) {
        var percentBar = this.getPercentBarByColumn(columnId);
        percentBar.NegativeValue = negativeValue;
        this.editPercentBar(percentBar);
    };
    PercentBarApiImpl.prototype.editPercentBarPostiiveValue = function (positiveValue, columnId) {
        var percentBar = this.getPercentBarByColumn(columnId);
        percentBar.PositiveValue = positiveValue;
        this.editPercentBar(percentBar);
    };
    PercentBarApiImpl.prototype.editPercentBarPositiveColor = function (positiveColor, columnId) {
        var percentBar = this.getPercentBarByColumn(columnId);
        percentBar.PositiveColor = positiveColor;
        this.editPercentBar(percentBar);
    };
    PercentBarApiImpl.prototype.editPercentBarNegativeColor = function (negativeColor, columnId) {
        var percentBar = this.getPercentBarByColumn(columnId);
        percentBar.NegativeColor = negativeColor;
        this.editPercentBar(percentBar);
    };
    PercentBarApiImpl.prototype.editPercentBarShowValue = function (showValue, columnId) {
        var percentBar = this.getPercentBarByColumn(columnId);
        percentBar.ShowValue = showValue;
        this.editPercentBar(percentBar);
    };
    PercentBarApiImpl.prototype.deletePercentBar = function (columnId) {
        var percentBar = this.getAllPercentBar().find(function (pcb) { return pcb.ColumnId == columnId; });
        this.dispatchAction(PercentBarRedux.PercentBarDelete(percentBar));
    };
    PercentBarApiImpl.prototype.showPercentBarPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.PercentBarStrategyId, ScreenPopups.PercentBarPopup);
    };
    return PercentBarApiImpl;
}(ApiBase_1.ApiBase));
exports.PercentBarApiImpl = PercentBarApiImpl;
