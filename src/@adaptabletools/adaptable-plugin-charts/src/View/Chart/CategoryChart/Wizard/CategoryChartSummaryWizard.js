"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper");
var WizardSummaryPage_1 = require("@adaptabletools/adaptable/src/View/Components/WizardSummaryPage");
var ExpressionHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ExpressionHelper");
var CategoryChartSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryChartSummaryWizard, _super);
    function CategoryChartSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    CategoryChartSummaryWizard.prototype.render = function () {
        var _this = this;
        var friendlyNames = this.props.Data.YAxisColumnIds.map(function (c) {
            return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(c, _this.props.Columns);
        });
        var keyValuePairs = [
            { Key: 'Name', Value: this.props.Data.Name },
            { Key: 'Description', Value: this.props.Data.Description },
            { Key: 'Y Axis Column(s)', Value: friendlyNames.join(', ') },
            { Key: 'Total', Value: this.props.Data.YAxisTotal },
            {
                Key: 'X Axis Column',
                Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.XAxisColumnId, this.props.Columns),
            },
            { Key: 'X Axis Values', Value: this.getExpressionString(this.props.Data.XAxisExpression) },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.ChartStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    CategoryChartSummaryWizard.prototype.getExpressionString = function (expression) {
        if (ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(expression)) {
            return '[All Column Values]';
        }
        else {
            return ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(expression, this.props.Columns, false);
        }
    };
    CategoryChartSummaryWizard.prototype.canNext = function () {
        return true;
    };
    CategoryChartSummaryWizard.prototype.canBack = function () {
        return true;
    };
    CategoryChartSummaryWizard.prototype.Next = function () {
        //
    };
    CategoryChartSummaryWizard.prototype.Back = function () {
        //
    };
    CategoryChartSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    CategoryChartSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return CategoryChartSummaryWizard;
}(React.Component));
exports.CategoryChartSummaryWizard = CategoryChartSummaryWizard;
