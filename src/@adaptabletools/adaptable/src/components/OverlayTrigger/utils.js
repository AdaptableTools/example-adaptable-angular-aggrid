"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRect = function (node) {
    var rect = node.getBoundingClientRect();
    return {
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
        width: rect.width,
        height: rect.height,
    };
};
exports.getDocRect = function () {
    var docRect = {
        width: window.innerWidth,
        right: window.innerWidth,
        height: window.innerHeight,
        bottom: window.innerHeight,
        left: 0,
        top: 0,
    };
    return docRect;
};
exports.getIntersection = function (rect1, rect2) {
    var left = Math.max(rect1.left, rect2.left);
    var top = Math.max(rect1.top, rect2.top);
    var right = Math.min(rect1.right, rect2.right);
    var bottom = Math.min(rect1.bottom, rect2.bottom);
    var width = right - left;
    var height = bottom - top;
    return {
        top: top,
        left: left,
        bottom: bottom,
        right: right,
        width: width,
        height: height,
    };
};
