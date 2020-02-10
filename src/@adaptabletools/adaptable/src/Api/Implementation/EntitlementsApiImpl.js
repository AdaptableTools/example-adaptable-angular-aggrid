"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EntitlementsRedux = require("../../Redux/ActionsReducers/EntitlementsRedux");
var ApiBase_1 = require("./ApiBase");
var EntitlementsApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(EntitlementsApiImpl, _super);
    function EntitlementsApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntitlementsApiImpl.prototype.getEntitlementsState = function () {
        return this.getAdaptableState().Entitlements;
    };
    EntitlementsApiImpl.prototype.getAllEntitlements = function () {
        return this.getAdaptableState().Entitlements.FunctionEntitlements;
    };
    EntitlementsApiImpl.prototype.getEntitlementByAdaptableFunctionName = function (adaptableFunctionName) {
        return this.getAdaptableState().Entitlements.FunctionEntitlements.find(function (f) { return f.FunctionName == adaptableFunctionName; });
    };
    EntitlementsApiImpl.prototype.getEntitlementAccessLevelForAdaptableFunctionName = function (adaptableFunctionName) {
        return this.getAdaptableState().Entitlements.FunctionEntitlements.find(function (f) { return f.FunctionName == adaptableFunctionName; }).AccessLevel;
    };
    EntitlementsApiImpl.prototype.addEntitlements = function (entitlements) {
        var _this = this;
        entitlements.forEach(function (entitlement) {
            _this.dispatchAction(EntitlementsRedux.EntitlementAdd(entitlement));
        });
    };
    EntitlementsApiImpl.prototype.addEntitlement = function (entitlement) {
        this.dispatchAction(EntitlementsRedux.EntitlementAdd(entitlement));
    };
    EntitlementsApiImpl.prototype.createEntitlement = function (adaptableFunctionName, accessLevel) {
        var entitlement = {
            FunctionName: adaptableFunctionName,
            AccessLevel: accessLevel,
        };
        this.addEntitlement(entitlement);
    };
    EntitlementsApiImpl.prototype.editEntitlement = function (adaptableFunctionName, accessLevel) {
        var entitlement = {
            FunctionName: adaptableFunctionName,
            AccessLevel: accessLevel,
        };
        this.dispatchAction(EntitlementsRedux.EntitlementUpdate(entitlement));
    };
    EntitlementsApiImpl.prototype.deleteEntitlement = function (adaptableFunctionName) {
        this.dispatchAction(EntitlementsRedux.EntitlementDelete(adaptableFunctionName));
    };
    return EntitlementsApiImpl;
}(ApiBase_1.ApiBase));
exports.EntitlementsApiImpl = EntitlementsApiImpl;
