"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var StyleVisualItem_1 = require("../../Components/StyleVisualItem");
var ObjectFactory_1 = require("../../../Utilities/ObjectFactory");
var GradientColumnSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(GradientColumnSummaryWizard, _super);
    function GradientColumnSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    GradientColumnSummaryWizard.prototype.render = function () {
        var positiveStyle = ObjectFactory_1.ObjectFactory.CreateEmptyStyle();
        positiveStyle.BackColor = this.props.Data.PositiveColor;
        positiveStyle.ForeColor = this.props.Data.PositiveColor;
        var negativeStyle = ObjectFactory_1.ObjectFactory.CreateEmptyStyle();
        negativeStyle.BackColor = this.props.Data.NegativeColor;
        negativeStyle.ForeColor = this.props.Data.NegativeColor;
        var keyValuePairs = [
            {
                Key: 'Column',
                Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns),
            },
            {
                Key: 'Base Value',
                Value: this.props.Data.BaseValue,
            },
            {
                Key: 'Positive Value',
                Value: this.props.Data.PositiveValue,
            },
            {
                Key: 'Positive Colour',
                Value: this.props.Data.PositiveValue ? React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: positiveStyle }) : null,
            },
            {
                Key: 'Negative Value',
                Value: this.props.Data.NegativeValue,
            },
            {
                Key: 'Negative Colour',
                Value: this.props.Data.NegativeValue ? React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: negativeStyle }) : null,
            },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.GradientColumnStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    GradientColumnSummaryWizard.prototype.canNext = function () {
        return true;
    };
    GradientColumnSummaryWizard.prototype.canBack = function () {
        return true;
    };
    GradientColumnSummaryWizard.prototype.Next = function () {
        /* no implementation */
    };
    GradientColumnSummaryWizard.prototype.Back = function () {
        /* no implementation */
    };
    GradientColumnSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    GradientColumnSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return GradientColumnSummaryWizard;
}(React.Component));
exports.GradientColumnSummaryWizard = GradientColumnSummaryWizard;
