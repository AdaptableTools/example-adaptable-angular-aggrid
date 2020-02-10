"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptablePopover_1 = require("../../AdaptablePopover");
var WizardPanel_1 = require("../../../components/WizardPanel");
var CheckBox_1 = require("../../../components/CheckBox");
var rebass_1 = require("rebass");
var Panel_1 = require("../../../components/Panel");
var PercentBarSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PercentBarSettingsWizard, _super);
    function PercentBarSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ShowValue: _this.props.Data.ShowValue,
            ShowTooltip: _this.props.Data.ShowToolTip,
        };
        return _this;
    }
    PercentBarSettingsWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(Panel_1.default, { header: 'Negative Value', marginTop: 2 },
                ' ',
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3 },
                    React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Show Cell Value:"),
                    React.createElement(rebass_1.Flex, { flex: 3, alignItems: "center", flexDirection: "row" },
                        React.createElement(CheckBox_1.default, { marginLeft: 2, marginRight: 2, onChange: function (checked) { return _this.onShowValueChanged(checked); }, checked: this.state.ShowValue }),
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Percent Bar: Show Value', bodyText: ['Whether to show additionally the value of the cell in the bar.'] }))),
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3 },
                    React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Show Tooltip:"),
                    React.createElement(rebass_1.Flex, { flex: 3, alignItems: "center", flexDirection: "row" },
                        React.createElement(CheckBox_1.default, { marginLeft: 2, marginRight: 2, onChange: function (checked) { return _this.onShowTooltipChanged(checked); }, checked: this.state.ShowTooltip }),
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Percent Bar: Show Tooltip', bodyText: [
                                'Whether to display a tooltip that shows the value of the cell when you hover in the Column.',
                            ] }))))));
    };
    PercentBarSettingsWizard.prototype.onShowValueChanged = function (checked) {
        var _this = this;
        this.setState({ ShowValue: checked }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    PercentBarSettingsWizard.prototype.onShowTooltipChanged = function (checked) {
        var _this = this;
        this.setState({ ShowTooltip: checked }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    PercentBarSettingsWizard.prototype.canNext = function () {
        return true;
    };
    PercentBarSettingsWizard.prototype.canBack = function () {
        return true;
    };
    PercentBarSettingsWizard.prototype.Next = function () {
        this.props.Data.ShowValue = this.state.ShowValue;
        this.props.Data.ShowToolTip = this.state.ShowTooltip;
    };
    PercentBarSettingsWizard.prototype.Back = function () {
        //todo
    };
    PercentBarSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    PercentBarSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return PercentBarSettingsWizard;
}(React.Component));
exports.PercentBarSettingsWizard = PercentBarSettingsWizard;
