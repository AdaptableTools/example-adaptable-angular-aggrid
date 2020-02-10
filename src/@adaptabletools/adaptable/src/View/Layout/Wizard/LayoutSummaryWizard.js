"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var LayoutSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutSummaryWizard, _super);
    function LayoutSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    LayoutSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            { Key: 'Name', Value: this.props.Data.Name },
            { Key: 'Columns', Value: this.getColumnNames(this.props.Data.Columns) },
            {
                Key: 'Column Sorts',
                Value: this.props.Adaptable.LayoutService.getColumnSort(this.props.Data.ColumnSorts, this.props.Columns),
            },
            { Key: 'Grouped Columns', Value: this.getColumnNames(this.props.Data.GroupedColumns) },
        ];
        var pivotKeyValuePairs = [];
        if (this.props.Adaptable.LayoutService.isPivotedLayout(this.props.Data.PivotDetails)) {
            pivotKeyValuePairs = [
                {
                    Key: 'Pivot Columns',
                    Value: this.getColumnNames(this.props.Data.PivotDetails.PivotColumns),
                },
                {
                    Key: 'Aggregation Columns',
                    Value: this.getColumnNames(this.props.Data.PivotDetails.AggregationColumns),
                },
            ];
        }
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: tslib_1.__spread(keyValuePairs, pivotKeyValuePairs), header: StrategyConstants.LayoutStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    LayoutSummaryWizard.prototype.canNext = function () {
        return true;
    };
    LayoutSummaryWizard.prototype.getColumnNames = function (columns) {
        return ArrayExtensions_1.default.IsNotNullOrEmpty(columns)
            ? ColumnHelper_1.ColumnHelper.getFriendlyNamesFromColumnIds(columns, this.props.Columns).join(', ')
            : 'None';
    };
    LayoutSummaryWizard.prototype.canBack = function () {
        return true;
    };
    LayoutSummaryWizard.prototype.Next = function () {
        //
    };
    LayoutSummaryWizard.prototype.Back = function () {
        // todo
    };
    LayoutSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    LayoutSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return LayoutSummaryWizard;
}(React.Component));
exports.LayoutSummaryWizard = LayoutSummaryWizard;
