import * as React from 'react';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { Report } from '../../PredefinedConfig/ExportState';
import { IPushPullReport, IPushPullDomain, IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';
interface IPushPullToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<IPushPullToolbarControlComponent> {
    onIPushPullSendSnapshot: (iPushPulleport: IPushPullReport) => IPushPullRedux.IPushPullSendSnapshotAction;
    onIPushPullStartLiveData: (iPushPulleport: IPushPullReport) => IPushPullRedux.IPushPullStartLiveDataAction;
    onIPushPullStopLiveData: () => IPushPullRedux.IPushPullStopLiveDataAction;
    onNewIPushPullSchedule: (iPushPullSchedule: IPushPullSchedule) => PopupRedux.PopupShowScreenAction;
    onShowIPushPullLogin: () => PopupRedux.PopupShowScreenAction;
    onShowAddIPushPullPage: () => PopupRedux.PopupShowScreenAction;
    Columns: AdaptableColumn[];
    Reports: Report[] | undefined;
    SystemReports: Report[] | undefined;
    CurrentLiveIPushPullReport: IPushPullReport | undefined;
    IPushPullDomainsPages: IPushPullDomain[] | undefined;
    IsIPushPullRunning: boolean;
}
interface IPushPullToolbarControlComponentState {
    ReportName: string;
    Page: string;
    Folder: string;
    AvailablePages: string[];
}
declare class IPushPullToolbarControlComponent extends React.Component<IPushPullToolbarControlComponentProps, IPushPullToolbarControlComponentState> {
    constructor(props: IPushPullToolbarControlComponentProps);
    componentDidMount(): void;
    render(): any;
    onSelectedReportChanged(reportName: string): void;
    private onFolderChanged;
    private onPageChanged;
    private onIPushPullSendSnapshot;
    private onIPushPullStartLiveData;
    private onNewIPushPullSchedule;
    private createIPushPullReportFromState;
}
export declare let IPushPullToolbarControl: import("react-redux").ConnectedComponent<typeof IPushPullToolbarControlComponent, Pick<IPushPullToolbarControlComponentProps, "key" | "ref" | "onClick" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
