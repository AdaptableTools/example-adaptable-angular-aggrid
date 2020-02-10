"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var AdaptableWizard_1 = require("@adaptabletools/adaptable/src/View/Wizard/AdaptableWizard");
var SparklinesChartColumnWizard_1 = require("./SparklinesChartColumnWizard");
var SparklinesChartExpressionColumnWizard_1 = require("./SparklinesChartExpressionColumnWizard");
var SparklinesChartSummaryWizard_1 = require("./SparklinesChartSummaryWizard");
var SparklinesChartSettingsWizard_1 = require("./SparklinesChartSettingsWizard");
var Enums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums");
var SparklinesChartWizard = /** @class */ (function (_super) {
    tslib_1.__extends(SparklinesChartWizard, _super);
    function SparklinesChartWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SparklinesChartWizard.prototype.render = function () {
        var _this = this;
        var chartDefinitions = this.props.ConfigEntities;
        var chartNames = chartDefinitions.map(function (s) { return s.Name; });
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ChartStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Select Column',
                        Index: 0,
                        Element: React.createElement(SparklinesChartColumnWizard_1.SparklinesChartColumnWizard, null),
                    },
                    {
                        StepName: 'Build Query',
                        Index: 1,
                        Element: (React.createElement(SparklinesChartExpressionColumnWizard_1.SparklinesChartExpressionColumnWizard, { Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, ExpressionMode: Enums_1.ExpressionMode.SingleColumn })),
                    },
                    {
                        StepName: 'Chart Settings',
                        Index: 2,
                        Element: React.createElement(SparklinesChartSettingsWizard_1.SparklinesChartSettingsWizard, { ChartNames: chartNames }),
                    },
                    {
                        StepName: 'Summary',
                        Index: 3,
                        Element: React.createElement(SparklinesChartSummaryWizard_1.SparklinesChartSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return SparklinesChartWizard;
}(React.Component));
exports.SparklinesChartWizard = SparklinesChartWizard;
