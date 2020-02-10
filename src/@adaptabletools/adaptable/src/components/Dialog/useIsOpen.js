"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var useProperty_1 = require("../utils/useProperty");
exports.default = (function (props) {
    var _a = tslib_1.__read(useProperty_1.default(props, 'isOpen', true, {
        onChange: function (isOpen) {
            if (!isOpen && props.onDismiss) {
                props.onDismiss();
            }
        },
    }), 2), isOpen = _a[0], setIsOpen = _a[1];
    return [isOpen, setIsOpen];
});
