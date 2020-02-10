"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isomorphic_fetch_1 = require("isomorphic-fetch");
var lodash_1 = require("lodash");
var LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
var DEBOUNCE_DELAY = 500;
var checkStatus = function (response) {
    var error = new Error(response.statusText);
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw error;
};
var persistState = function (state, config) {
    var saveOptions = {
        method: 'POST',
        body: JSON.stringify(state),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ab_username: config.userName,
            ab_id: config.adaptableId,
        },
    };
    return isomorphic_fetch_1.default(config.url, saveOptions).then(checkStatus);
};
var loadState = function (_a) {
    var userName = _a.userName, adaptableId = _a.adaptableId, url = _a.url;
    var loadOptions = {
        headers: {
            ab_username: userName,
            ab_id: adaptableId,
        },
    };
    return isomorphic_fetch_1.default(url, loadOptions)
        .then(checkStatus)
        .then(function (response) { return response.json(); });
};
var AdaptableRemoteStorageEngine = /** @class */ (function () {
    function AdaptableRemoteStorageEngine(config) {
        this.url = config.url;
        this.userName = config.userName;
        this.adaptableId = config.adaptableId;
        this.loadState = config.loadState;
        this.persistState = config.persistState;
        this.save = lodash_1.debounce(this.save, DEBOUNCE_DELAY);
    }
    AdaptableRemoteStorageEngine.prototype.load = function () {
        return (this.loadState || loadState)({
            userName: this.userName,
            adaptableId: this.adaptableId,
            url: this.url,
        }).catch(function (error) { return Promise.reject(error.message); });
    };
    AdaptableRemoteStorageEngine.prototype.save = function (state) {
        return (this.persistState || persistState)(state, {
            userName: this.userName,
            adaptableId: this.adaptableId,
            url: this.url,
        }).catch(function (error) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError("Cannot Save Config: " + error.message);
            return Promise.reject("Cannot save config:" + error.message);
        });
    };
    return AdaptableRemoteStorageEngine;
}());
function createEngine(_a) {
    var url = _a.url, userName = _a.userName, adaptableId = _a.adaptableId, persistState = _a.persistState, loadState = _a.loadState;
    return new AdaptableRemoteStorageEngine({
        url: url,
        userName: userName,
        adaptableId: adaptableId,
        persistState: persistState,
        loadState: loadState,
    });
}
exports.createEngine = createEngine;
