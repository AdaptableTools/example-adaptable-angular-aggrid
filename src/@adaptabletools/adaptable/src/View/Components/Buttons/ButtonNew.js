"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var SimpleButton_1 = require("../../../components/SimpleButton");
exports.ButtonNew = function (props) {
    return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "New", tone: "accent", icon: "plus", variant: "raised" }, props), props.children === undefined ? 'New' : props.children));
};
