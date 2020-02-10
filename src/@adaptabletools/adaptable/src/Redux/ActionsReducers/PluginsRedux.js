"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.PLUGINS_SET_PLUGIN_STATE = 'PLUGINS_SET_PLUGIN_STATE';
exports.PluginsSetPluginState = function (pluginId, pluginState) { return ({
    type: exports.PLUGINS_SET_PLUGIN_STATE,
    pluginId: pluginId,
    pluginState: pluginState,
}); };
var initialPluginsState = {};
exports.PluginsReducer = function (state, action) {
    var _a;
    if (state === void 0) { state = initialPluginsState; }
    switch (action.type) {
        case exports.PLUGINS_SET_PLUGIN_STATE: {
            return tslib_1.__assign(tslib_1.__assign({}, state), (_a = {}, _a[action.pluginId] = action.pluginState, _a));
        }
        default:
            return state;
    }
};
