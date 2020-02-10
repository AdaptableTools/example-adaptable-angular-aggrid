import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
export interface IGlue42Service {
    login(username: string, password: string, gatewayURL: string): void;
    exportData(data: any[], gridColumns: AdaptableColumn[], primaryKeys: any[]): void;
    openSheet(data: any[]): Promise<any>;
    updateData(data: any[], gridColumns: AdaptableColumn[], primaryKeys: any[]): Promise<any>;
}
export interface Glue42Config {
    initialization: {
        application: any;
        auth: any;
    };
    excelExport: any;
}
