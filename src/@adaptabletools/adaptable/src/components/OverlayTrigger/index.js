"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var batchUpdate_1 = require("../utils/batchUpdate");
var getAvailableSizeInfo_1 = require("../utils/getAvailableSizeInfo");
var react_dom_1 = require("react-dom");
var selectParent_1 = require("../utils/selectParent");
var useProperty_1 = require("../utils/useProperty");
var Overlay_1 = require("./Overlay");
var getOverlayStyle_1 = require("./getOverlayStyle");
var join_1 = require("../utils/join");
var usePrevious_1 = require("../utils/usePrevious");
var utils_1 = require("./utils");
var LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
exports.getConstrainRect = function (target, constrainTo) {
    var el = null;
    if (typeof constrainTo === 'string') {
        el = selectParent_1.default(constrainTo, target);
    }
    if (typeof constrainTo === 'function') {
        el = constrainTo(target);
    }
    if (el && el.tagName) {
        return utils_1.getRect(el);
    }
    return utils_1.getDocRect();
};
var globalObject = typeof globalThis !== 'undefined' ? globalThis : window;
var portalElement;
var ensurePortalElement = function () {
    if (!globalObject.document) {
        return;
    }
    if (portalElement) {
        return;
    }
    portalElement = document.createElement('div');
    document.body.appendChild(portalElement);
};
var OverlayTrigger = function (props) {
    var _ = props.visible, showTriangle = props.showTriangle, showEvent = props.showEvent, hideEvent = props.hideEvent, render = props.render, targetOffset = props.targetOffset, defaultZIndex = props.defaultZIndex, anchor = props.anchor, opacityTransitionDuration = props.opacityTransitionDuration, onVisibleChange = props.onVisibleChange, constrainTo = props.constrainTo, domProps = tslib_1.__rest(props, ["visible", "showTriangle", "showEvent", "hideEvent", "render", "targetOffset", "defaultZIndex", "anchor", "opacityTransitionDuration", "onVisibleChange", "constrainTo"]);
    var domRef = react_1.useRef(null);
    var targetRef = react_1.useRef(null);
    var _a = tslib_1.__read(useProperty_1.default(props, 'visible', false), 2), visible = _a[0], setVisible = _a[1];
    var _b = tslib_1.__read(react_1.useState(null), 2), targetRect = _b[0], setTargetRect = _b[1];
    var _c = tslib_1.__read(react_1.useState(null), 2), sizeInfo = _c[0], setSizeInfo = _c[1];
    var prevVisible = usePrevious_1.default(visible, false);
    ensurePortalElement();
    react_1.useEffect(function () {
        var target = domRef.current.previousSibling;
        if (!target) {
            LoggingHelper_1.default.LogAdaptableWarning('No OverlayTrigger target - make sure you render a child inside the OverlayTrigger, which will be the overlay target');
            return;
        }
        targetRef.current = target;
        var onShow = function () {
            batchUpdate_1.default(function () {
                setVisible(true);
                var targetRect = target.getBoundingClientRect();
                var sizeInfo = getAvailableSizeInfo_1.default({
                    targetRect: targetRect,
                    constrainRect: exports.getConstrainRect(target, constrainTo),
                });
                setTargetRect(targetRect);
                setSizeInfo(sizeInfo);
            }).commit();
        };
        var onHide = function () {
            setVisible(false);
        };
        if (props.visible === undefined) {
            target.addEventListener(showEvent, onShow);
            target.addEventListener(hideEvent, onHide);
        }
        if (props.visible && !prevVisible) {
            onShow();
        }
        return function () {
            if (props.visible === undefined) {
                target.removeEventListener(showEvent, onShow);
                target.removeEventListener(hideEvent, onHide);
            }
        };
    }, [props.visible, showEvent, hideEvent]);
    var overlay;
    if (targetRect) {
        var overlayStyle = getOverlayStyle_1.default({
            constrainRect: exports.getConstrainRect(targetRef.current, constrainTo),
            targetRect: targetRect,
            targetOffset: targetOffset,
            anchor: anchor,
        });
        overlayStyle.transition = "opacity " + opacityTransitionDuration;
        overlayStyle.overflow = "visible";
        overlayStyle.zIndex = defaultZIndex;
        overlayStyle = tslib_1.__assign(tslib_1.__assign({}, overlayStyle), props.style);
        var position = anchor === 'vertical' ? sizeInfo.verticalPosition : sizeInfo.horizontalPosition;
        overlay = react_dom_1.createPortal(React.createElement(Overlay_1.default, tslib_1.__assign({}, domProps, { className: join_1.default('ab-Overlay', "ab-Overlay--position-" + position, showTriangle ? 'ab-Overlay--show-triangle' : '', domProps.className), visible: visible, style: overlayStyle, anchor: anchor, position: position, getConstrainRect: function () { return exports.getConstrainRect(targetRef.current); } }), props.render()), portalElement);
    }
    return (React.createElement(React.Fragment, null,
        props.children,
        React.createElement("div", { "data-name": "OverlayTrigger", "data-visible": visible, ref: domRef, style: {
                visibility: 'hidden',
                flex: 'none',
                width: 0,
                height: 0,
                pointerEvents: 'none',
            } }),
        overlay));
};
OverlayTrigger.defaultProps = {
    showEvent: 'mouseenter',
    hideEvent: 'mouseleave',
    anchor: 'vertical',
    targetOffset: 10,
    defaultZIndex: 1000000,
    opacityTransitionDuration: '250ms',
};
exports.default = OverlayTrigger;
