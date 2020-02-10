"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("@adaptabletools/adaptable/src/View/Components/WizardSummaryPage");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper");
var ObjectFactory_1 = require("@adaptabletools/adaptable/src/Utilities/ObjectFactory");
var StyleVisualItem_1 = require("@adaptabletools/adaptable/src/View/Components/StyleVisualItem");
var SparklineColumnSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(SparklineColumnSummaryWizard, _super);
    function SparklineColumnSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    SparklineColumnSummaryWizard.prototype.render = function () {
        var lineColorStyle = ObjectFactory_1.default.CreateEmptyStyle();
        lineColorStyle.BackColor = this.props.Data.LineColor;
        lineColorStyle.ForeColor = this.props.Data.LineColor;
        var keyValuePairs = [
            {
                Key: 'Column',
                Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns),
            },
            {
                Key: 'Minimum Value',
                Value: this.props.Data.MinimumValue == null ? 'Current cell' : this.props.Data.MinimumValue,
            },
            {
                Key: 'Maximum Value',
                Value: this.props.Data.MaximumValue == null ? 'Current cell' : this.props.Data.MaximumValue,
            },
            { Key: 'Line Color', Value: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: lineColorStyle }) },
            {
                Key: 'Show Tool Tip',
                Value: this.props.Data.ShowToolTip ? 'True' : 'False',
            },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.SparklineColumnStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    SparklineColumnSummaryWizard.prototype.canNext = function () {
        return true;
    };
    SparklineColumnSummaryWizard.prototype.canBack = function () {
        return true;
    };
    SparklineColumnSummaryWizard.prototype.Next = function () {
        /* no implementation */
    };
    SparklineColumnSummaryWizard.prototype.Back = function () {
        /* no implementation */
    };
    SparklineColumnSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    SparklineColumnSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return SparklineColumnSummaryWizard;
}(React.Component));
exports.SparklineColumnSummaryWizard = SparklineColumnSummaryWizard;
