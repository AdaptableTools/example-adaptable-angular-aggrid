import { ApiBase } from './ApiBase';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AuditEventApi } from '../AuditEventApi';
import { EmitterCallback } from '../../Utilities/Emitter';
export declare class AuditEventApiImpl extends ApiBase implements AuditEventApi {
    constructor(adaptable: IAdaptable);
    private emitter;
    on: (eventName: string, callback: EmitterCallback) => () => void;
    emit: (eventName: string, data?: any) => Promise<any>;
}
