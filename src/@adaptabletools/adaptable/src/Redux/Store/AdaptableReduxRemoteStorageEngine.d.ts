import IStorageEngine from './Interface/IStorageEngine';
import { AdaptableLoadStateFunction, AdaptablePersistStateFunction } from '../../AdaptableOptions/StateOptions';
export declare function createEngine({ url, userName, adaptableId, persistState, loadState, }: {
    url: string;
    userName: string;
    adaptableId: string;
    persistState?: AdaptablePersistStateFunction;
    loadState?: AdaptableLoadStateFunction;
}): IStorageEngine;
