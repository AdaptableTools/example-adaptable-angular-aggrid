"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var CustomSortSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CustomSortSummaryWizard, _super);
    function CustomSortSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    CustomSortSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            {
                Key: 'Column',
                Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns),
            },
            { Key: 'Values', Value: this.props.Data.SortedValues.join(', ') },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.CustomSortStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    CustomSortSummaryWizard.prototype.canNext = function () {
        return true;
    };
    CustomSortSummaryWizard.prototype.canBack = function () {
        return true;
    };
    CustomSortSummaryWizard.prototype.Next = function () {
        // todo
    };
    CustomSortSummaryWizard.prototype.Back = function () {
        //todo
    };
    CustomSortSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    CustomSortSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return CustomSortSummaryWizard;
}(React.Component));
exports.CustomSortSummaryWizard = CustomSortSummaryWizard;
