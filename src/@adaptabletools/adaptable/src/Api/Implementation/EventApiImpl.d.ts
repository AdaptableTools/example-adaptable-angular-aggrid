import { ApiBase } from './ApiBase';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { EventApi } from '../EventApi';
import { EmitterCallback } from '../../Utilities/Emitter';
export declare class EventApiImpl extends ApiBase implements EventApi {
    constructor(adaptable: IAdaptable);
    private emitter;
    on: (eventName: string, callback: EmitterCallback) => () => void;
    emit: (eventName: string, data?: any) => Promise<any>;
}
