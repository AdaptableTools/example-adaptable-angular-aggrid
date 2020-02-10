"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper");
var WizardSummaryPage_1 = require("@adaptabletools/adaptable/src/View/Components/WizardSummaryPage");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var PieChartSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PieChartSummaryWizard, _super);
    function PieChartSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    PieChartSummaryWizard.prototype.render = function () {
        var primaryColumnFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.PrimaryColumnId, this.props.Columns);
        var seondaryColumnFriendlyName = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.SecondaryColumnId)
            ? '[None]'
            : ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.SecondaryColumnId, this.props.Columns);
        var seondaryColumnOperation = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.SecondaryColumnId)
            ? ''
            : this.props.Data.SecondaryColumnOperation;
        var rowsDescription = this.props.Data.VisibleRowsOnly ? 'Visible Rows' : 'All Rows';
        var keyValuePairs = [
            { Key: 'Name', Value: this.props.Data.Name },
            { Key: 'Description', Value: this.props.Data.Description },
            { Key: 'Primary Column', Value: primaryColumnFriendlyName },
            { Key: 'Secondary Column', Value: seondaryColumnFriendlyName },
            { Key: 'Operation', Value: seondaryColumnOperation },
            { Key: 'Rows in Chart', Value: rowsDescription },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.ChartStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    PieChartSummaryWizard.prototype.canNext = function () {
        return true;
    };
    PieChartSummaryWizard.prototype.canBack = function () {
        return true;
    };
    PieChartSummaryWizard.prototype.Next = function () {
        //
    };
    PieChartSummaryWizard.prototype.Back = function () {
        //
    };
    PieChartSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    PieChartSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return PieChartSummaryWizard;
}(React.Component));
exports.PieChartSummaryWizard = PieChartSummaryWizard;
