"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ExportRedux = require("../../Redux/ActionsReducers/ExportRedux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var ToolPanelRedux = require("../../Redux/ActionsReducers/ToolPanelRedux");
var ButtonDelete_1 = require("../Components/Buttons/ButtonDelete");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var ButtonEdit_1 = require("../Components/Buttons/ButtonEdit");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var rebass_1 = require("rebass");
var Dropdown_1 = require("../../components/Dropdown");
var DropdownButton_1 = require("../../components/DropdownButton");
var icons_1 = require("../../components/icons");
var join_1 = require("../../components/utils/join");
var PanelToolPanel_1 = require("../Components/Panels/PanelToolPanel");
var ButtonSchedule_1 = require("../Components/Buttons/ButtonSchedule");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ExportIcon = icons_1.default.export;
var ExportToolPanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ExportToolPanelComponent, _super);
    function ExportToolPanelComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { IsMinimised: true };
        return _this;
    }
    ExportToolPanelComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.Adaptable) {
            this.props.Adaptable.api.eventApi.on('LiveDataChanged', function (liveDataChangedEventArgs) {
                var liveDataChangedInfo = liveDataChangedEventArgs.data[0].id;
                if (liveDataChangedInfo.LiveDataTrigger == 'Connected' ||
                    liveDataChangedInfo.LiveDataTrigger == 'Disconnected') {
                    _this.forceUpdate();
                }
            });
        }
    };
    ExportToolPanelComponent.prototype.render = function () {
        var _this = this;
        var selectReportString = 'Select a Report';
        var allReports = this.props
            .SystemReports.filter(function (s) { return _this.props.Adaptable.ReportService.IsSystemReportActive(s); })
            .concat(this.props.Reports);
        var currentReport = this.props.AdaptableApi.exportApi.getCurrentReport();
        var savedReport = allReports.find(function (s) { return s.Name == _this.props.CurrentReport; });
        var currentReportId = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.CurrentReport)
            ? selectReportString
            : this.props.CurrentReport;
        var availableReports = allReports.map(function (report) {
            return {
                label: report.Name,
                value: report.Name,
            };
        });
        var csvMenuItem = {
            onClick: function () { return _this.props.onApplyExport(currentReport, Enums_1.ExportDestination.CSV); },
            label: 'CSV',
        };
        var jsonMenuItem = {
            onClick: function () { return _this.props.onApplyExport(currentReport, Enums_1.ExportDestination.JSON); },
            label: 'JSON',
        };
        var clipboardMenuItem = {
            label: 'Clipboard',
            onClick: function () { return _this.props.onApplyExport(currentReport, Enums_1.ExportDestination.Clipboard); },
        };
        var openfinExcelMenuItem;
        /*
        if (
          this.props.LiveReports.find(
            x => x.Report == currentReport && x.ReportDestination == ExportDestination.OpenfinExcel
          )
        ) {
          openfinExcelMenuItem = {
            onClick: () => this.props.onReportStopLive(currentReport, ExportDestination.OpenfinExcel),
            label: 'Stop Live Openfin Excel',
          };
        } else {
          openfinExcelMenuItem = {
            onClick: () =>
              this.props.onApplyExport(currentReport, ExportDestination.OpenfinExcel, true),
            label: 'Start Live Openfin Excel',
          };
        }
    */
        var deleteMessage = "Are you sure you want to delete '";
        if (savedReport != null) {
            deleteMessage = deleteMessage + savedReport.Name + "'?";
        }
        var exportItems = [
            csvMenuItem,
            clipboardMenuItem,
            jsonMenuItem,
            this.props.Adaptable.ReportService.IsReportDestinationActive(Enums_1.ExportDestination.OpenfinExcel) && openfinExcelMenuItem,
        ].filter(function (x) { return !!x; });
        var content = (React.createElement(rebass_1.Flex, { flexDirection: "column", alignItems: "stretch", className: "ab-ToolPanel__Export__wrap" },
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: "ab-ToolPanel__Export__wrap" },
                React.createElement(Dropdown_1.default, { disabled: allReports.length == 0, style: { minWidth: 160 }, options: availableReports, className: "ab-ToolPanel__Export__select", placeholder: "Select Report", onChange: function (reportName) { return _this.onSelectedReportChanged(reportName); }, value: currentReport ? currentReport.Name : null, showClearButton: true, marginRight: 2 })),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: "ab-ToolPanel__Export_wrap" },
                React.createElement(DropdownButton_1.default, { className: "ab-ToolPanel__Export__export", columns: ['label'], variant: "text", disabled: currentReportId == selectReportString, items: exportItems },
                    React.createElement(ExportIcon, null)),
                React.createElement(rebass_1.Flex, { className: join_1.default(this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly
                        ? GeneralConstants.READ_ONLY_STYLE
                        : '', 'ab-ToolPanel__Export__controls'), alignItems: "stretch" },
                    React.createElement(ButtonEdit_1.ButtonEdit, { onClick: function () { return _this.props.onEditReport(); }, tooltip: "Edit Report", className: "ab-ToolPanel__Export__edit", disabled: savedReport == null ||
                            this.props.Adaptable.ReportService.IsSystemReport(savedReport), AccessLevel: this.props.AccessLevel }),
                    React.createElement(ButtonNew_1.ButtonNew, { variant: "text", className: "ab-ToolPanel__Export__new", tone: "neutral", children: null, onClick: function () { return _this.props.onNewReport(); }, tooltip: "Create New Report", AccessLevel: this.props.AccessLevel }),
                    React.createElement(ButtonDelete_1.ButtonDelete, { tooltip: "Delete Report", className: "ab-ToolPanel__Export__delete", disabled: savedReport == null ||
                            this.props.Adaptable.ReportService.IsSystemReport(savedReport), ConfirmAction: ExportRedux.ReportDelete(savedReport), ConfirmationMsg: deleteMessage, ConfirmationTitle: 'Delete Report', AccessLevel: this.props.AccessLevel }),
                    React.createElement(ButtonSchedule_1.ButtonSchedule, { marginLeft: 1, className: "ab-DashboardToolbar__Export__schedule", onClick: function () { return _this.onNewReportSchedule(); }, tooltip: "Schedule", disabled: savedReport == null, AccessLevel: this.props.AccessLevel })))));
        return (React.createElement(PanelToolPanel_1.PanelToolPanel, { className: "ab-ToolPanel__Export", headerText: StrategyConstants.ExportStrategyFriendlyName, onConfigure: function () { return _this.props.onConfigure(); }, onMinimiseChanged: function () { return _this.setState({ IsMinimised: !_this.state.IsMinimised }); }, isMinimised: this.state.IsMinimised, onClose: function () { return _this.props.onClose('Export'); } }, this.state.IsMinimised ? null : content));
    };
    ExportToolPanelComponent.prototype.onSelectedReportChanged = function (reportName) {
        this.props.onSelectReport(reportName);
    };
    ExportToolPanelComponent.prototype.onNewReportSchedule = function () {
        var reportSchedule = ObjectFactory_1.default.CreateReportSchedule(this.props.CurrentReport);
        this.props.onNewReportSchedule(reportSchedule);
    };
    return ExportToolPanelComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        CurrentReport: state.Export.CurrentReport,
        Reports: state.Export.Reports,
        SystemReports: state.System.SystemReports,
        LiveReports: state.System.CurrentLiveReports,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onApplyExport: function (report, exportDestination) {
            return dispatch(ExportRedux.ExportApply(report, exportDestination));
        },
        onSelectReport: function (Report) { return dispatch(ExportRedux.ReportSelect(Report)); },
        onReportStopLive: function (Report, exportDestination) { return dispatch(SystemRedux.ReportStopLive(Report, exportDestination)); },
        onNewReport: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup, {
                action: 'New',
                source: 'Toolbar',
            }));
        },
        onEditReport: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup, {
                action: 'Edit',
                source: 'Toolbar',
            }));
        },
        onNewReportSchedule: function (reportSchedule) {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ScheduleStrategyId, ScreenPopups.SchedulePopup, {
                action: 'New',
                source: 'Toolbar',
                value: reportSchedule,
            }));
        },
        onClose: function (toolPanel) {
            return dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup));
        },
    };
}
exports.ExportToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ExportToolPanelComponent);
