"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * There are two ways in which the datasource can be dropped in the wizard:
 *
 * 1. array of objects - eg: [{"lastName":"John","firstName":"Bobson"},{"lastName":"Mike","firstName":"Richardson"},...]
 * 2. array of arrays - eg: [["lastName","firstName"],["John","Bobson"],["Mike","Richardson"],...]
 *
 * Although the second one is more compact, the first one is what we need for the datasource of the grid,
 * so if we receive v2, we transform it to 1
 * @param json
 */
exports.prepareDataSource = function (json, _file) {
    if (!Array.isArray(json) || !json.length) {
        return {
            primaryKey: undefined,
            columns: [],
            data: [],
        };
    }
    var columns = [];
    var data = [];
    var primaryKey;
    if (Array.isArray(json[0])) {
        // we are in v2, as described above, so this is the list of columns
        columns = json[0];
        for (var i = 1, len = json.length; i < len; i++) {
            var it = json[i];
            var obj = {};
            for (var j = 0; j < columns.length; j++) {
                obj[columns[j]] = it[j];
            }
            data.push(obj);
        }
    }
    else {
        columns = Object.keys(json[0]);
        data = json;
    }
    primaryKey = columns[0];
    return {
        primaryKey: primaryKey,
        columns: columns,
        data: data,
    };
};
var typeToColType = {
    string: 'abColDefString',
    number: 'abColDefNumber',
    boolean: 'abColDefBoolean',
    date: 'abColDefDate',
};
var abColDefNumberArray = 'abColDefNumberArray';
exports.getColTypeFromValue = function (value) {
    var dataType = typeof value;
    var columnType = typeToColType[dataType] || typeToColType.string;
    if (value instanceof Date) {
        columnType = typeToColType.date;
    }
    if (Array.isArray(value) && value.length && typeof value[0] === 'number') {
        columnType = abColDefNumberArray;
    }
    return columnType;
};
exports.prepareGridOptions = function (dataSourceInfo) {
    var firstItem = dataSourceInfo.data[0];
    var columnDefs = dataSourceInfo.columns.map(function (columnName) {
        var firstItemValue = firstItem[columnName];
        var columnType = exports.getColTypeFromValue(firstItemValue);
        return {
            headerName: columnName,
            field: columnName,
            type: columnType,
            filter: true,
            sortable: true,
            resizable: true,
            editable: true,
        };
    });
    var gridOptions = {
        rowData: dataSourceInfo.data,
        columnDefs: columnDefs,
        floatingFilter: true,
        enableRangeSelection: true,
        rowSelection: 'multiple',
        rowHeight: 30,
        columnTypes: {
            abColDefNumber: {},
            abColDefString: {},
            abColDefBoolean: {},
            abColDefDate: {},
            abColDefNumberArray: {},
            abColDefObject: {},
        },
    };
    return gridOptions;
};
