"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("@adaptabletools/adaptable/src/View/Wizard/AdaptableWizard");
var SparklineColumnSelectColumnWizard_1 = require("./SparklineColumnSelectColumnWizard");
var SparklineColumnSummaryWizard_1 = require("./SparklineColumnSummaryWizard");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var SparklineColumnSettingsWizard_1 = require("./SparklineColumnSettingsWizard");
var SparklineColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(SparklineColumnWizard, _super);
    function SparklineColumnWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SparklineColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.SparklineColumnStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Select Column',
                        Index: 0,
                        Element: React.createElement(SparklineColumnSelectColumnWizard_1.SparklineColumnSelectColumnWizard, null),
                    },
                    {
                        StepName: 'Sparkline Settings',
                        Index: 1,
                        Element: React.createElement(SparklineColumnSettingsWizard_1.SparklineColumnSettingsWizard, { ColorPalette: this.props.ColorPalette }),
                    },
                    {
                        StepName: 'Summary',
                        Index: 2,
                        Element: React.createElement(SparklineColumnSummaryWizard_1.SparklineColumnSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return SparklineColumnWizard;
}(React.Component));
exports.SparklineColumnWizard = SparklineColumnWizard;
