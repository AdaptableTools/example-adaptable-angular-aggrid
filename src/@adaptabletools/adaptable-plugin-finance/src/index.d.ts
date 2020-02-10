import { AdaptablePlugin, IAdaptable } from '@adaptabletools/adaptable/types';
interface FinancePluginOptions {
}
declare class FinancePlugin extends AdaptablePlugin {
    options: FinancePluginOptions;
    pluginId: string;
    constructor(options?: FinancePluginOptions);
    afterInitStore(adaptable: IAdaptable): void;
}
declare const _default: (options?: any) => FinancePlugin;
export default _default;
