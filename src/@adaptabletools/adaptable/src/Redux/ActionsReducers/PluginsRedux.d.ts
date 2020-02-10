import * as Redux from 'redux';
export declare const PLUGINS_SET_PLUGIN_STATE = "PLUGINS_SET_PLUGIN_STATE";
export interface PluginsAction extends Redux.Action {
    pluginState: any;
    pluginId: string;
}
export interface PluginsSetPluginStateAction extends PluginsAction {
}
export interface PluginsState {
    [key: string]: any;
}
export declare const PluginsSetPluginState: (pluginId: string, pluginState: any) => PluginsSetPluginStateAction;
export declare const PluginsReducer: Redux.Reducer<PluginsState>;
