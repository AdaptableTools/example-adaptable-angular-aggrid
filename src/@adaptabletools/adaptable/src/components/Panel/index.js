"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var join_1 = require("../utils/join");
exports.baseClassName = 'ab-Panel';
var Header = function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? 'default' : _b, headerProps = tslib_1.__rest(_a, ["children", "variant"]);
    if (!children) {
        return null;
    }
    var style = {};
    return (React.createElement(rebass_1.Flex, tslib_1.__assign({ flexDirection: "row", alignItems: "center" }, headerProps, { style: tslib_1.__assign(tslib_1.__assign({}, style), headerProps.style), className: join_1.default(exports.baseClassName + "__header", exports.baseClassName + "__header--variant-" + variant) }), children));
};
var Body = function (_a) {
    var children = _a.children, bodyScroll = _a.bodyScroll, bodyProps = tslib_1.__rest(_a, ["children", "bodyScroll"]);
    if (!children) {
        return null;
    }
    if (bodyScroll === true) {
        bodyScroll = 'auto';
    }
    return (React.createElement(rebass_1.Box, tslib_1.__assign({}, bodyProps, { className: join_1.default(exports.baseClassName + "__body", bodyScroll ? exports.baseClassName + "__body--scroll-" + bodyScroll : null) }), children));
};
var Panel = function (props) {
    var borderRadius = props.borderRadius, border = props.border, className = props.className, header = props.header, children = props.children, headerProps = props.headerProps, bodyProps = props.bodyProps, bodyScroll = props.bodyScroll, _a = props.variant, variant = _a === void 0 ? 'default' : _a, boxProps = tslib_1.__rest(props, ["borderRadius", "border", "className", "header", "children", "headerProps", "bodyProps", "bodyScroll", "variant"]);
    var style = {};
    if (borderRadius !== undefined) {
        style['--ab-cmp-panel__border-radius'] = borderRadius;
    }
    var headerStyle = tslib_1.__assign({ border: border }, (headerProps ? headerProps.style : null));
    var bodyStyle = tslib_1.__assign({ border: border }, (bodyProps ? bodyProps.style : null));
    return (React.createElement(rebass_1.Box, tslib_1.__assign({}, boxProps, { style: tslib_1.__assign(tslib_1.__assign({}, style), boxProps.style), className: join_1.default(className, exports.baseClassName, exports.baseClassName + "--variant-" + variant, !header ? exports.baseClassName + "--no-header" : exports.baseClassName + "--with-header") }),
        React.createElement(Header, tslib_1.__assign({}, headerProps, { style: headerStyle, variant: variant }), header),
        React.createElement(Body, tslib_1.__assign({}, bodyProps, { style: bodyStyle, bodyScroll: bodyScroll }), children)));
};
exports.default = Panel;
