import * as React from 'react';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IReportService } from '../../Utilities/Services/Interface/IReportService';
import { LiveReport } from '../../Api/Events/LiveDataChanged';
export interface ReportEntityRowProps extends SharedEntityExpressionRowProps<ReportEntityRow> {
    LiveReports: LiveReport[];
    ReportService: IReportService;
    onExport: (exportDestination: ExportDestination) => void;
    onReportStopLive: (exportDestination: ExportDestination.OpenfinExcel | ExportDestination.Glue42) => void;
}
export declare class ReportEntityRow extends React.Component<ReportEntityRowProps, {}> {
    render(): any;
}
