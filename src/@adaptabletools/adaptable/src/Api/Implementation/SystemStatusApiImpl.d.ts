import { ApiBase } from './ApiBase';
import { SystemStatusApi } from '../SystemStatusApi';
import { SystemStatusState } from '../../PredefinedConfig/SystemStatusState';
export declare class SystemStatusApiImpl extends ApiBase implements SystemStatusApi {
    getSystemStatusState(): SystemStatusState;
    setSystemStatus(statusMessage: string, messageType: 'Error' | 'Warning' | 'Success' | 'Info', statusFurtherInformation?: string): void;
    setErrorSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;
    setWarningSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;
    setSuccessSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;
    setInfoSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;
    clearSystemStatus(): void;
    setDefaultMessage(): void;
    showSystemStatusPopup(): void;
}
