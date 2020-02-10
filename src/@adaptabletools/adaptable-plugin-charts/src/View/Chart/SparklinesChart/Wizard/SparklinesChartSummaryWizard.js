"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper");
var WizardSummaryPage_1 = require("@adaptabletools/adaptable/src/View/Components/WizardSummaryPage");
var ExpressionHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ExpressionHelper");
var SparklinesChartSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(SparklinesChartSummaryWizard, _super);
    function SparklinesChartSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    SparklinesChartSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            { Key: 'Name', Value: this.props.Data.Name },
            { Key: 'Description', Value: this.props.Data.Description },
            {
                Key: 'Column',
                Value: ColumnHelper_1.default.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns),
            },
            { Key: 'Values', Value: this.getExpressionString(this.props.Data.Expression) },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.ChartStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    SparklinesChartSummaryWizard.prototype.getExpressionString = function (expression) {
        if (ExpressionHelper_1.default.IsNullOrEmptyExpression(expression)) {
            return '[All Column Values]';
        }
        else {
            return ExpressionHelper_1.default.ConvertExpressionToString(expression, this.props.Columns, false);
        }
    };
    SparklinesChartSummaryWizard.prototype.canNext = function () {
        return true;
    };
    SparklinesChartSummaryWizard.prototype.canBack = function () {
        return true;
    };
    SparklinesChartSummaryWizard.prototype.Next = function () {
        //
    };
    SparklinesChartSummaryWizard.prototype.Back = function () {
        //
    };
    SparklinesChartSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    SparklinesChartSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return SparklinesChartSummaryWizard;
}(React.Component));
exports.SparklinesChartSummaryWizard = SparklinesChartSummaryWizard;
