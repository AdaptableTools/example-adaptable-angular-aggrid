"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var AdaptableWizard_1 = require("@adaptabletools/adaptable/src/View/Wizard/AdaptableWizard");
var PieChartSettingsWizard_1 = require("./PieChartSettingsWizard");
var PieChartSummaryWizard_1 = require("./PieChartSummaryWizard");
var PieChartPrimaryColumnWizard_1 = require("./PieChartPrimaryColumnWizard");
var PieChartSecondaryColumnWizard_1 = require("./PieChartSecondaryColumnWizard");
var PieChartWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PieChartWizard, _super);
    function PieChartWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PieChartWizard.prototype.render = function () {
        var _this = this;
        var chartDefinitions = this.props.ConfigEntities;
        var chartNames = chartDefinitions.map(function (s) { return s.Name; });
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ChartStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Primary Column',
                        Index: 0,
                        Element: React.createElement(PieChartPrimaryColumnWizard_1.PieChartPrimaryColumnWizard, null),
                    },
                    {
                        StepName: 'Secondary Column',
                        Index: 1,
                        Element: React.createElement(PieChartSecondaryColumnWizard_1.PieChartSecondaryColumnWizard, null),
                    },
                    {
                        StepName: 'Settings',
                        Index: 2,
                        Element: React.createElement(PieChartSettingsWizard_1.PieChartSettingsWizard, { ChartNames: chartNames }),
                    },
                    {
                        StepName: 'Summary',
                        Index: 3,
                        Element: React.createElement(PieChartSummaryWizard_1.PieChartSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return PieChartWizard;
}(React.Component));
exports.PieChartWizard = PieChartWizard;
