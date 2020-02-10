"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var DefaultIcon_1 = require("./DefaultIcon");
exports.default = (function (props) { return (React.createElement(DefaultIcon_1.default, tslib_1.__assign({}, props),
    React.createElement("defs", null,
        React.createElement("path", { id: "a", d: "M0 0h24v24H0V0z" })),
    React.createElement("clipPath", { id: "b" },
        React.createElement("use", { xlinkHref: "#a", overflow: "visible" })),
    React.createElement("path", { d: "M4 9h16v2H4zm0 4h10v2H4z", clipPath: "url(#b)" }))); });
