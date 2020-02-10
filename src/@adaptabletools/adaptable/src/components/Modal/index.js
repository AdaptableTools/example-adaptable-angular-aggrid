"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_dom_1 = require("react-dom");
var react_1 = require("react");
var join_1 = require("../utils/join");
var react_remove_scroll_1 = require("react-remove-scroll");
var rebass_1 = require("rebass");
var Backdrop_1 = require("./Backdrop");
var uuidv4 = require('uuid/v4');
var createUuid = function () { return uuidv4(); };
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
var globalCounter = 0;
var Modal = function (props) {
    ensurePortalElement();
    var className = props.className, style = props.style, children = props.children, isOpen = props.isOpen, onBringToFront = props.onBringToFront, boxProps = tslib_1.__rest(props, ["className", "style", "children", "isOpen", "onBringToFront"]);
    var uuid = react_1.useMemo(function () { return createUuid(); }, []);
    var counter = react_1.useMemo(function () { return globalCounter++; }, [isOpen]);
    var openTimestamp = counter;
    var backdropZIndexOffset = props.backdropZIndexOffset || 1;
    var zIndex = (props.baseZIndex || 1000) + counter;
    return react_dom_1.createPortal(isOpen ? (React.createElement(React.Fragment, null,
        React.createElement(Backdrop_1.default, { timestamp: openTimestamp, uuid: uuid, zIndex: zIndex - backdropZIndexOffset, onBringToFront: onBringToFront }),
        React.createElement(react_remove_scroll_1.RemoveScroll, null,
            React.createElement(rebass_1.Flex, tslib_1.__assign({ alignItems: "center", justifyContent: "center", flexDirection: "column" }, boxProps, { style: tslib_1.__assign({ zIndex: zIndex }, style), className: join_1.default(Backdrop_1.baseClassName, className) }), children)))) : null, portalElement);
};
exports.default = Modal;
