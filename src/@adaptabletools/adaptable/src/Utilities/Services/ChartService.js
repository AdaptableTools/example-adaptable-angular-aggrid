"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnHelper_1 = require("../Helpers/ColumnHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var ExpressionHelper_1 = require("../Helpers/ExpressionHelper");
var Helper_1 = require("../Helpers/Helper");
var StringExtensions_1 = require("../Extensions/StringExtensions");
var LoggingHelper_1 = require("../Helpers/LoggingHelper");
var NumberExtensions_1 = require("../Extensions/NumberExtensions");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
var ChartEnums_1 = require("../../PredefinedConfig/Common/ChartEnums");
/*
Class that buils the chart - probably needs some refactoring but working for the time being.
Makes use of Expressions to get the data required.
Returns a ChartData object that the ChartDisplay will receive and then show to teh user
*/
var ChartService = /** @class */ (function () {
    function ChartService(adaptable) {
        this.adaptable = adaptable;
        this.adaptable = adaptable;
    }
    ChartService.prototype.BuildCategoryChartData = function (chartDefinition, columns) {
        // NOTE this method is need only when we using Segmented column(s) otherwise,
        // you can assign chart.dataSource to the whole data (e.g. whatever the grid is displaying)
        // and then set chart.includedProperties to array of strings that contain selected data columns:
        // xAxisColumnName and all yAxisColumnNames, e.g. "Trade Date", "Trade Price", "Trade Volume"
        var _this = this;
        var xAxisColumnName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns);
        var xAxisColValues = this.getXAxisColumnValues(chartDefinition, columns);
        //TODO save yAxisColumnNames in chartDefinition so we can populate getCalloutTypeOptions()
        var yAxisColumnNames = [];
        var returnData = xAxisColValues.map(function (cv) {
            var chartItem = new Object();
            chartItem[xAxisColumnName] = cv;
            var showAverageTotal = chartDefinition.YAxisTotal == ChartEnums_1.AxisTotal.Average;
            var xAxisKVP = { Key: chartDefinition.XAxisColumnId, Value: cv };
            chartDefinition.YAxisColumnIds.forEach(function (colID) {
                var total = _this.buildYAxisTotal(chartDefinition, colID, [xAxisKVP], columns, showAverageTotal);
                var colName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(colID, columns);
                if (yAxisColumnNames.indexOf(colName) < 0) {
                    yAxisColumnNames.push(colName);
                }
                chartItem[colName] = total;
            });
            return chartItem;
        });
        // no error message built yet but need to add
        var chartData = {
            Data: returnData,
            ErrorMessage: null,
        };
        return chartData;
    };
    ChartService.prototype.BuildSparklinesChartData = function (chartDefinition, columns) {
        var _this = this;
        var values;
        // TODO - is this correct?
        if (chartDefinition.Expression) {
            values = [];
            var forEach = function (row) {
                if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRowNode(chartDefinition.Expression, row, columns, _this.adaptable)) {
                    var columnValue = _this.adaptable.getRawValueFromRowNode(row, chartDefinition.ColumnId);
                    values.push(columnValue);
                }
            };
            if (chartDefinition.VisibleRowsOnly) {
                this.adaptable.forAllVisibleRowNodesDo(forEach);
            }
            else {
                this.adaptable.forAllRowNodesDo(forEach);
            }
        }
        else {
            values = [];
            var onlyIncludeIds = void 0;
            if (chartDefinition.PrimaryKeyValues) {
                onlyIncludeIds = chartDefinition.PrimaryKeyValues.reduce(function (allowedIds, primaryKey) {
                    allowedIds[primaryKey] = true;
                    return allowedIds;
                }, {});
            }
            values = this.adaptable
                .getColumnValueDisplayValuePairList(chartDefinition.ColumnId, chartDefinition.VisibleRowsOnly, onlyIncludeIds)
                .filter(function (cv) {
                return Helper_1.Helper.objectExists(cv.RawValue);
            })
                .map(function (cv) {
                return cv.RawValue;
            });
        }
        var chartData = {
            Data: values,
            ErrorMessage: null,
        };
        return chartData;
    };
    ChartService.prototype.buildYAxisTotal = function (chartDefinition, yAxisColumn, kvps, columns, showAverageTotal) {
        var _this = this;
        var columnValueExpressions = kvps.map(function (kvp) {
            return {
                ColumnId: kvp.Key,
                ColumnDisplayValues: [kvp.Value],
                ColumnRawValues: [],
            };
        });
        var completedExpression = {
            Uuid: Uuid_1.createUuid(),
            ColumnValueExpressions: columnValueExpressions,
            FilterExpressions: [],
            RangeExpressions: [],
        };
        var finalTotal = 0;
        var returnedRecordCount = 0;
        if (chartDefinition.VisibleRowsOnly) {
            this.adaptable.forAllVisibleRowNodesDo(function (row) {
                if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRowNode(completedExpression, row, columns, _this.adaptable)) {
                    returnedRecordCount++;
                    var columnValue = _this.adaptable.getRawValueFromRowNode(row, yAxisColumn);
                    finalTotal += Number(columnValue);
                }
            });
        }
        else {
            this.adaptable.forAllRowNodesDo(function (row) {
                if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRowNode(completedExpression, row, columns, _this.adaptable)) {
                    returnedRecordCount++;
                    var columnValue = _this.adaptable.getRawValueFromRowNode(row, yAxisColumn);
                    finalTotal += Number(columnValue);
                }
            });
        }
        if (showAverageTotal) {
            finalTotal = finalTotal / returnedRecordCount;
        }
        return Helper_1.Helper.RoundNumberTo4dp(finalTotal);
    };
    // Gets the unique values in the (horizontal) X Axis column - either through an expression or getting the distinct values
    ChartService.prototype.getXAxisColumnValues = function (chartDefinition, columns) {
        var _this = this;
        var xAxisColValues = [];
        if (ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(chartDefinition.XAxisExpression)) {
            xAxisColValues = this.adaptable
                .getColumnValueDisplayValuePairDistinctList(chartDefinition.XAxisColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue, chartDefinition.VisibleRowsOnly)
                .filter(function (cv) { return Helper_1.Helper.objectExists(cv.RawValue); })
                .map(function (cv) {
                return cv.DisplayValue;
            });
        }
        else {
            if (chartDefinition.VisibleRowsOnly) {
                this.adaptable.forAllVisibleRowNodesDo(function (row) {
                    _this.addXAxisFromExpression(chartDefinition, columns, row, xAxisColValues);
                });
            }
            else {
                this.adaptable.forAllRowNodesDo(function (row) {
                    _this.addXAxisFromExpression(chartDefinition, columns, row, xAxisColValues);
                });
            }
        }
        return xAxisColValues;
    };
    ChartService.prototype.addXAxisFromExpression = function (chartDefinition, columns, row, xAxisColValues) {
        if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRowNode(chartDefinition.XAxisExpression, row, columns, this.adaptable)) {
            var columnValue = this.adaptable.getDisplayValueFromRowNode(row, chartDefinition.XAxisColumnId);
            ArrayExtensions_1.ArrayExtensions.AddItem(xAxisColValues, columnValue);
        }
    };
    ChartService.prototype.BuildPieChartData = function (chartDefinition) {
        var _this = this;
        var dataCounter = new Map();
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(chartDefinition.PrimaryColumnId)) {
            var errorMessage = 'Cannot create pie chart as no Primary Column set.';
            return {
                Data: [],
                ErrorMessage: errorMessage,
            };
        }
        var hasSecondaryColumn = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(chartDefinition.SecondaryColumnId);
        var valueTotal = 0;
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(chartDefinition.PrimaryKeyValues)) {
            // if doing Primary Key Values then we know that we have no secondary column and no need to worry about visible rows
            this.adaptable.getRowNodesForPrimaryKeys(chartDefinition.PrimaryKeyValues).forEach(function (row) {
                _this.getSingleValueTotalForRow(row, chartDefinition, dataCounter, valueTotal);
            });
        }
        else {
            if (chartDefinition.VisibleRowsOnly) {
                this.adaptable.forAllVisibleRowNodesDo(function (row) {
                    valueTotal = hasSecondaryColumn
                        ? _this.getGroupValueTotalForRow(row, chartDefinition, dataCounter, valueTotal)
                        : _this.getSingleValueTotalForRow(row, chartDefinition, dataCounter, valueTotal);
                });
            }
            else {
                this.adaptable.forAllRowNodesDo(function (row) {
                    valueTotal = hasSecondaryColumn
                        ? _this.getGroupValueTotalForRow(row, chartDefinition, dataCounter, valueTotal)
                        : _this.getSingleValueTotalForRow(row, chartDefinition, dataCounter, valueTotal);
                });
            }
        }
        var dataItems = [];
        var columns = this.adaptable.api.gridApi.getColumns();
        // we use ranges if its a numeric column and there are more than 15 slices (N.B. Not completely working)
        var useRanges = this.shouldUseRange(dataCounter, chartDefinition, columns);
        // if we don't use ranges but there are too many slices then we return an error
        if (!useRanges &&
            dataCounter.size > this.adaptable.adaptableOptions.chartOptions.pieChartMaxItems) {
            var message = 'Cannot create pie chart as it contains too many items.';
            LoggingHelper_1.LoggingHelper.LogAdaptableWarning(message);
            return {
                Data: [],
                ErrorMessage: message,
            };
        }
        // if nothing passes (possible if you have visible rows only)
        if (dataCounter.size == 0) {
            var message = 'No data returned for Pie Chart.';
            LoggingHelper_1.LoggingHelper.LogAdaptableWarning(message);
            return {
                Data: [],
                ErrorMessage: message,
            };
        }
        if (!useRanges) {
            dataCounter.forEach(function (value, name) {
                var sliceItem = _this.createNonRangeDataItem(value, name, valueTotal);
                dataItems.push(sliceItem);
            });
        }
        else {
            // too many data values/slices to fit in pie chart so we need to group them into ranges
            var dataMinValue_1 = Number.MAX_VALUE;
            var dataMaxValue_1 = Number.MIN_VALUE;
            // getting min and max values
            dataCounter.forEach(function (id, value) {
                dataMinValue_1 = Math.min(value, dataMinValue_1);
                dataMaxValue_1 = Math.max(value, dataMaxValue_1);
            });
            // calculating nice/round range interval/divisions
            var dataValueGroups = 20;
            var dataValueRange = dataMaxValue_1 - dataMinValue_1;
            var dataValueMultiplier_1 = 1;
            if (dataValueRange < 10) {
                dataValueMultiplier_1 = 100; // for very small values (e.g. B/O Spread column)
            }
            var dataRangeInterval = (dataValueRange * dataValueMultiplier_1) / dataValueGroups;
            var dataRangeDivisions_1 = Math.floor(dataRangeInterval / 10 + 1) * 10;
            var dataRanges_1 = new Map();
            // grouping all data values into ranges by checking which range a value belongs to
            dataCounter.forEach(function (id, value) {
                var rangeKey = Math.floor((value * dataValueMultiplier_1) / dataRangeDivisions_1);
                if (dataRanges_1.has(rangeKey)) {
                    var range = dataRanges_1.get(rangeKey);
                    range.values.push(value);
                    dataRanges_1.set(rangeKey, range);
                }
                else {
                    var rangeMin = (rangeKey / dataValueMultiplier_1) * dataRangeDivisions_1;
                    var rangeMax = ((rangeKey + 1) / dataValueMultiplier_1) * dataRangeDivisions_1;
                    var range = { min: rangeMin, max: rangeMax, values: [value] };
                    if (dataValueMultiplier_1 > 1) {
                        range.min = rangeMin.toFixed(1);
                        range.max = rangeMax.toFixed(1);
                    }
                    else {
                        range.min = NumberExtensions_1.NumberExtensions.abbreviateNumber(rangeMin);
                        range.max = NumberExtensions_1.NumberExtensions.abbreviateNumber(rangeMax);
                    }
                    dataRanges_1.set(rangeKey, range);
                }
            });
            // finally we can generate slice items based on data ranges
            dataRanges_1.forEach(function (range, key) {
                var sliceItem = {
                    Name: '[' + range.min + ' to ' + range.max + ']',
                    Value: range.values.length,
                    // calculating ratio of number of values in this range to total number of all data rows and rounded to 1 decimal place
                    Ratio: Math.round((range.values.length / dataCounter.size) * 1000) / 10,
                };
                sliceItem.ValueAndName = sliceItem.Value + ' - ' + sliceItem.Name;
                sliceItem.RatioAndName = sliceItem.Ratio.toFixed(0) + ' - ' + sliceItem.Name;
                sliceItem.ValueAndName = StringExtensions_1.StringExtensions.abbreviateString(sliceItem.ValueAndName, 50);
                sliceItem.RatioAndName = StringExtensions_1.StringExtensions.abbreviateString(sliceItem.RatioAndName, 50);
                sliceItem.Name = StringExtensions_1.StringExtensions.abbreviateString(sliceItem.Name, 50);
                dataItems.push(sliceItem);
            });
        }
        return {
            Data: dataItems,
            ErrorMessage: null,
        };
    };
    ChartService.prototype.createNonRangeDataItem = function (value, name, valueTotal) {
        var pieChartDataItem = {
            Name: name.toString(),
            Value: Helper_1.Helper.RoundNumber(value, 1),
            // calculating ratio of column value to total values of all columns and rounded to 1 decimal place
            Ratio: Math.round((value / valueTotal) * 1000) / 10,
        };
        pieChartDataItem.ValueAndName =
            NumberExtensions_1.NumberExtensions.abbreviateNumber(pieChartDataItem.Value) + ' - ' + pieChartDataItem.Name;
        pieChartDataItem.RatioAndName =
            pieChartDataItem.Ratio.toFixed(0) + ' - ' + pieChartDataItem.Name;
        pieChartDataItem.ValueAndName = StringExtensions_1.StringExtensions.abbreviateString(pieChartDataItem.ValueAndName, 50);
        pieChartDataItem.RatioAndName = StringExtensions_1.StringExtensions.abbreviateString(pieChartDataItem.RatioAndName, 50);
        pieChartDataItem.Name = StringExtensions_1.StringExtensions.abbreviateString(pieChartDataItem.Name, 50);
        return pieChartDataItem;
    };
    ChartService.prototype.shouldUseRange = function (dataCounter, chartDefinition, columns) {
        var returnValue = false;
        if (dataCounter.size > 15) {
            var primaryColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(chartDefinition.PrimaryColumnId, columns);
            var primaryColumnIsNumeric = ColumnHelper_1.ColumnHelper.isNumericColumn(primaryColumn);
            returnValue = primaryColumnIsNumeric;
        }
        return returnValue;
    };
    ChartService.prototype.getGroupValueTotalForRow = function (row, chartDefinition, dataCounter, valueTotal) {
        var primaryCellValue = this.adaptable.getRawValueFromRowNode(row, chartDefinition.PrimaryColumnId);
        var secondaryCellValue = this.adaptable.getRawValueFromRowNode(row, chartDefinition.SecondaryColumnId);
        if (Helper_1.Helper.objectNotExists(secondaryCellValue)) {
            return valueTotal;
        }
        var group = '';
        var count = 0;
        if (chartDefinition.SecondaryColumnOperation == ChartEnums_1.SecondaryColumnOperation.Sum) {
            count = parseFloat(secondaryCellValue); //+ parseFloat(primaryCellValue);
            group = primaryCellValue;
        }
        else {
            count = 1;
            group = StringExtensions_1.StringExtensions.abbreviateString(primaryCellValue + ' ' + secondaryCellValue, 50);
        }
        if (dataCounter.has(group)) {
            dataCounter.set(group, dataCounter.get(group) + count);
        }
        else {
            dataCounter.set(group, count);
        }
        valueTotal += count;
        return valueTotal;
    };
    ChartService.prototype.getSingleValueTotalForRow = function (row, chartDefinition, dataCounter, valueTotal) {
        var cellValue = this.adaptable.getRawValueFromRowNode(row, chartDefinition.PrimaryColumnId);
        if (Helper_1.Helper.objectNotExists(cellValue)) {
            return valueTotal;
        }
        if (dataCounter.has(cellValue)) {
            dataCounter.set(cellValue, dataCounter.get(cellValue) + 1);
        }
        else {
            dataCounter.set(cellValue, 1);
        }
        valueTotal += 1;
        return valueTotal;
    };
    return ChartService;
}());
exports.ChartService = ChartService;
