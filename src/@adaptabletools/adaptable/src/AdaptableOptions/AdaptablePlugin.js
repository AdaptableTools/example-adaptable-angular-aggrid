"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptablePlugin = /** @class */ (function () {
    function AdaptablePlugin(options) {
        this.options = options;
        this.values = {};
    }
    AdaptablePlugin.prototype.registerValue = function (name, fn) {
        this.values[name] = fn;
    };
    AdaptablePlugin.prototype.getProperty = function (name) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var fn = _this.values[name];
            if (fn) {
                return fn.apply(void 0, tslib_1.__spread(args));
            }
        };
    };
    AdaptablePlugin.prototype.hasProperty = function (name) {
        return !!this.values[name];
    };
    AdaptablePlugin.prototype.beforeInit = function (adaptableOptions, extraOptions) { };
    AdaptablePlugin.prototype.afterInitStore = function (adaptable, adaptableStore) { };
    AdaptablePlugin.prototype.afterInitOptions = function (adaptable, adaptableOptions) { };
    AdaptablePlugin.prototype.afterInitApi = function (adaptable, api) { };
    AdaptablePlugin.prototype.afterInitServices = function (adaptable) { };
    AdaptablePlugin.prototype.afterInitStrategies = function (adaptable, strategies) { };
    AdaptablePlugin.prototype.afterInit = function (ab) { };
    AdaptablePlugin.prototype.onStoreEvent = function (eventName, data, adaptableStore) { };
    AdaptablePlugin.prototype.onAdaptableReady = function (adaptable, adaptableOptions) { };
    return AdaptablePlugin;
}());
exports.AdaptablePlugin = AdaptablePlugin;
