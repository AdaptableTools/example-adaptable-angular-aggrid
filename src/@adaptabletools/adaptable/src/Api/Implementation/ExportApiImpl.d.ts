import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ExportApi } from '../ExportApi';
import { ExportState, Report, ReportSchedule } from '../../PredefinedConfig/ExportState';
import { ApiBase } from './ApiBase';
export declare class ExportApiImpl extends ApiBase implements ExportApi {
    getExportState(): ExportState;
    getCurrentReportName(): string;
    getCurrentReport(): Report;
    getReportByName(reportName: string): Report;
    getAllReports(): Report[];
    getReportSchedules(): ReportSchedule[];
    sendReport(reportName: string, destination: ExportDestination): void;
    showExportPopup(): void;
}
