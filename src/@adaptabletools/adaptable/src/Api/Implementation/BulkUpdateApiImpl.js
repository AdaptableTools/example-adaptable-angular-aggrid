"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var BulkUpdateApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(BulkUpdateApiImpl, _super);
    function BulkUpdateApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulkUpdateApiImpl.prototype.getBulkUpdateState = function () {
        return this.getAdaptableState().BulkUpdate;
    };
    BulkUpdateApiImpl.prototype.getBulkUpdateValue = function () {
        return this.getBulkUpdateState().BulkUpdateValue;
    };
    BulkUpdateApiImpl.prototype.showBulkUpdatePopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.BulkUpdateStrategyId, ScreenPopups.BulkUpdatePopup);
    };
    return BulkUpdateApiImpl;
}(ApiBase_1.ApiBase));
exports.BulkUpdateApiImpl = BulkUpdateApiImpl;
