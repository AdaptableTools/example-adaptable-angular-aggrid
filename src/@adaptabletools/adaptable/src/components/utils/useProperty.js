"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var toUpperFirst = function (str) { return "" + str.charAt(0).toUpperCase() + str.substring(1); };
var isControlled = function (value) { return value !== undefined; };
var emptyFn = function () { };
var useProperty = function (props, propName, defaultValue, config) {
    var PropName = toUpperFirst(propName);
    var defaultValueFromProps = props["default" + PropName];
    defaultValue = defaultValueFromProps === undefined ? defaultValue : defaultValueFromProps;
    var _a = tslib_1.__read(react_1.useState(defaultValue), 2), stateValue = _a[0], setStateProperty = _a[1];
    var value = props[propName];
    var controlled = isControlled(value);
    var onChange = config && config.onChange ? config.onChange : props["on" + PropName + "Change"] || emptyFn;
    var setter = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!controlled) {
            setStateProperty(value);
        }
        onChange.apply(void 0, tslib_1.__spread([value], args));
    };
    if (!controlled) {
        value = stateValue;
    }
    return [value, setter];
};
exports.default = useProperty;
