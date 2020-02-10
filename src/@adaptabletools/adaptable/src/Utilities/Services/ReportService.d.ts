import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { Report } from '../../PredefinedConfig/ExportState';
import { IReportService } from './Interface/IReportService';
export declare const ALL_DATA_REPORT = "All Data";
export declare const VISIBLE_DATA_REPORT = "Visible Data";
export declare const SELECTED_CELLS_REPORT = "Selected Cells";
export declare const SELECTED_ROWS_REPORT = "Selected Rows";
export declare class ReportService implements IReportService {
    private adaptable;
    constructor(adaptable: IAdaptable);
    IsSystemReport(report: Report): boolean;
    IsSystemReportActive(report: Report): boolean;
    GetReportColumnsDescription(report: Report, cols: AdaptableColumn[]): string;
    GetReportExpressionDescription(Report: Report, cols: AdaptableColumn[]): string;
    IsReportDestinationActive(exportDestination: ExportDestination): boolean;
    private getReportColumnsForReport;
    ConvertReportToArray(report: Report): IStrategyActionReturn<any[]>;
    GetPrimaryKeysForReport(report: Report): any[];
    private getRowValues;
    private getCellValueFromGridCell;
    PublishLiveLiveDataChangedEvent(reportDestination: 'iPushPull' | 'Glue42', liveDataTrigger: 'Connected' | 'Disconnected' | 'LiveDataStarted' | 'LiveDataStopped' | 'LiveDataUpdated', liveReport?: any): void;
}
