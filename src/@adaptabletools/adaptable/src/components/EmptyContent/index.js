"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var join_1 = require("../utils/join");
var baseClassName = 'ab-EmptyContent';
var EmptyContent = function (_a) {
    var children = _a.children, className = _a.className, style = _a.style, flexProps = tslib_1.__rest(_a, ["children", "className", "style"]);
    if (typeof children === 'string') {
        children = React.createElement("p", null, children);
    }
    return (React.createElement(rebass_1.Flex, tslib_1.__assign({ alignItems: "center", justifyContent: "center", flexDirection: "column", padding: 4, fontSize: 'var(--ab-font-size-3)' }, flexProps, { className: join_1.default(baseClassName, className), style: tslib_1.__assign({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, style) }), children));
};
exports.default = EmptyContent;
