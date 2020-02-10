'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var proto = Element.prototype;
var nativeMatches = proto.matches ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector ||
    proto.webkitMatchesSelector;
exports.default = nativeMatches;
