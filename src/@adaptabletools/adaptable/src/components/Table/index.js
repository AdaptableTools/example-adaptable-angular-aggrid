"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var join_1 = require("../utils/join");
var Table = function (props) {
    return React.createElement("table", tslib_1.__assign({}, props, { className: join_1.default(props.className, 'ab-Table') }));
};
exports.default = Table;
