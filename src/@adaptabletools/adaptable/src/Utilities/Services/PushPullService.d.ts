import { IPushPullService } from './Interface/IPushPullService';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { IPushPullDomain } from '../../PredefinedConfig/IPushPullState';
export declare enum ServiceStatus {
    Unknown = "Unknown",
    Disconnected = "Disconnected",
    Connected = "Connected",
    Error = "Error"
}
export declare class PushPullService implements IPushPullService {
    adaptable: IAdaptable;
    private ppInstance;
    private pages;
    constructor(adaptable: IAdaptable);
    getIPushPullStatus(): ServiceStatus;
    login(login: string, password: string): Promise<any>;
    getDomainPages(): Promise<IPushPullDomain[]>;
    loadPage(folderIPP: string, pageIPP: string): Promise<any>;
    unloadPage(page: string): void;
    addNewPage(folderId: number, page: string): Promise<any>;
    pushData(page: string, data: any[]): Promise<any>;
    private getApiKey;
    private getApiSecret;
}
