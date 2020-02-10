"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var join_1 = require("../utils/join");
exports.baseClassName = 'ab-Input';
var Input = function (props) {
    var disabled = props.disabled, className = props.className, inputProps = tslib_1.__rest(props, ["disabled", "className"]);
    var type = 'text';
    if (inputProps && inputProps.type) {
        type = inputProps.type;
    }
    if (type === 'string') {
        type = 'text';
    }
    return (React.createElement(rebass_1.Box, tslib_1.__assign({ as: "input" }, inputProps, { type: type, disabled: disabled, className: join_1.default(className, exports.baseClassName, type ? exports.baseClassName + "--type-" + type : '', disabled ? exports.baseClassName + "--disabled" : '') })));
};
exports.default = Input;
