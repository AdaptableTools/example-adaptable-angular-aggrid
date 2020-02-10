"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var react_1 = require("react");
var lodash_1 = require("lodash");
var join_1 = require("../utils/join");
var FormLayoutContext = react_1.createContext(null);
var defaultColumns = {
    label: {
        className: 'ab-FormLayout_column--label',
        style: {
            textAlign: 'end',
        },
    },
};
var PLACEHOLDER = React.createElement("div", null);
var FormLayout = function (props) {
    var _a = props.placeholder, placeholder = _a === void 0 ? PLACEHOLDER : _a, _b = props.columns, columns = _b === void 0 ? ['label', 'children'] : _b, _c = props.defaultComponent, defaultComponent = _c === void 0 ? rebass_1.Box : _c, _d = props.sizes, sizes = _d === void 0 ? ['auto', '1fr'] : _d, _e = props.gridColumnGap, gridColumnGap = _e === void 0 ? 'var(--ab-space-2)' : _e, _f = props.gridRowGap, gridRowGap = _f === void 0 ? 'var(--ab-space-2)' : _f, style = props.style, _g = props.childrenToColumns, childrenToColumns = _g === void 0 ? true : _g, boxProps = tslib_1.__rest(props, ["placeholder", "columns", "defaultComponent", "sizes", "gridColumnGap", "gridRowGap", "style", "childrenToColumns"]);
    columns = columns.map(function (c) {
        if (typeof c === 'string' || typeof c === 'number') {
            c = {
                name: "" + c,
            };
        }
        if (defaultColumns[c.name]) {
            c = lodash_1.merge({}, defaultColumns[c.name], c);
        }
        c.component = c.component === undefined ? defaultComponent : c.component;
        return c;
    });
    var formStyle = {
        gridTemplateColumns: columns
            .map(function (column, i) {
            if (column.size) {
                return "" + column.size;
            }
            if (sizes[i] !== undefined) {
                return "" + sizes[i];
            }
            return 'auto';
        })
            .join(' '),
        gridRowGap: gridRowGap,
        gridColumnGap: gridColumnGap,
        rowGap: gridRowGap,
        columnGap: gridColumnGap,
    };
    return (React.createElement(FormLayoutContext.Provider, { value: {
            columns: columns,
            currentRow: 0,
            childrenToColumns: childrenToColumns,
        } },
        React.createElement(rebass_1.Box, tslib_1.__assign({}, boxProps, { className: join_1.default(boxProps.className, 'ab-FormLayout'), style: tslib_1.__assign(tslib_1.__assign({}, style), formStyle) }))));
};
exports.FormRow = function (props) {
    var ctx = react_1.useContext(FormLayoutContext);
    var columns = ctx.columns, placeholder = ctx.placeholder, childrenToColumns = ctx.childrenToColumns;
    var rowIndex = ctx.currentRow;
    ctx.currentRow++;
    var children = React.Children.toArray(props.children);
    var columnValues = columns.map(function (column, columnIndex) {
        var columnName = column.name;
        var item = props[columnName];
        if (item === undefined && childrenToColumns) {
            item = children.shift();
        }
        var value = item;
        if (item == null) {
            value = placeholder;
        }
        if (column.component != null) {
            var Cmp = column.component;
            value = (React.createElement(Cmp, { style: tslib_1.__assign(tslib_1.__assign({}, column.style), { gridColumn: columnIndex + 1, gridRow: rowIndex + 1 }), className: column.className }, value));
        }
        return typeof value === 'string' ? value : React.cloneElement(value, { key: columnName });
    });
    return React.createElement(React.Fragment, null, columnValues);
};
exports.default = FormLayout;
