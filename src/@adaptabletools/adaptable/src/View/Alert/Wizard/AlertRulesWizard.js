"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var Radio_1 = require("../../../components/Radio");
var HelpBlock_1 = require("../../../components/HelpBlock");
var rebass_1 = require("rebass");
var Dropdown_1 = require("../../../components/Dropdown");
var Input_1 = require("../../../components/Input");
var WizardPanel_1 = require("../../../components/WizardPanel");
var AlertRulesWizard = /** @class */ (function (_super) {
    tslib_1.__extends(AlertRulesWizard, _super);
    function AlertRulesWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            Operator: _this.props.Data.Range.Operator,
            Operand1: _this.props.Data.Range.Operand1,
            Operand2: _this.props.Data.Range.Operand2,
        };
        return _this;
    }
    AlertRulesWizard.prototype.render = function () {
        var _this = this;
        var operatorTypes = this.getAvailableOperators().map(function (operator) {
            return {
                value: operator.toString(),
                label: ExpressionHelper_1.ExpressionHelper.OperatorToLongFriendlyString(operator, _this.getColumnDataTypeFromState()),
            };
        });
        var columnFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns);
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 2 },
                React.createElement(rebass_1.Box, null,
                    React.createElement(HelpBlock_1.default, null, 'Show Alerts for any data change to the ' + columnFriendlyName + ' column.'),
                    React.createElement(Radio_1.default, { marginLeft: 1, value: "Any", name: "alert", checked: this.state.Operator == Enums_1.LeafExpressionOperator.AnyChange, onChange: function (v, e) { return _this.onDisallowEditChanged(e); } }, "Show Alert for ALL changes"),
                    ' '),
                React.createElement(rebass_1.Box, { marginTop: 2 },
                    React.createElement(HelpBlock_1.default, null, 'Only show an Alert when the change to the column matches a rule (to be set by you).'),
                    React.createElement(Radio_1.default, { marginLeft: 1, value: "others", name: "alert", checked: this.state.Operator != Enums_1.LeafExpressionOperator.AnyChange, onChange: function (v, e) { return _this.onDisallowEditChanged(e); } }, "Show Alert when new cell value matches rule:"),
                    ' '),
                React.createElement(rebass_1.Flex, { flexDirection: "column" },
                    this.state.Operator != Enums_1.LeafExpressionOperator.AnyChange ? (React.createElement(rebass_1.Box, { marginBottom: 2, style: { flex: 1, width: '100%' } },
                        React.createElement(Dropdown_1.default, { disabled: this.checkOperator(Enums_1.LeafExpressionOperator.AnyChange), placeholder: "Select an Operator", value: this.state.Operator ? this.state.Operator.toString() : '', onChange: function (operator) { return _this.onOperatorChanged(operator); }, options: operatorTypes, style: { maxWidth: 'inherit' } }))) : null,
                    React.createElement(rebass_1.Flex, { flexDirection: "row", flex: 1 },
                        this.state.Operator != null &&
                            !this.checkOperator(Enums_1.LeafExpressionOperator.AnyChange) &&
                            !this.checkOperator(Enums_1.LeafExpressionOperator.IsPositive) &&
                            !this.checkOperator(Enums_1.LeafExpressionOperator.IsNegative) &&
                            !this.checkOperator(Enums_1.LeafExpressionOperator.IsNotNumber) &&
                            this.getColumnDataTypeFromState() == Enums_1.DataType.Number && (React.createElement(React.Fragment, null,
                            React.createElement(Input_1.default, { style: { flex: 1 }, value: this.state.Operand1, type: "number", placeholder: "Enter Number", onChange: function (x) { return _this.onOperand1ValueChanged(x); } }),
                            this.isBetweenOperator() ? (React.createElement(Input_1.default, { style: { flex: 1 }, marginLeft: 2, value: this.state.Operand2, type: "number", placeholder: "Enter Number", onChange: function (x) { return _this.onOperand2ValueChanged(x); } })) : null)),
                        this.state.Operator != null &&
                            !this.checkOperator(Enums_1.LeafExpressionOperator.AnyChange) &&
                            this.getColumnDataTypeFromState() == Enums_1.DataType.Date && (React.createElement(React.Fragment, null,
                            React.createElement(Input_1.default, { type: "date", style: { flex: 1 }, placeholder: "Enter Date", value: this.state.Operand1, onChange: function (x) { return _this.onOperand1ValueChanged(x); } }),
                            this.isBetweenOperator() && (React.createElement(Input_1.default, { style: { flex: 1 }, marginLeft: 2, value: this.state.Operand2, type: "date", placeholder: "Enter Date", onChange: function (x) { return _this.onOperand2ValueChanged(x); } })))),
                        this.state.Operator != null &&
                            !this.checkOperator(Enums_1.LeafExpressionOperator.AnyChange) &&
                            !this.checkOperator(Enums_1.LeafExpressionOperator.NoDuplicateValues) &&
                            !this.checkOperator(Enums_1.LeafExpressionOperator.ExistingValuesOnly) &&
                            this.getColumnDataTypeFromState() == Enums_1.DataType.String && (React.createElement(Input_1.default, { style: { flex: 1 }, value: this.state.Operand1, type: "text", placeholder: "Enter a Value", onChange: function (x) { return _this.onOperand1ValueChanged(x); } })))))));
    };
    AlertRulesWizard.prototype.onOperatorChanged = function (operator) {
        var _this = this;
        operator = operator || '';
        this.setState({ Operator: operator, Operand1: '', Operand2: '' }, function () { return _this.props.UpdateGoBackState(); });
    };
    AlertRulesWizard.prototype.onOperand1ValueChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ Operand1: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    AlertRulesWizard.prototype.onOperand2ValueChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ Operand2: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    AlertRulesWizard.prototype.onDisallowEditChanged = function (event) {
        var _this = this;
        var e = event.target;
        var operator = e.value == 'Any' ? Enums_1.LeafExpressionOperator.AnyChange : null;
        this.setState({ Operator: operator }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    AlertRulesWizard.prototype.getColumnDataTypeFromState = function () {
        return ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns);
    };
    AlertRulesWizard.prototype.checkOperator = function (operator) {
        return this.state.Operator == operator;
    };
    AlertRulesWizard.prototype.isBetweenOperator = function () {
        return (this.checkOperator(Enums_1.LeafExpressionOperator.Between) ||
            this.checkOperator(Enums_1.LeafExpressionOperator.NotBetween));
    };
    AlertRulesWizard.prototype.getAvailableOperators = function () {
        switch (this.getColumnDataTypeFromState()) {
            case Enums_1.DataType.Boolean:
                return [Enums_1.LeafExpressionOperator.IsTrue, Enums_1.LeafExpressionOperator.IsFalse];
            case Enums_1.DataType.String:
                return [
                    Enums_1.LeafExpressionOperator.Equals,
                    Enums_1.LeafExpressionOperator.NotEquals,
                    Enums_1.LeafExpressionOperator.Contains,
                    Enums_1.LeafExpressionOperator.NotContains,
                    Enums_1.LeafExpressionOperator.StartsWith,
                    Enums_1.LeafExpressionOperator.Regex,
                    Enums_1.LeafExpressionOperator.NoDuplicateValues,
                    Enums_1.LeafExpressionOperator.ExistingValuesOnly,
                ];
            case Enums_1.DataType.Date:
                return [
                    Enums_1.LeafExpressionOperator.Equals,
                    Enums_1.LeafExpressionOperator.NotEquals,
                    Enums_1.LeafExpressionOperator.GreaterThan,
                    Enums_1.LeafExpressionOperator.LessThan,
                    Enums_1.LeafExpressionOperator.Between,
                    Enums_1.LeafExpressionOperator.NotBetween,
                ];
            case Enums_1.DataType.Number:
                return [
                    Enums_1.LeafExpressionOperator.Equals,
                    Enums_1.LeafExpressionOperator.NotEquals,
                    Enums_1.LeafExpressionOperator.LessThan,
                    Enums_1.LeafExpressionOperator.GreaterThan,
                    Enums_1.LeafExpressionOperator.Between,
                    Enums_1.LeafExpressionOperator.NotBetween,
                    Enums_1.LeafExpressionOperator.IsPositive,
                    Enums_1.LeafExpressionOperator.IsNegative,
                    Enums_1.LeafExpressionOperator.ValueChange,
                    Enums_1.LeafExpressionOperator.PercentChange,
                    Enums_1.LeafExpressionOperator.IsNotNumber,
                ];
        }
    };
    AlertRulesWizard.prototype.canNext = function () {
        if (this.state.Operator == null || this.state.Operator == undefined) {
            return false;
        }
        if (this.state.Operator == Enums_1.LeafExpressionOperator.AnyChange) {
            return true;
        }
        if (!ExpressionHelper_1.ExpressionHelper.OperatorRequiresValue(this.state.Operator)) {
            return true;
        }
        if (this.isBetweenOperator() && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.Operand2)) {
            return false;
        }
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Operand1);
    };
    AlertRulesWizard.prototype.canBack = function () {
        return true;
    };
    AlertRulesWizard.prototype.Next = function () {
        var rangeExpression = {
            Operator: this.state.Operator,
            Operand1: this.state.Operand1,
            Operand2: this.state.Operand2,
            Operand1Type: Enums_1.RangeOperandType.Value,
            Operand2Type: Enums_1.RangeOperandType.Value,
        };
        this.props.Data.Range = rangeExpression;
    };
    AlertRulesWizard.prototype.Back = function () {
        //todo
    };
    AlertRulesWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    AlertRulesWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return AlertRulesWizard;
}(React.Component));
exports.AlertRulesWizard = AlertRulesWizard;
