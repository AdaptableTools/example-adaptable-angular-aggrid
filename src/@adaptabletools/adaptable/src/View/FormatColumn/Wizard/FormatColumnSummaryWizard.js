"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StyleVisualItem_1 = require("../../Components/StyleVisualItem");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var FormatColumnSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(FormatColumnSummaryWizard, _super);
    function FormatColumnSummaryWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { Style: _this.props.Data.Style };
        return _this;
    }
    FormatColumnSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            {
                Key: 'Column',
                Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns),
            },
            { Key: 'Style', Value: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: this.props.Data.Style }) },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.FormatColumnStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    FormatColumnSummaryWizard.prototype.canNext = function () {
        return true;
    };
    FormatColumnSummaryWizard.prototype.canBack = function () {
        return true;
    };
    FormatColumnSummaryWizard.prototype.Next = function () {
        // todo
    };
    FormatColumnSummaryWizard.prototype.Back = function () {
        // todo
    };
    FormatColumnSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    FormatColumnSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return FormatColumnSummaryWizard;
}(React.Component));
exports.FormatColumnSummaryWizard = FormatColumnSummaryWizard;
