"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var OverlayTrigger_1 = require("../OverlayTrigger");
var Tooltip = function (_a) {
    var label = _a.label, children = _a.children;
    return (React.createElement(OverlayTrigger_1.default, { defaultZIndex: 2000000, className: "ab-Tooltip", render: function () { return label; } }, children));
};
exports.default = Tooltip;
