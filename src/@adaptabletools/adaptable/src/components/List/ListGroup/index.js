"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var join_1 = require("../../utils/join");
var rebass_1 = require("rebass");
var baseClassName = 'ab-ListGroup';
var ListGroup = function (props) {
    var className = props.className, domProps = tslib_1.__rest(props, ["className"]);
    return React.createElement(rebass_1.Box, tslib_1.__assign({}, domProps, { className: join_1.default(className, baseClassName) }));
};
exports.default = ListGroup;
