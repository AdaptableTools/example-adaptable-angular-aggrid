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
var GradientColumnBaseValuesWizard = /** @class */ (function (_super) {
    tslib_1.__extends(GradientColumnBaseValuesWizard, _super);
    function GradientColumnBaseValuesWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.onBaseValueChanged = function (e) {
            _this.setState({ BaseValue: e.target.value }, function () {
                return _this.props.UpdateGoBackState();
            });
        };
        _this.state = {
            BaseValue: _this.props.Data.BaseValue,
        };
        return _this;
    }
    GradientColumnBaseValuesWizard.prototype.render = function () {
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(Panel_1.default, { header: "Base Value", marginTop: 2 },
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Set the 'start value' for the Gradient Column. The closer the cell value is to this value the 'whiter' it will be."),
                ' ',
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 2 },
                    React.createElement(rebass_1.Flex, { flex: 7, alignItems: "center" },
                        React.createElement(Input_1.default, { type: "number", placeholder: "Enter Number", onChange: this.onBaseValueChanged, value: this.state.BaseValue })))),
            ' '));
    };
    GradientColumnBaseValuesWizard.prototype.canNext = function () {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
            return false;
        }
        return true;
    };
    GradientColumnBaseValuesWizard.prototype.canBack = function () {
        return true;
    };
    GradientColumnBaseValuesWizard.prototype.Next = function () {
        this.props.Data.BaseValue = this.state.BaseValue;
    };
    GradientColumnBaseValuesWizard.prototype.Back = function () {
        //todo
    };
    GradientColumnBaseValuesWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    GradientColumnBaseValuesWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return GradientColumnBaseValuesWizard;
}(React.Component));
exports.GradientColumnBaseValuesWizard = GradientColumnBaseValuesWizard;
