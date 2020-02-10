"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions");
var WizardPanel_1 = require("@adaptabletools/adaptable/src/components/WizardPanel");
var rebass_1 = require("rebass");
var Input_1 = require("@adaptabletools/adaptable/src/components/Input");
var Radio_1 = require("@adaptabletools/adaptable/src/components/Radio");
var ErrorBox_1 = require("@adaptabletools/adaptable/src/components/ErrorBox");
var PieChartSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PieChartSettingsWizard, _super);
    function PieChartSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            Name: props.Data.Name,
            Description: props.Data.Description,
            VisibleRowsOnly: props.Data.VisibleRowsOnly,
            ErrorMessage: null,
        };
        return _this;
    }
    PieChartSettingsWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Name:"),
                React.createElement(Input_1.default, { style: { flex: 7 }, value: this.state.Name, type: "string", placeholder: "Enter chart name", onChange: function (e) { return _this.onChartNameChange(e); } })),
            this.state.ErrorMessage ? (React.createElement(ErrorBox_1.default, { marginTop: 3 }, this.state.ErrorMessage)) : null,
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3 },
                React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Description:"),
                React.createElement(Input_1.default, { style: { flex: 7 }, value: this.state.Description, type: "string", placeholder: "Enter description (optional)", onChange: function (e) { return _this.onChartDescriptionChange(e); } })),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3 },
                React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Rows In Chart:"),
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", flex: 7 },
                    React.createElement(Radio_1.default, { marginRight: 2, value: "Visible", checked: this.state.VisibleRowsOnly == true, onChange: function (_, e) { return _this.onVisibleRowsChanged(e); } }, "Visible Rows Only"),
                    React.createElement(Radio_1.default, { value: "All", checked: this.state.VisibleRowsOnly == false, onChange: function (_, e) { return _this.onVisibleRowsChanged(e); } }, "All Rows In Grid")))));
    };
    PieChartSettingsWizard.prototype.onChartNameChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({
            Name: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.ChartNames, e.value)
                ? 'A Chart Definition already exists with that name'
                : null,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    PieChartSettingsWizard.prototype.onChartDescriptionChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ Description: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    PieChartSettingsWizard.prototype.onVisibleRowsChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ VisibleRowsOnly: e.value == 'Visible' }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    PieChartSettingsWizard.prototype.canNext = function () {
        return (StringExtensions_1.StringExtensions.IsNotEmpty(this.state.Name) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage));
    };
    PieChartSettingsWizard.prototype.canBack = function () {
        return true;
    };
    PieChartSettingsWizard.prototype.Next = function () {
        this.props.Data.Name = this.state.Name;
        this.props.Data.Description = this.state.Description;
        this.props.Data.VisibleRowsOnly = this.state.VisibleRowsOnly;
    };
    PieChartSettingsWizard.prototype.Back = function () {
        // todo
    };
    PieChartSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    PieChartSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return PieChartSettingsWizard;
}(React.Component));
exports.PieChartSettingsWizard = PieChartSettingsWizard;
