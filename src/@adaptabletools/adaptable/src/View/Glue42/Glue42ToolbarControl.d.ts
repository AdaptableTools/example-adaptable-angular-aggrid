import * as React from 'react';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as Glue42Redux from '../../Redux/ActionsReducers/Glue42Redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { Report } from '../../PredefinedConfig/ExportState';
import { Glue42Report, Glue42Schedule } from '../../PredefinedConfig/Glue42State';
interface Glue42ToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<Glue42ToolbarControlComponent> {
    onGlue42SendSnapshot: (glue42report: Glue42Report) => Glue42Redux.Glue42SendSnapshotAction;
    onGlue42StartLiveData: (glue42report: Glue42Report) => Glue42Redux.Glue42StartLiveDataAction;
    onGlue42StopLiveData: () => Glue42Redux.Glue42StopLiveDataAction;
    onNewGlue42Schedule: (glue42Schedule: Glue42Schedule) => PopupRedux.PopupShowScreenAction;
    onShowGlue42Login: () => PopupRedux.PopupShowScreenAction;
    Columns: AdaptableColumn[];
    Reports: Report[] | undefined;
    SystemReports: Report[] | undefined;
    CurrentLiveGlue42Report: Glue42Report | undefined;
    IsGlue42Running: boolean;
    IsGlue42Available: boolean;
}
interface Glue42ToolbarControlComponentState {
    ReportName: string;
}
declare class Glue42ToolbarControlComponent extends React.Component<Glue42ToolbarControlComponentProps, Glue42ToolbarControlComponentState> {
    constructor(props: Glue42ToolbarControlComponentProps);
    componentDidMount(): void;
    render(): any;
    onSelectedReportChanged(reportName: string): void;
    private onGlue42SendSnapshot;
    private onGlue42StartLiveData;
    private onNewGlue42Schedule;
    private createGlue42ReportFromState;
}
export declare let Glue42ToolbarControl: import("react-redux").ConnectedComponent<typeof Glue42ToolbarControlComponent, Pick<Glue42ToolbarControlComponentProps, "key" | "ref" | "onClick" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
