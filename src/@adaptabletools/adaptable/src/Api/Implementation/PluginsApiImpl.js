"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PluginsRedux = require("../../Redux/ActionsReducers/PluginsRedux");
var ApiBase_1 = require("./ApiBase");
var PluginsApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(PluginsApiImpl, _super);
    function PluginsApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PluginsApiImpl.prototype.getPluginsState = function () {
        return this.getAdaptableState().Plugins;
    };
    PluginsApiImpl.prototype.getPluginState = function (pluginId) {
        return this.getPluginsState()[pluginId];
    };
    PluginsApiImpl.prototype.registerPlugin = function (pluginId, initialPluginState) {
        this.setPluginState(pluginId, initialPluginState);
    };
    PluginsApiImpl.prototype.setPluginState = function (pluginId, newPluginState) {
        this.dispatchAction(PluginsRedux.PluginsSetPluginState(pluginId, newPluginState));
    };
    return PluginsApiImpl;
}(ApiBase_1.ApiBase));
exports.PluginsApiImpl = PluginsApiImpl;
