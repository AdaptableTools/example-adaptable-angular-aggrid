"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var useSelection = function (columns, defaultValue, fieldName, changeListeners) {
    changeListeners = changeListeners || {};
    var onChange = changeListeners.onChange || (function (column, flag) { });
    var onBatchChange = changeListeners.onBatchChange || (function (flag) { });
    var _a = tslib_1.__read(react_1.useState(columns.reduce(function (acc, col) {
        acc[col.field] = fieldName ? col[fieldName] : defaultValue;
        return acc;
    }, {})), 2), selected = _a[0], setSelected = _a[1];
    var getColumn = function (field) { return columns.filter(function (c) { return c.field === field; })[0]; };
    var result = {
        selected: selected,
        isSelected: function (field) { return !!selected[field]; },
        isAllSelected: function () { return Object.keys(selected).length === columns.length; },
        isNoneSelected: function () { return Object.keys(selected).length === 0; },
        selectColumn: function (field) {
            var _a;
            if (!selected[field]) {
                setSelected(tslib_1.__assign(tslib_1.__assign({}, selected), (_a = {}, _a[field] = true, _a)));
                onChange(getColumn(field), true);
            }
        },
        deselectColumn: function (field) {
            if (selected[field]) {
                var newSelected = tslib_1.__assign({}, selected);
                delete newSelected[field];
                setSelected(newSelected);
                onChange(getColumn(field), false);
            }
        },
        toggleColumn: function (field) {
            if (result.isSelected(field)) {
                result.deselectColumn(field);
            }
            else {
                result.selectColumn(field);
            }
        },
        deselectAll: function () {
            setSelected({});
            columns.forEach(function (col) {
                onChange(col, false);
            });
            onBatchChange(false);
        },
        selectAll: function () {
            setSelected(columns.reduce(function (acc, col) {
                acc[col.field] = true;
                return acc;
            }, {}));
            onBatchChange(true);
        },
    };
    return result;
};
exports.default = useSelection;
