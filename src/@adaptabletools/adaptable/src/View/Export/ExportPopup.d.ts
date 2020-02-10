import * as React from 'react';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { Report } from '../../PredefinedConfig/ExportState';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { LiveReport } from '../../Api/Events/LiveDataChanged';
interface ExportPopupProps extends StrategyViewPopupProps<ExportPopupComponent> {
    Reports: Report[];
    SystemReports: Report[];
    LiveReports: LiveReport[];
    CurrentReport: string;
    onApplyExport: (report: Report, exportDestination: ExportDestination) => ExportRedux.ExportApplyAction;
    onAddReport: (report: Report) => ExportRedux.ReportAddAction;
    onEditReport: (report: Report) => ExportRedux.ReportEditAction;
    onReportStopLive: (report: Report, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.Glue42) => SystemRedux.ReportStopLiveAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class ExportPopupComponent extends React.Component<ExportPopupProps, EditableConfigEntityState> {
    constructor(props: ExportPopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
    onNew(): void;
    onEdit(ReportToEdit: Report): void;
    onApplyExport(report: Report, exportDestination: ExportDestination): void;
}
export declare let ExportPopup: import("react-redux").ConnectedComponent<typeof ExportPopupComponent, Pick<ExportPopupProps, "key" | "ref" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
