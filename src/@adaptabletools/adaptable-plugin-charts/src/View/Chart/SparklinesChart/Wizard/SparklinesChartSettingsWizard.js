"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardPanel_1 = require("@adaptabletools/adaptable/src/components/WizardPanel");
var FormLayout_1 = require("@adaptabletools/adaptable/src/components/FormLayout");
var Input_1 = require("@adaptabletools/adaptable/src/components/Input");
var ErrorBox_1 = require("@adaptabletools/adaptable/src/components/ErrorBox");
var rebass_1 = require("rebass");
var Radio_1 = require("@adaptabletools/adaptable/src/components/Radio");
var ArrayExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var ExpressionHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ExpressionHelper");
var SparklinesChartSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(SparklinesChartSettingsWizard, _super);
    function SparklinesChartSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            Name: props.Data.Name,
            Description: props.Data.Description,
            VisibleRowsOnly: props.Data.VisibleRowsOnly,
            ErrorMessage: null,
        };
        return _this;
    }
    SparklinesChartSettingsWizard.prototype.onChartNameChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({
            Name: e.value,
            ErrorMessage: ArrayExtensions_1.default.ContainsItem(this.props.ChartNames, e.value)
                ? 'A Chart Definition already exists with that name'
                : null,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    SparklinesChartSettingsWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(FormLayout_1.default, null,
                React.createElement(FormLayout_1.FormRow, { label: "Name" },
                    React.createElement(Input_1.default, { width: "100%", value: this.state.Name, type: "string", placeholder: "Enter chart name", onChange: function (e) { return _this.onChartNameChange(e); } })),
                this.state.ErrorMessage ? (React.createElement(FormLayout_1.FormRow, { label: " " },
                    React.createElement(ErrorBox_1.default, null, this.state.ErrorMessage))) : null,
                React.createElement(FormLayout_1.FormRow, { label: "Description:" },
                    React.createElement(Input_1.default, { width: "100%", value: this.state.Description, type: "string", placeholder: "Enter description (optional)", onChange: function (e) { return _this.onChartDescriptionChange(e); } })),
                React.createElement(FormLayout_1.FormRow, { label: "Rows In Chart:" },
                    React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", flex: 7 },
                        React.createElement(Radio_1.default, { value: "Visible", marginRight: 2, checked: this.state.VisibleRowsOnly == true, onChange: function (_, e) { return _this.onVisibleRowsChanged(e); } }, "Visible Rows Only"),
                        React.createElement(Radio_1.default, { value: "All", checked: this.state.VisibleRowsOnly == false, onChange: function (_, e) { return _this.onVisibleRowsChanged(e); } }, "All Rows In Grid"))))));
    };
    SparklinesChartSettingsWizard.prototype.onChartDescriptionChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ Description: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    SparklinesChartSettingsWizard.prototype.onVisibleRowsChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ VisibleRowsOnly: e.value == 'Visible' }, function () { return _this.props.UpdateGoBackState(); });
    };
    SparklinesChartSettingsWizard.prototype.canNext = function () {
        return (StringExtensions_1.StringExtensions.IsNotEmpty(this.state.Name) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage));
    };
    SparklinesChartSettingsWizard.prototype.canBack = function () {
        return true;
    };
    SparklinesChartSettingsWizard.prototype.Next = function () {
        this.props.Data.Name = this.state.Name;
        this.props.Data.Description = this.state.Description;
        this.props.Data.VisibleRowsOnly = this.state.VisibleRowsOnly;
    };
    SparklinesChartSettingsWizard.prototype.Back = function () {
        //
    };
    SparklinesChartSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    SparklinesChartSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(this.props.Data.Expression) ? 2 : 1;
    };
    return SparklinesChartSettingsWizard;
}(React.Component));
exports.SparklinesChartSettingsWizard = SparklinesChartSettingsWizard;
