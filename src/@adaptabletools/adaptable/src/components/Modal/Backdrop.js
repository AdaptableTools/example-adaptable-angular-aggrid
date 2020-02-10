"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_dom_1 = require("react-dom");
var react_1 = require("react");
exports.baseClassName = 'ab-Modal';
var Backdrop = function (props) {
    var uuid = props.uuid, timestamp = props.timestamp;
    var _a = tslib_1.__read(React.useState(false), 2), backdropVisible = _a[0], setBackdropVisible = _a[1];
    var _b = tslib_1.__read(react_1.useState(-1), 2), zIndex = _b[0], setZIndex = _b[1];
    react_1.useLayoutEffect(function () {
        exports.updatePositionInStack(uuid, {
            timestamp: timestamp,
            baseZIndex: props.zIndex,
            setBackdropOrder: function (visible, zIndex) {
                react_dom_1.unstable_batchedUpdates(function () {
                    setBackdropVisible(visible);
                    setZIndex(zIndex);
                    if (visible && props.onBringToFront) {
                        props.onBringToFront();
                    }
                });
            },
        });
        return function () { return exports.updatePositionInStack(uuid, null); };
    }, []);
    return backdropVisible ? (React.createElement("div", { "data-id": uuid, style: { zIndex: zIndex }, className: exports.baseClassName + "-backdrop" })) : null;
};
var stack = {};
exports.updatePositionInStack = function (id, data) {
    stack[id] = data;
    if (!data) {
        delete stack[id];
    }
    var pairs = Object.keys(stack).map(function (key) {
        var data = stack[key];
        return tslib_1.__assign({ key: key }, data);
    });
    // sort pairs in ascending order
    pairs.sort(function (p1, p2) { return p1.timestamp - p2.timestamp; });
    var last = pairs.pop();
    pairs.forEach(function (data) {
        data.setBackdropOrder(false, -1);
    });
    if (last) {
        last.setBackdropOrder(true, last.baseZIndex);
    }
};
exports.default = Backdrop;
