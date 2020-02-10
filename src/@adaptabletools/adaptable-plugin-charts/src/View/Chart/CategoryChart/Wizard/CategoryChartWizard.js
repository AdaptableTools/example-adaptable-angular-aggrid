"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var AdaptableWizard_1 = require("@adaptabletools/adaptable/src/View/Wizard/AdaptableWizard");
var CategoryChartYAxisWizard_1 = require("./CategoryChartYAxisWizard");
var CategoryChartXAxisWizard_1 = require("./CategoryChartXAxisWizard");
var CategoryChartXAxisExpressionWizard_1 = require("./CategoryChartXAxisExpressionWizard");
var Enums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums");
var CategoryChartSummaryWizard_1 = require("./CategoryChartSummaryWizard");
var CategoryChartSettingsWizard_1 = require("./CategoryChartSettingsWizard");
var CategoryChartWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryChartWizard, _super);
    function CategoryChartWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoryChartWizard.prototype.render = function () {
        var _this = this;
        var chartDefinitions = this.props.ConfigEntities;
        var chartNames = chartDefinitions.map(function (s) { return s.Name; });
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ChartStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Y Axis',
                        Index: 0,
                        Element: React.createElement(CategoryChartYAxisWizard_1.CategoryChartYAxisWizard, null),
                    },
                    {
                        StepName: 'X Axis',
                        Index: 1,
                        Element: React.createElement(CategoryChartXAxisWizard_1.CategoryChartXAxisWizard, null),
                    },
                    {
                        StepName: 'X Axis',
                        Index: 2,
                        Element: (React.createElement(CategoryChartXAxisExpressionWizard_1.CategoryChartXAxisExpressionWizard, { Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, ExpressionMode: Enums_1.ExpressionMode.SingleColumn })),
                    },
                    {
                        StepName: 'Settings',
                        Index: 5,
                        Element: React.createElement(CategoryChartSettingsWizard_1.CategoryChartSettingsWizard, { ChartNames: chartNames }),
                    },
                    {
                        StepName: 'Summary',
                        Index: 6,
                        Element: React.createElement(CategoryChartSummaryWizard_1.CategoryChartSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return CategoryChartWizard;
}(React.Component));
exports.CategoryChartWizard = CategoryChartWizard;
