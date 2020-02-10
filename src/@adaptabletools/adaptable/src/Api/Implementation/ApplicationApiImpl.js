"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var ApplicationRedux = require("../../Redux/ActionsReducers/ApplicationRedux");
var ApplicationApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ApplicationApiImpl, _super);
    function ApplicationApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplicationApiImpl.prototype.getApplicationState = function () {
        return this.getAdaptableState().Application;
    };
    ApplicationApiImpl.prototype.getApplicationDataEntries = function () {
        return this.getApplicationState().ApplicationDataEntries;
    };
    ApplicationApiImpl.prototype.addApplicationDataEntry = function (keyValuePair) {
        this.dispatchAction(ApplicationRedux.ApplicationDataEntryAdd(keyValuePair));
    };
    ApplicationApiImpl.prototype.createApplicationDataEntry = function (key, value) {
        var applicationDataEntry = {
            Key: key,
            Value: value,
        };
        this.addApplicationDataEntry(applicationDataEntry);
    };
    ApplicationApiImpl.prototype.editApplicationDataEntry = function (applicationDataEntry) {
        this.dispatchAction(ApplicationRedux.ApplicationDataEntryEdit(applicationDataEntry));
    };
    ApplicationApiImpl.prototype.deleteApplicationDataEntry = function (applicationDataEntry) {
        this.dispatchAction(ApplicationRedux.ApplicationDataEntryDelete(applicationDataEntry));
    };
    ApplicationApiImpl.prototype.getApplicationDataEntryByKey = function (key) {
        var entries = this.getApplicationState().ApplicationDataEntries;
        return entries.find(function (e) { return e.Key === key; });
    };
    ApplicationApiImpl.prototype.getApplicationDataEntriesByValue = function (value) {
        var entries = this.getApplicationState().ApplicationDataEntries;
        return entries.filter(function (e) { return e.Value === value; });
    };
    return ApplicationApiImpl;
}(ApiBase_1.ApiBase));
exports.ApplicationApiImpl = ApplicationApiImpl;
