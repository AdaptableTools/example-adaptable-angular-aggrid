"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matches_1 = require("./matches");
exports.default = (function (selector, node) {
    if (!node) {
        return null;
    }
    while ((node = node.parentElement)) {
        if (matches_1.default.call(node, selector)) {
            return node;
        }
    }
    return null;
});
