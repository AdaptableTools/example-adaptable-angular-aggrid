"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var Glue42Redux = require("../../Redux/ActionsReducers/Glue42Redux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var rebass_1 = require("rebass");
var Dropdown_1 = require("../../components/Dropdown");
var join_1 = require("../../components/utils/join");
var ButtonExport_1 = require("../Components/Buttons/ButtonExport");
var ButtonLogin_1 = require("../Components/Buttons/ButtonLogin");
var ButtonPlay_1 = require("../Components/Buttons/ButtonPlay");
var ButtonSchedule_1 = require("../Components/Buttons/ButtonSchedule");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var ButtonPause_1 = require("../Components/Buttons/ButtonPause");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonLogout_1 = require("../Components/Buttons/ButtonLogout");
var Glue42ToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(Glue42ToolbarControlComponent, _super);
    function Glue42ToolbarControlComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ReportName: '',
        };
        return _this;
    }
    Glue42ToolbarControlComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.Adaptable) {
            this.props.Adaptable.api.eventApi.on('LiveDataChanged', function (liveDataChangedEventArgs) {
                var liveDataChangedInfo = liveDataChangedEventArgs.data[0].id;
                if (liveDataChangedInfo.ReportDestination == 'Glue42' &&
                    (liveDataChangedInfo.LiveDataTrigger == 'Connected' ||
                        liveDataChangedInfo.LiveDataTrigger == 'Disconnected')) {
                    _this.forceUpdate();
                }
            });
        }
    };
    Glue42ToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var allReports = this.props
            .SystemReports.filter(function (s) { return _this.props.Adaptable.ReportService.IsSystemReportActive(s); })
            .concat(this.props.Reports);
        var availableReports = allReports.map(function (report) {
            return {
                label: report.Name,
                value: report.Name,
            };
        });
        // this is clearly ridiculous!
        // im getting tired...
        var isCompletedReport = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ReportName);
        var isLiveGlue42Report = isCompletedReport &&
            this.props.CurrentLiveGlue42Report &&
            this.state.ReportName == this.props.CurrentLiveGlue42Report.ReportName;
        var content = this.props.IsGlue42Running ? (React.createElement(rebass_1.Flex, { alignItems: "stretch", className: "ab-DashboardToolbar__Glue42__wrap" },
            React.createElement(Dropdown_1.default, { disabled: allReports.length == 0 || isLiveGlue42Report, style: { minWidth: 140 }, options: availableReports, className: "ab-DashboardToolbar__Glue42__select", placeholder: "Select Report", onChange: function (reportName) { return _this.onSelectedReportChanged(reportName); }, value: this.state.ReportName, showClearButton: true, marginRight: 2 }),
            React.createElement(ButtonExport_1.ButtonExport, { marginLeft: 1, className: "ab-DashboardToolbar__Glue42__export", onClick: function () { return _this.onGlue42SendSnapshot(); }, tooltip: "Send Snapshot to Glue42", disabled: isLiveGlue42Report || !isCompletedReport, AccessLevel: this.props.AccessLevel }),
            isLiveGlue42Report ? (React.createElement(ButtonPause_1.ButtonPause, { marginLeft: 1, className: "ab-DashboardToolbar__Glue42__pause", onClick: function () { return _this.props.onGlue42StopLiveData(); }, tooltip: "Stop sync with Glue42", disabled: !isLiveGlue42Report, AccessLevel: this.props.AccessLevel })) : (React.createElement(ButtonPlay_1.ButtonPlay, { marginLeft: 1, className: "ab-DashboardToolbar__Glue42__play", onClick: function () { return _this.onGlue42StartLiveData(); }, tooltip: "Start sync with Glue42", disabled: isLiveGlue42Report || !isCompletedReport, AccessLevel: this.props.AccessLevel })),
            isCompletedReport && (React.createElement(rebass_1.Flex, { className: join_1.default(this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly
                    ? GeneralConstants.READ_ONLY_STYLE
                    : '', 'ab-DashboardToolbar__Glue42__controls'), alignItems: "stretch" },
                React.createElement(ButtonSchedule_1.ButtonSchedule, { marginLeft: 1, className: "ab-DashboardToolbar__Glue42__schedule", onClick: function () { return _this.onNewGlue42Schedule(); }, tooltip: "Schedule", disabled: isLiveGlue42Report || !isCompletedReport, AccessLevel: this.props.AccessLevel }))),
            ' ',
            React.createElement(ButtonLogout_1.ButtonLogout, { marginLeft: 1, className: "ab-DashboardToolbar__Glue42_logout", onClick: function () { return _this.props.Adaptable.api.glue42Api.logoutFromGlue42(); }, tooltip: "Logout", disabled: isLiveGlue42Report, AccessLevel: this.props.AccessLevel }))) : (React.createElement(ButtonLogin_1.ButtonLogin, { marginLeft: 1, className: "ab-DashboardToolbar__IPushPull__login", onClick: function () { return _this.props.onShowGlue42Login(); }, tooltip: "Login to ipushpull", AccessLevel: this.props.AccessLevel },
            ' ',
            "Login"));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__Glue42", headerText: StrategyConstants.Glue42StrategyFriendlyName, glyphicon: StrategyConstants.Glue42Glyph, onClose: function () { return _this.props.onClose(StrategyConstants.Glue42StrategyId); }, showConfigureButton: false, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    Glue42ToolbarControlComponent.prototype.onSelectedReportChanged = function (reportName) {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(reportName) && reportName !== 'Select Report') {
            this.setState({ ReportName: reportName });
        }
        else {
            this.setState({ ReportName: GeneralConstants_1.EMPTY_STRING });
        }
    };
    Glue42ToolbarControlComponent.prototype.onGlue42SendSnapshot = function () {
        this.props.onGlue42SendSnapshot(this.createGlue42ReportFromState());
    };
    Glue42ToolbarControlComponent.prototype.onGlue42StartLiveData = function () {
        this.props.onGlue42StartLiveData(this.createGlue42ReportFromState());
    };
    Glue42ToolbarControlComponent.prototype.onNewGlue42Schedule = function () {
        var Glue42Schedule = ObjectFactory_1.default.CreateGlue42Schedule(this.createGlue42ReportFromState());
        this.props.onNewGlue42Schedule(Glue42Schedule);
    };
    // perhaps this should be props and in real state?
    Glue42ToolbarControlComponent.prototype.createGlue42ReportFromState = function () {
        return {
            ReportName: this.state.ReportName,
        };
    };
    return Glue42ToolbarControlComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        CurrentLiveGlue42Report: state.Glue42.CurrentLiveGlue42Report,
        Reports: state.Export.Reports,
        SystemReports: state.System.SystemReports,
        IsGlue42Available: state.Glue42.IsGlue42Available,
        IsGlue42Running: state.Glue42.IsGlue42Running,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onGlue42SendSnapshot: function (glue42report) {
            return dispatch(Glue42Redux.Glue42SendSnapshot(glue42report));
        },
        onGlue42StartLiveData: function (glue42report) {
            return dispatch(Glue42Redux.Glue42StartLiveData(glue42report));
        },
        onGlue42StopLiveData: function () { return dispatch(Glue42Redux.Glue42StopLiveData()); },
        onNewGlue42Schedule: function (Glue42Schedule) {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ScheduleStrategyId, ScreenPopups.SchedulePopup, {
                action: 'New',
                source: 'Toolbar',
                value: Glue42Schedule,
            }));
        },
        onShowGlue42Login: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.Glue42StrategyId, ScreenPopups.Glue42LoginPopup, null, {
                footer: false,
            }));
        },
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.Glue42StrategyId, ScreenPopups.Glue42Popup));
        },
    };
}
exports.Glue42ToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Glue42ToolbarControlComponent);
