"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var FreeTextColumnSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(FreeTextColumnSummaryWizard, _super);
    function FreeTextColumnSummaryWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { ColumnId: _this.props.Data.ColumnId };
        return _this;
    }
    FreeTextColumnSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            { Key: 'Name', Value: this.props.Data.ColumnId },
            {
                Key: 'Default Value',
                Value: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.DefaultValue)
                    ? '[None]'
                    : this.props.Data.DefaultValue,
            },
            {
                Key: 'No. Stored Values',
                Value: ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(this.props.Data.FreeTextStoredValues)
                    ? 0
                    : this.props.Data.FreeTextStoredValues.length,
            },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.FreeTextColumnStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    FreeTextColumnSummaryWizard.prototype.canNext = function () {
        return true;
    };
    FreeTextColumnSummaryWizard.prototype.canBack = function () {
        return true;
    };
    FreeTextColumnSummaryWizard.prototype.Next = function () {
        // todo
    };
    FreeTextColumnSummaryWizard.prototype.Back = function () {
        // todo
    };
    FreeTextColumnSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    FreeTextColumnSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return FreeTextColumnSummaryWizard;
}(React.Component));
exports.FreeTextColumnSummaryWizard = FreeTextColumnSummaryWizard;
