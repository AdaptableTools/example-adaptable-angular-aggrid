"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getAvailableSizeInfo = function (_a) {
    var targetRect = _a.targetRect, constrainRect = _a.constrainRect, maxSizeOffset = _a.maxSizeOffset;
    var maxHeight;
    var maxWidth;
    var topAvailableSpace = Math.round(targetRect.top - constrainRect.top);
    var leftAvailableSpace = Math.round(targetRect.left - constrainRect.left);
    var bottomAvailableSpace = Math.round(constrainRect.bottom - targetRect.bottom);
    var rightAvailableSpace = Math.round(constrainRect.right - targetRect.right);
    var horizontalPosition = 'right';
    var verticalPosition = 'bottom';
    if (leftAvailableSpace > rightAvailableSpace) {
        horizontalPosition = 'left';
        maxWidth = Math.round(targetRect.left - constrainRect.left);
    }
    else {
        maxWidth = rightAvailableSpace;
    }
    if (topAvailableSpace > bottomAvailableSpace) {
        verticalPosition = 'top';
        maxHeight = Math.round(targetRect.top - constrainRect.top);
    }
    else {
        maxHeight = bottomAvailableSpace;
    }
    if (maxSizeOffset != null) {
        maxWidth -= maxSizeOffset;
        maxHeight -= maxSizeOffset;
    }
    return {
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
    };
};
exports.default = getAvailableSizeInfo;
