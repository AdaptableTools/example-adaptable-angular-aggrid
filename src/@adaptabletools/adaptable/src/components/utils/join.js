"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var join = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.filter(function (x) { return !!x; }).join(' ');
};
exports.default = join;
