import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { Report, ReportSchedule } from '../../PredefinedConfig/ExportState';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
interface ExportToolPanelComponentProps extends ToolPanelStrategyViewPopupProps<ExportToolPanelComponent> {
    onApplyExport: (report: Report, exportDestination: ExportDestination) => ExportRedux.ExportApplyAction;
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
interface ExportToolPanelComponentState {
    IsMinimised: boolean;
}
declare class ExportToolPanelComponent extends React.Component<ExportToolPanelComponentProps, ExportToolPanelComponentState> {
    constructor(props: ExportToolPanelComponentProps);
    componentDidMount(): void;
    render(): any;
    onSelectedReportChanged(reportName: string): void;
    private onNewReportSchedule;
}
export declare let ExportToolPanel: import("react-redux").ConnectedComponent<typeof ExportToolPanelComponent, Pick<ExportToolPanelComponentProps, "key" | "ref" | "onClick" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup" | "AdaptableApi">>;
export {};
