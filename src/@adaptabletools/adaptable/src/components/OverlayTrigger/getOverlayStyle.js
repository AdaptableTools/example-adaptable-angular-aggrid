"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getAvailableSizeInfo_1 = require("../utils/getAvailableSizeInfo");
var globalObject = typeof globalThis !== 'undefined' ? globalThis : window;
var getWindowSize = function () { return ({
    width: globalObject.innerWidth,
    height: globalObject.innerHeight,
}); };
var getOverlayStyle = function (_a) {
    var targetRect = _a.targetRect, constrainRect = _a.constrainRect, anchor = _a.anchor, targetOffset = _a.targetOffset;
    var sizeInfo = getAvailableSizeInfo_1.default({ targetRect: targetRect, constrainRect: constrainRect });
    var overlayStyle = {
        maxWidth: sizeInfo.maxWidth,
        maxHeight: sizeInfo.maxHeight,
        position: 'absolute',
    };
    var offset = targetOffset || 0;
    var windowSize = getWindowSize();
    if (anchor === 'horizontal') {
        if (sizeInfo.horizontalPosition === 'left') {
            overlayStyle.right = windowSize.width - targetRect.left + offset;
            overlayStyle.right -= globalObject.scrollX;
        }
        else {
            overlayStyle.left = targetRect.right + offset;
            overlayStyle.left += globalObject.scrollX;
        }
        overlayStyle.top = targetRect.top + targetRect.height / 2 + +globalObject.scrollY;
        overlayStyle.transform = 'translate3d(0px, -50%, 0px)';
        delete overlayStyle.maxHeight;
    }
    else {
        if (sizeInfo.verticalPosition === 'top') {
            overlayStyle.bottom = windowSize.height - targetRect.top + offset;
            overlayStyle.bottom -= globalObject.scrollY;
        }
        else {
            overlayStyle.top = targetRect.bottom + offset;
            overlayStyle.top += globalObject.scrollY;
        }
        overlayStyle.left = targetRect.left + targetRect.width / 2 + globalObject.scrollX;
        overlayStyle.transform = 'translate3d(-50%, 0px, 0px)';
        delete overlayStyle.maxWidth;
    }
    return overlayStyle;
};
exports.default = getOverlayStyle;
