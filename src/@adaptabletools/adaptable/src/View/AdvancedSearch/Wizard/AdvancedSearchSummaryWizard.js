"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var AdvancedSearchSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(AdvancedSearchSummaryWizard, _super);
    function AdvancedSearchSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    AdvancedSearchSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            { Key: 'Name', Value: this.props.Data.Name },
            {
                Key: 'Query',
                Value: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns),
            },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.AdvancedSearchStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    AdvancedSearchSummaryWizard.prototype.canNext = function () {
        return true;
    };
    AdvancedSearchSummaryWizard.prototype.canBack = function () {
        return true;
    };
    AdvancedSearchSummaryWizard.prototype.Next = function () {
        // todo
    };
    AdvancedSearchSummaryWizard.prototype.Back = function () {
        // todo
    };
    AdvancedSearchSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    AdvancedSearchSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return AdvancedSearchSummaryWizard;
}(React.Component));
exports.AdvancedSearchSummaryWizard = AdvancedSearchSummaryWizard;
