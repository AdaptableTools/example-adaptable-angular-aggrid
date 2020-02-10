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
var GradientColumnNegativeValuesWizard = /** @class */ (function (_super) {
    tslib_1.__extends(GradientColumnNegativeValuesWizard, _super);
    function GradientColumnNegativeValuesWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.onNegativeValueChanged = function (e) {
            _this.setState({ NegativeValue: e.target.value }, function () { return _this.props.UpdateGoBackState(); });
        };
        _this.state = {
            NegativeValue: _this.props.Data.NegativeValue,
            NegativeColor: _this.props.Data.NegativeColor,
        };
        return _this;
    }
    GradientColumnNegativeValuesWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(Panel_1.default, { header: 'Negative Value and Colour', marginTop: 2 },
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Set the Maximum Negative value for the Gradient Column."),
                ' ',
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "left", marginTop: 2 },
                    React.createElement(rebass_1.Text, { marginRight: 2, marginTop: 1 }, "Maximum Negative Value:"),
                    ' ',
                    React.createElement(Input_1.default, { type: "number", placeholder: "Enter Number", onChange: this.onNegativeValueChanged, value: this.state.NegativeValue })),
                React.createElement(HelpBlock_1.default, { marginTop: 3 }, "Select a Colour - the closer the cell value is to Maximum Negative value, the closer it will be to the Colour set here."),
                ' ',
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3 },
                    React.createElement(rebass_1.Text, { textAlign: "end", marginRight: 2 }, "Negative Colour:"),
                    React.createElement(rebass_1.Flex, { flex: 3 },
                        React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.NegativeColor, onChange: function (x) { return _this.onNegativeColorSelectChanged(x); } }))))));
    };
    GradientColumnNegativeValuesWizard.prototype.onNegativeColorSelectChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ NegativeColor: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    GradientColumnNegativeValuesWizard.prototype.canNext = function () {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
            return false;
        }
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.NegativeColor) && this.state.NegativeValue) {
            return false;
        }
        // if a negative value is set they need a negative colour
        if (this.state.NegativeValue && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.NegativeColor)) {
            return false;
        }
        return true;
    };
    GradientColumnNegativeValuesWizard.prototype.canBack = function () {
        return true;
    };
    GradientColumnNegativeValuesWizard.prototype.Next = function () {
        this.props.Data.NegativeValue = this.state.NegativeValue;
        this.props.Data.NegativeColor = this.state.NegativeValue ? this.state.NegativeColor : undefined;
    };
    GradientColumnNegativeValuesWizard.prototype.Back = function () {
        //todo
    };
    GradientColumnNegativeValuesWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    GradientColumnNegativeValuesWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return GradientColumnNegativeValuesWizard;
}(React.Component));
exports.GradientColumnNegativeValuesWizard = GradientColumnNegativeValuesWizard;
