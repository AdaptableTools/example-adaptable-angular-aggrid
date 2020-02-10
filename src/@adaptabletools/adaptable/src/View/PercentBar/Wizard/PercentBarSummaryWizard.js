"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var StyleVisualItem_1 = require("../../Components/StyleVisualItem");
var ObjectFactory_1 = require("../../../Utilities/ObjectFactory");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var PercentBarSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PercentBarSummaryWizard, _super);
    function PercentBarSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    PercentBarSummaryWizard.prototype.render = function () {
        var keyValuePairs = [];
        if (this.props.Data) {
            var positiveStyle = ObjectFactory_1.ObjectFactory.CreateEmptyStyle();
            positiveStyle.BackColor = this.props.Data.PositiveColor;
            positiveStyle.ForeColor = this.props.Data.PositiveColor;
            var negativeStyle = ObjectFactory_1.ObjectFactory.CreateEmptyStyle();
            negativeStyle.BackColor = this.props.Data.NegativeColor;
            negativeStyle.ForeColor = this.props.Data.NegativeColor;
            keyValuePairs = [
                {
                    Key: 'Column',
                    Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns),
                },
                {
                    Key: 'Positive Value',
                    Value: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.PositiveValueColumnId)
                        ? this.props.Data.PositiveValue
                        : '[' +
                            ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.PositiveValueColumnId, this.props.Columns) +
                            ']',
                },
                {
                    Key: 'Positive Colour',
                    Value: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.Data.PositiveValueColumnId) ||
                        this.props.Data.PositiveValue ? (React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: positiveStyle })) : null,
                },
                {
                    Key: 'Negative Value',
                    Value: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.NegativeValueColumnId)
                        ? this.props.Data.NegativeValue
                        : '[' +
                            ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.NegativeValueColumnId, this.props.Columns) +
                            ']',
                },
                {
                    Key: 'Negative Colour',
                    Value: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.Data.NegativeValueColumnId) ||
                        this.props.Data.NegativeValue ? (React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: negativeStyle })) : null,
                },
                { Key: 'Show Cell Value', Value: this.props.Data.ShowValue ? 'Yes' : 'No' },
                { Key: 'Show Tooltip', Value: this.props.Data.ShowToolTip ? 'Yes' : 'No' },
            ];
        }
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.PercentBarStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    PercentBarSummaryWizard.prototype.canNext = function () {
        return true;
    };
    PercentBarSummaryWizard.prototype.canBack = function () {
        return true;
    };
    PercentBarSummaryWizard.prototype.Next = function () {
        /* no implementation */
    };
    PercentBarSummaryWizard.prototype.Back = function () {
        /* no implementation */
    };
    PercentBarSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    PercentBarSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return PercentBarSummaryWizard;
}(React.Component));
exports.PercentBarSummaryWizard = PercentBarSummaryWizard;
