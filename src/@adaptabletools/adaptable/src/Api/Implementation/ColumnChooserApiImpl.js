"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ColumnChooserApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnChooserApiImpl, _super);
    function ColumnChooserApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnChooserApiImpl.prototype.showColumnChooserPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.ColumnChooserStrategyId, ScreenPopups.ColumnChooserPopup);
    };
    return ColumnChooserApiImpl;
}(ApiBase_1.ApiBase));
exports.ColumnChooserApiImpl = ColumnChooserApiImpl;
