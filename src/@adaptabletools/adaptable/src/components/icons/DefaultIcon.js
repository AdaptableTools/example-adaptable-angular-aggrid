"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var join_1 = require("../utils/join");
var HUNDRED_PERCENT_SIZE = 24;
var DEFAULT_SIZE = 20;
exports.getSize = function (size) { return Math.round(size * (DEFAULT_SIZE / HUNDRED_PERCENT_SIZE)); };
exports.default = (function (_a) {
    var children = _a.children, _b = _a.size, size = _b === void 0 ? DEFAULT_SIZE : _b, name = _a.name, props = tslib_1.__rest(_a, ["children", "size", "name"]);
    size = exports.getSize(size);
    return (React.createElement("svg", tslib_1.__assign({ width: size, height: size, viewBox: "0 0 24 24" }, props, { className: join_1.default(props.className, "ab-Icon ab-Icon--" + name), style: tslib_1.__assign({ verticalAlign: 'middle' }, props.style) }), children));
});
