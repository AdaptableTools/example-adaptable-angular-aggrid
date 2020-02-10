"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var lodash_1 = require("lodash");
exports.default = (function (_a) {
    var domProps = _a.domProps, item = _a.item, onItemClick = _a.onItemClick, index = _a.index, columns = _a.columns, className = _a.className, idProperty = _a.idProperty, style = _a.style;
    var key = item[idProperty] || index;
    if (!lodash_1.isPlainObject(item)) {
        return (React.createElement("tr", tslib_1.__assign({ onClick: onItemClick, key: key, className: className }, domProps),
            React.createElement("td", { colSpan: columns.length, style: style }, item)));
    }
    return (React.createElement("tr", tslib_1.__assign({ onClick: onItemClick, key: key, className: className }, domProps), columns.map(function (col) {
        return (React.createElement("td", { key: col, style: style }, item[col]));
    })));
});
