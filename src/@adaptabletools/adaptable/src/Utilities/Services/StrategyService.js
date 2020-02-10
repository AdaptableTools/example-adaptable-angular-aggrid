"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnHelper_1 = require("../Helpers/ColumnHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ExpressionHelper_1 = require("../Helpers/ExpressionHelper");
var StringExtensions_1 = require("../Extensions/StringExtensions");
var StrategyService = /** @class */ (function () {
    function StrategyService(adaptable) {
        this.adaptable = adaptable;
        this.adaptable = adaptable;
    }
    StrategyService.prototype.getDistinctColumnValues = function (columnId) {
        var distinctColumnsValues = this.adaptable
            .getColumnValueDisplayValuePairDistinctList(columnId, Enums_1.DistinctCriteriaPairValue.RawValue, false)
            .map(function (pair) {
            return pair.RawValue;
        });
        // filter out any undefined or nulls
        distinctColumnsValues = distinctColumnsValues.filter(function (i) { return i; });
        return distinctColumnsValues;
    };
    StrategyService.prototype.createAlertDescription = function (alertDefinition, columns) {
        var dataType = ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(alertDefinition.ColumnId, columns);
        var valueDescription = ExpressionHelper_1.default.OperatorToLongFriendlyString(alertDefinition.Range.Operator, dataType);
        if (!ExpressionHelper_1.default.OperatorRequiresValue(alertDefinition.Range.Operator)) {
            return valueDescription;
        }
        var operand1Text = dataType == Enums_1.DataType.Boolean || dataType == Enums_1.DataType.Number
            ? alertDefinition.Range.Operand1
            : "'" + alertDefinition.Range.Operand1 + "'";
        valueDescription = valueDescription + operand1Text;
        if (alertDefinition.Range.Operator == Enums_1.LeafExpressionOperator.PercentChange) {
            valueDescription = valueDescription + '%';
        }
        if (StringExtensions_1.default.IsNotNullOrEmpty(alertDefinition.Range.Operand2)) {
            var operand2Text = dataType == Enums_1.DataType.Number
                ? ' and ' + alertDefinition.Range.Operand2
                : " and '" + alertDefinition.Range.Operand2 + "'";
            valueDescription = valueDescription + operand2Text;
        }
        return valueDescription;
    };
    return StrategyService;
}());
exports.StrategyService = StrategyService;
