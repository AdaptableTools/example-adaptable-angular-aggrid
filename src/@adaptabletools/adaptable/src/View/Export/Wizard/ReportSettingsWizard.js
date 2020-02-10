"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var WizardPanel_1 = require("../../../components/WizardPanel");
var Input_1 = require("../../../components/Input");
var rebass_1 = require("rebass");
var ErrorBox_1 = require("../../../components/ErrorBox");
var ReportSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ReportSettingsWizard, _super);
    function ReportSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ReportName: _this.props.Data.Name,
            ErrorMessage: null,
        };
        return _this;
    }
    ReportSettingsWizard.prototype.render = function () {
        var _this = this;
        var validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
            ? null
            : 'error';
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Text, { marginRight: 2 }, "Enter Report Name:"),
                React.createElement(Input_1.default, { style: { flex: 1 }, type: "text", placeholder: "Enter Report Name", value: this.state.ReportName, onChange: function (e) { return _this.onReportNameChanged(e); } })),
            this.state.ErrorMessage ? (React.createElement(ErrorBox_1.default, { marginTop: 3 }, this.state.ErrorMessage)) : null));
    };
    ReportSettingsWizard.prototype.onReportNameChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({
            ReportName: e.value,
            ErrorMessage: this.props.Reports.findIndex(function (x) { return x.Name == e.value; }) > -1
                ? 'A Report already exists with that name'
                : null,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    ReportSettingsWizard.prototype.canNext = function () {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ReportName) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage));
    };
    ReportSettingsWizard.prototype.canBack = function () {
        return true;
    };
    ReportSettingsWizard.prototype.Next = function () {
        this.props.Data.Name = this.state.ReportName;
    };
    ReportSettingsWizard.prototype.Back = function () {
        //todo
    };
    ReportSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ReportSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ReportSettingsWizard;
}(React.Component));
exports.ReportSettingsWizard = ReportSettingsWizard;
