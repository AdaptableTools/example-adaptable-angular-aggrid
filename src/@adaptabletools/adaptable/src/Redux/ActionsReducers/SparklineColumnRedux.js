"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.SPARKLINE_COLUMNS_SET = 'SPARKLINE_COLUMNS_SET';
exports.SPARKLINE_COLUMNS_ADD = 'SPARKLINE_COLUMNS_ADD';
exports.SPARKLINE_COLUMNS_EDIT = 'SPARKLINE_COLUMNS_EDIT';
exports.SPARKLINE_COLUMNS_DELETE = 'SPARKLINE_COLUMNS_DELETE';
exports.SparklineColumnsSet = function (Columns) { return ({
    type: exports.SPARKLINE_COLUMNS_SET,
    Columns: Columns,
}); };
exports.SparklineColumnsAdd = function (sparklineColumn) { return ({
    type: exports.SPARKLINE_COLUMNS_ADD,
    sparklineColumn: sparklineColumn,
}); };
exports.SparklineColumnsEdit = function (sparklineColumn) { return ({
    type: exports.SPARKLINE_COLUMNS_EDIT,
    sparklineColumn: sparklineColumn,
}); };
exports.SparklineColumnsDelete = function (sparklineColumn) { return ({
    type: exports.SPARKLINE_COLUMNS_DELETE,
    sparklineColumn: sparklineColumn,
}); };
var initialFilterState = {
    SparklineColumns: GeneralConstants_1.EMPTY_ARRAY,
};
exports.SparklineColumnReducer = function (state, action) {
    if (state === void 0) { state = initialFilterState; }
    var sparklineColumns;
    switch (action.type) {
        case exports.SPARKLINE_COLUMNS_SET:
            return Object.assign({}, state, {
                Columns: action.Columns,
            });
        case exports.SPARKLINE_COLUMNS_ADD: {
            var actionSparklineColumn = action
                .sparklineColumn;
            if (!actionSparklineColumn.Uuid) {
                actionSparklineColumn.Uuid = Uuid_1.createUuid();
            }
            sparklineColumns = [].concat(state.SparklineColumns);
            sparklineColumns.push(actionSparklineColumn);
            return tslib_1.__assign(tslib_1.__assign({}, state), { SparklineColumns: sparklineColumns });
        }
        case exports.SPARKLINE_COLUMNS_EDIT: {
            var actionSparklineColumn_1 = action
                .sparklineColumn;
            return tslib_1.__assign(tslib_1.__assign({}, state), { SparklineColumns: state.SparklineColumns.map(function (abObject) {
                    return abObject.Uuid === actionSparklineColumn_1.Uuid ? actionSparklineColumn_1 : abObject;
                }) });
        }
        case exports.SPARKLINE_COLUMNS_DELETE: {
            var actionSparklineColumn_2 = action
                .sparklineColumn;
            return tslib_1.__assign(tslib_1.__assign({}, state), { SparklineColumns: state.SparklineColumns.filter(function (abObject) { return abObject.Uuid !== actionSparklineColumn_2.Uuid; }) });
        }
        default:
            return state;
    }
};
