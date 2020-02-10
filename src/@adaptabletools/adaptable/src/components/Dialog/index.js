"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var join_1 = require("../utils/join");
var contains_1 = require("../utils/contains");
var captureTabNavigation_1 = require("../utils/captureTabNavigation");
var rebass_1 = require("rebass");
var Modal_1 = require("../Modal");
var useIsOpen_1 = require("./useIsOpen");
var useAutoFocus_1 = require("../utils/useAutoFocus");
var baseClassName = 'ab-Dialog';
var Dialog = function (props) {
    var modal = props.modal, fixed = props.fixed, _a = props.autoFocus, autoFocus = _a === void 0 ? true : _a, className = props.className, children = props.children, modalProps = props.modalProps, _b = props.dismissOnClickOutside, dismissOnClickOutside = _b === void 0 ? false : _b, onDismiss = props.onDismiss, boxProps = tslib_1.__rest(props, ["modal", "fixed", "autoFocus", "className", "children", "modalProps", "dismissOnClickOutside", "onDismiss"]);
    modal = props.modal === undefined ? true : props.modal;
    fixed = props.fixed === undefined ? true : props.fixed;
    var _c = tslib_1.__read(useIsOpen_1.default(props), 2), isOpen = _c[0], setIsOpen = _c[1];
    var boxRef = react_1.useRef(null);
    useAutoFocus_1.default({
        isOpen: isOpen,
        autoFocus: props.autoFocus,
        previous: function (_a) {
            var autoFocus = _a.autoFocus;
            return autoFocus && isOpen;
        },
        shouldFocus: function (_a) {
            var autoFocus = _a.autoFocus;
            return autoFocus && isOpen;
        },
    }, boxRef);
    var showCloseButton = props.showCloseButton === undefined ? true : props.showCloseButton;
    var onKeyDown = function (e) {
        if (props.onKeyDown) {
            props.onKeyDown(e);
        }
        captureTabNavigation_1.default(boxRef.current, e);
        if (e.key === 'Escape') {
            if (e.nativeEvent.anotherModalClosed) {
                return;
            }
            e.nativeEvent.anotherModalClosed = true;
            var activeElement = document.activeElement;
            var ignoreTags = {
                input: 1,
                a: 1,
                button: 1,
            };
            if (activeElement && !!ignoreTags[activeElement.tagName]) {
                return;
            }
            setIsOpen(false);
        }
        captureTabNavigation_1.default(boxRef.current, event);
    };
    react_1.useEffect(function () {
        if (dismissOnClickOutside && isOpen) {
            var dismissDialog_1 = function (e) {
                requestAnimationFrame(function () {
                    if (e.preventDialogDismiss) {
                        return;
                    }
                    setIsOpen(false);
                });
            };
            document.documentElement.addEventListener('click', dismissDialog_1, {
                passive: true,
                capture: false,
            });
            return function () {
                document.documentElement.removeEventListener('click', dismissDialog_1);
            };
        }
    }, [isOpen, dismissOnClickOutside]);
    if (!isOpen) {
        return null;
    }
    var closeButton = showCloseButton ? (React.createElement(rebass_1.Box, { padding: 1, title: "Close dialog", onClick: function () { return setIsOpen(false); }, className: baseClassName + "__close-button" }, "\u00D7")) : null;
    var setPreventDismissFlag = function (e) {
        if (dismissOnClickOutside) {
            e.nativeEvent.preventDialogDismiss = true;
        }
    };
    var box = (React.createElement(rebass_1.Box, tslib_1.__assign({ tabIndex: 0 }, boxProps, { onClick: function (e) {
            setPreventDismissFlag(e);
            if (boxProps && boxProps.onClick) {
                boxProps.onClick(e);
            }
        }, onKeyDown: onKeyDown, className: join_1.default(baseClassName, modal ? baseClassName + "--modal" : baseClassName + "--not-modal", className), ref: boxRef }),
        children,
        closeButton));
    var content = fixed ? (React.createElement("div", { onClick: setPreventDismissFlag, className: baseClassName + "-fixed-wrapper" }, box)) : (box);
    return modal ? (React.createElement(Modal_1.default, tslib_1.__assign({}, modalProps, { isOpen: isOpen, onBringToFront: function () {
            if (boxRef.current &&
                boxRef.current.focus &&
                (!document.activeElement || !contains_1.default(boxRef.current, document.activeElement))) {
                boxRef.current.focus();
            }
        } }), box)) : (content);
};
exports.default = Dialog;
