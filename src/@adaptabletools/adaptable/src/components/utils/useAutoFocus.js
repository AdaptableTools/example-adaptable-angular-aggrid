"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var usePrevious_1 = require("./usePrevious");
var useAutoFocus = function (props, focusElementRef) {
    var autoFocus = props.autoFocus === undefined ? true : props.autoFocus;
    var prevAutoFocus = usePrevious_1.default(props.previous ? props.previous({ autoFocus: autoFocus }) : autoFocus, undefined);
    react_1.useEffect(function () {
        if (focusElementRef.current &&
            focusElementRef.current.focus &&
            autoFocus &&
            (props.shouldFocus ? props.shouldFocus({ autoFocus: autoFocus }) : true) &&
            (prevAutoFocus === undefined || prevAutoFocus !== autoFocus)) {
            focusElementRef.current.focus();
        }
    }, [autoFocus, prevAutoFocus, props.isOpen]);
};
exports.default = useAutoFocus;
