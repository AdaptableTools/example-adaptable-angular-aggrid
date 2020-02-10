import * as React from 'react';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { Report, ReportSchedule } from '../../PredefinedConfig/ExportState';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
interface ExportToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ExportToolbarControlComponent> {
    onApplyExport: (Report: Report, exportDestination: ExportDestination, isLiveReport: boolean) => ExportRedux.ExportApplyAction;
    onSelectReport: (Report: string) => ExportRedux.ReportSelectAction;
    onNewReport: () => PopupRedux.PopupShowScreenAction;
    onEditReport: () => PopupRedux.PopupShowScreenAction;
    onReportStopLive: (Report: Report, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.Glue42) => SystemRedux.ReportStopLiveAction;
    onNewReportSchedule: (reportSchedule: ReportSchedule) => PopupRedux.PopupShowScreenAction;
    Columns: AdaptableColumn[];
    Reports: Report[] | undefined;
    SystemReports: Report[] | undefined;
    CurrentReport: string | undefined;
}
declare class ExportToolbarControlComponent extends React.Component<ExportToolbarControlComponentProps, {}> {
    componentDidMount(): void;
    render(): any;
    onSelectedReportChanged(reportName: string): void;
    private onNewReportSchedule;
}
export declare let ExportToolbarControl: import("react-redux").ConnectedComponent<typeof ExportToolbarControlComponent, Pick<ExportToolbarControlComponentProps, "key" | "ref" | "onClick" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
