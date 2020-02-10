import { AdaptablePlugin, IAdaptable } from '@adaptabletools/adaptable/types';
import { AdaptableFunctionName } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Types';
import { IStrategy } from '@adaptabletools/adaptable/src/Strategy/Interface/IStrategy';
interface ChartsPluginOptions {
}
declare class ChartsPlugin extends AdaptablePlugin {
    options: ChartsPluginOptions;
    pluginId: string;
    constructor(options?: ChartsPluginOptions);
    afterInitStrategies(adaptable: IAdaptable, strategies: Map<AdaptableFunctionName, IStrategy>): void;
    afterInitApi(adaptable: IAdaptable): void;
    onAdaptableReady(adaptable: IAdaptable): void;
}
declare const _default: (options?: any) => ChartsPlugin;
export default _default;
