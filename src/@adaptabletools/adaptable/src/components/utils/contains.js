"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOCUMENT_POSITION_CONTAINED_BY = 16;
function contains(container, elem) {
    if (container === elem) {
        return true;
    }
    if (container.contains) {
        return container.contains(elem);
    }
    var comparison = container.compareDocumentPosition(elem);
    return comparison === 0 || comparison & DOCUMENT_POSITION_CONTAINED_BY;
}
exports.default = contains;
