"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../components/SimpleButton");
var rebass_1 = require("rebass");
var WizardLegend = /** @class */ (function (_super) {
    tslib_1.__extends(WizardLegend, _super);
    function WizardLegend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WizardLegend.prototype.render = function () {
        var _this = this;
        var count = this.props.StepNames.length - 1;
        var activeStepIndex = this.props.StepNames.findIndex(function (s) { return s == _this.props.ActiveStepName; });
        var stepButtons = this.props.StepNames.map(function (s, index) {
            var isActiveStep = index == activeStepIndex;
            var isDisabled = _this.props.CanShowAllSteps
                ? false
                : isActiveStep || index > activeStepIndex;
            var style = isActiveStep ? 'primary' : 'default';
            var lastStep = index == count;
            return (React.createElement("div", { key: index, style: { display: 'inline-block' } },
                React.createElement(SimpleButton_1.default, { variant: isActiveStep ? 'raised' : 'outlined', tone: isActiveStep ? 'accent' : 'neutral', disabled: isDisabled, onClick: function () { return _this.onStepButtonClicked(s); } }, s),
                lastStep == false && (React.createElement(rebass_1.Box, { mx: 2, style: { display: 'inline-block' } }, "\u2014"))));
        });
        return React.createElement("div", null, stepButtons);
    };
    WizardLegend.prototype.onStepButtonClicked = function (stepName) {
        this.props.onStepButtonClicked(stepName);
    };
    return WizardLegend;
}(React.Component));
exports.WizardLegend = WizardLegend;
