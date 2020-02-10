"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var join_1 = require("../../utils/join");
var SelectableList_1 = require("../../SelectableList");
var baseClassName = 'ab-ListGroupItem';
var ListGroupItem = React.forwardRef(function (props, ref) {
    var className = props.className, active = props.active, _a = props.factory, Tag = _a === void 0 ? 'button' : _a, noZebra = props.noZebra, domProps = tslib_1.__rest(props, ["className", "active", "factory", "noZebra"]);
    var onSelectionClick = SelectableList_1.useSelectionEvent();
    var result = (React.createElement(Tag, tslib_1.__assign({}, domProps, { onClick: function (event) {
            if (domProps.onClick) {
                domProps.onClick(event);
            }
            onSelectionClick(event, { index: props.index });
        }, ref: ref, className: join_1.default(className, baseClassName, noZebra ? baseClassName + "--no-zebra" : null, baseClassName + "--" + (active ? 'active' : 'not-active')) })));
    return result;
});
exports.default = ListGroupItem;
