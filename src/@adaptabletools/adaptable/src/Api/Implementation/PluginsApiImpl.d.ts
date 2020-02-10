import { PluginsApi } from '../PluginsApi';
import { ApiBase } from './ApiBase';
import { PluginsState } from '../../Redux/ActionsReducers/PluginsRedux';
export declare class PluginsApiImpl extends ApiBase implements PluginsApi {
    getPluginsState(): PluginsState;
    getPluginState(pluginId: string): any;
    registerPlugin(pluginId: string, initialPluginState: any): void;
    setPluginState(pluginId: string, newPluginState: any): void;
}
