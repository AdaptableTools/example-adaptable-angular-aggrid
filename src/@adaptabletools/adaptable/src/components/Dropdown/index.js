"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var rebass_1 = require("rebass");
var join_1 = require("../utils/join");
var useProperty_1 = require("../utils/useProperty");
var Arrows_1 = require("./Arrows");
var SimpleButton_1 = require("../SimpleButton");
var baseClassName = 'ab-Dropdown';
var Dropdown = function (props) {
    var options = props.options, multiple = props.multiple, name = props.name, autoFocus = props.autoFocus, _a = props.showEmptyItem, showEmptyItem = _a === void 0 ? true : _a, showClearButton = props.showClearButton, disabled = props.disabled, allowSearch = props.allowSearch, clearButtonProps = props.clearButtonProps, _ = props.value, __ = props.onChange, style = props.style, onExpand = props.onExpand, boxProps = tslib_1.__rest(props, ["options", "multiple", "name", "autoFocus", "showEmptyItem", "showClearButton", "disabled", "allowSearch", "clearButtonProps", "value", "onChange", "style", "onExpand"]);
    if (showClearButton !== false) {
        showClearButton = true;
    }
    var _b = tslib_1.__read(useProperty_1.default(props, 'value', undefined, {
        onChange: props.onChange,
    }), 2), value = _b[0], setValue = _b[1];
    var selectedOption = null;
    var _c = tslib_1.__read(react_1.useState([]), 2), lazyOptions = _c[0], setLazyOptions = _c[1];
    var onMouseDown = function () {
        if (onExpand) {
            onExpand();
        }
    };
    if (typeof options === 'function') {
        var lazyOptionsFn_1 = options;
        onMouseDown = function () {
            var newOptions = lazyOptionsFn_1();
            setLazyOptions(newOptions);
            if (onExpand) {
                onExpand();
            }
        };
        options = lazyOptions;
    }
    var placeholder = props.emptyText || props.placeholder || 'Please select an option';
    var finalOptions = options.map(function (option) {
        if (typeof option === 'string') {
            option = {
                label: option,
                value: option,
            };
        }
        if (value === option.value) {
            selectedOption = option;
        }
        return option;
    });
    if (showEmptyItem)
        finalOptions.splice(0, 0, {
            label: placeholder,
            value: '',
        });
    var onChange = function (option, e) {
        setValue(option ? option.value : option, e, option);
    };
    var selectRef = react_1.useRef(null);
    var domRef = react_1.useRef(null);
    var _d = tslib_1.__read(react_1.useState(false), 2), focused = _d[0], setFocused = _d[1];
    var onFocus = function (e) {
        if (e.target === selectRef.current) {
            setFocused(true);
            return;
        }
        if (e.target === domRef.current) {
            selectRef.current.focus();
        }
    };
    var onBlur = function () {
        setFocused(false);
    };
    var defaultLabel = selectedOption ? selectedOption.label : null;
    var selectedText = props.renderLabel
        ? props.renderLabel(defaultLabel, selectedOption)
        : defaultLabel;
    if (!selectedOption) {
        selectedText = placeholder;
    }
    //20  ... 20 16
    var renderClearButton = function () { return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ variant: "text", icon: "clear", tone: "none", tooltip: "Clear", iconSize: 20, px: 0, py: 0, marginRight: 1 }, clearButtonProps, { style: tslib_1.__assign({ zIndex: 10, color: 'inherit' }, (clearButtonProps ? clearButtonProps.style : null)), onClick: function (e) {
            e.preventDefault();
            onChange(null, e);
        } }))); };
    return (React.createElement(rebass_1.Flex, tslib_1.__assign({ ref: domRef, flexDirection: "row", alignItems: "center" }, boxProps, { className: join_1.default(props.className, baseClassName, !selectedOption ? baseClassName + "--empty" : baseClassName + "--not-empty", focused ? baseClassName + "--focused" : baseClassName + "--not-focused"), style: style, tabIndex: focused ? -1 : props.tabIndex || 0, onFocus: onFocus, onBlur: onBlur }),
        React.createElement("div", { style: { display: 'inline-block' }, className: baseClassName + "__text" },
            selectedText,
            React.createElement(Arrows_1.default, null)),
        React.createElement("select", { ref: selectRef, tabIndex: -1, disabled: disabled, value: value == null ? '' : value, onChange: function (e) {
                var selected = finalOptions.filter(function (o) { return o.value == e.target.value; })[0];
                onChange(selected, e);
            }, style: { opacity: 0, width: '100%', height: '100%', top: 0, left: 0, zIndex: 1 }, onMouseDown: onMouseDown, name: name, multiple: multiple, autoFocus: autoFocus }, finalOptions.map(function (o) {
            return (React.createElement("option", { key: o.value, value: o.value }, o.label));
        })),
        showClearButton && selectedOption ? renderClearButton() : null));
};
exports.default = Dropdown;
