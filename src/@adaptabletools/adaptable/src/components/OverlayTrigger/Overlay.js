"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var batchUpdate_1 = require("../utils/batchUpdate");
var usePrevious_1 = require("../utils/usePrevious");
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
exports.useRefresh = function () {
    var _a = tslib_1.__read(react_1.useState(0), 2), x = _a[0], update = _a[1];
    return function () {
        update(x + 1);
    };
};
var translateToValues = function (x) {
    return x
        .split('(')[1]
        .split(')')[0]
        .split(',')
        .map(function (s) { return s.trim(); });
};
var Overlay = function (props) {
    var visible = props.visible, getConstrainRect = props.getConstrainRect, anchor = props.anchor, position = props.position, domProps = tslib_1.__rest(props, ["visible", "getConstrainRect", "anchor", "position"]);
    var domRef = react_1.useRef(null);
    var _a = tslib_1.__read(react_1.useState(0), 2), opacity = _a[0], setOpacity = _a[1];
    var transitionInProgressRef = react_1.useRef(false);
    var prevVisible = usePrevious_1.default(visible, visible);
    var prevOpacity = usePrevious_1.default(opacity, opacity);
    var refresh = exports.useRefresh();
    react_1.useEffect(function () {
        batchUpdate_1.default(function () {
            transitionInProgressRef.current = true;
            setOpacity(props.visible ? 1 : 0);
        }).commit();
    }, [visible]);
    react_1.useLayoutEffect(function () {
        if (!visible) {
            return;
        }
        var constrainRect = getConstrainRect();
        var domNode = domRef.current;
        var thisRect = utils_1.getRect(domNode);
        var intersection = utils_1.getIntersection(constrainRect, thisRect);
        if (!lodash_1.isEqual(intersection, thisRect)) {
            var transform = props.style
                ? props.style.transform || 'translate3d(0px, 0px, 0px)'
                : 'translate3d(0px, 0px, 0px)';
            var horizontalDiff = Math.round(thisRect.left < constrainRect.left
                ? constrainRect.left - thisRect.left
                : thisRect.right > constrainRect.right
                    ? constrainRect.right - thisRect.right
                    : 0);
            var verticalDiff = Math.round(thisRect.top < constrainRect.top
                ? constrainRect.top - thisRect.top
                : thisRect.bottom > constrainRect.bottom
                    ? constrainRect.bottom - thisRect.bottom
                    : 0);
            var values = translateToValues(transform);
            if (horizontalDiff) {
                values[0] = "calc(" + values[0] + " + " + horizontalDiff + "px)";
            }
            if (verticalDiff) {
                values[1] = "calc(" + values[1] + " + " + verticalDiff + "px)";
            }
            domNode.style.transform = "translate3d(" + values.join(', ') + ")";
        }
    }, [visible]);
    if (prevVisible && !visible) {
        transitionInProgressRef.current = true;
    }
    var onTransitionEnd = function () {
        transitionInProgressRef.current = false;
        refresh();
    };
    var renderTime = Date.now();
    var renderTimeRef = react_1.useRef(renderTime);
    renderTimeRef.current = renderTime;
    react_1.useEffect(function () {
        var timeoutId;
        if (prevOpacity && !opacity) {
            timeoutId = setTimeout(function () {
                if (renderTimeRef.current != renderTime) {
                    //we had other renders, so dont do anything - bail out
                    return;
                }
                if (!visible) {
                    onTransitionEnd();
                }
            }, 1500);
        }
        return function () {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [opacity, prevOpacity, renderTime]);
    var transitionInProgress = transitionInProgressRef.current;
    if (!visible && !transitionInProgress) {
        return null;
    }
    return (React.createElement("div", tslib_1.__assign({}, domProps, { ref: domRef, style: tslib_1.__assign(tslib_1.__assign({}, props.style), { opacity: opacity }), onTransitionEnd: onTransitionEnd })));
};
exports.default = Overlay;
