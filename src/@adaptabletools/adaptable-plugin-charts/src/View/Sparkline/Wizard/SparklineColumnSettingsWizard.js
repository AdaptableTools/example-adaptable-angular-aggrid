"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var WizardPanel_1 = require("@adaptabletools/adaptable/src/components/WizardPanel");
var Panel_1 = require("@adaptabletools/adaptable/src/components/Panel");
var Radio_1 = require("@adaptabletools/adaptable/src/components/Radio");
var Input_1 = require("@adaptabletools/adaptable/src/components/Input");
var FormLayout_1 = require("@adaptabletools/adaptable/src/components/FormLayout");
var Dropdown_1 = require("@adaptabletools/adaptable/src/components/Dropdown");
var CheckBox_1 = require("@adaptabletools/adaptable/src/components/CheckBox");
var ColorPicker_1 = require("@adaptabletools/adaptable/src/View/ColorPicker");
var DefaultSparklinesChartProperties_1 = require("@adaptabletools/adaptable/src/Utilities/Defaults/DefaultSparklinesChartProperties");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
exports.SparklineTypeDropdown = function (_a) {
    var value = _a.value, onChange = _a.onChange, props = tslib_1.__rest(_a, ["value", "onChange"]);
    return (React.createElement(Dropdown_1.default, tslib_1.__assign({}, props, { value: value, placeholder: "Select sparkline type", showClearButton: false, showEmptyItem: false, onChange: onChange, options: [
            {
                label: ChartEnums_1.SparklineTypeEnum.Line,
                value: ChartEnums_1.SparklineTypeEnum.Line,
            },
            {
                label: ChartEnums_1.SparklineTypeEnum.Column,
                value: ChartEnums_1.SparklineTypeEnum.Column,
            },
            {
                label: ChartEnums_1.SparklineTypeEnum.Area,
                value: ChartEnums_1.SparklineTypeEnum.Area,
            },
        ] })));
};
var SparklineColumnSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(SparklineColumnSettingsWizard, _super);
    function SparklineColumnSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.onSparklineTypeChange = function (SparklineType) {
            _this.setState({ SparklineType: SparklineType }, function () { return _this.props.UpdateGoBackState(); });
        };
        _this.onMinValueChanged = function (e) {
            var value = e.target.value;
            if (!isNaN(Number(value))) {
                value = Number(value);
            }
            _this.setState({ MinimumValue: value }, function () {
                return _this.props.UpdateGoBackState();
            });
        };
        _this.onMaxValueChanged = function (e) {
            var value = e.target.value;
            if (!isNaN(Number(value))) {
                value = Number(value);
            }
            _this.setState({ MaximumValue: value }, function () {
                return _this.props.UpdateGoBackState();
            });
        };
        _this._prefix = "" + Date.now();
        _this.state = {
            MinimumValue: _this.props.Data.MinimumValue,
            MaximumValue: _this.props.Data.MaximumValue,
            SparklineType: _this.props.Data.SparklineType || ChartEnums_1.SparklineTypeEnum.Line,
            UseMinStaticValue: _this.props.Data.MinimumValue != null,
            UseMinCurrentValue: _this.props.Data.MinimumValue == null,
            UseMaxStaticValue: _this.props.Data.MaximumValue != null,
            UseMaxCurrentValue: _this.props.Data.MaximumValue == null,
            ShowToolTip: _this.props.Data.ShowToolTip,
            LineColor: _this.props.Data.LineColor
                ? _this.props.Data.LineColor
                : DefaultSparklinesChartProperties_1.DefaultSparklinesChartProperties.Brush,
        };
        return _this;
    }
    SparklineColumnSettingsWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(FormLayout_1.default, null,
                React.createElement(FormLayout_1.FormRow, { label: "Sparkline type" },
                    React.createElement(exports.SparklineTypeDropdown, { value: this.state.SparklineType, onChange: this.onSparklineTypeChange }))),
            React.createElement(Panel_1.default, { header: 'Minimum Value', marginTop: 2 },
                React.createElement(FormLayout_1.default, { columns: [1, 2, 3], sizes: ['auto', 'auto', '1fr'] },
                    React.createElement(FormLayout_1.FormRow, null,
                        React.createElement(Radio_1.default, { id: this._prefix + "_min_cell_value", marginRight: 2, value: "current", checked: this.state.UseMinCurrentValue, onChange: function (_, e) { return _this.onUseMinChanged(e); } }),
                        React.createElement("label", { htmlFor: this._prefix + "_min_cell_value" }, "Use current cell minimum value")),
                    React.createElement(FormLayout_1.FormRow, null,
                        React.createElement(Radio_1.default, { id: this._prefix + "_min_value", marginRight: 2, value: "value", checked: this.state.UseMinStaticValue, onChange: function (_, e) { return _this.onUseMinChanged(e); } }),
                        React.createElement("label", { htmlFor: this._prefix + "_min_value" }, "Use static value"),
                        this.state.UseMinStaticValue ? (React.createElement(Input_1.default, { type: "number", placeholder: "Enter Number", disabled: this.state.UseMinCurrentValue, onChange: this.onMinValueChanged, value: this.state.UseMinCurrentValue ? '' : this.state.MinimumValue })) : null))),
            React.createElement(Panel_1.default, { header: "Maximum Value", marginTop: 2 },
                React.createElement(FormLayout_1.default, { columns: [1, 2, 3], sizes: ['auto', 'auto', '1fr'] },
                    React.createElement(FormLayout_1.FormRow, null,
                        React.createElement(Radio_1.default, { id: this._prefix + "_max_cell_value", marginRight: 2, value: "current", checked: this.state.UseMaxCurrentValue, onChange: function (_, e) { return _this.onUseMaxChanged(e); } }),
                        React.createElement("label", { htmlFor: this._prefix + "_max_cell_value" }, "Use current cell maximum value")),
                    React.createElement(FormLayout_1.FormRow, null,
                        React.createElement(Radio_1.default, { marginRight: 2, id: this._prefix + "_max_value", value: "value", checked: this.state.UseMaxStaticValue, onChange: function (_, e) { return _this.onUseMaxChanged(e); } }),
                        React.createElement("label", { htmlFor: this._prefix + "_max_value" }, "Use static value"),
                        this.state.UseMaxStaticValue ? (React.createElement(Input_1.default, { type: "number", placeholder: "Enter Number", disabled: this.state.UseMaxCurrentValue, onChange: this.onMaxValueChanged, value: this.state.UseMaxCurrentValue ? '' : this.state.MaximumValue })) : null))),
            React.createElement(Panel_1.default, { header: "Colous", marginTop: 2 },
                React.createElement(FormLayout_1.default, { columns: [1, 2, 3], sizes: ['auto', 'auto', '1fr'] },
                    React.createElement(FormLayout_1.FormRow, null,
                        React.createElement("label", { htmlFor: this._prefix + "_brush" }, "Line Color"),
                        React.createElement(ColorPicker_1.ColorPicker, { id: this._prefix + "_brush", ColorPalette: this.props.ColorPalette, value: this.state.LineColor, onChange: function (x) { return _this.onBrushColorChange(x); } })))),
            React.createElement(Panel_1.default, { header: "Tooltip", marginTop: 2 },
                React.createElement(FormLayout_1.default, { columns: [1, 2, 3], sizes: ['auto', 'auto', '1fr'] },
                    React.createElement(FormLayout_1.FormRow, null,
                        React.createElement(CheckBox_1.default, { id: this._prefix + "_show_tooltip", marginRight: 2, value: "current", checked: this.state.ShowToolTip, onChange: function (checked) { return _this.onShowTooltipChanged(checked); } }),
                        React.createElement("label", { htmlFor: this._prefix + "_show_tooltip" }, "Show Tool Tip"))))));
    };
    SparklineColumnSettingsWizard.prototype.onUseMinChanged = function (event) {
        var _this = this;
        var e = event.target;
        var UseMinCurrentValue = e.value == 'current';
        var UseMinStaticValue = e.value == 'value';
        this.setState({
            UseMinCurrentValue: UseMinCurrentValue,
            UseMinStaticValue: UseMinStaticValue,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    SparklineColumnSettingsWizard.prototype.onBrushColorChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ LineColor: e.value }, function () { return _this.props.UpdateGoBackState(); });
    };
    SparklineColumnSettingsWizard.prototype.onShowTooltipChanged = function (checked) {
        var _this = this;
        this.setState({ ShowToolTip: checked }, function () { return _this.props.UpdateGoBackState(); });
    };
    SparklineColumnSettingsWizard.prototype.onUseMaxChanged = function (event) {
        var _this = this;
        var e = event.target;
        var UseMaxCurrentValue = e.value == 'current';
        var UseMaxStaticValue = e.value == 'value';
        this.setState({
            UseMaxCurrentValue: UseMaxCurrentValue,
            UseMaxStaticValue: UseMaxStaticValue,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    SparklineColumnSettingsWizard.prototype.canNext = function () {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
            return false;
        }
        return true;
    };
    SparklineColumnSettingsWizard.prototype.canBack = function () {
        return true;
    };
    SparklineColumnSettingsWizard.prototype.Next = function () {
        this.props.Data.SparklineType = this.state.SparklineType;
        this.props.Data.MinimumValue = this.state.UseMinCurrentValue
            ? undefined
            : this.state.MinimumValue;
        this.props.Data.MaximumValue = this.state.UseMaxCurrentValue
            ? undefined
            : this.state.MaximumValue;
        this.props.Data.LineColor = this.state.LineColor;
        this.props.Data.ShowToolTip = this.state.ShowToolTip;
    };
    SparklineColumnSettingsWizard.prototype.Back = function () {
        //todo
    };
    SparklineColumnSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    SparklineColumnSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return SparklineColumnSettingsWizard;
}(React.Component));
exports.SparklineColumnSettingsWizard = SparklineColumnSettingsWizard;
