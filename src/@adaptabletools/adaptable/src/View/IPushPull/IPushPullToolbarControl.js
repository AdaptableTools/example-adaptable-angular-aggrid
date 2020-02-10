"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var IPushPullRedux = require("../../Redux/ActionsReducers/IPushPullRedux");
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
var ButtonNewPage_1 = require("../Components/Buttons/ButtonNewPage");
var ButtonLogout_1 = require("../Components/Buttons/ButtonLogout");
var IPushPullToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(IPushPullToolbarControlComponent, _super);
    function IPushPullToolbarControlComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ReportName: '',
            Page: '',
            Folder: '',
            AvailablePages: [],
        };
        return _this;
    }
    IPushPullToolbarControlComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.Adaptable) {
            this.props.Adaptable.api.eventApi.on('LiveDataChanged', function (liveDataChangedEventArgs) {
                var liveDataChangedInfo = liveDataChangedEventArgs.data[0].id;
                if (liveDataChangedInfo.ReportDestination == 'iPushPull' &&
                    (liveDataChangedInfo.LiveDataTrigger == 'Connected' ||
                        liveDataChangedInfo.LiveDataTrigger == 'Disconnected')) {
                    _this.forceUpdate();
                }
            });
        }
    };
    IPushPullToolbarControlComponent.prototype.render = function () {
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
        var availableFolders = this.props.IPushPullDomainsPages.map(function (iPushPullDomain) {
            return {
                label: iPushPullDomain.Name,
                value: iPushPullDomain.Name,
            };
        });
        // this is clearly ridiculous!
        // im getting tired...
        var isCompletedReport = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ReportName) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Folder) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Page);
        var isLiveIPushPullReport = isCompletedReport &&
            this.props.CurrentLiveIPushPullReport &&
            this.state.ReportName == this.props.CurrentLiveIPushPullReport.ReportName &&
            this.state.Folder == this.props.CurrentLiveIPushPullReport.Folder &&
            this.state.Page == this.props.CurrentLiveIPushPullReport.Page;
        var content = this.props.IsIPushPullRunning ? (React.createElement(rebass_1.Flex, { alignItems: "stretch", className: "ab-DashboardToolbar__IPushPull__wrap" },
            React.createElement(Dropdown_1.default, { disabled: allReports.length == 0 || isLiveIPushPullReport, style: { minWidth: 140 }, options: availableReports, className: "ab-DashboardToolbar__IPushPull__select", placeholder: "Select Report", onChange: function (reportName) { return _this.onSelectedReportChanged(reportName); }, value: this.state.ReportName, showClearButton: true, marginRight: 2 }),
            React.createElement(Dropdown_1.default, { disabled: allReports.length == 0 || isLiveIPushPullReport, style: { minWidth: 140 }, options: availableFolders, className: "ab-DashboardToolbar__IPushPull__select", onChange: function (folder) { return _this.onFolderChanged(folder); }, value: this.state.Folder, placeholder: "Select Folder", marginRight: 2 }),
            React.createElement(Dropdown_1.default, { disabled: allReports.length == 0 || isLiveIPushPullReport, style: { minWidth: 140 }, options: this.state.AvailablePages, className: "ab-DashboardToolbar__IPushPull__select", placeholder: "Select Page", onChange: function (page) { return _this.onPageChanged(page); }, value: this.state.Page ? this.state.Page : null, showClearButton: true, marginRight: 2 }),
            React.createElement(ButtonExport_1.ButtonExport, { marginLeft: 1, className: "ab-DashboardToolbar__IPushPull__export", onClick: function () { return _this.onIPushPullSendSnapshot(); }, tooltip: "Send Snapshot to ipushpull", disabled: isLiveIPushPullReport || !isCompletedReport, AccessLevel: this.props.AccessLevel }),
            isLiveIPushPullReport ? (React.createElement(ButtonPause_1.ButtonPause, { marginLeft: 1, className: "ab-DashboardToolbar__IPushPull__pause", onClick: function () { return _this.props.onIPushPullStopLiveData(); }, tooltip: "Stop sync with ipushpull", disabled: !isLiveIPushPullReport, AccessLevel: this.props.AccessLevel })) : (React.createElement(ButtonPlay_1.ButtonPlay, { marginLeft: 1, className: "ab-DashboardToolbar__IPushPull__play", onClick: function () { return _this.onIPushPullStartLiveData(); }, tooltip: "Start sync with ipushpull", disabled: isLiveIPushPullReport || !isCompletedReport, AccessLevel: this.props.AccessLevel })),
            isCompletedReport && (React.createElement(rebass_1.Flex, { className: join_1.default(this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly
                    ? GeneralConstants.READ_ONLY_STYLE
                    : '', 'ab-DashboardToolbar__IPushPull__controls'), alignItems: "stretch" },
                React.createElement(ButtonSchedule_1.ButtonSchedule, { marginLeft: 1, className: "ab-DashboardToolbar__IPushPull__schedule", onClick: function () { return _this.onNewIPushPullSchedule(); }, tooltip: "Schedule", disabled: isLiveIPushPullReport || !isCompletedReport, AccessLevel: this.props.AccessLevel }))),
            ' ',
            React.createElement(ButtonNewPage_1.ButtonNewPage, { marginLeft: 1, className: "ab-DashboardToolbar__IPushPull__newpage", onClick: function () { return _this.props.onShowAddIPushPullPage(); }, tooltip: "New Page", disabled: isLiveIPushPullReport, AccessLevel: this.props.AccessLevel }),
            React.createElement(ButtonLogout_1.ButtonLogout, { marginLeft: 1, className: "ab-DashboardToolbar__IPushPull__logout", onClick: function () { return _this.props.Adaptable.api.iPushPullApi.logoutFromIPushPull(); }, tooltip: "Logout", disabled: isLiveIPushPullReport, AccessLevel: this.props.AccessLevel }))) : (React.createElement(ButtonLogin_1.ButtonLogin, { marginLeft: 1, className: "ab-DashboardToolbar__IPushPull__login", onClick: function () { return _this.props.onShowIPushPullLogin(); }, tooltip: "Login to ipushpull", AccessLevel: this.props.AccessLevel },
            ' ',
            "Login"));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__IPushPull", headerText: StrategyConstants.IPushPullStrategyFriendlyName, glyphicon: StrategyConstants.IPushPullGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.IPushPullStrategyId); }, showConfigureButton: false, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    IPushPullToolbarControlComponent.prototype.onSelectedReportChanged = function (reportName) {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(reportName) && reportName !== 'Select Report') {
            this.setState({ ReportName: reportName });
        }
        else {
            this.setState({ ReportName: GeneralConstants_1.EMPTY_STRING });
        }
    };
    IPushPullToolbarControlComponent.prototype.onFolderChanged = function (folder) {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(folder) && folder !== 'Select Folder') {
            var avaialablePages = this.props.Adaptable.api.iPushPullApi.getPagesForIPushPullDomain(folder);
            this.setState({
                Folder: folder,
                AvailablePages: avaialablePages,
                Page: GeneralConstants_1.EMPTY_STRING,
            });
        }
        else {
            this.setState({
                Folder: GeneralConstants_1.EMPTY_STRING,
                AvailablePages: [],
                Page: GeneralConstants_1.EMPTY_STRING,
            });
        }
    };
    IPushPullToolbarControlComponent.prototype.onPageChanged = function (page) {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(page) && page !== 'Select Page') {
            this.setState({ Page: page });
        }
        else {
            this.setState({ Page: GeneralConstants_1.EMPTY_STRING });
        }
    };
    IPushPullToolbarControlComponent.prototype.onIPushPullSendSnapshot = function () {
        this.props.onIPushPullSendSnapshot(this.createIPushPullReportFromState());
    };
    IPushPullToolbarControlComponent.prototype.onIPushPullStartLiveData = function () {
        this.props.onIPushPullStartLiveData(this.createIPushPullReportFromState());
    };
    IPushPullToolbarControlComponent.prototype.onNewIPushPullSchedule = function () {
        var iPushPullSchedule = ObjectFactory_1.default.CreateIPushPullSchedule(this.createIPushPullReportFromState());
        this.props.onNewIPushPullSchedule(iPushPullSchedule);
    };
    // perhaps this should be props and in real state?
    IPushPullToolbarControlComponent.prototype.createIPushPullReportFromState = function () {
        return {
            ReportName: this.state.ReportName,
            Folder: this.state.Folder,
            Page: this.state.Page,
        };
    };
    return IPushPullToolbarControlComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        CurrentLiveIPushPullReport: state.IPushPull.CurrentLiveIPushPullReport,
        Reports: state.Export.Reports,
        SystemReports: state.System.SystemReports,
        IPushPullDomainsPages: state.IPushPull.IPushPullDomainsPages,
        IsIPushPullRunning: state.IPushPull.IsIPushPullRunning,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onIPushPullSendSnapshot: function (iPushPullReport) {
            return dispatch(IPushPullRedux.IPushPullSendSnapshot(iPushPullReport));
        },
        onIPushPullStartLiveData: function (iPushPullReport) {
            return dispatch(IPushPullRedux.IPushPullStartLiveData(iPushPullReport));
        },
        onIPushPullStopLiveData: function () { return dispatch(IPushPullRedux.IPushPullStopLiveData()); },
        onNewIPushPullSchedule: function (iPushPullSchedule) {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ScheduleStrategyId, ScreenPopups.SchedulePopup, {
                action: 'New',
                source: 'Toolbar',
                value: iPushPullSchedule,
            }));
        },
        onShowIPushPullLogin: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.IPushPullStrategyId, ScreenPopups.IPushPullLoginPopup, null, {
                footer: false,
            }));
        },
        onShowAddIPushPullPage: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.IPushPullStrategyId, ScreenPopups.IPushPullAddPagePopup, null, {
                footer: false,
            }));
        },
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.IPushPullStrategyId, ScreenPopups.IPushPullPopup));
        },
    };
}
exports.IPushPullToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(IPushPullToolbarControlComponent);
