"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SystemFilterRedux = require("../../Redux/ActionsReducers/SystemFilterRedux");
var ApiBase_1 = require("./ApiBase");
var SystemFilterApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(SystemFilterApiImpl, _super);
    function SystemFilterApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SystemFilterApiImpl.prototype.getSystemFilterState = function () {
        return this.getAdaptableState().SystemFilter;
    };
    SystemFilterApiImpl.prototype.setSystemFilters = function (systemFilters) {
        this.dispatchAction(SystemFilterRedux.SystemFilterSet(systemFilters));
    };
    SystemFilterApiImpl.prototype.clearSystemFilters = function () {
        this.dispatchAction(SystemFilterRedux.SystemFilterSet([]));
    };
    SystemFilterApiImpl.prototype.getAllSystemFilter = function () {
        return this.getAdaptableState().SystemFilter.SystemFilters;
    };
    SystemFilterApiImpl.prototype.getAllPotentialSystemFilters = function () {
        return this.adaptable.FilterService.GetAllSystemFilters();
    };
    return SystemFilterApiImpl;
}(ApiBase_1.ApiBase));
exports.SystemFilterApiImpl = SystemFilterApiImpl;
