"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var selector = ['input', 'textarea', 'select', '[tabindex]', 'a[href]', 'button', 'object'].join(', ');
exports.default = (function (node) {
    var children = tslib_1.__spread(node.querySelectorAll(selector));
    // ensure they are all in the dom
    return children.filter(function (child) { return child.offsetParent; });
});
