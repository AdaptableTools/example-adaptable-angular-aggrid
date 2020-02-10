"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math = require("mathjs");
var LoggingHelper_1 = require("../Helpers/LoggingHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ColumnHelper_1 = require("../Helpers/ColumnHelper");
var CalculatedColumnExpressionService = /** @class */ (function () {
    function CalculatedColumnExpressionService(adaptable, colFunctionValue) {
        this.adaptable = adaptable;
        this.colFunctionValue = colFunctionValue;
        this.adaptable = adaptable;
        this.colFunctionValue = colFunctionValue;
    }
    CalculatedColumnExpressionService.prototype.GetCalculatedColumnDataType = function (expression) {
        var _this = this;
        try {
            var firstRecord_1 = this.adaptable.getFirstRowNode();
            var firstRowValue = math.eval(expression, {
                Col: function (columnId) {
                    try {
                        return _this.colFunctionValue(columnId, firstRecord_1);
                    }
                    catch (e) {
                        throw Error('Unknown column ' + columnId);
                    }
                },
            });
            return !isNaN(Number(firstRowValue)) ? Enums_1.DataType.Number : Enums_1.DataType.String;
        }
        catch (e) {
            LoggingHelper_1.LoggingHelper.LogAdaptableWarning(e);
            return Enums_1.DataType.Number;
        }
    };
    CalculatedColumnExpressionService.prototype.IsExpressionValid = function (expression) {
        var _this = this;
        try {
            var columns = this.adaptable.api.gridApi.getColumns();
            var cleanedExpression = this.CleanExpressionColumnNames(expression, columns);
            var firstRecord_2 = this.adaptable.getFirstRowNode();
            math.eval(cleanedExpression, {
                Col: function (columnId) {
                    try {
                        return _this.colFunctionValue(columnId, firstRecord_2);
                    }
                    catch (e) {
                        throw Error('Unknown column ' + columnId);
                    }
                },
            });
            return { IsValid: true };
        }
        catch (e) {
            LoggingHelper_1.LoggingHelper.LogAdaptableWarning(e);
            return { IsValid: false, ErrorMsg: e.message };
        }
    };
    CalculatedColumnExpressionService.prototype.ComputeExpressionValue = function (expression, record) {
        var _this = this;
        try {
            if (this.adaptable.isGroupRowNode(record)) {
                return undefined;
            }
            return math.eval(expression, {
                node: record,
                Col: function (columnId) {
                    try {
                        return _this.colFunctionValue(columnId, record);
                    }
                    catch (e) {
                        throw Error('Unknown column ' + columnId);
                    }
                },
            });
        }
        catch (e) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError(e);
            return null;
        }
    };
    CalculatedColumnExpressionService.prototype.GetColumnListFromExpression = function (expression) {
        var columnList = [];
        var regEx = /\b(?:Col\(")([a-zA-Z0-9 ]+)(?:"\))/g;
        var match = regEx.exec(expression);
        while (match !== null) {
            columnList.push(match[1]);
            match = regEx.exec(expression);
        }
        return columnList;
    };
    CalculatedColumnExpressionService.prototype.CleanExpressionColumnNames = function (expression, columns) {
        var newExpression = expression;
        var columnNameList = [];
        var regEx = /\b(?:Col\(")([a-zA-Z0-9 ]+)(?:"\))/g;
        var match = regEx.exec(expression);
        while (match !== null) {
            var columnId = match[1];
            // check if its a column name
            var col = ColumnHelper_1.default.getColumnFromId(columnId, columns, false);
            if (!col) {
                // no column so lets see if they are using FriendlyName
                col = ColumnHelper_1.default.getColumnFromFriendlyName(columnId, columns, false);
                if (col) {
                    columnNameList.push(columnId);
                }
            }
            match = regEx.exec(expression);
        }
        columnNameList.forEach(function (c) {
            var stringToReplace = 'Col("' + c + '")';
            var columnId = ColumnHelper_1.default.getColumnIdFromFriendlyName(c, columns);
            var newString = 'Col("' + columnId + '")';
            newExpression = newExpression.replace(stringToReplace, newString);
        });
        return newExpression;
    };
    CalculatedColumnExpressionService.prototype.GetExpressionString = function (expression, columns) {
        var cleanExpression = this.CleanExpressionColumnNames(expression, columns);
        var columnIds = this.GetColumnListFromExpression(cleanExpression);
        columnIds.forEach(function (c) {
            var stringToReplace = 'Col("' + c + '")';
            var columnFriendName = ColumnHelper_1.default.getFriendlyNameFromColumnId(c, columns);
            var newString = '[' + columnFriendName + ']';
            cleanExpression = cleanExpression.replace(stringToReplace, newString);
        });
        return cleanExpression;
    };
    return CalculatedColumnExpressionService;
}());
exports.CalculatedColumnExpressionService = CalculatedColumnExpressionService;
