"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var Helper_1 = require("../Helpers/Helper");
var ColumnHelper_1 = require("../Helpers/ColumnHelper");
var ExpressionHelper_1 = require("../Helpers/ExpressionHelper");
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
// String, Numeric and Date
exports.BLANKS_SYSTEM_FILTER = 'Blanks';
exports.NON_BLANKS_SYSTEM_FILTER = 'Non Blanks';
// Date
exports.TODAY_SYSTEM_FILTER = 'Today';
exports.IN_PAST_SYSTEM_FILTER = 'In Past';
exports.IN_FUTURE_SYSTEM_FILTER = 'In Future';
exports.YESTERDAY_SYSTEM_FILTER = 'Yesterday';
exports.TOMORROW_SYSTEM_FILTER = 'Tomorrow';
exports.NEXT_WORKING_DAY_SYSTEM_FILTER = 'Next Working Day';
exports.PREVIOUS_WORKING_DAY_SYSTEM_FILTER = 'Previous Working Day';
exports.THIS_YEAR_SYSTEM_FILTER = 'This Year';
// Numeric
exports.POSITIVE_SYSTEM_FILTER = 'Positive';
exports.NEGATIVE_SYSTEM_FILTER = 'Negative';
exports.ZERO_SYSTEM_FILTER = 'Zero';
// Boolean
exports.TRUE_SYSTEM_FILTER = 'True';
exports.FALSE_SYSTEM_FILTER = 'False';
var FilterService = /** @class */ (function () {
    function FilterService(adaptable) {
        this.adaptable = adaptable;
        this.adaptable = adaptable;
    }
    FilterService.prototype.GetAllSystemFilters = function () {
        return [
            exports.BLANKS_SYSTEM_FILTER,
            exports.NON_BLANKS_SYSTEM_FILTER,
            exports.TODAY_SYSTEM_FILTER,
            exports.IN_PAST_SYSTEM_FILTER,
            exports.IN_FUTURE_SYSTEM_FILTER,
            exports.YESTERDAY_SYSTEM_FILTER,
            exports.TOMORROW_SYSTEM_FILTER,
            exports.NEXT_WORKING_DAY_SYSTEM_FILTER,
            exports.PREVIOUS_WORKING_DAY_SYSTEM_FILTER,
            exports.THIS_YEAR_SYSTEM_FILTER,
            exports.POSITIVE_SYSTEM_FILTER,
            exports.NEGATIVE_SYSTEM_FILTER,
            exports.ZERO_SYSTEM_FILTER,
            exports.TRUE_SYSTEM_FILTER,
            exports.FALSE_SYSTEM_FILTER,
        ];
    };
    FilterService.prototype.GetUserFilters = function (userFilters, userFilterNames) {
        return userFilters.filter(function (f) { return userFilterNames.find(function (u) { return u == f.Name; }) != null; });
    };
    FilterService.prototype.GetSystemFiltersForColumn = function (column, systemFilters) {
        var _this = this;
        var appropriateSystemFilters = [];
        if (column != null) {
            systemFilters.forEach(function (systemFilter) {
                var dataType = _this.GetDatatypeForSystemFilter(systemFilter);
                if ((dataType == Enums_1.DataType.All && column.DataType != Enums_1.DataType.Boolean) ||
                    dataType == column.DataType) {
                    appropriateSystemFilters.push(systemFilter);
                }
            });
        }
        return appropriateSystemFilters;
    };
    FilterService.prototype.GetUserFiltersForColumn = function (column, userFilters) {
        var appropriateUserFilters = [];
        if (column != null) {
            userFilters.forEach(function (userFilter) {
                if (userFilter.ColumnId == column.ColumnId) {
                    appropriateUserFilters.push(userFilter);
                }
            });
        }
        return appropriateUserFilters;
    };
    FilterService.prototype.GetNamedFiltersForColumn = function (column, namedFilters, columnCategories) {
        if (!column) {
            return [];
        }
        return namedFilters.filter(function (nf) {
            if (nf.Scope.DataType && nf.Scope.DataType === column.DataType) {
                return true;
            }
            if (nf.Scope.ColumnIds && nf.Scope.ColumnIds.includes(column.ColumnId)) {
                return true;
            }
            if (nf.Scope.ColumnCategoryIds) {
                var categoryPredicate = function (cc) {
                    return nf.Scope.ColumnCategoryIds.includes(cc.ColumnCategoryId) &&
                        cc.ColumnIds.includes(column.ColumnId);
                };
                if (columnCategories.some(categoryPredicate)) {
                    return true;
                }
            }
            return false;
        });
    };
    FilterService.prototype.ShowUserFilterForColumn = function (UserFilters, name, column) {
        var userFilter = UserFilters.find(function (f) { return f.Name == name; });
        return userFilter.ColumnId == column.ColumnId;
    };
    FilterService.prototype.GetColumnIdForUserFilter = function (userFilter) {
        // see if there are any columnvalues and then get the first only
        if (userFilter.Expression.ColumnValueExpressions != null &&
            userFilter.Expression.ColumnValueExpressions.length > 0) {
            return userFilter.Expression.ColumnValueExpressions[0].ColumnId;
        }
        // see if there are any user filter expressionss and then get the first only
        if (userFilter.Expression.FilterExpressions != null &&
            userFilter.Expression.FilterExpressions.length > 0) {
            return userFilter.Expression.FilterExpressions[0].ColumnId;
        }
        // see if there are any ranges and then get the first only
        if (userFilter.Expression.RangeExpressions != null &&
            userFilter.Expression.RangeExpressions.length > 0) {
            return userFilter.Expression.RangeExpressions[0].ColumnId;
        }
    };
    FilterService.prototype.GetFunctionForSystemFilter = function (systemFilterName) {
        var _this = this;
        switch (systemFilterName) {
            case exports.BLANKS_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (itemToCheck) {
                        return Helper_1.default.IsInputNullOrEmpty(itemToCheck);
                    },
                };
            }
            case exports.NON_BLANKS_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (itemToCheck) {
                        return Helper_1.default.IsInputNotNullOrEmpty(itemToCheck);
                    },
                };
            }
            case exports.TODAY_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (dateToCheck) {
                        var today = (function (d) { return new Date(d.setDate(d.getDate())); })(new Date());
                        return (today.setHours(0, 0, 0, 0) == new Date(dateToCheck.getTime()).setHours(0, 0, 0, 0));
                    },
                };
            }
            case exports.IN_PAST_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (dateToCheck) {
                        return +dateToCheck < Date.now();
                    },
                };
            }
            case exports.IN_FUTURE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (dateToCheck) {
                        return +dateToCheck > Date.now();
                    },
                };
            }
            case exports.YESTERDAY_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (dateToCheck) {
                        var yesterday = (function (d) { return new Date(d.setDate(d.getDate() - 1)); })(new Date());
                        return (yesterday.setHours(0, 0, 0, 0) == new Date(dateToCheck.getTime()).setHours(0, 0, 0, 0));
                    },
                };
            }
            case exports.TOMORROW_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (dateToCheck) {
                        var tomorrow = (function (d) { return new Date(d.setDate(d.getDate() + 1)); })(new Date());
                        return (tomorrow.setHours(0, 0, 0, 0) == new Date(dateToCheck.getTime()).setHours(0, 0, 0, 0));
                    },
                };
            }
            case exports.NEXT_WORKING_DAY_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (dateToCheck) {
                        return (_this.adaptable.CalendarService.GetNextWorkingDay().setHours(0, 0, 0, 0) ==
                            new Date(dateToCheck.getTime()).setHours(0, 0, 0, 0));
                    },
                };
            }
            case exports.PREVIOUS_WORKING_DAY_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (dateToCheck) {
                        return (_this.adaptable.CalendarService.GetPreviousWorkingDay().setHours(0, 0, 0, 0) ==
                            new Date(dateToCheck.getTime()).setHours(0, 0, 0, 0));
                    },
                };
            }
            case exports.THIS_YEAR_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (dateToCheck) {
                        var today = (function (d) { return new Date(d.setDate(d.getDate())); })(new Date());
                        var todayyear = today.getFullYear();
                        var datetocheckyear = dateToCheck.getFullYear();
                        return todayyear == datetocheckyear;
                    },
                };
            }
            case exports.POSITIVE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (numberToCheck) {
                        return numberToCheck > 0;
                    },
                };
            }
            case exports.NEGATIVE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (numberToCheck) {
                        return numberToCheck < 0;
                    },
                };
            }
            case exports.ZERO_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (numberToCheck) {
                        return numberToCheck == 0;
                    },
                };
            }
            case exports.TRUE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (boolToCheck) {
                        return boolToCheck;
                    },
                };
            }
            case exports.FALSE_SYSTEM_FILTER: {
                return {
                    IsExpressionSatisfied: function (boolToCheck) {
                        return !boolToCheck;
                    },
                };
            }
        }
    };
    FilterService.prototype.GetDatatypeForSystemFilter = function (systemFilterName) {
        switch (systemFilterName) {
            case exports.BLANKS_SYSTEM_FILTER:
            case exports.NON_BLANKS_SYSTEM_FILTER: {
                return Enums_1.DataType.All;
            }
            case exports.TODAY_SYSTEM_FILTER:
            case exports.IN_PAST_SYSTEM_FILTER:
            case exports.IN_FUTURE_SYSTEM_FILTER:
            case exports.YESTERDAY_SYSTEM_FILTER:
            case exports.TOMORROW_SYSTEM_FILTER:
            case exports.NEXT_WORKING_DAY_SYSTEM_FILTER:
            case exports.PREVIOUS_WORKING_DAY_SYSTEM_FILTER:
            case exports.THIS_YEAR_SYSTEM_FILTER: {
                return Enums_1.DataType.Date;
            }
            case exports.POSITIVE_SYSTEM_FILTER:
            case exports.NEGATIVE_SYSTEM_FILTER:
            case exports.ZERO_SYSTEM_FILTER: {
                return Enums_1.DataType.Number;
            }
            case exports.TRUE_SYSTEM_FILTER:
            case exports.FALSE_SYSTEM_FILTER: {
                return Enums_1.DataType.Boolean;
            }
        }
    };
    FilterService.prototype.ConvertColumnFiltersToKVPArray = function (columnFilters, columns) {
        var infoBody = [];
        columnFilters.forEach(function (x) {
            var column = ColumnHelper_1.default.getColumnFromId(x.ColumnId, columns);
            if (column) {
                var expression = ExpressionHelper_1.default.ConvertExpressionToString(x.Filter, columns, false);
                infoBody.push({
                    Key: ColumnHelper_1.default.getFriendlyNameFromColumnId(x.ColumnId, columns),
                    Value: expression,
                });
            }
        });
        return infoBody;
    };
    FilterService.prototype.GetColumnFiltersDescription = function (columnFilters, columns) {
        if (ArrayExtensions_1.default.IsNullOrEmpty(columnFilters)) {
            return 'No Column Filter Active';
        }
        var stringarr = this.ConvertColumnFiltersToKVPArray(columnFilters, columns).map(function (kvp) {
            return kvp.Key + ': ' + kvp.Value;
        });
        return stringarr.join('; ');
    };
    return FilterService;
}());
exports.FilterService = FilterService;
