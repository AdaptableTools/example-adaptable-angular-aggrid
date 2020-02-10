"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var PlusMinusSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PlusMinusSummaryWizard, _super);
    function PlusMinusSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    PlusMinusSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            {
                Key: 'Name',
                Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns),
            },
            { Key: 'Nudge Value', Value: this.props.Data.NudgeValue },
            { Key: 'Is Column Default', Value: this.props.Data.IsDefaultNudge ? 'True' : 'False' },
            {
                Key: 'Custom Rule',
                Value: this.props.Data.IsDefaultNudge
                    ? 'None'
                    : ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns),
            },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.PlusMinusStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    PlusMinusSummaryWizard.prototype.canNext = function () {
        return true;
    };
    PlusMinusSummaryWizard.prototype.canBack = function () {
        return true;
    };
    PlusMinusSummaryWizard.prototype.Next = function () {
        /* No implementation */
    };
    PlusMinusSummaryWizard.prototype.Back = function () {
        /* No implementation */
    };
    PlusMinusSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    PlusMinusSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return this.props.Data.IsDefaultNudge ? 2 : 1;
    };
    return PlusMinusSummaryWizard;
}(React.Component));
exports.PlusMinusSummaryWizard = PlusMinusSummaryWizard;
