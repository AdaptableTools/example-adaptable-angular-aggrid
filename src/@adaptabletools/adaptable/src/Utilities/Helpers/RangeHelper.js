"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../Extensions/StringExtensions");
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
function CreateValueRange(operator, operand1, operand2) {
    return {
        Operator: operator,
        Operand1: operand1 == null ? null : operand1.trim(),
        Operand2: operand2 == null ? null : operand2.trim(),
        Operand1Type: 'Value',
        Operand2Type: 'Value',
    };
}
exports.CreateValueRange = CreateValueRange;
function GetNumberOperatorPairs() {
    return [
        { Key: '<>', Value: Enums_1.LeafExpressionOperator.NotEquals },
        { Key: '>=', Value: Enums_1.LeafExpressionOperator.GreaterThanOrEqual },
        { Key: '<=', Value: Enums_1.LeafExpressionOperator.LessThanOrEqual },
        { Key: '>', Value: Enums_1.LeafExpressionOperator.GreaterThan },
        { Key: '<', Value: Enums_1.LeafExpressionOperator.LessThan },
        { Key: '=', Value: Enums_1.LeafExpressionOperator.Equals },
        { Key: ':', Value: Enums_1.LeafExpressionOperator.Between },
        { Key: '%', Value: Enums_1.LeafExpressionOperator.Contains },
        { Key: '*', Value: Enums_1.LeafExpressionOperator.StartsWith },
        { Key: '!', Value: Enums_1.LeafExpressionOperator.NotContains },
    ];
}
exports.GetNumberOperatorPairs = GetNumberOperatorPairs;
function GetStringOperatorPairs() {
    return [
        { Key: '*', Value: Enums_1.LeafExpressionOperator.StartsWith },
        { Key: '%', Value: Enums_1.LeafExpressionOperator.Contains },
        { Key: '!', Value: Enums_1.LeafExpressionOperator.NotContains },
        { Key: '=', Value: Enums_1.LeafExpressionOperator.Equals },
    ];
}
exports.GetStringOperatorPairs = GetStringOperatorPairs;
function GetDateOperatorPairs() {
    return [];
}
exports.GetDateOperatorPairs = GetDateOperatorPairs;
function CreateValueRangeFromOperand(rangeText) {
    // if its empty then return null
    if (StringExtensions_1.StringExtensions.IsNullOrEmpty(rangeText)) {
        return null;
    }
    // next check to see if there is an operator
    var operatorText = getSingleOperatorFromOperandText(rangeText);
    // if there is no operator then its a simple contains range
    if (StringExtensions_1.StringExtensions.IsNullOrEmpty(operatorText)) {
        return CreateValueRange(Enums_1.LeafExpressionOperator.Contains, rangeText, null);
    }
    // we have an operator: so lets get the operand text
    var operandText = rangeText.replace(operatorText, '').trim();
    //first check that its not ONLY an operator - if so then return null
    if (StringExtensions_1.StringExtensions.IsNullOrEmpty(operandText)) {
        return null;
    }
    // we have an operator AND text so create the appropriate range
    // NOTE:  This fails unless the text is > 5.  not working for 5:7 at the moment..
    var opKVP = GetNumberOperatorPairs().find(function (kvp) { return kvp.Key == operatorText; });
    if (opKVP == null) {
        // no number so lets try a string -- not sure we need this now as all strings are in numbers (need to rethink that)
        opKVP = GetStringOperatorPairs().find(function (kvp) { return kvp.Key == operatorText; });
    }
    return opKVP ? CreateValueRange(opKVP.Value, operandText, null) : null;
}
exports.CreateValueRangeFromOperand = CreateValueRangeFromOperand;
function getSingleOperatorFromOperandText(operandText) {
    var trimmedOperand = operandText.trim();
    var returnOperand = '';
    GetNumberOperatorPairs().forEach(function (op) {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(returnOperand)) {
            if (trimmedOperand.includes(op.Key)) {
                returnOperand = op.Key;
            }
        }
    });
    GetStringOperatorPairs().forEach(function (op) {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(returnOperand)) {
            if (trimmedOperand.includes(op.Key)) {
                returnOperand = op.Key;
            }
        }
    });
    return returnOperand;
}
function IsColumnAppropriateForRange(range, column) {
    if (!range) {
        return true;
    }
    if (column.DataType == Enums_1.DataType.Number) {
        if (range.Operand1 && isNaN(Number(range.Operand1))) {
            return false;
        }
        var tet = GetNumberOperatorPairs().map(function (kvp) {
            return kvp.Value;
        });
        if (ArrayExtensions_1.ArrayExtensions.ContainsItem(tet, range.Operator)) {
            return true;
        }
    }
    else if (column.DataType == Enums_1.DataType.Date) {
        var tet = GetDateOperatorPairs().map(function (kvp) {
            return kvp.Value;
        });
        if (ArrayExtensions_1.ArrayExtensions.ContainsItem(tet, range.Operator)) {
            return true;
        }
    }
    else if (column.DataType == Enums_1.DataType.String) {
        var tet = GetStringOperatorPairs().map(function (kvp) {
            return kvp.Value;
        });
        if (ArrayExtensions_1.ArrayExtensions.ContainsItem(tet, range.Operator)) {
            return true;
        }
    }
    return false;
}
exports.IsColumnAppropriateForRange = IsColumnAppropriateForRange;
exports.RangeHelper = {
    CreateValueRange: CreateValueRange,
    GetNumberOperatorPairs: GetNumberOperatorPairs,
    GetStringOperatorPairs: GetStringOperatorPairs,
    GetDateOperatorPairs: GetDateOperatorPairs,
    CreateValueRangeFromOperand: CreateValueRangeFromOperand,
    IsColumnAppropriateForRange: IsColumnAppropriateForRange,
};
exports.default = exports.RangeHelper;
