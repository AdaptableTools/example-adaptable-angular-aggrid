"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var EnumExtensions_1 = require("../../../Utilities/Extensions/EnumExtensions");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var Dropdown_1 = require("../../../components/Dropdown");
var rebass_1 = require("rebass");
var WizardPanel_1 = require("../../../components/WizardPanel");
var Input_1 = require("../../../components/Input");
var CheckBox_1 = require("../../../components/CheckBox");
var GeneralConstants_1 = require("../../../Utilities/Constants/GeneralConstants");
var Radio_1 = require("../../../components/Radio");
var HelpBlock_1 = require("../../../components/HelpBlock");
var ScheduleSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ScheduleSettingsWizard, _super);
    function ScheduleSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            // Reminder
            Header: _this.props.Data.ScheduleType == Enums_1.ScheduleType.Reminder
                ? _this.props.Data.Alert.Header
                : undefined,
            Msg: _this.props.Data.ScheduleType == Enums_1.ScheduleType.Reminder
                ? _this.props.Data.Alert.Msg
                : undefined,
            MessageType: _this.props.Data.ScheduleType == Enums_1.ScheduleType.Reminder
                ? _this.props.Data.Alert.AlertDefinition
                    .MessageType
                : undefined,
            ShowPopup: _this.props.Data.ScheduleType == Enums_1.ScheduleType.Reminder
                ? _this.props.Data.Alert.AlertDefinition.AlertProperties.ShowPopup
                : undefined,
            // Report
            ReportName: _this.props.Data.ScheduleType == Enums_1.ScheduleType.Report
                ? _this.props.Data.ReportName
                : undefined,
            ExportDestination: _this.props.Data.ScheduleType == Enums_1.ScheduleType.Report
                ? _this.props.Data.ExportDestination
                : undefined,
            // ipushpull
            IPushPullReportName: _this.props.Data.ScheduleType === Enums_1.ScheduleType.iPushPull
                ? _this.props.Data.IPushPullReport.ReportName
                : undefined,
            Page: _this.props.Data.ScheduleType === Enums_1.ScheduleType.iPushPull
                ? _this.props.Data.IPushPullReport.Page
                : undefined,
            Folder: _this.props.Data.ScheduleType === Enums_1.ScheduleType.iPushPull
                ? _this.props.Data.IPushPullReport.Folder
                : undefined,
            IPushPullTransmission: _this.props.Data.ScheduleType === Enums_1.ScheduleType.iPushPull
                ? _this.props.Data.Transmission
                : undefined,
            AvailablePages: _this.props.Data.ScheduleType === Enums_1.ScheduleType.iPushPull
                ? StringExtensions_1.StringExtensions.IsNotNullOrEmpty(_this.props.Data.IPushPullReport.Folder)
                    ? _this.props.Adaptable.api.iPushPullApi.getPagesForIPushPullDomain(_this.props.Data.IPushPullReport.Folder)
                    : []
                : [],
            // Glue42
            Glue42ReportName: _this.props.Data.ScheduleType === Enums_1.ScheduleType.Glue42
                ? _this.props.Data.Glue42Report.ReportName
                : undefined,
            Glue42Transmission: _this.props.Data.ScheduleType === Enums_1.ScheduleType.Glue42
                ? _this.props.Data.Transmission
                : undefined,
        };
        return _this;
    }
    ScheduleSettingsWizard.prototype.render = function () {
        var _this = this;
        // Reminder Stuff
        var messageTypes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.MessageType).map(function (type) {
            return {
                label: type,
                value: type,
            };
        });
        // Report Stuff
        var allReports = this.props.Adaptable.api.exportApi.getAllReports();
        var availableReports = allReports.map(function (report) {
            return {
                label: report.Name,
                value: report.Name,
            };
        });
        var destinations = ['CSV', 'Clipboard', 'JSON'].map(function (type) {
            return {
                label: type,
                value: type,
            };
        });
        // ipushpull Stuff
        var allFolders = this.props.Adaptable.api.iPushPullApi.getIPushPullDomains();
        var availableFolders = allFolders.map(function (iPushPullDomain) {
            return {
                label: iPushPullDomain.Name,
                value: iPushPullDomain.Name,
            };
        });
        return (React.createElement("div", { style: { height: '100%' } },
            React.createElement(WizardPanel_1.default, null,
                this.props.Data.ScheduleType === Enums_1.ScheduleType.Reminder && (React.createElement(rebass_1.Flex, { flexDirection: "column" },
                    React.createElement(rebass_1.Flex, { marginTop: 2, alignItems: "center" },
                        React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Header:"),
                        React.createElement(Input_1.default, { style: { flex: 7 }, value: this.state.Header, type: "string", placeholder: "Enter Reminder Header (optional)", onChange: function (e) { return _this.onHeaderChanged(e); } })),
                    React.createElement(rebass_1.Flex, { marginTop: 2, alignItems: "center" },
                        React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Message:"),
                        React.createElement(Input_1.default, { value: this.state.Msg, style: { flex: 7 }, type: "string", placeholder: "Enter Reminder Message", onChange: function (e) { return _this.onMessageChanged(e); } })),
                    React.createElement(rebass_1.Flex, { marginTop: 2, alignItems: "center" },
                        React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Message Type:"),
                        React.createElement(rebass_1.Box, { style: { flex: 7 } },
                            React.createElement(Dropdown_1.default, { style: { maxWidth: '100%' }, placeholder: "select", value: this.state.MessageType, onChange: function (value) { return _this.onMessageTypeChanged(value); }, options: messageTypes }, messageTypes))),
                    React.createElement(rebass_1.Flex, { marginTop: 2 },
                        React.createElement("div", { style: { flex: 2 } }),
                        React.createElement(rebass_1.Box, { style: { flex: 7 } },
                            React.createElement(CheckBox_1.default, { marginLeft: 2, checked: this.state.ShowPopup == true, onChange: function (checked) { return _this.onShowAsPopupChanged(checked); } }, "Show the Reminder as a Popup"),
                            ' ')))),
                this.props.Data.ScheduleType === Enums_1.ScheduleType.Report && (React.createElement(React.Fragment, null,
                    React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 1 },
                        React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Select a Report to Export"),
                        React.createElement(Dropdown_1.default, { disabled: allReports.length == 0, style: { minWidth: 300 }, options: availableReports, className: "ab-DashboardToolbar__Export__select", placeholder: "Select Report", onChange: function (reportName) { return _this.onSelectedReportChanged(reportName); }, value: this.state.ReportName ? this.state.ReportName : null, showClearButton: true, marginRight: 2 }),
                        React.createElement(HelpBlock_1.default, { marginBottom: 1, marginTop: 3 }, "Select an Export Destination"),
                        React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ExportDestination, onChange: function (x) { return _this.onExportDestinationChanged(x); }, options: destinations })))),
                this.props.Data.ScheduleType === Enums_1.ScheduleType.iPushPull && (React.createElement(React.Fragment, null,
                    React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 1 },
                        React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Select a Report to Export"),
                        React.createElement(Dropdown_1.default, { disabled: allReports.length == 0, style: { minWidth: 300 }, options: availableReports, className: "ab-DashboardToolbar__Export__select", placeholder: "Select Report", onChange: function (iPushPullReportName) {
                                return _this.onIPushPullSelectedReportChanged(iPushPullReportName);
                            }, value: this.state.IPushPullReportName ? this.state.IPushPullReportName : null, showClearButton: true, marginRight: 2 }),
                        React.createElement(HelpBlock_1.default, { marginBottom: 1, marginTop: 3 }, "Select an ipushpull Folder"),
                        React.createElement(Dropdown_1.default, { disabled: availableFolders.length == 0, style: { minWidth: 300 }, options: availableFolders, className: "ab-DashboardToolbar__Export__select", onChange: function (folder) { return _this.onFolderChanged(folder); }, value: this.state.Folder ? this.state.Folder : null, placeholder: "Select Folder", marginRight: 2 }),
                        React.createElement(HelpBlock_1.default, { marginBottom: 1, marginTop: 3 }, "Select an ipushpull Page"),
                        React.createElement(Dropdown_1.default, { disabled: allReports.length == 0, style: { minWidth: 300 }, options: this.state.AvailablePages, className: "ab-DashboardToolbar__Export__select", placeholder: "Select Page", onChange: function (page) { return _this.onPageChanged(page); }, value: this.state.Page ? this.state.Page : null, showClearButton: true, marginRight: 2 }),
                        React.createElement(HelpBlock_1.default, { marginBottom: 1, marginTop: 3 }, "Choose whether to send ipushpull Data as 'Snapshot' (One-off report) or 'Live Data' (updating as Grid updates)"),
                        React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                            React.createElement(Radio_1.default, { marginRight: 3, marginLeft: 2, value: "Snapshot", checked: this.state.IPushPullTransmission === 'Snapshot', onChange: function (_, e) { return _this.onIPushPullTransmissionChanged(e); } }, "Snapshot (one off report)"),
                            React.createElement(Radio_1.default, { value: "Live Data", checked: this.state.IPushPullTransmission === 'Live Data', onChange: function (_, e) { return _this.onIPushPullTransmissionChanged(e); } }, "Live Data (real-time updates)"))))),
                this.props.Data.ScheduleType === Enums_1.ScheduleType.Glue42 && (React.createElement(React.Fragment, null,
                    React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 1 },
                        React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Select a Report to Export"),
                        React.createElement(Dropdown_1.default, { disabled: allReports.length == 0, style: { minWidth: 300 }, options: availableReports, className: "ab-DashboardToolbar__Export__select", placeholder: "Select Report", onChange: function (glue42ReportName) {
                                return _this.onGlue42SelectedReportChanged(glue42ReportName);
                            }, value: this.state.Glue42ReportName ? this.state.Glue42ReportName : null, showClearButton: true, marginRight: 2 }),
                        React.createElement(HelpBlock_1.default, { marginBottom: 1, marginTop: 3 }, "Choose whether to send Glue42 Data as 'Snapshot' (One-off report) or 'Live Data' (updating as Grid updates)"),
                        React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                            React.createElement(Radio_1.default, { marginRight: 3, marginLeft: 2, value: "Snapshot", checked: this.state.Glue42Transmission === 'Snapshot', onChange: function (_, e) { return _this.onGlue42TransmissionChanged(e); } }, "Snapshot (one off report)"),
                            React.createElement(Radio_1.default, { value: "Live Data", checked: this.state.Glue42Transmission === 'Live Data', onChange: function (_, e) { return _this.onGlue42TransmissionChanged(e); } }, "Live Data (real-time updates)"))))))));
    };
    ScheduleSettingsWizard.prototype.onHeaderChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ Header: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ScheduleSettingsWizard.prototype.onMessageChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ Msg: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ScheduleSettingsWizard.prototype.onMessageTypeChanged = function (value) {
        var _this = this;
        this.setState({ MessageType: value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ScheduleSettingsWizard.prototype.onShowAsPopupChanged = function (checked) {
        var _this = this;
        this.setState({ ShowPopup: checked }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ScheduleSettingsWizard.prototype.onSelectedReportChanged = function (reportName) {
        var _this = this;
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(reportName) && reportName !== 'Select Report') {
            this.setState({ ReportName: reportName }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
        else {
            this.setState({ ReportName: GeneralConstants_1.EMPTY_STRING }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
    };
    ScheduleSettingsWizard.prototype.onExportDestinationChanged = function (value) {
        var _this = this;
        this.setState({ ExportDestination: value }, function () { return _this.props.UpdateGoBackState(); });
    };
    ScheduleSettingsWizard.prototype.onIPushPullSelectedReportChanged = function (reportName) {
        var _this = this;
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(reportName) && reportName !== 'Select Report') {
            this.setState({ IPushPullReportName: reportName }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
        else {
            this.setState({ IPushPullReportName: GeneralConstants_1.EMPTY_STRING }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
    };
    ScheduleSettingsWizard.prototype.onFolderChanged = function (folder) {
        var _this = this;
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(folder) && folder !== 'Select Folder') {
            var avaialablePages = this.props.Adaptable.api.iPushPullApi.getPagesForIPushPullDomain(folder);
            this.setState({
                Folder: folder,
                AvailablePages: avaialablePages,
                Page: GeneralConstants_1.EMPTY_STRING,
            }, function () { return _this.props.UpdateGoBackState(); });
        }
        else {
            this.setState({
                Folder: GeneralConstants_1.EMPTY_STRING,
                AvailablePages: [],
                Page: GeneralConstants_1.EMPTY_STRING,
            }, function () { return _this.props.UpdateGoBackState(); });
        }
    };
    ScheduleSettingsWizard.prototype.onPageChanged = function (page) {
        var _this = this;
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(page) && page !== 'Select Page') {
            this.setState({ Page: page }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
        else {
            this.setState({ Page: GeneralConstants_1.EMPTY_STRING }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
    };
    ScheduleSettingsWizard.prototype.onIPushPullTransmissionChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ IPushPullTransmission: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ScheduleSettingsWizard.prototype.onGlue42SelectedReportChanged = function (reportName) {
        var _this = this;
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(reportName) && reportName !== 'Select Report') {
            this.setState({ Glue42ReportName: reportName }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
        else {
            this.setState({ Glue42ReportName: GeneralConstants_1.EMPTY_STRING }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
    };
    ScheduleSettingsWizard.prototype.onGlue42TransmissionChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ Glue42Transmission: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ScheduleSettingsWizard.prototype.canNext = function () {
        switch (this.props.Data.ScheduleType) {
            case Enums_1.ScheduleType.Reminder:
                return this.state.MessageType != null && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Msg);
            case Enums_1.ScheduleType.Report:
                return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ReportName) &&
                    StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ExportDestination));
            case Enums_1.ScheduleType.iPushPull:
                return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.IPushPullReportName) &&
                    StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Page) &&
                    StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Folder));
            case Enums_1.ScheduleType.Glue42:
                return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Glue42ReportName);
        }
    };
    ScheduleSettingsWizard.prototype.canBack = function () {
        return true;
    };
    ScheduleSettingsWizard.prototype.Next = function () {
        switch (this.props.Data.ScheduleType) {
            case Enums_1.ScheduleType.Reminder:
                this.props.Data.Alert.Header = this.state.Header;
                this.props.Data.Alert.Msg = this.state.Msg;
                this.props
                    .Data.Alert.AlertDefinition.MessageType = this.state.MessageType;
                this.props
                    .Data.Alert.AlertDefinition.AlertProperties.ShowPopup = this.state.ShowPopup;
                break;
            case Enums_1.ScheduleType.Report:
                this.props.Data.ReportName = this.state.ReportName;
                this.props.Data.ExportDestination = this.state.ExportDestination;
                break;
            case Enums_1.ScheduleType.iPushPull:
                this.props
                    .Data.IPushPullReport.ReportName = this.state.IPushPullReportName;
                this.props.Data.IPushPullReport.Folder = this.state.Folder;
                this.props.Data.IPushPullReport.Page = this.state.Page;
                this.props.Data.Transmission = this.state.IPushPullTransmission;
                break;
            case Enums_1.ScheduleType.Glue42:
                this.props.Data.Glue42Report.ReportName = this.state.Glue42ReportName;
                this.props.Data.Transmission = this.state.Glue42Transmission;
                break;
        }
    };
    ScheduleSettingsWizard.prototype.Back = function () {
        // todo
    };
    ScheduleSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ScheduleSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ScheduleSettingsWizard;
}(React.Component));
exports.ScheduleSettingsWizard = ScheduleSettingsWizard;
