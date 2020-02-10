import { ApiBase } from './ApiBase';
import { BulkUpdateState } from '../../PredefinedConfig/BulkUpdateState';
import { BulkUpdateApi } from '../BulkUpdateApi';
export declare class BulkUpdateApiImpl extends ApiBase implements BulkUpdateApi {
    getBulkUpdateState(): BulkUpdateState;
    getBulkUpdateValue(): string;
    showBulkUpdatePopup(): void;
}
