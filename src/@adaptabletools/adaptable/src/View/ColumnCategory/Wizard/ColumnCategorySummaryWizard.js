"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var ColumnCategorySummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnCategorySummaryWizard, _super);
    function ColumnCategorySummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    ColumnCategorySummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            { Key: 'Name', Value: this.props.Data.ColumnCategoryId },
            { Key: 'Columns', Value: this.getColumnNames() },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.ColumnCategoryStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    ColumnCategorySummaryWizard.prototype.canNext = function () {
        return true;
    };
    ColumnCategorySummaryWizard.prototype.getColumnNames = function () {
        return ColumnHelper_1.ColumnHelper.getFriendlyNamesFromColumnIds(this.props.Data.ColumnIds, this.props.Columns).join(', ');
    };
    ColumnCategorySummaryWizard.prototype.canBack = function () {
        return true;
    };
    ColumnCategorySummaryWizard.prototype.Next = function () {
        //
    };
    ColumnCategorySummaryWizard.prototype.Back = function () {
        // todo
    };
    ColumnCategorySummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ColumnCategorySummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ColumnCategorySummaryWizard;
}(React.Component));
exports.ColumnCategorySummaryWizard = ColumnCategorySummaryWizard;
