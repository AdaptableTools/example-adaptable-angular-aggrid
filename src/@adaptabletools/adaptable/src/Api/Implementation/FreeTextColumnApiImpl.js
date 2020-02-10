"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FreeTextColumnRedux = require("../../Redux/ActionsReducers/FreeTextColumnRedux");
var ApiBase_1 = require("./ApiBase");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var FreeTextColumnApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(FreeTextColumnApiImpl, _super);
    function FreeTextColumnApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FreeTextColumnApiImpl.prototype.getFreeTextColumnState = function () {
        return this.getAdaptableState().FreeTextColumn;
    };
    FreeTextColumnApiImpl.prototype.getAllFreeTextColumn = function () {
        return this.getAdaptableState().FreeTextColumn.FreeTextColumns;
    };
    FreeTextColumnApiImpl.prototype.addFreeTextColumn = function (freeTextColumn) {
        this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAdd(freeTextColumn));
    };
    FreeTextColumnApiImpl.prototype.addEditFreeTextColumnStoredValue = function (freeTextColumn, storedValue) {
        this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAddEditStoredValue(freeTextColumn, storedValue));
    };
    FreeTextColumnApiImpl.prototype.createFreeTextColumn = function (columnId, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var freeTextColumn = ObjectFactory_1.ObjectFactory.CreateEmptyFreeTextColumn();
        freeTextColumn.ColumnId = columnId;
        freeTextColumn.DefaultValue = defaultValue;
        this.addFreeTextColumn(freeTextColumn);
    };
    FreeTextColumnApiImpl.prototype.deleteFreeTextColumn = function (columnId) {
        var freeTextColumn = this.getAllFreeTextColumn().find(function (ftc) { return ftc.ColumnId == columnId; });
        if (this.checkItemExists(freeTextColumn, columnId, StrategyConstants.FreeTextColumnStrategyId)) {
            this.dispatchAction(FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn));
        }
    };
    FreeTextColumnApiImpl.prototype.showFreeTextColumnPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.FreeTextColumnStrategyId, ScreenPopups.FreeTextColumnPopup);
    };
    return FreeTextColumnApiImpl;
}(ApiBase_1.ApiBase));
exports.FreeTextColumnApiImpl = FreeTextColumnApiImpl;
