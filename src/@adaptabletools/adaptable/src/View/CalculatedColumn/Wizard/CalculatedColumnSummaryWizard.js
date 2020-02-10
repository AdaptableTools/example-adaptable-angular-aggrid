"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var CalculatedColumnSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CalculatedColumnSummaryWizard, _super);
    function CalculatedColumnSummaryWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { ColumnId: _this.props.Data.ColumnId, ErrorMessage: null };
        return _this;
    }
    CalculatedColumnSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            { Key: 'Name', Value: this.props.Data.ColumnId },
            {
                Key: 'Expression',
                Value: this.props.Adaptable.CalculatedColumnExpressionService.GetExpressionString(this.props.Data.ColumnExpression, this.props.Columns),
            },
        ];
        return (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.CalculatedColumnStrategyFriendlyName }));
    };
    CalculatedColumnSummaryWizard.prototype.canNext = function () {
        return true;
    };
    CalculatedColumnSummaryWizard.prototype.canBack = function () {
        return true;
    };
    CalculatedColumnSummaryWizard.prototype.Next = function () {
        //
    };
    CalculatedColumnSummaryWizard.prototype.Back = function () {
        //
    };
    CalculatedColumnSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    CalculatedColumnSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return CalculatedColumnSummaryWizard;
}(React.Component));
exports.CalculatedColumnSummaryWizard = CalculatedColumnSummaryWizard;
