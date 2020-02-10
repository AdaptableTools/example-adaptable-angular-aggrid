"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var CellValidationSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CellValidationSummaryWizard, _super);
    function CellValidationSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    CellValidationSummaryWizard.prototype.render = function () {
        var keyValuePairs = [
            {
                Key: 'Column',
                Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns),
            },
            { Key: 'Mode', Value: this.props.Data.ActionMode },
            {
                Key: 'Rule',
                Value: this.props.Adaptable.ValidationService.createCellValidationDescription(this.props.Data, this.props.Columns),
            },
            {
                Key: 'Query',
                Value: ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(this.props.Data.Expression)
                    ? ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns)
                    : 'None',
            },
        ];
        return (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.CellValidationStrategyFriendlyName }));
    };
    CellValidationSummaryWizard.prototype.canNext = function () {
        return true;
    };
    CellValidationSummaryWizard.prototype.canBack = function () {
        return true;
    };
    CellValidationSummaryWizard.prototype.Next = function () {
        /* no implementation */
    };
    CellValidationSummaryWizard.prototype.Back = function () {
        /* no implementation */
    };
    CellValidationSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    CellValidationSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(this.props.Data.Expression) ? 2 : 1;
    };
    return CellValidationSummaryWizard;
}(React.Component));
exports.CellValidationSummaryWizard = CellValidationSummaryWizard;
