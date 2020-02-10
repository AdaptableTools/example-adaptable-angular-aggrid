import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IExportStrategy } from './Interface/IExportStrategy';
import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { Report } from '../PredefinedConfig/ExportState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {
    private isSendingData;
    private workAroundOpenfinExcelDataDimension;
    private throttledRecomputeAndSendLiveDataEvent;
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    private sendNewLiveData;
    export(report: Report, exportDestination: ExportDestination): void;
    private convertReportToJSON;
    private convertReportToCsv;
    private copyToClipboard;
    private createCSVContent;
    private createTabularContent;
    private ConvertReportToArray;
    private refreshLiveReports;
    private getFirstLiveReport;
}
