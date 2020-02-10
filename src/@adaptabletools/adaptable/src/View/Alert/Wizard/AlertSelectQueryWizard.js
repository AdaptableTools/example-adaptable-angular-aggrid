"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptablePopover_1 = require("../../AdaptablePopover");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var WizardPanel_1 = require("../../../components/WizardPanel");
var HelpBlock_1 = require("../../../components/HelpBlock");
var CheckBox_1 = require("../../../components/CheckBox");
var rebass_1 = require("rebass");
var AlertSelectQueryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(AlertSelectQueryWizard, _super);
    function AlertSelectQueryWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            HasExpression: ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(_this.props.Data.Expression),
        };
        return _this;
    }
    AlertSelectQueryWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, null,
                "A Query is used if the alert triggering is dependent on value in other columns in the row.",
                React.createElement("br", null),
                React.createElement("br", null),
                "If so, then alert will only be triggered if the Query evaluates as true."),
            React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row", marginTop: 2 },
                React.createElement(CheckBox_1.default, { marginRight: 3, marginLeft: 2, onChange: function (checked) { return _this.onOtherExpressionOptionChanged(checked); }, checked: this.state.HasExpression }, "Use Query"),
                ' ',
                React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Alert: Query', bodyText: [
                        'Create a query (in next step) which will stipulate other cell values required for the Alert to be triggered.',
                    ] }))));
    };
    AlertSelectQueryWizard.prototype.onOtherExpressionOptionChanged = function (checked) {
        var _this = this;
        this.setState({ HasExpression: checked }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    AlertSelectQueryWizard.prototype.canNext = function () {
        return true;
    };
    AlertSelectQueryWizard.prototype.canBack = function () {
        return true;
    };
    AlertSelectQueryWizard.prototype.Next = function () {
        // if we have an expression and its null then create an empty one
        if (!this.state.HasExpression ||
            (this.state.HasExpression && this.props.Data.Expression == null)) {
            this.props.Data.Expression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
        }
    };
    AlertSelectQueryWizard.prototype.Back = function () {
        /* no implementation */
    };
    AlertSelectQueryWizard.prototype.GetIndexStepIncrement = function () {
        return this.state.HasExpression ? 1 : 2;
    };
    AlertSelectQueryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return AlertSelectQueryWizard;
}(React.Component));
exports.AlertSelectQueryWizard = AlertSelectQueryWizard;
