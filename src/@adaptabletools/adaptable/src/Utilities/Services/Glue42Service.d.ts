import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { IGlue42Service } from './Interface/IGlue42Service';
export interface Glue42ExportError {
    row: number;
    column: number;
    description: string;
    foregroundColor: string;
    backgroundColor: string;
}
export interface Glue42ColumnInfo {
    header: string;
    fieldName: string;
}
export interface ExcelStatus {
    msg: string;
    isResolved: boolean;
}
export declare class Glue42Service implements IGlue42Service {
    private adaptable;
    private glue4ExcelInstance;
    private glueInstance;
    private excelSyncTimeout?;
    private sheet?;
    private isExcelStatus;
    constructor(adaptable: IAdaptable);
    login(username: string, password: string, gatewayURL: string): Promise<void>;
    exportData(data: any[], gridColumns: AdaptableColumn[], primaryKeys: any[]): Promise<void>;
    openSheet(data: any[]): Promise<any>;
    updateData(data: any[], gridColumns: AdaptableColumn[], primaryKeys: any[]): Promise<void>;
    /**
     * Returns a callback, handling the Sheet Changed event.
     * Walks through the delta.
     */
    private getSheetChangeHandler;
    /**
     * Checks if Excel is running, if not starts it
     */
    private subscribeToAddinStatusChanges;
    private isValidEdit;
    private addValidationWarning;
    private addValidationError;
    createColumns(data: any[]): Glue42ColumnInfo[];
    createData(data: any[], headers: any[]): any;
}
