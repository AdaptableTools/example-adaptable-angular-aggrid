import IStorageEngine from './Interface/IStorageEngine';
import { PredefinedConfig } from '../../PredefinedConfig/PredefinedConfig';
import { AdaptableLoadStateFunction, AdaptablePersistStateFunction } from '../../AdaptableOptions/StateOptions';
export declare function createEngine(config: {
    adaptableId: string;
    userName: string;
    predefinedConfig: PredefinedConfig | string;
    loadState?: AdaptableLoadStateFunction;
    persistState?: AdaptablePersistStateFunction;
}): IStorageEngine;
