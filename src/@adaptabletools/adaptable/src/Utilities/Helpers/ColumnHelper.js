"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var LoggingHelper_1 = require("./LoggingHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var StringExtensions_1 = require("../Extensions/StringExtensions");
// Single place for all column mapping functions so can be dealt with consistetly re error handling
function isSpecialColumn(columnId) {
    return columnId == 'ag-Grid-AutoColumn';
}
exports.isSpecialColumn = isSpecialColumn;
function isNumericColumn(column) {
    return column.DataType == Enums_1.DataType.Number;
}
exports.isNumericColumn = isNumericColumn;
function getColumnDataTypeFromColumnId(columnId, columns) {
    return columns.find(function (c) { return c.ColumnId == columnId; }).DataType;
}
exports.getColumnDataTypeFromColumnId = getColumnDataTypeFromColumnId;
function getFriendlyNameFromColumn(columnId, column) {
    if (columnId.includes(GeneralConstants.MISSING_COLUMN)) {
        return columnId;
    }
    if (column) {
        return column.FriendlyName;
    }
    LogMissingColumnWarning(columnId);
    return columnId + GeneralConstants.MISSING_COLUMN;
}
exports.getFriendlyNameFromColumn = getFriendlyNameFromColumn;
function getFriendlyNameFromColumnId(columnId, columns) {
    var foundColumn = columns.find(function (c) { return c.ColumnId == columnId; });
    if (foundColumn) {
        return getFriendlyNameFromColumn(columnId, foundColumn);
    }
    LogMissingColumnWarning(columnId);
    return columnId + GeneralConstants.MISSING_COLUMN;
}
exports.getFriendlyNameFromColumnId = getFriendlyNameFromColumnId;
function getFriendlyNamesFromColumnIds(columnIds, columns) {
    var friendlyNames = [];
    if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(columnIds)) {
        return friendlyNames;
    }
    columnIds.forEach(function (c) {
        friendlyNames.push(getFriendlyNameFromColumnId(c, columns));
    });
    return friendlyNames;
}
exports.getFriendlyNamesFromColumnIds = getFriendlyNamesFromColumnIds;
function getColumnIdFromFriendlyName(friendlyName, columns) {
    if (friendlyName.includes(GeneralConstants.MISSING_COLUMN)) {
        return friendlyName.replace(GeneralConstants.MISSING_COLUMN, ''); // Ids should stay "pure"
    }
    var foundColumn = columns.find(function (c) { return c.FriendlyName == friendlyName; });
    if (foundColumn) {
        return foundColumn.ColumnId;
    }
    LogMissingColumnWarning(friendlyName);
    return friendlyName + GeneralConstants.MISSING_COLUMN;
}
exports.getColumnIdFromFriendlyName = getColumnIdFromFriendlyName;
function getColumnIdsFromFriendlyNames(friendlyNames, columns) {
    var columnIds = [];
    if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(friendlyNames)) {
        return columnIds;
    }
    friendlyNames.forEach(function (c) {
        columnIds.push(getColumnIdFromFriendlyName(c, columns));
    });
    return columnIds;
}
exports.getColumnIdsFromFriendlyNames = getColumnIdsFromFriendlyNames;
function getColumnsFromFriendlyNames(friendlyNames, columns) {
    // not sure if this is right as might ignore bad cols
    return friendlyNames.map(function (friendlyName) { return columns.find(function (x) { return x.FriendlyName == friendlyName; }); });
}
exports.getColumnsFromFriendlyNames = getColumnsFromFriendlyNames;
function getColumnFromId(columnId, columns, logWarning) {
    if (logWarning === void 0) { logWarning = true; }
    // just return null if no columns rather than logging a warning - otherwise get lots at startup
    if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(columns)) {
        return null;
    }
    var foundColumn = columns.find(function (c) { return c.ColumnId == columnId; });
    if (foundColumn) {
        return foundColumn;
    }
    if (logWarning) {
        LogMissingColumnWarning(columnId);
    }
    return null;
}
exports.getColumnFromId = getColumnFromId;
function getColumnFromFriendlyName(columnName, columns, logWarning) {
    if (logWarning === void 0) { logWarning = true; }
    // just return null if no columns rather than logging a warning - otherwise get lots at startup
    if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(columns)) {
        return null;
    }
    var foundColumn = columns.find(function (c) { return c.FriendlyName == columnName; });
    if (foundColumn) {
        return foundColumn;
    }
    if (logWarning) {
        LogMissingColumnWarning(columnName);
    }
    return null;
}
exports.getColumnFromFriendlyName = getColumnFromFriendlyName;
function getColumnsOfType(columns, dataType) {
    switch (dataType) {
        case Enums_1.DataType.All:
            return columns;
        case Enums_1.DataType.Boolean:
            return getBooleanColumns(columns);
        case Enums_1.DataType.Date:
            return getDateColumns(columns);
        case Enums_1.DataType.Number:
            return getNumericColumns(columns);
        case Enums_1.DataType.NumberArray:
            return getNumericArrayColumns(columns);
        case Enums_1.DataType.String:
            return getStringColumns(columns);
        default:
            return columns;
    }
}
exports.getColumnsOfType = getColumnsOfType;
function getNumericColumns(columns) {
    return columns.filter(function (c) { return c.DataType == Enums_1.DataType.Number; });
}
exports.getNumericColumns = getNumericColumns;
function getNumericArrayColumns(columns) {
    return columns.filter(function (c) { return c.DataType == Enums_1.DataType.NumberArray; });
}
exports.getNumericArrayColumns = getNumericArrayColumns;
function getStringColumns(columns) {
    return columns.filter(function (c) { return c.DataType == Enums_1.DataType.String; });
}
exports.getStringColumns = getStringColumns;
function getDateColumns(columns) {
    return columns.filter(function (c) { return c.DataType == Enums_1.DataType.Date; });
}
exports.getDateColumns = getDateColumns;
function getBooleanColumns(columns) {
    return columns.filter(function (c) { return c.DataType == Enums_1.DataType.Boolean; });
}
exports.getBooleanColumns = getBooleanColumns;
function getColumnCategoryFromColumnCategories(columnId, ColumnCategoryns) {
    var returnValue = '';
    ColumnCategoryns.forEach(function (c) {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(returnValue)) {
            var column = c.ColumnIds.find(function (col) { return col == columnId; });
            if (column) {
                returnValue = c.ColumnCategoryId;
            }
        }
    });
    return returnValue;
}
exports.getColumnCategoryFromColumnCategories = getColumnCategoryFromColumnCategories;
function getSortableColumns(columns) {
    return columns.filter(function (c) { return c.Sortable; });
}
exports.getSortableColumns = getSortableColumns;
function getGroupableColumns(columns) {
    return columns.filter(function (c) { return c.Groupable; });
}
exports.getGroupableColumns = getGroupableColumns;
function getPivotableColumns(columns) {
    return columns.filter(function (c) { return c.Pivotable; });
}
exports.getPivotableColumns = getPivotableColumns;
function getAggregetableColumns(columns) {
    return columns.filter(function (c) { return c.Aggregatable; }).filter(function (c) { return c.DataType == Enums_1.DataType.Number; });
}
exports.getAggregetableColumns = getAggregetableColumns;
function LogMissingColumnWarning(columnId) {
    if (!isSpecialColumn(columnId)) {
        LoggingHelper_1.LoggingHelper.LogAdaptableWarning("No column found named '" + columnId + "'");
    }
}
exports.ColumnHelper = {
    isSpecialColumn: isSpecialColumn,
    isNumericColumn: isNumericColumn,
    getColumnDataTypeFromColumnId: getColumnDataTypeFromColumnId,
    getFriendlyNameFromColumn: getFriendlyNameFromColumn,
    getFriendlyNameFromColumnId: getFriendlyNameFromColumnId,
    getFriendlyNamesFromColumnIds: getFriendlyNamesFromColumnIds,
    getColumnsFromFriendlyNames: getColumnsFromFriendlyNames,
    getColumnFromId: getColumnFromId,
    getColumnFromFriendlyName: getColumnFromFriendlyName,
    getColumnsOfType: getColumnsOfType,
    getNumericColumns: getNumericColumns,
    getNumericArrayColumns: getNumericArrayColumns,
    getStringColumns: getStringColumns,
    getDateColumns: getDateColumns,
    getBooleanColumns: getBooleanColumns,
    getColumnCategoryFromColumnCategories: getColumnCategoryFromColumnCategories,
    getSortableColumns: getSortableColumns,
    getGroupableColumns: getGroupableColumns,
    getPivotableColumns: getPivotableColumns,
    getAggregetableColumns: getAggregetableColumns,
    getColumnIdFromFriendlyName: getColumnIdFromFriendlyName,
    getColumnIdsFromFriendlyNames: getColumnIdsFromFriendlyNames,
};
exports.default = exports.ColumnHelper;
