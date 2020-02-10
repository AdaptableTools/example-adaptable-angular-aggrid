"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_dom_1 = require("react-dom");
var BatchUpdate = function (fn) {
    var fns = [];
    if (fn) {
        fns.push(fn);
    }
    var didCommit = false;
    var queue = function (fn) {
        fns.push(fn);
    };
    queue.commit = function (lastFn) {
        if (didCommit) {
            return;
        }
        if (lastFn) {
            fns.push(lastFn);
        }
        react_dom_1.unstable_batchedUpdates(function () {
            fns.forEach(function (fn) { return fn(); });
            fns = undefined;
        });
    };
    return queue;
};
exports.default = BatchUpdate;
