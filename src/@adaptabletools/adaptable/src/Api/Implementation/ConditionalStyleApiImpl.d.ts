import { ApiBase } from './ApiBase';
import { ConditionalStyleApi } from '../ConditionalStyleApi';
import { ConditionalStyleState, ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
export declare class ConditionalStyleApiImpl extends ApiBase implements ConditionalStyleApi {
    getConditionalStyleState(): ConditionalStyleState;
    getAllConditionalStyle(): ConditionalStyle[];
    showConditionalStylePopup(): void;
}
