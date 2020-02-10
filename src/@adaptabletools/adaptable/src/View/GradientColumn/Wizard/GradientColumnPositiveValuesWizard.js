"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var WizardPanel_1 = require("../../../components/WizardPanel");
var Panel_1 = require("../../../components/Panel");
var rebass_1 = require("rebass");
var Input_1 = require("../../../components/Input");
var HelpBlock_1 = require("../../../components/HelpBlock");
var ColorPicker_1 = require("../../ColorPicker");
var GradientColumnPositiveValuesWizard = /** @class */ (function (_super) {
    tslib_1.__extends(GradientColumnPositiveValuesWizard, _super);
    function GradientColumnPositiveValuesWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.onPositiveValueChanged = function (e) {
            _this.setState({ PositiveValue: e.target.value }, function () { return _this.props.UpdateGoBackState(); });
        };
        _this.state = {
            PositiveValue: _this.props.Data.PositiveValue,
            PositiveColor: _this.props.Data.PositiveColor,
        };
        return _this;
    }
    GradientColumnPositiveValuesWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(Panel_1.default, { header: "Positive Value and Colour", marginTop: 2 },
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Set the Maximum Positive value for the Gradient Column."),
                ' ',
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "left", marginTop: 2 },
                    React.createElement(rebass_1.Text, { marginRight: 2, marginTop: 1 }, "Maximum Positive Value:"),
                    ' ',
                    React.createElement(Input_1.default, { type: "number", placeholder: "Enter Number", onChange: this.onPositiveValueChanged, value: this.state.PositiveValue })),
                React.createElement(HelpBlock_1.default, { marginTop: 3 }, "Select a Colour - the closer the cell value is to Maximum Positive value, the closer it will be to the Colour set here."),
                ' ',
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "left", marginTop: 3 },
                    React.createElement(rebass_1.Text, { marginRight: 2 }, "Positive Colour:"),
                    ' ',
                    React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.PositiveColor, onChange: function (x) { return _this.onPositiveColorSelectChanged(x); } }))),
            ' '));
    };
    GradientColumnPositiveValuesWizard.prototype.onPositiveColorSelectChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ PositiveColor: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    GradientColumnPositiveValuesWizard.prototype.canNext = function () {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
            return false;
        }
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.PositiveColor) && this.state.PositiveValue) {
            return false;
        }
        // if a positive value is set they need a positive colour
        if (this.state.PositiveValue && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.PositiveColor)) {
            return false;
        }
        return true;
    };
    GradientColumnPositiveValuesWizard.prototype.canBack = function () {
        return true;
    };
    GradientColumnPositiveValuesWizard.prototype.Next = function () {
        this.props.Data.PositiveValue = this.state.PositiveValue;
        this.props.Data.PositiveColor = this.state.PositiveValue ? this.state.PositiveColor : undefined;
    };
    GradientColumnPositiveValuesWizard.prototype.Back = function () {
        //todo
    };
    GradientColumnPositiveValuesWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    GradientColumnPositiveValuesWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return GradientColumnPositiveValuesWizard;
}(React.Component));
exports.GradientColumnPositiveValuesWizard = GradientColumnPositiveValuesWizard;
