"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ApiBase_1 = require("./ApiBase");
var UserFilterApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(UserFilterApiImpl, _super);
    function UserFilterApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserFilterApiImpl.prototype.getUserFilterState = function () {
        return this.getAdaptableState().UserFilter;
    };
    UserFilterApiImpl.prototype.getAllUserFilter = function () {
        return this.getUserFilterState().UserFilters;
    };
    UserFilterApiImpl.prototype.showUserFilterPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.UserFilterStrategyId, ScreenPopups.UserFilterPopup);
    };
    return UserFilterApiImpl;
}(ApiBase_1.ApiBase));
exports.UserFilterApiImpl = UserFilterApiImpl;
