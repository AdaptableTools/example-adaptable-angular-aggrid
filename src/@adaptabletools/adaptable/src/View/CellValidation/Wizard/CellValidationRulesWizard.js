"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var AdaptablePopover_1 = require("../../AdaptablePopover");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var rebass_1 = require("rebass");
var Dropdown_1 = require("../../../components/Dropdown");
var WizardPanel_1 = require("../../../components/WizardPanel");
var HelpBlock_1 = require("../../../components/HelpBlock");
var Radio_1 = require("../../../components/Radio");
var Input_1 = require("../../../components/Input");
var CellValidationRulesWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CellValidationRulesWizard, _super);
    function CellValidationRulesWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            Operator: _this.props.Data.Range.Operator,
            Operand1: _this.props.Data.Range.Operand1,
            Operand2: _this.props.Data.Range.Operand2,
        };
        return _this;
    }
    CellValidationRulesWizard.prototype.render = function () {
        var _this = this;
        var availableOperators = this.getAvailableOperators();
        var operatorOptions = availableOperators.map(function (operator) {
            return {
                value: operator.toString(),
                label: ExpressionHelper_1.ExpressionHelper.OperatorToLongFriendlyString(operator, ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(_this.props.Data.ColumnId, _this.props.Columns)),
            };
        });
        var columnFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns);
        var helpText = 'Choose whether to prevent all edits for this column, or whether to allow those which match a rule (to be set by you).';
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, null,
                React.createElement("p", null,
                    "Validation Rule for Column: ",
                    React.createElement("b", null, columnFriendlyName)),
                React.createElement("p", null, helpText)),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3, marginLeft: 2 },
                React.createElement(Radio_1.default, { marginRight: 2, value: "Any", checked: this.state.Operator == Enums_1.LeafExpressionOperator.AnyChange, onChange: function (_, e) { return _this.onDisallowEditChanged(e); } }, "Disallow ALL edits"),
                ' ',
                React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Validation Rule: No Edits Allowed', bodyText: ['Any edit is invalid - effectively makes the column read-only.'] })),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3, marginLeft: 2 },
                React.createElement(Radio_1.default, { marginRight: 2, value: "others", checked: this.state.Operator != Enums_1.LeafExpressionOperator.AnyChange, onChange: function (_, e) { return _this.onDisallowEditChanged(e); } }, "Disallow edits where the new cell value matches rule:"),
                ' ',
                React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Validation Rule: Custom', bodyText: ['Disallow edits that match the rule defined in the dropdown below.'] })),
            React.createElement(rebass_1.Flex, { flexDirection: "column", marginTop: 3, marginLeft: 2, marginRight: 2 },
                this.state.Operator != Enums_1.LeafExpressionOperator.AnyChange ? (React.createElement(Dropdown_1.default, { style: { maxWidth: 'inherit', width: '100%' }, marginBottom: 2, options: operatorOptions, disabled: this.checkOperator(Enums_1.LeafExpressionOperator.AnyChange), placeholder: "Select an Operator", value: this.state.Operator ? this.state.Operator.toString() : '', onChange: function (x) { return _this.onOperatorChanged(x); } })) : null,
                this.state.Operator != null &&
                    !this.checkOperator(Enums_1.LeafExpressionOperator.AnyChange) &&
                    !this.checkOperator(Enums_1.LeafExpressionOperator.IsPositive) &&
                    !this.checkOperator(Enums_1.LeafExpressionOperator.IsNegative) &&
                    !this.checkOperator(Enums_1.LeafExpressionOperator.IsNotNumber) &&
                    ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns) == Enums_1.DataType.Number && (React.createElement(rebass_1.Flex, { flex: 5, alignItems: "center" },
                    React.createElement(Input_1.default, { value: this.state.Operand1, type: "number", placeholder: "Enter Number", style: { flex: 1 }, onChange: function (x) { return _this.onOperand1ValueChanged(x); } }),
                    this.isBetweenOperator() && (React.createElement(Input_1.default, { marginLeft: 2, value: this.state.Operand2, style: { flex: 1 }, type: "number", placeholder: "Enter Number", onChange: function (x) { return _this.onOperand2ValueChanged(x); } })))),
                this.state.Operator != null &&
                    !this.checkOperator(Enums_1.LeafExpressionOperator.AnyChange) &&
                    ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns) == Enums_1.DataType.Date && (React.createElement(rebass_1.Flex, { flex: 5, alignItems: "center" },
                    React.createElement(Input_1.default, { type: "date", style: { width: '100%' }, placeholder: "Enter Date", value: this.state.Operand1, onChange: function (x) { return _this.onOperand1ValueChanged(x); } }),
                    this.isBetweenOperator() && (React.createElement(Input_1.default, { value: this.state.Operand2, marginLeft: 2, type: "date", style: { width: '100%' }, placeholder: "Enter Date", onChange: function (x) { return _this.onOperand2ValueChanged(x); } })))),
                this.state.Operator != null &&
                    !this.checkOperator(Enums_1.LeafExpressionOperator.AnyChange) &&
                    !this.checkOperator(Enums_1.LeafExpressionOperator.NoDuplicateValues) &&
                    !this.checkOperator(Enums_1.LeafExpressionOperator.ExistingValuesOnly) &&
                    ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns) == Enums_1.DataType.String && (React.createElement(rebass_1.Flex, { flex: 5, alignItems: "center" },
                    React.createElement(Input_1.default, { value: this.state.Operand1, type: "string", style: { width: '100%' }, placeholder: "Enter a Value", onChange: function (x) { return _this.onOperand1ValueChanged(x); } }))))));
    };
    CellValidationRulesWizard.prototype.onOperatorChanged = function (value) {
        var _this = this;
        this.setState({ Operator: value, Operand1: '', Operand2: '' }, function () { return _this.props.UpdateGoBackState(); });
    };
    CellValidationRulesWizard.prototype.onOperand1ValueChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ Operand1: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    CellValidationRulesWizard.prototype.onOperand2ValueChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ Operand2: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    CellValidationRulesWizard.prototype.onDisallowEditChanged = function (event) {
        var _this = this;
        var e = event.target;
        var operator = e.value == 'Any' ? Enums_1.LeafExpressionOperator.AnyChange : null;
        this.setState({ Operator: operator }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    CellValidationRulesWizard.prototype.checkOperator = function (operator) {
        return this.state.Operator == operator;
    };
    CellValidationRulesWizard.prototype.isBetweenOperator = function () {
        return (this.checkOperator(Enums_1.LeafExpressionOperator.Between) ||
            this.checkOperator(Enums_1.LeafExpressionOperator.NotBetween));
    };
    CellValidationRulesWizard.prototype.getAvailableOperators = function () {
        switch (ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns)) {
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
    CellValidationRulesWizard.prototype.canNext = function () {
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
    CellValidationRulesWizard.prototype.canBack = function () {
        return true;
    };
    CellValidationRulesWizard.prototype.Next = function () {
        var rangeExpression = {
            Operator: this.state.Operator,
            Operand1: this.state.Operand1,
            Operand2: this.state.Operand2,
            Operand1Type: Enums_1.RangeOperandType.Value,
            Operand2Type: Enums_1.RangeOperandType.Value,
        };
        this.props.Data.Range = rangeExpression;
        //     this.props.Data.Description = this.createCellValidationDescription(this.props.Data);
    };
    CellValidationRulesWizard.prototype.Back = function () {
        //todo
    };
    CellValidationRulesWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    CellValidationRulesWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return CellValidationRulesWizard;
}(React.Component));
exports.CellValidationRulesWizard = CellValidationRulesWizard;
