"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ExportRedux = require("../../Redux/ActionsReducers/ExportRedux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var ButtonDelete_1 = require("../Components/Buttons/ButtonDelete");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var ButtonEdit_1 = require("../Components/Buttons/ButtonEdit");
var ButtonSchedule_1 = require("../Components/Buttons/ButtonSchedule");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var rebass_1 = require("rebass");
var Dropdown_1 = require("../../components/Dropdown");
var DropdownButton_1 = require("../../components/DropdownButton");
var icons_1 = require("../../components/icons");
var join_1 = require("../../components/utils/join");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ExportIcon = icons_1.default.export;
var ExportToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ExportToolbarControlComponent, _super);
    function ExportToolbarControlComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportToolbarControlComponent.prototype.componentDidMount = function () {
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
    ExportToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var selectReportString = 'Select a Report';
        var allReports = this.props
            .SystemReports.filter(function (s) { return _this.props.Adaptable.ReportService.IsSystemReportActive(s); })
            .concat(this.props.Reports);
        var currentReport = this.props.Adaptable.api.exportApi.getReportByName(this.props.CurrentReport);
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
            onClick: function () { return _this.props.onApplyExport(currentReport, Enums_1.ExportDestination.CSV, false); },
            label: 'CSV',
        };
        var jsonMenuItem = {
            onClick: function () { return _this.props.onApplyExport(currentReport, Enums_1.ExportDestination.JSON, false); },
            label: 'JSON',
        };
        var clipboardMenuItem = {
            label: 'Clipboard',
            onClick: function () { return _this.props.onApplyExport(currentReport, Enums_1.ExportDestination.Clipboard, false); },
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
        }*/
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
        var content = (React.createElement(rebass_1.Flex, { alignItems: "stretch", className: "ab-DashboardToolbar__Export__wrap" },
            React.createElement(Dropdown_1.default, { disabled: allReports.length == 0, style: { minWidth: 160 }, options: availableReports, className: "ab-DashboardToolbar__Export__select", placeholder: "Select Report", onChange: function (reportName) { return _this.onSelectedReportChanged(reportName); }, value: currentReport ? currentReport.Name : null, showClearButton: true, marginRight: 2 }),
            React.createElement(DropdownButton_1.default, { className: "ab-DashboardToolbar__Export__export", columns: ['label'], variant: "text", disabled: currentReportId == selectReportString, items: exportItems },
                React.createElement(ExportIcon, null)),
            React.createElement(rebass_1.Flex, { className: join_1.default(this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : '', 'ab-DashboardToolbar__Export__controls'), alignItems: "stretch" },
                React.createElement(ButtonEdit_1.ButtonEdit, { onClick: function () { return _this.props.onEditReport(); }, tooltip: "Edit Report", className: "ab-DashboardToolbar__Export__edit", disabled: savedReport == null || this.props.Adaptable.ReportService.IsSystemReport(savedReport), AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonNew_1.ButtonNew, { variant: "text", className: "ab-DashboardToolbar__Export__new", tone: "neutral", children: null, onClick: function () { return _this.props.onNewReport(); }, tooltip: "Create New Report", AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonDelete_1.ButtonDelete, { tooltip: "Delete Report", className: "ab-DashboardToolbar__Export__delete", disabled: savedReport == null || this.props.Adaptable.ReportService.IsSystemReport(savedReport), ConfirmAction: ExportRedux.ReportDelete(savedReport), ConfirmationMsg: deleteMessage, ConfirmationTitle: 'Delete Report', AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonSchedule_1.ButtonSchedule, { marginLeft: 1, className: "ab-DashboardToolbar__Export__schedule", onClick: function () { return _this.onNewReportSchedule(); }, tooltip: "Schedule", disabled: savedReport == null, AccessLevel: this.props.AccessLevel }))));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__Export", headerText: StrategyConstants.ExportStrategyFriendlyName, glyphicon: StrategyConstants.ExportGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.ExportStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    ExportToolbarControlComponent.prototype.onSelectedReportChanged = function (reportName) {
        this.props.onSelectReport(reportName);
    };
    ExportToolbarControlComponent.prototype.onNewReportSchedule = function () {
        var reportSchedule = ObjectFactory_1.default.CreateReportSchedule(this.props.CurrentReport);
        this.props.onNewReportSchedule(reportSchedule);
    };
    return ExportToolbarControlComponent;
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
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup));
        },
    };
}
exports.ExportToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ExportToolbarControlComponent);
