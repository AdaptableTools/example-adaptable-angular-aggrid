"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ErrorBox_1 = require("../../../components/ErrorBox");
var Textarea_1 = require("../../../components/Textarea");
var WizardPanel_1 = require("../../../components/WizardPanel");
var CalculatedColumnExpressionWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CalculatedColumnExpressionWizard, _super);
    function CalculatedColumnExpressionWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { ColumnExpression: _this.props.Data.ColumnExpression };
        return _this;
    }
    CalculatedColumnExpressionWizard.prototype.render = function () {
        var _this = this;
        var validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.GetErrorMessage())
            ? null
            : 'error';
        return (React.createElement(WizardPanel_1.default, { borderRadius: "none", border: "none" },
            React.createElement(Textarea_1.default, { value: this.state.ColumnExpression, placeholder: "Enter expression", autoFocus: true, onChange: function (e) { return _this.handleExpressionChange(e); }, style: { width: '100%', height: '75%' } }),
            validationState ? React.createElement(ErrorBox_1.default, { marginTop: 2 }, this.props.GetErrorMessage()) : null));
    };
    CalculatedColumnExpressionWizard.prototype.handleExpressionChange = function (event) {
        var _this = this;
        var e = event.target;
        this.props.IsExpressionValid(e.value);
        this.setState({ ColumnExpression: e.value }, function () { return _this.props.UpdateGoBackState(); });
    };
    CalculatedColumnExpressionWizard.prototype.canNext = function () {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnExpression) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.GetErrorMessage()));
    };
    CalculatedColumnExpressionWizard.prototype.canBack = function () {
        return true;
    };
    CalculatedColumnExpressionWizard.prototype.Next = function () {
        this.props.Data.ColumnExpression = this.state.ColumnExpression;
    };
    CalculatedColumnExpressionWizard.prototype.Back = function () {
        //todo
    };
    CalculatedColumnExpressionWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    CalculatedColumnExpressionWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return CalculatedColumnExpressionWizard;
}(React.Component));
exports.CalculatedColumnExpressionWizard = CalculatedColumnExpressionWizard;
