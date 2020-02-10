"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isomorphic_fetch_1 = require("isomorphic-fetch");
var AdaptableReduxMerger_1 = require("./AdaptableReduxMerger");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
var checkStatus = function (response) {
    var error = new Error(response.statusText);
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw error;
};
var persistState = function (state, config) {
    return new Promise(function (resolve, reject) {
        try {
            localStorage.setItem(config.adaptableId, JSON.stringify(state));
            resolve();
        }
        catch (ex) {
            reject(ex);
        }
    });
};
var loadState = function (_a) {
    var adaptableId = _a.adaptableId;
    var jsonState = localStorage.getItem(adaptableId);
    var parsedJsonState = JSON.parse(jsonState) || {};
    return Promise.resolve(parsedJsonState);
};
var AdaptableReduxLocalStorageEngine = /** @class */ (function () {
    function AdaptableReduxLocalStorageEngine(config) {
        this.adaptableId = config.adaptableId;
        this.userName = config.userName;
        this.predefinedConfig = config.predefinedConfig;
        this.loadState = config.loadState;
        this.persistState = config.persistState;
    }
    AdaptableReduxLocalStorageEngine.prototype.load = function () {
        var _this = this;
        return (this.loadState || loadState)({
            adaptableId: this.adaptableId,
            userName: this.userName,
        }).then(function (parsedJsonState) {
            if (typeof _this.predefinedConfig === 'string' &&
                StringExtensions_1.StringExtensions.IsNotNullOrEmpty(_this.predefinedConfig)) {
                // we have config in a file so lets merge it with the other state
                return isomorphic_fetch_1.default(_this.predefinedConfig)
                    .then(checkStatus)
                    .then(function (response) { return response.json(); })
                    .then(function (parsedPredefinedState) { return AdaptableReduxMerger_1.MergeStateFunction(parsedPredefinedState, parsedJsonState); })
                    .catch(function (err) { return LoggingHelper_1.LoggingHelper.LogAdaptableError(err); });
            }
            if (_this.predefinedConfig != null) {
                // we have config as an object so need to merge that
                return Promise.resolve(_this.predefinedConfig)
                    .then(function (parsedPredefinedState) { return AdaptableReduxMerger_1.MergeStateFunction(parsedPredefinedState, parsedJsonState); })
                    .catch(function (err) { return LoggingHelper_1.LoggingHelper.LogAdaptableError(err); });
            }
            // no predefined config so nothing to merge
            return new Promise(function (resolve) {
                resolve(parsedJsonState || {});
            }).catch(rejectWithMessage);
        });
    };
    AdaptableReduxLocalStorageEngine.prototype.save = function (state) {
        return (this.persistState || persistState)(state, {
            adaptableId: this.adaptableId,
            userName: this.userName,
        }).catch(rejectWithMessage);
    };
    return AdaptableReduxLocalStorageEngine;
}());
function rejectWithMessage(error) {
    return Promise.reject(error.message);
}
function createEngine(config) {
    return new AdaptableReduxLocalStorageEngine(config);
}
exports.createEngine = createEngine;
