"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var Expression_1 = require("../../PredefinedConfig/Common/Expression");
var ColumnHelper_1 = require("./ColumnHelper");
var StringExtensions_1 = require("../Extensions/StringExtensions");
var LoggingHelper_1 = require("./LoggingHelper");
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var ObjectFactory_1 = require("../ObjectFactory");
var Helper_1 = require("./Helper");
/**
 * This is the main Helper class dealing with Expressions (a.k.a. Queries)
 * This class allows you to create and evalute (i.e. see if they are satisfied) Expressions and represent them as strings
 */
// Creates a very basic expression containing just a single colum (Expressions can contain theoretically multiple columns)
function CreateSingleColumnExpression(columnId, columnDisplayValues, columnRawValues, userFilters, ranges) {
    return new Expression_1.Expression((columnDisplayValues && columnDisplayValues.length > 0) ||
        (columnRawValues && columnRawValues.length > 0)
        ? [
            {
                ColumnId: columnId,
                ColumnDisplayValues: columnDisplayValues,
                ColumnRawValues: columnRawValues,
            },
        ]
        : [], userFilters && userFilters.length > 0 ? [{ ColumnId: columnId, Filters: userFilters }] : [], ranges && ranges.length > 0 ? [{ ColumnId: columnId, Ranges: ranges }] : []);
}
exports.CreateSingleColumnExpression = CreateSingleColumnExpression;
// Converts an Expression to a readable string - used in display boxes
function ConvertExpressionToString(Expression, columns, includeColumnName) {
    var e_1, _a;
    if (includeColumnName === void 0) { includeColumnName = true; }
    var returnValue = '';
    if (IsNullOrEmptyExpression(Expression)) {
        return 'Any';
    }
    var columnList = GetColumnListFromExpression(Expression);
    var _loop_1 = function (columnId) {
        var columnFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(columnId, columns);
        var columnToString = '';
        // Column Display Values
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(Expression.ColumnValueExpressions)) {
            var columnValueExpression = Expression.ColumnValueExpressions.find(function (x) { return x.ColumnId == columnId; });
            if (columnValueExpression) {
                columnToString = ColumnValueExpressionToString(columnValueExpression, columnFriendlyName, includeColumnName);
            }
        }
        // User Filters
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(Expression.FilterExpressions)) {
            var columnUserFilters = Expression.FilterExpressions.find(function (x) { return x.ColumnId == columnId; });
            if (columnUserFilters) {
                if (columnToString != '') {
                    columnToString += ' OR ';
                }
                columnToString += UserFiltersToString(columnUserFilters.Filters, columnFriendlyName, includeColumnName);
            }
        }
        // Column Ranges
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(Expression.RangeExpressions)) {
            var columnRange = Expression.RangeExpressions.find(function (x) { return x.ColumnId == columnId; });
            if (columnRange) {
                if (columnToString != '') {
                    columnToString += ' OR ';
                }
                columnToString += RangesToString(columnRange, columnFriendlyName, columns, includeColumnName);
            }
        }
        if (returnValue != '') {
            returnValue += ' AND ';
        }
        if (includeColumnName) {
            returnValue += '(';
        }
        returnValue += columnToString;
        if (includeColumnName) {
            returnValue += ')';
        }
    };
    try {
        for (var columnList_1 = tslib_1.__values(columnList), columnList_1_1 = columnList_1.next(); !columnList_1_1.done; columnList_1_1 = columnList_1.next()) {
            var columnId = columnList_1_1.value;
            _loop_1(columnId);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (columnList_1_1 && !columnList_1_1.done && (_a = columnList_1.return)) _a.call(columnList_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return returnValue;
}
exports.ConvertExpressionToString = ConvertExpressionToString;
// Converts a QueryRange to a readable string
function ConvertRangeToString(range, columns) {
    var returnValue = range.Operator + ' ' + range.Operand1;
    if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(range.Operand2)) {
        returnValue += range.Operand2;
    }
    return returnValue;
}
exports.ConvertRangeToString = ConvertRangeToString;
function checkForExpression(Expression, identifierValue, columns, adaptable) {
    return IsSatisfied(Expression, adaptable.getRowNodeIsSatisfiedFunction(identifierValue, Enums_1.DistinctCriteriaPairValue.RawValue), // this value raw
    adaptable.getRowNodeIsSatisfiedFunction(identifierValue, Enums_1.DistinctCriteriaPairValue.DisplayValue), // this value display
    adaptable.getRowNodeIsSatisfiedFunction(identifierValue, Enums_1.DistinctCriteriaPairValue.RawValue), // other column value
    columns, adaptable.api.userFilterApi.getAllUserFilter(), adaptable.api.systemFilterApi.getAllSystemFilter(), adaptable.api.namedFilterApi.getAllNamedFilter(), adaptable);
}
exports.checkForExpression = checkForExpression;
function checkForExpressionFromRowNode(Expression, rowNode, columns, adaptable) {
    return IsSatisfied(Expression, adaptable.getRowNodeIsSatisfiedFunctionFromRowNode(rowNode, Enums_1.DistinctCriteriaPairValue.RawValue), // this value
    adaptable.getRowNodeIsSatisfiedFunctionFromRowNode(rowNode, Enums_1.DistinctCriteriaPairValue.DisplayValue), // this value
    adaptable.getRowNodeIsSatisfiedFunctionFromRowNode(rowNode, Enums_1.DistinctCriteriaPairValue.RawValue), // other column value
    columns, adaptable.api.userFilterApi.getAllUserFilter(), adaptable.api.systemFilterApi.getAllSystemFilter(), adaptable.api.namedFilterApi.getAllNamedFilter(), adaptable, rowNode);
}
exports.checkForExpressionFromRowNode = checkForExpressionFromRowNode;
// The main function that evaluates whether a row meets an Expression
function IsSatisfied(Expression, getColumnValue, getDisplayColumnValue, getOtherColumnValue, columnadaptableList, userFilters, systemFilters, namedFilters, adaptable, rowNode) {
    var e_2, _a;
    var expressionColumnList = GetColumnListFromExpression(Expression);
    var _loop_2 = function (columnId) {
        var e_3, _a, e_4, _b, e_5, _c, e_6, _d;
        var columnValue = getColumnValue(columnId);
        //we need either a column value or user filter expression or range to match the column
        var isColumnSatisfied = false;
        var column = columnadaptableList.find(function (x) { return x.ColumnId == columnId; });
        if (!column) {
            LoggingHelper_1.LoggingHelper.LogAdaptableWarning('Could not find column id:' + columnId);
            isColumnSatisfied = true;
        }
        // check for display column values
        if (!isColumnSatisfied && ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(Expression.ColumnValueExpressions)) {
            var columnValues = Expression.ColumnValueExpressions.find(function (x) { return x.ColumnId == columnId; });
            if (columnValues) {
                var columnDisplayValue = getDisplayColumnValue(columnValues.ColumnId);
                isColumnSatisfied = ArrayExtensions_1.ArrayExtensions.ContainsItem(columnValues.ColumnDisplayValues, columnDisplayValue);
            }
        }
        // Check for filter expressions if column fails
        if (!isColumnSatisfied && ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(Expression.FilterExpressions)) {
            var filtersForColumn_1 = Expression.FilterExpressions.find(function (x) { return x.ColumnId == columnId; });
            if (filtersForColumn_1) {
                // first evaluate any user filters
                var filteredUserFilters = adaptable.FilterService.GetUserFilters(userFilters, filtersForColumn_1.Filters);
                try {
                    for (var filteredUserFilters_1 = (e_3 = void 0, tslib_1.__values(filteredUserFilters)), filteredUserFilters_1_1 = filteredUserFilters_1.next(); !filteredUserFilters_1_1.done; filteredUserFilters_1_1 = filteredUserFilters_1.next()) {
                        var userFilter = filteredUserFilters_1_1.value;
                        isColumnSatisfied = IsSatisfied(userFilter.Expression, getColumnValue, getDisplayColumnValue, getOtherColumnValue, columnadaptableList, userFilters, systemFilters, namedFilters, adaptable);
                        if (isColumnSatisfied) {
                            break;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (filteredUserFilters_1_1 && !filteredUserFilters_1_1.done && (_a = filteredUserFilters_1.return)) _a.call(filteredUserFilters_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                // then evaluate any system filters
                if (!isColumnSatisfied) {
                    var filteredSystemFilters = systemFilters.filter(function (f) { return filtersForColumn_1.Filters.find(function (u) { return u == f; }) != null; });
                    try {
                        for (var filteredSystemFilters_1 = (e_4 = void 0, tslib_1.__values(filteredSystemFilters)), filteredSystemFilters_1_1 = filteredSystemFilters_1.next(); !filteredSystemFilters_1_1.done; filteredSystemFilters_1_1 = filteredSystemFilters_1.next()) {
                            var systemFilter = filteredSystemFilters_1_1.value;
                            var satisfyFunction = adaptable.FilterService.GetFunctionForSystemFilter(systemFilter);
                            isColumnSatisfied = satisfyFunction.IsExpressionSatisfied(columnValue, adaptable);
                            if (isColumnSatisfied) {
                                break;
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (filteredSystemFilters_1_1 && !filteredSystemFilters_1_1.done && (_b = filteredSystemFilters_1.return)) _b.call(filteredSystemFilters_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
                // then evaluate any named filters
                if (!isColumnSatisfied) {
                    var filteredNamedFilters = namedFilters.filter(function (f) {
                        return filtersForColumn_1.Filters.find(function (u) { return u == f.Name; });
                    });
                    try {
                        for (var filteredNamedFilters_1 = (e_5 = void 0, tslib_1.__values(filteredNamedFilters)), filteredNamedFilters_1_1 = filteredNamedFilters_1.next(); !filteredNamedFilters_1_1.done; filteredNamedFilters_1_1 = filteredNamedFilters_1.next()) {
                            var namedFilter = filteredNamedFilters_1_1.value;
                            // see if there is a predicate function in the object itself - the new way
                            var satisfyFunction = namedFilter.FilterPredicate;
                            if (satisfyFunction) {
                                isColumnSatisfied = satisfyFunction(rowNode, columnId, columnValue);
                                if (isColumnSatisfied) {
                                    break;
                                }
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (filteredNamedFilters_1_1 && !filteredNamedFilters_1_1.done && (_c = filteredNamedFilters_1.return)) _c.call(filteredNamedFilters_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
        }
        // Check for ranges if column and user filter expressions have failed
        if (!isColumnSatisfied && ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(Expression.RangeExpressions)) {
            var columnRanges_1 = Expression.RangeExpressions.find(function (x) { return x.ColumnId == columnId; });
            if (columnRanges_1) {
                var column_1 = columnadaptableList.find(function (x) { return x.ColumnId == columnRanges_1.ColumnId; });
                var colValue = getColumnValue(columnRanges_1.ColumnId);
                try {
                    for (var _e = (e_6 = void 0, tslib_1.__values(columnRanges_1.Ranges)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var range = _f.value;
                        var rangeEvaluation = exports.ExpressionHelper.GetRangeEvaluation(range, colValue, null, column_1, adaptable, getOtherColumnValue);
                        isColumnSatisfied = exports.ExpressionHelper.TestRangeEvaluation(rangeEvaluation, adaptable);
                        if (isColumnSatisfied) {
                            break;
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        if (!isColumnSatisfied) {
            return { value: false };
        }
    };
    try {
        for (var expressionColumnList_1 = tslib_1.__values(expressionColumnList), expressionColumnList_1_1 = expressionColumnList_1.next(); !expressionColumnList_1_1.done; expressionColumnList_1_1 = expressionColumnList_1.next()) {
            var columnId = expressionColumnList_1_1.value;
            var state_1 = _loop_2(columnId);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (expressionColumnList_1_1 && !expressionColumnList_1_1.done && (_a = expressionColumnList_1.return)) _a.call(expressionColumnList_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return true;
}
exports.IsSatisfied = IsSatisfied;
function ColumnValueExpressionToString(columnValueExpression, columnFriendlyName, includeColumnName) {
    var returnValue = '';
    if (includeColumnName) {
        returnValue += '[' + columnFriendlyName + ']';
    }
    if (columnValueExpression !== undefined &&
        columnValueExpression.ColumnDisplayValues !== undefined &&
        columnValueExpression.ColumnDisplayValues.length > 0) {
        returnValue += ' In (' + columnValueExpression.ColumnDisplayValues.join(', ') + ')';
    }
    return returnValue;
}
function UserFiltersToString(userFilters, columnFriendlyName, includeColumnName) {
    var e_7, _a;
    var returnValue = '';
    try {
        for (var userFilters_1 = tslib_1.__values(userFilters), userFilters_1_1 = userFilters_1.next(); !userFilters_1_1.done; userFilters_1_1 = userFilters_1.next()) {
            var userFilter = userFilters_1_1.value;
            if (returnValue != '') {
                returnValue += ' OR ';
            }
            if (includeColumnName) {
                returnValue += '[' + columnFriendlyName + '] ';
            }
            returnValue += userFilter;
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (userFilters_1_1 && !userFilters_1_1.done && (_a = userFilters_1.return)) _a.call(userFilters_1);
        }
        finally { if (e_7) throw e_7.error; }
    }
    return returnValue;
}
function RangesToString(rangeExpression, columnFriendlyName, columns, includeColumnName) {
    var e_8, _a;
    var returnValue = '';
    try {
        for (var _b = tslib_1.__values(rangeExpression.Ranges), _c = _b.next(); !_c.done; _c = _b.next()) {
            var range = _c.value;
            if (returnValue != '') {
                returnValue += ' OR ';
            }
            var operator = range.Operator;
            if (operator == Enums_1.LeafExpressionOperator.Between) {
                if (includeColumnName) {
                    returnValue += '[' + columnFriendlyName + '] ';
                }
                returnValue +=
                    OperatorToShortFriendlyString(operator) +
                        ' ' +
                        getOperandValue(range.Operand1Type, range.Operand1, columns) +
                        ' AND ' +
                        getOperandValue(range.Operand2Type, range.Operand2, columns);
            }
            else {
                if (includeColumnName) {
                    returnValue += '[' + columnFriendlyName + '] ';
                }
                returnValue +=
                    OperatorToShortFriendlyString(operator) +
                        ' ' +
                        getOperandValue(range.Operand1Type, range.Operand1, columns);
            }
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_8) throw e_8.error; }
    }
    return returnValue;
}
function OperatorToOneCharacterString(operator) {
    switch (operator) {
        case Enums_1.LeafExpressionOperator.GreaterThan:
            return '>';
        case Enums_1.LeafExpressionOperator.LessThan:
            return '<';
        case Enums_1.LeafExpressionOperator.Equals:
            return '=';
        case Enums_1.LeafExpressionOperator.NotEquals:
            return '<>';
        case Enums_1.LeafExpressionOperator.GreaterThanOrEqual:
            return '>=';
        case Enums_1.LeafExpressionOperator.LessThanOrEqual:
            return '<=';
        case Enums_1.LeafExpressionOperator.Between:
            return 'In';
        case Enums_1.LeafExpressionOperator.Contains:
            return 'C';
        case Enums_1.LeafExpressionOperator.NotContains:
            return '!C';
        case Enums_1.LeafExpressionOperator.StartsWith:
            return 'S';
        case Enums_1.LeafExpressionOperator.EndsWith:
            return 'E';
        case Enums_1.LeafExpressionOperator.Regex:
            return 'R';
    }
}
exports.OperatorToOneCharacterString = OperatorToOneCharacterString;
function OperatorToShortFriendlyString(operator) {
    switch (operator) {
        case Enums_1.LeafExpressionOperator.GreaterThan:
            return '>';
        case Enums_1.LeafExpressionOperator.LessThan:
            return '<';
        case Enums_1.LeafExpressionOperator.Equals:
            return '=';
        case Enums_1.LeafExpressionOperator.NotEquals:
            return '<>';
        case Enums_1.LeafExpressionOperator.GreaterThanOrEqual:
            return '>=';
        case Enums_1.LeafExpressionOperator.LessThanOrEqual:
            return '<=';
        case Enums_1.LeafExpressionOperator.Between:
            return 'Between';
        case Enums_1.LeafExpressionOperator.Contains:
            return 'Contains';
        case Enums_1.LeafExpressionOperator.NotContains:
            return 'Not Contains';
        case Enums_1.LeafExpressionOperator.StartsWith:
            return 'Starts With';
        case Enums_1.LeafExpressionOperator.EndsWith:
            return 'Ends With';
        case Enums_1.LeafExpressionOperator.Regex:
            return 'Regex';
    }
}
exports.OperatorToShortFriendlyString = OperatorToShortFriendlyString;
function OperatorToLongFriendlyString(leafExpressionOperator, dataType) {
    switch (leafExpressionOperator) {
        case Enums_1.LeafExpressionOperator.None:
            return 'None';
        case Enums_1.LeafExpressionOperator.AnyChange:
            return 'Any Edit';
        case Enums_1.LeafExpressionOperator.Equals:
            return 'Equals ';
        case Enums_1.LeafExpressionOperator.NotEquals:
            return 'Not Equals ';
        case Enums_1.LeafExpressionOperator.GreaterThan:
            if (dataType == Enums_1.DataType.Date) {
                return 'After ';
            }
            else {
                return 'Greater Than ';
            }
        case Enums_1.LeafExpressionOperator.LessThan:
            if (dataType == Enums_1.DataType.Date) {
                return 'Before ';
            }
            else {
                return 'Less Than ';
            }
        case Enums_1.LeafExpressionOperator.GreaterThanOrEqual:
            if (dataType == Enums_1.DataType.Date) {
                return 'After or On ';
            }
            else {
                return 'Greater Than or Equals ';
            }
        case Enums_1.LeafExpressionOperator.LessThanOrEqual:
            if (dataType == Enums_1.DataType.Date) {
                return 'Before or On ';
            }
            else {
                return 'Less Than or Equals ';
            }
        case Enums_1.LeafExpressionOperator.Between:
            return ' Between ';
        case Enums_1.LeafExpressionOperator.NotBetween:
            return 'Not Between ';
        case Enums_1.LeafExpressionOperator.IsPositive:
            return 'Is Positive ';
        case Enums_1.LeafExpressionOperator.IsNegative:
            return 'Is Negative ';
        case Enums_1.LeafExpressionOperator.ValueChange:
            return 'Change In Value > ';
        case Enums_1.LeafExpressionOperator.PercentChange:
            return '% Change > ';
        case Enums_1.LeafExpressionOperator.IsNotNumber:
            return 'Is Not Number ';
        case Enums_1.LeafExpressionOperator.IsTrue:
            return 'Is True ';
        case Enums_1.LeafExpressionOperator.IsFalse:
            return 'Is False ';
        case Enums_1.LeafExpressionOperator.Contains:
            return 'Contains ';
        case Enums_1.LeafExpressionOperator.NotContains:
            return 'Not Contains ';
        case Enums_1.LeafExpressionOperator.StartsWith:
            return 'Starts With ';
        case Enums_1.LeafExpressionOperator.EndsWith:
            return 'Ends With ';
        case Enums_1.LeafExpressionOperator.Regex:
            return 'Matches Expression ';
        case Enums_1.LeafExpressionOperator.NoDuplicateValues:
            return 'No Duplicate Values ';
        case Enums_1.LeafExpressionOperator.ExistingValuesOnly:
            return 'Existing Values Only ';
    }
}
exports.OperatorToLongFriendlyString = OperatorToLongFriendlyString;
function GetOperatorsForDataType(dataType) {
    switch (dataType) {
        case Enums_1.DataType.Boolean:
            return null;
        case Enums_1.DataType.Number:
        case Enums_1.DataType.Date:
            return [
                Enums_1.LeafExpressionOperator.GreaterThan,
                Enums_1.LeafExpressionOperator.GreaterThanOrEqual,
                Enums_1.LeafExpressionOperator.LessThan,
                Enums_1.LeafExpressionOperator.LessThanOrEqual,
                Enums_1.LeafExpressionOperator.Equals,
                Enums_1.LeafExpressionOperator.NotEquals,
                Enums_1.LeafExpressionOperator.Between,
            ];
        case Enums_1.DataType.String:
            return [
                Enums_1.LeafExpressionOperator.Contains,
                Enums_1.LeafExpressionOperator.NotContains,
                Enums_1.LeafExpressionOperator.StartsWith,
                Enums_1.LeafExpressionOperator.EndsWith,
                Enums_1.LeafExpressionOperator.Equals,
                Enums_1.LeafExpressionOperator.NotEquals,
                Enums_1.LeafExpressionOperator.Regex,
            ];
        default:
            return [Enums_1.LeafExpressionOperator.GreaterThan, Enums_1.LeafExpressionOperator.Between];
    }
}
exports.GetOperatorsForDataType = GetOperatorsForDataType;
function getOperandValue(rangeOperandType, operand, columns) {
    if (rangeOperandType == 'Value') {
        return operand;
    }
    else {
        return '[' + ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(operand, columns) + ']';
    }
}
function GetColumnListFromExpression(expression) {
    var returnColumnList = [];
    if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(expression.ColumnValueExpressions)) {
        returnColumnList.push.apply(returnColumnList, tslib_1.__spread(expression.ColumnValueExpressions.map(function (x) { return x.ColumnId; })));
    }
    if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(expression.FilterExpressions)) {
        returnColumnList.push.apply(returnColumnList, tslib_1.__spread(expression.FilterExpressions.map(function (x) { return x.ColumnId; })));
    }
    if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(expression.RangeExpressions)) {
        returnColumnList.push.apply(returnColumnList, tslib_1.__spread(expression.RangeExpressions.map(function (x) { return x.ColumnId; })));
    }
    return tslib_1.__spread(new Set(returnColumnList));
}
exports.GetColumnListFromExpression = GetColumnListFromExpression;
function IsNullOrEmptyExpression(expression) {
    return expression == null || expression == undefined || IsEmptyExpression(expression);
}
exports.IsNullOrEmptyExpression = IsNullOrEmptyExpression;
function IsEmptyExpression(expression) {
    return (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(expression.ColumnValueExpressions) &&
        ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(expression.FilterExpressions) &&
        ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(expression.RangeExpressions));
}
exports.IsEmptyExpression = IsEmptyExpression;
function IsNotNullOrEmptyExpression(expression) {
    return !IsNullOrEmptyExpression(expression);
}
exports.IsNotNullOrEmptyExpression = IsNotNullOrEmptyExpression;
function IsNotEmptyExpression(expression) {
    return !IsEmptyExpression(expression);
}
exports.IsNotEmptyExpression = IsNotEmptyExpression;
function IsNotEmptyOrInvalidExpression(expression) {
    return IsNotEmptyExpression(expression) && IsExpressionValid(expression);
}
exports.IsNotEmptyOrInvalidExpression = IsNotEmptyOrInvalidExpression;
function IsNullOrEmptyOrValidExpression(expression) {
    if (expression == null) {
        return true;
    }
    if (IsEmptyExpression(expression)) {
        return true;
    }
    return IsExpressionValid(expression);
}
exports.IsNullOrEmptyOrValidExpression = IsNullOrEmptyOrValidExpression;
function IsEmptyOrValidExpression(expression) {
    if (IsEmptyExpression(expression)) {
        return true;
    }
    return IsExpressionValid(expression);
}
exports.IsEmptyOrValidExpression = IsEmptyOrValidExpression;
function IsExpressionValid(expression) {
    //nothing to check for ColumnValues or Filters
    //we check that all ranges are properly populated
    if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(expression.RangeExpressions)) {
        return true;
    }
    return expression.RangeExpressions.every(function (x) {
        return x.Ranges.every(function (range) {
            if (range.Operator == null || range.Operator == undefined) {
                return false;
            }
            else if (range.Operator == Enums_1.LeafExpressionOperator.Between) {
                return range.Operand1 != '' && range.Operand2 != '';
            }
            else {
                return range.Operand1 != '';
            }
        });
    });
}
exports.IsExpressionValid = IsExpressionValid;
function IsEmptyRange(range) {
    return (StringExtensions_1.StringExtensions.IsNullOrEmpty(range.Operand1) && StringExtensions_1.StringExtensions.IsNullOrEmpty(range.Operand2));
}
exports.IsEmptyRange = IsEmptyRange;
function CreateEmptyExpression() {
    return new Expression_1.Expression([], [], []);
}
exports.CreateEmptyExpression = CreateEmptyExpression;
function CreateEmptyRange() {
    return {
        Operator: Enums_1.LeafExpressionOperator.None,
        Operand1: '',
        Operand2: '',
        Operand1Type: Enums_1.RangeOperandType.Value,
        Operand2Type: Enums_1.RangeOperandType.Value,
    };
}
exports.CreateEmptyRange = CreateEmptyRange;
function GetRangeEvaluation(rangeExpression, newValue, initialValue, column, adaptable, getOtherColumnValue) {
    var rangeEvaluation = ObjectFactory_1.ObjectFactory.CreateRangeEvaluation(rangeExpression.Operator, rangeExpression.Operand1, rangeExpression.Operand2, newValue, initialValue, column.ColumnId);
    switch (column.DataType) {
        case Enums_1.DataType.Date:
            if (rangeExpression.Operand1Type == Enums_1.RangeOperandType.Column) {
                var columnValue = getOtherColumnValue(rangeExpression.Operand1);
                rangeEvaluation.operand2 = new Date(columnValue).setHours(0, 0, 0, 0);
            }
            else {
                rangeEvaluation.operand1 = new Date(rangeExpression.Operand1).setHours(0, 0, 0, 0);
            }
            if (StringExtensions_1.StringExtensions.IsNotEmpty(rangeExpression.Operand2)) {
                // between
                if (rangeExpression.Operand2Type == Enums_1.RangeOperandType.Column) {
                    var columnValue = getOtherColumnValue(rangeExpression.Operand2);
                    rangeEvaluation.operand2 = new Date(columnValue).setHours(0, 0, 0, 0);
                }
                else {
                    rangeEvaluation.operand2 = new Date(rangeExpression.Operand2).setHours(0, 0, 0, 0);
                }
            }
            rangeEvaluation.newValue = new Date(newValue).setHours(0, 0, 0, 0);
            break;
        case Enums_1.DataType.Number:
            if (rangeExpression.Operand1Type == Enums_1.RangeOperandType.Column) {
                var otherValue = getOtherColumnValue(rangeExpression.Operand1);
                rangeEvaluation.operand1 = Number(otherValue);
            }
            else {
                rangeEvaluation.operand1 = Number(rangeExpression.Operand1);
            }
            if (StringExtensions_1.StringExtensions.IsNotEmpty(rangeExpression.Operand2)) {
                // between
                if (rangeExpression.Operand2Type == Enums_1.RangeOperandType.Column) {
                    rangeEvaluation.operand2 = Number(getOtherColumnValue(rangeExpression.Operand2));
                }
                else {
                    rangeEvaluation.operand2 = Number(rangeExpression.Operand2);
                }
            }
            rangeEvaluation.newValue = Number(newValue);
            break;
        case Enums_1.DataType.Boolean:
            rangeEvaluation.newValue = newValue;
            break;
        case Enums_1.DataType.Object:
        case Enums_1.DataType.String:
            // might not be a string so make sure
            if (rangeEvaluation.newValue !== undefined && rangeEvaluation.newValue !== null) {
                rangeEvaluation.newValue = String(rangeEvaluation.newValue);
            }
            rangeEvaluation.operand1 =
                rangeExpression.Operand1Type == Enums_1.RangeOperandType.Column
                    ? getOtherColumnValue(rangeExpression.Operand1)
                    : rangeExpression.Operand1 == null
                        ? null
                        : rangeExpression.Operand1;
            rangeEvaluation.operand2 =
                rangeExpression.Operand2Type == Enums_1.RangeOperandType.Column
                    ? getOtherColumnValue(rangeExpression.Operand2)
                    : rangeExpression.Operand2 == null
                        ? null
                        : rangeExpression.Operand2;
            if (adaptable.adaptableOptions.queryOptions.ignoreCaseInQueries) {
                rangeEvaluation.newValue = StringExtensions_1.StringExtensions.ToLowerCase(rangeEvaluation.newValue);
                rangeEvaluation.operand1 = StringExtensions_1.StringExtensions.ToLowerCase(rangeEvaluation.operand1);
                rangeEvaluation.operand2 = StringExtensions_1.StringExtensions.ToLowerCase(rangeEvaluation.operand2);
            }
            break;
    }
    return rangeEvaluation;
}
exports.GetRangeEvaluation = GetRangeEvaluation;
function TestRangeEvaluation(rangeEvaluation, adaptable) {
    if (Helper_1.default.objectNotExists(rangeEvaluation.newValue)) {
        return false;
    }
    switch (rangeEvaluation.operator) {
        case Enums_1.LeafExpressionOperator.AnyChange:
            return true;
        case Enums_1.LeafExpressionOperator.Equals:
            return rangeEvaluation.newValue == rangeEvaluation.operand1;
        case Enums_1.LeafExpressionOperator.NotEquals:
            return rangeEvaluation.newValue != rangeEvaluation.operand1;
        case Enums_1.LeafExpressionOperator.GreaterThan:
            return rangeEvaluation.newValue > rangeEvaluation.operand1;
        case Enums_1.LeafExpressionOperator.LessThan:
            return rangeEvaluation.newValue < rangeEvaluation.operand1;
        case Enums_1.LeafExpressionOperator.GreaterThanOrEqual:
            return rangeEvaluation.newValue >= rangeEvaluation.operand1;
        case Enums_1.LeafExpressionOperator.LessThanOrEqual:
            return rangeEvaluation.newValue <= rangeEvaluation.operand1;
        case Enums_1.LeafExpressionOperator.PercentChange:
            var oldPercentValue = rangeEvaluation.initialValue;
            var percentChange = Math.abs(100 - Math.abs((rangeEvaluation.newValue * 100) / oldPercentValue));
            return percentChange > Number(rangeEvaluation.operand1);
        case Enums_1.LeafExpressionOperator.ValueChange:
            var oldChangeValue = rangeEvaluation.initialValue;
            var changeInValue = Math.abs(rangeEvaluation.newValue - oldChangeValue);
            return changeInValue > Number(rangeEvaluation.operand1);
        case Enums_1.LeafExpressionOperator.Between:
            return (rangeEvaluation.newValue >= rangeEvaluation.operand1 &&
                rangeEvaluation.newValue <= rangeEvaluation.operand2);
        case Enums_1.LeafExpressionOperator.NotBetween:
            return !(rangeEvaluation.newValue >= rangeEvaluation.operand1 &&
                rangeEvaluation.newValue <= rangeEvaluation.operand2);
        case Enums_1.LeafExpressionOperator.IsNotNumber:
            return isNaN(Number(rangeEvaluation.newValue));
        case Enums_1.LeafExpressionOperator.IsPositive:
            return rangeEvaluation.newValue > 0;
        case Enums_1.LeafExpressionOperator.IsNegative:
            return rangeEvaluation.newValue < 0;
        case Enums_1.LeafExpressionOperator.IsTrue:
            return rangeEvaluation.newValue == true;
        case Enums_1.LeafExpressionOperator.IsFalse:
            return rangeEvaluation.newValue == false;
        case Enums_1.LeafExpressionOperator.Contains:
            if (rangeEvaluation.newValue == undefined) {
                return false;
            }
            return String(rangeEvaluation.newValue).indexOf(rangeEvaluation.operand1) >= 0;
        case Enums_1.LeafExpressionOperator.NotContains:
            if (rangeEvaluation.newValue == undefined) {
                return false;
            }
            return String(rangeEvaluation.newValue).indexOf(rangeEvaluation.operand1) < 0;
        case Enums_1.LeafExpressionOperator.StartsWith:
            if (rangeEvaluation.newValue == undefined) {
                return false;
            }
            return String(rangeEvaluation.newValue).startsWith(rangeEvaluation.operand1);
        case Enums_1.LeafExpressionOperator.EndsWith:
            return rangeEvaluation.newValue.endsWith(rangeEvaluation.operand1);
        case Enums_1.LeafExpressionOperator.Regex:
            var regex = new RegExp(rangeEvaluation.operand1);
            return regex.test(rangeEvaluation.newValue);
        case Enums_1.LeafExpressionOperator.NoDuplicateValues:
            return getExistingItem(adaptable, rangeEvaluation) != null;
        case Enums_1.LeafExpressionOperator.ExistingValuesOnly:
            return getExistingItem(adaptable, rangeEvaluation) == null;
    }
    return false;
}
exports.TestRangeEvaluation = TestRangeEvaluation;
function ExpressionContainsFilter(expression, filter) {
    var hasFilter = false;
    if (expression != null && expression.FilterExpressions.length > 0) {
        expression.FilterExpressions.forEach(function (fe) {
            if (!hasFilter) {
                hasFilter = fe.Filters.find(function (f) { return f == filter.Name; }) != null;
            }
        });
    }
    return hasFilter;
}
exports.ExpressionContainsFilter = ExpressionContainsFilter;
function OperatorRequiresValue(operator) {
    return (operator != Enums_1.LeafExpressionOperator.None &&
        operator != Enums_1.LeafExpressionOperator.AnyChange &&
        operator != Enums_1.LeafExpressionOperator.IsPositive &&
        operator != Enums_1.LeafExpressionOperator.IsNegative &&
        operator != Enums_1.LeafExpressionOperator.IsNotNumber &&
        operator != Enums_1.LeafExpressionOperator.IsTrue &&
        operator != Enums_1.LeafExpressionOperator.IsFalse &&
        operator != Enums_1.LeafExpressionOperator.NoDuplicateValues &&
        operator != Enums_1.LeafExpressionOperator.ExistingValuesOnly);
}
exports.OperatorRequiresValue = OperatorRequiresValue;
function AddMissingProperties(expression) {
    if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(expression.ColumnValueExpressions)) {
        expression.ColumnValueExpressions = [];
    }
    if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(expression.FilterExpressions)) {
        expression.FilterExpressions = [];
    }
    if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(expression.RangeExpressions)) {
        expression.RangeExpressions = [];
    }
}
exports.AddMissingProperties = AddMissingProperties;
function getExistingItem(adaptable, rangeEvaluation) {
    var displayValuePairs = adaptable.getColumnValueDisplayValuePairDistinctList(rangeEvaluation.columnId, Enums_1.DistinctCriteriaPairValue.DisplayValue, false);
    var existingItem = displayValuePairs.find(function (dv) { return dv.DisplayValue.toLowerCase() == rangeEvaluation.newValue; });
    return existingItem;
}
exports.ExpressionHelper = {
    CreateSingleColumnExpression: CreateSingleColumnExpression,
    ConvertExpressionToString: ConvertExpressionToString,
    ConvertRangeToString: ConvertRangeToString,
    checkForExpression: checkForExpression,
    checkForExpressionFromRowNode: checkForExpressionFromRowNode,
    IsSatisfied: IsSatisfied,
    OperatorToOneCharacterString: OperatorToOneCharacterString,
    OperatorToShortFriendlyString: OperatorToShortFriendlyString,
    OperatorToLongFriendlyString: OperatorToLongFriendlyString,
    GetOperatorsForDataType: GetOperatorsForDataType,
    GetColumnListFromExpression: GetColumnListFromExpression,
    IsNullOrEmptyExpression: IsNullOrEmptyExpression,
    IsEmptyExpression: IsEmptyExpression,
    IsNotNullOrEmptyExpression: IsNotNullOrEmptyExpression,
    IsNotEmptyExpression: IsNotEmptyExpression,
    IsNotEmptyOrInvalidExpression: IsNotEmptyOrInvalidExpression,
    IsNullOrEmptyOrValidExpression: IsNullOrEmptyOrValidExpression,
    IsEmptyOrValidExpression: IsEmptyOrValidExpression,
    IsExpressionValid: IsExpressionValid,
    IsEmptyRange: IsEmptyRange,
    CreateEmptyExpression: CreateEmptyExpression,
    CreateEmptyRange: CreateEmptyRange,
    GetRangeEvaluation: GetRangeEvaluation,
    TestRangeEvaluation: TestRangeEvaluation,
    ExpressionContainsFilter: ExpressionContainsFilter,
    OperatorRequiresValue: OperatorRequiresValue,
    AddMissingProperties: AddMissingProperties,
};
exports.default = exports.ExpressionHelper;
