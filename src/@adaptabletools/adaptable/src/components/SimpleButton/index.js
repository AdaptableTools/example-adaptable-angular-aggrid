"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var join_1 = require("../utils/join");
var icons_1 = require("../icons");
var Tooltip_1 = require("../Tooltip");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
exports.baseClassName = 'ab-SimpleButton';
var SimpleButton = function (props) {
    var children = props.children, disabled = props.disabled, _a = props.variant, variant = _a === void 0 ? 'outlined' : _a, _b = props.tone, tone = _b === void 0 ? 'neutral' : _b, _c = props.iconPosition, iconPosition = _c === void 0 ? 'start' : _c, iconSize = props.iconSize, className = props.className, icon = props.icon, tooltip = props.tooltip, accessLevel = props.AccessLevel, type = props.type, buttonProps = tslib_1.__rest(props, ["children", "disabled", "variant", "tone", "iconPosition", "iconSize", "className", "icon", "tooltip", "AccessLevel", "type"]);
    if (typeof icon === 'string' && icons_1.default[icon]) {
        var IconCmp = icons_1.default[icon];
        var iconProps = {};
        if (iconSize) {
            iconProps.size = iconSize;
        }
        icon = React.createElement(IconCmp, tslib_1.__assign({}, iconProps));
    }
    if (icon) {
        children =
            iconPosition === 'start' ? (React.createElement(React.Fragment, null,
                icon,
                children)) : (React.createElement(React.Fragment, null,
                children,
                icon));
    }
    if (buttonProps.as == 'div') {
        // we have some cases when we want to nest a SimpleButton inside an html Button
        // so the SimpleButton cannot render a <button> tag
        // so we want it to be a DIV tag
        // but still keep the same keyboard accessibility
        buttonProps.tabIndex = buttonProps.tabIndex === undefined ? 0 : buttonProps.tabIndex;
        buttonProps.role = buttonProps.role || 'button';
        var onKeyDown_1 = buttonProps.onKeyDown;
        buttonProps.onKeyDown = function (e) {
            var key = e.key;
            if (buttonProps.onClick && key === 'Enter') {
                buttonProps.onClick(e);
            }
            if (onKeyDown_1) {
                onKeyDown_1(e);
            }
        };
    }
    if (!buttonProps.as || buttonProps.as === 'button') {
        buttonProps.type = type ? type : 'button';
    }
    if (accessLevel === Enums_1.AccessLevel.Hidden) {
        return null;
    }
    if (accessLevel === Enums_1.AccessLevel.ReadOnly) {
        disabled = true;
    }
    tooltip = null;
    var btn = (React.createElement(rebass_1.Button, tslib_1.__assign({}, buttonProps, { disabled: disabled, className: join_1.default(className, exports.baseClassName, disabled ? exports.baseClassName + "--disabled" : '', exports.baseClassName + "--variant-" + variant, exports.baseClassName + "--tone-" + tone) }), children));
    return tooltip ? React.createElement(Tooltip_1.default, { label: tooltip }, btn) : btn;
};
SimpleButton.defaultProps = {
    px: null,
    py: null,
    fontWeight: 'normal',
    m: null,
    borderRadius: null,
};
exports.default = SimpleButton;
