import * as Redux from 'redux';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { IAdaptableStore } from './Interface/IAdaptableStore';
import { ConfigState } from '../../PredefinedConfig/ConfigState';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
declare type EmitterCallback = (data?: any) => any;
declare type EmitterAnyCallback = (eventName: string, data?: any) => any;
export declare const RESET_STATE = "RESET_STATE";
export declare const INIT_STATE = "INIT_STATE";
export declare const LOAD_STATE = "LOAD_STATE";
export interface ResetUserDataAction extends Redux.Action {
}
export interface InitStateAction extends Redux.Action {
}
export interface LoadStateAction extends Redux.Action {
    State: {
        [s: string]: ConfigState;
    };
}
export declare const ResetUserData: () => ResetUserDataAction;
export declare const InitState: () => ResetUserDataAction;
export declare const LoadState: (State: {
    [s: string]: ConfigState;
}) => LoadStateAction;
export declare class AdaptableStore implements IAdaptableStore {
    TheStore: Redux.Store<AdaptableState>;
    Load: PromiseLike<any>;
    private emitter;
    private loadStartOnStartup;
    on: (eventName: string, callback: EmitterCallback) => () => void;
    onAny: (callback: EmitterAnyCallback) => () => void;
    emit: (eventName: string, data: any) => Promise<any>;
    constructor(adaptable: IAdaptable);
}
export declare function getNonPersistedReduxActions(): string[];
export declare function getFunctionAppliedReduxActions(): string[];
export declare function getPrimaryStateReduxActions(): string[];
export {};
