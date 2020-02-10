"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var defaultStyle = {
    height: '100%',
    maxHeight: '90vh',
    width: '70vw',
    maxWidth: 800,
};
var FlexWithFooter = function (props) {
    var footer = props.footer, footerProps = props.footerProps, children = props.children, style = props.style, domProps = tslib_1.__rest(props, ["footer", "footerProps", "children", "style"]);
    return (React.createElement(rebass_1.Flex, tslib_1.__assign({ flexDirection: "column" }, domProps, { style: tslib_1.__assign(tslib_1.__assign({}, defaultStyle), style) }),
        React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 0, flex: 1 },
            React.createElement(rebass_1.Flex, { flexDirection: "column", flex: 1 }, children)),
        footer ? (React.createElement(rebass_1.Flex, tslib_1.__assign({ padding: 2, backgroundColor: "primary" }, footerProps), footer)) : null));
};
exports.default = FlexWithFooter;
