"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FormatColumnRedux = require("../../Redux/ActionsReducers/FormatColumnRedux");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var FormatColumnApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(FormatColumnApiImpl, _super);
    function FormatColumnApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormatColumnApiImpl.prototype.getFormatColumnState = function () {
        return this.getAdaptableState().FormatColumn;
    };
    FormatColumnApiImpl.prototype.getAllFormatColumn = function () {
        return this.getAdaptableState().FormatColumn.FormatColumns;
    };
    FormatColumnApiImpl.prototype.addFormatColumn = function (column, style) {
        var formatColumn = { ColumnId: column, Style: style };
        this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn));
    };
    FormatColumnApiImpl.prototype.updateFormatColumn = function (column, style) {
        var formatColumn = { ColumnId: column, Style: style };
        this.dispatchAction(FormatColumnRedux.FormatColumnEdit(formatColumn));
    };
    FormatColumnApiImpl.prototype.deleteFormatColumn = function (formatColumn) {
        this.dispatchAction(FormatColumnRedux.FormatColumnDelete(formatColumn));
    };
    FormatColumnApiImpl.prototype.deleteAllFormatColumn = function () {
        var _this = this;
        this.getAllFormatColumn().forEach(function (fc) {
            _this.deleteFormatColumn(fc);
        });
    };
    FormatColumnApiImpl.prototype.showFormatColumnPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.FormatColumnStrategyId, ScreenPopups.FormatColumnPopup);
    };
    return FormatColumnApiImpl;
}(ApiBase_1.ApiBase));
exports.FormatColumnApiImpl = FormatColumnApiImpl;
