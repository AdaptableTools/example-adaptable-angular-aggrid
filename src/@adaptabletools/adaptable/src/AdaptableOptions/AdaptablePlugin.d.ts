import { AdaptableOptions } from './AdaptableOptions';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IAdaptableStore } from '../Redux/Store/Interface/IAdaptableStore';
import { AdaptableApi } from '../types';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
import { IStrategy } from '../Strategy/Interface/IStrategy';
export declare abstract class AdaptablePlugin {
    options?: any;
    private values;
    constructor(options?: any);
    registerValue(name: string, fn: (...args: any) => any): void;
    getProperty(name: string): any;
    hasProperty(name: string): boolean;
    beforeInit(adaptableOptions: AdaptableOptions, extraOptions: {
        renderGrid: boolean;
        runtimeConfig: any;
    }): void;
    afterInitStore(adaptable: IAdaptable, adaptableStore: IAdaptableStore): void;
    afterInitOptions(adaptable: IAdaptable, adaptableOptions: AdaptableOptions): void;
    afterInitApi(adaptable: IAdaptable, api: AdaptableApi): void;
    afterInitServices(adaptable: IAdaptable): void;
    afterInitStrategies(adaptable: IAdaptable, strategies: Map<AdaptableFunctionName, IStrategy>): void;
    afterInit(ab: IAdaptable): void;
    onStoreEvent(eventName: string, data: any, adaptableStore: IAdaptableStore): void;
    onAdaptableReady(adaptable: IAdaptable, adaptableOptions: AdaptableOptions): void;
}
