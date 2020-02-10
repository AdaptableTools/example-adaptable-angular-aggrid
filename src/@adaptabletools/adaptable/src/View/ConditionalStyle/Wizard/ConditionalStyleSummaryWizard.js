"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StyleVisualItem_1 = require("../../Components/StyleVisualItem");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var ConditionalStyleSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionalStyleSummaryWizard, _super);
    function ConditionalStyleSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    ConditionalStyleSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            { Key: 'Scope', Value: this.getScope() },
            { Key: 'Style', Value: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: this.props.Data.Style }) },
            {
                Key: 'Query',
                Value: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns),
            },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.ConditionalStyleStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    ConditionalStyleSummaryWizard.prototype.getScope = function () {
        switch (this.props.Data.ConditionalStyleScope) {
            case 'Row':
                return 'Row';
            case 'Column':
                return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns);
            //  case 'DataType':
            //     return this.props.Data.DataType + ' Columns';
            case 'ColumnCategory':
                return 'Category: ' + this.props.Data.ColumnCategoryId;
        }
    };
    ConditionalStyleSummaryWizard.prototype.canNext = function () {
        return true;
    };
    ConditionalStyleSummaryWizard.prototype.canBack = function () {
        return true;
    };
    ConditionalStyleSummaryWizard.prototype.Next = function () {
        //
    };
    ConditionalStyleSummaryWizard.prototype.Back = function () {
        // todo
    };
    ConditionalStyleSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ConditionalStyleSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ConditionalStyleSummaryWizard;
}(React.Component));
exports.ConditionalStyleSummaryWizard = ConditionalStyleSummaryWizard;
