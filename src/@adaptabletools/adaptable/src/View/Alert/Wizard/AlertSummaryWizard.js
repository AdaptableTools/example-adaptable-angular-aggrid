"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var AlertSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(AlertSummaryWizard, _super);
    function AlertSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    AlertSummaryWizard.prototype.render = function () {
        var alertDefinition = this.props.Data;
        var keyValuePairs = [
            {
                Key: 'Column',
                Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(alertDefinition.ColumnId, this.props.Columns),
            },
            {
                Key: 'Rule',
                Value: this.props.Adaptable.StrategyService.createAlertDescription(alertDefinition, this.props.Columns),
            },
            { Key: 'Alert Type', Value: alertDefinition.MessageType },
            {
                Key: 'Show Popup',
                Value: alertDefinition.AlertProperties.ShowPopup ? 'True' : 'False',
            },
            {
                Key: 'Highlight Cell',
                Value: alertDefinition.AlertProperties.HighlightCell ? 'True' : 'False',
            },
            {
                Key: 'Query',
                Value: ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(alertDefinition.Expression)
                    ? ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(alertDefinition.Expression, this.props.Columns)
                    : 'None',
            },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.AlertStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    AlertSummaryWizard.prototype.canNext = function () {
        return true;
    };
    AlertSummaryWizard.prototype.canBack = function () {
        return true;
    };
    AlertSummaryWizard.prototype.Next = function () {
        /* no implementation */
    };
    AlertSummaryWizard.prototype.Back = function () {
        /* no implementation */
    };
    AlertSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    AlertSummaryWizard.prototype.GetIndexStepDecrement = function () {
        var alertDefinition = this.props.Data;
        return ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(alertDefinition.Expression) ? 2 : 1;
    };
    return AlertSummaryWizard;
}(React.Component));
exports.AlertSummaryWizard = AlertSummaryWizard;
