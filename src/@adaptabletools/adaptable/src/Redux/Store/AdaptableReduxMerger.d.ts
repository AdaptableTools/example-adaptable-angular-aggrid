import { ConfigState } from '../../PredefinedConfig/ConfigState';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
export declare function MergeStateFunction(oldState: any, newState: any): any;
export declare function MergeState(oldState: any, newState: any): any;
declare type TypeReducer = (state: AdaptableState, action: {
    type: string;
    State?: {
        [s: string]: ConfigState;
    };
}) => AdaptableState;
export declare const mergeReducer: (rootReducer: TypeReducer, LOAD_STATE_TYPE: string) => TypeReducer;
export {};
