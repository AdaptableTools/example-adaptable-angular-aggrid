"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptablePopover_1 = require("../../AdaptablePopover");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var WizardPanel_1 = require("../../../components/WizardPanel");
var rebass_1 = require("rebass");
var Input_1 = require("../../../components/Input");
var Radio_1 = require("../../../components/Radio");
var PlusMinusSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PlusMinusSettingsWizard, _super);
    function PlusMinusSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            NudgeValue: _this.props.Data.NudgeValue,
            IsDefaultNudge: _this.props.Data.IsDefaultNudge,
        };
        return _this;
    }
    PlusMinusSettingsWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Text, { style: { flex: 2 }, marginRight: 2 }, "Nudge Value:"),
                React.createElement(Input_1.default, { style: { flex: 9 }, value: this.state.NudgeValue.toString(), type: "number", placeholder: "Enter a Number", onChange: function (e) { return _this.onColumnDefaultNudgeValueChange(e); } })),
            React.createElement(rebass_1.Flex, { flexDirection: "row", marginTop: 2 },
                React.createElement(rebass_1.Text, { marginRight: 2, style: { flex: 2 } }, "Apply As:"),
                React.createElement(rebass_1.Flex, { flexDirection: "column", flex: 9 },
                    React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                        React.createElement(Radio_1.default, { value: "expression", marginRight: 2, checked: !this.state.IsDefaultNudge, onChange: function (_, e) { return _this.onExpressionOptionChange(e); } },
                            "Custom Plus/Minus Rule",
                            ' '),
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Plus Minus Settings: Apply As', bodyText: [
                                'Create a Custom Plus/Minus Rule (using the Query Builder in the next step of the wizard)',
                            ] })),
                    React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                        React.createElement(Radio_1.default, { value: "default", marginRight: 2, checked: this.state.IsDefaultNudge, onChange: function (_, e) { return _this.onExpressionOptionChange(e); } }, "Default Nudge Value for Column"),
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Plus Minus Settings: Apply As', bodyText: ['Set default nudge value for the column'] }))))));
    };
    PlusMinusSettingsWizard.prototype.onExpressionOptionChange = function (event) {
        var _this = this;
        var e = event.target;
        var isDefault = e.value == 'default';
        this.setState({ IsDefaultNudge: isDefault }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    PlusMinusSettingsWizard.prototype.onColumnDefaultNudgeValueChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ NudgeValue: parseFloat(e.value) }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    PlusMinusSettingsWizard.prototype.canNext = function () {
        return Number.isFinite(this.state.NudgeValue);
        //  && this.state.IsDefaultNudge==false;
    };
    PlusMinusSettingsWizard.prototype.canBack = function () {
        return true;
    };
    PlusMinusSettingsWizard.prototype.Next = function () {
        this.props.Data.NudgeValue = this.state.NudgeValue;
        this.props.Data.IsDefaultNudge = this.state.IsDefaultNudge;
        if (this.props.Data.Expression == null || this.props.Data.IsDefaultNudge) {
            this.props.Data.Expression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
        }
    };
    PlusMinusSettingsWizard.prototype.Back = function () {
        //todo
    };
    PlusMinusSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return this.state.IsDefaultNudge ? 2 : 1;
    };
    PlusMinusSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return PlusMinusSettingsWizard;
}(React.Component));
exports.PlusMinusSettingsWizard = PlusMinusSettingsWizard;
