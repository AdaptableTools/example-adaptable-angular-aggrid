"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Panel_1 = require("../Panel");
var join_1 = require("../utils/join");
var WizardPanel = function (props) {
    return (React.createElement(Panel_1.default, tslib_1.__assign({ border: "none", borderRadius: "none", variant: "primary", bodyScroll: true }, props, { className: join_1.default(props.className, 'ab-WizardPanel'), style: tslib_1.__assign({ height: '100%' }, props.style) })));
};
exports.default = WizardPanel;
