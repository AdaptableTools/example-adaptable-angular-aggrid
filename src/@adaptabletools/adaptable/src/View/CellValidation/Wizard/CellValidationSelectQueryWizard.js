"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptablePopover_1 = require("../../AdaptablePopover");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var WizardPanel_1 = require("../../../components/WizardPanel");
var rebass_1 = require("rebass");
var HelpBlock_1 = require("../../../components/HelpBlock");
var CheckBox_1 = require("../../../components/CheckBox");
var CellValidationSelectQueryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CellValidationSelectQueryWizard, _super);
    function CellValidationSelectQueryWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            HasExpression: ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(_this.props.Data.Expression),
        };
        return _this;
    }
    CellValidationSelectQueryWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, { marginBottom: 2 },
                "A Query is used if the rule is dependent on other values in the row.",
                React.createElement("br", null),
                React.createElement("br", null),
                "The rule will only be activated and checked if the Query passes."),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                React.createElement(CheckBox_1.default, { marginLeft: 2, marginRight: 2, onChange: function (checked) { return _this.onOtherExpressionOptionChanged(checked); }, checked: this.state.HasExpression }, "Use Validation Query"),
                ' ',
                React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Validation Rule: Query', bodyText: [
                        'Create a query (in next step) which will stipulate other cell values required for the Rule.',
                    ] }))));
    };
    CellValidationSelectQueryWizard.prototype.onOtherExpressionOptionChanged = function (checked) {
        var _this = this;
        this.setState({ HasExpression: checked }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    CellValidationSelectQueryWizard.prototype.canNext = function () {
        return true;
    };
    CellValidationSelectQueryWizard.prototype.canBack = function () {
        return true;
    };
    CellValidationSelectQueryWizard.prototype.Next = function () {
        if (!this.state.HasExpression ||
            (this.state.HasExpression && this.props.Data.Expression == null)) {
            this.props.Data.Expression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
        }
    };
    CellValidationSelectQueryWizard.prototype.Back = function () {
        /* no implementation */
    };
    CellValidationSelectQueryWizard.prototype.GetIndexStepIncrement = function () {
        return this.state.HasExpression ? 1 : 2;
    };
    CellValidationSelectQueryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return CellValidationSelectQueryWizard;
}(React.Component));
exports.CellValidationSelectQueryWizard = CellValidationSelectQueryWizard;
