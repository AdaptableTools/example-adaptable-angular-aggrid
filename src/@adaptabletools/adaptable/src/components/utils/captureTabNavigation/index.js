"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getFocusableChildren_1 = require("./getFocusableChildren");
var emptyObject = {};
exports.default = (function (node, event, config) {
    config = config || emptyObject;
    var key = event.key, target = event.target, shiftKey = event.shiftKey;
    if (key != 'Tab') {
        return;
    }
    var focusableChildren = (config.getFocusableChildren || getFocusableChildren_1.default)(node);
    var last = focusableChildren[focusableChildren.length - 1];
    var first = focusableChildren[0];
    if (target === first && first && shiftKey) {
        event.preventDefault();
        if (last && last.focus) {
            last.focus();
        }
        return true;
    }
    if (target === last && last && !shiftKey) {
        event.preventDefault();
        if (first && first.focus) {
            first.focus();
        }
        return true;
    }
});
