"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var join_1 = require("../utils/join");
var SimpleButton_1 = require("../SimpleButton");
var useExpanded_1 = require("./useExpanded");
var renderItem_1 = require("./renderItem");
var OverlayTrigger_1 = require("../OverlayTrigger");
var ICON = (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24" },
    React.createElement("path", { d: "M7 10l5 5 5-5H7z" })));
var baseClassName = 'ab-DropdownButton';
var defaultListItemStyle = {
    padding: 'var(--ab-cmp-dropdownbutton-list-item__padding)',
};
var DropdownButton = function (props) {
    var columns = props.columns, overlayProps = props.overlayProps, _a = props.listOffset, listOffset = _a === void 0 ? 10 : _a, _b = props.collapseOnItemClick, collapseOnItemClick = _b === void 0 ? true : _b, _c = props.idProperty, idProperty = _c === void 0 ? 'id' : _c, isItemDisabled = props.isItemDisabled, items = props.items, children = props.children, _d = props.listMinWidth, listMinWidth = _d === void 0 ? 100 : _d, listStyle = props.listStyle, listItemStyle = props.listItemStyle, listItemClassName = props.listItemClassName, constrainTo = props.constrainTo, domProps = tslib_1.__rest(props, ["columns", "overlayProps", "listOffset", "collapseOnItemClick", "idProperty", "isItemDisabled", "items", "children", "listMinWidth", "listStyle", "listItemStyle", "listItemClassName", "constrainTo"]);
    isItemDisabled = isItemDisabled || (function (item) { return item.disabled; });
    if (!columns) {
        columns = ['icon', 'label'];
    }
    var content;
    if (Array.isArray(items)) {
        content = items.map(function (item, index) {
            if (typeof listItemStyle === 'function') {
                listItemStyle = listItemStyle(item, index);
            }
            var itemStyle = tslib_1.__assign(tslib_1.__assign({}, defaultListItemStyle), listItemStyle);
            var itemClassName = join_1.default(baseClassName + "__list-item", item.clickable === false
                ? baseClassName + "__list-item--not-clickable"
                : baseClassName + "__list-item--clickable", listItemClassName);
            var disabled = isItemDisabled(item);
            var getItemHandler = function (eventName) {
                return function (e) {
                    if (!disabled) {
                        if (item[eventName]) {
                            item[eventName](e, item);
                        }
                    }
                    if (collapseOnItemClick) {
                        if (!disabled) {
                            setExpanded(false);
                        }
                    }
                    else {
                        e.nativeEvent.preventCollapse = true;
                    }
                };
            };
            var domProps = {};
            if (item.onChange) {
                domProps.onChange = getItemHandler('onChange');
            }
            return renderItem_1.default({
                index: index,
                idProperty: idProperty,
                onItemClick: getItemHandler('onClick'),
                domProps: domProps,
                className: itemClassName,
                style: itemStyle,
                item: item,
                columns: columns,
            });
        });
        content = (React.createElement("table", { className: baseClassName + "__content" },
            React.createElement("tbody", null, content)));
    }
    var className = join_1.default(props.className, baseClassName);
    var positionerRef = react_1.useRef(null);
    var _e = useExpanded_1.default(props, positionerRef), expanded = _e.expanded, toggle = _e.toggle, setExpanded = _e.setExpanded, positionInfo = _e.positionInfo;
    var maxListHeight = positionInfo.maxHeight, maxListWidth = positionInfo.maxWidth;
    listStyle = tslib_1.__assign({ minWidth: typeof maxListWidth === 'number' ? Math.min(listMinWidth, maxListWidth) : listMinWidth, maxHeight: maxListHeight, maxWidth: maxListWidth, overflow: 'auto', border: 'var(--ab-cmp-dropdownbutton-list__border)', borderRadius: 'var(--ab-cmp-dropdownbutton-list__border-radius)', zIndex: 'var(--ab-cmp-dropdownbutton-list__z-index)', background: 'var(--ab-cmp-dropdownbutton-list__background)' }, listStyle);
    var icon = expanded
        ? react_1.cloneElement(ICON, {
            style: tslib_1.__assign(tslib_1.__assign({}, ICON.props.style), { transform: 'rotate(180deg) translate3d(0px, -2px, 0px)' }),
        })
        : ICON;
    return (React.createElement(OverlayTrigger_1.default, tslib_1.__assign({ visible: expanded, constrainTo: constrainTo, anchor: "vertical", render: function () {
            return (React.createElement("div", { style: listStyle, className: baseClassName + "__list" }, content));
        } }, overlayProps),
        React.createElement(SimpleButton_1.default, tslib_1.__assign({ icon: icon, iconPosition: "end", paddingRight: 0 }, domProps, { style: tslib_1.__assign(tslib_1.__assign({ overflow: 'visible' }, domProps.style), { outline: 'none' }), className: className, onClick: function (e) {
                if (domProps.onClick) {
                    domProps.onClick(e);
                }
                if (e.nativeEvent.preventCollapse && expanded) {
                    return;
                }
                toggle();
            }, onKeyDown: function (e) {
                if (domProps.onKeyDown) {
                    domProps.onKeyDown(e);
                }
                if (expanded && e.key === 'Escape') {
                    toggle();
                }
            }, onBlur: function (e) {
                if (domProps.onBlur) {
                    domProps.onBlur(e);
                }
                setExpanded(false);
            } }),
            React.createElement("div", { ref: positionerRef, tabIndex: -1, style: {
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    zIndex: -1,
                    pointerEvents: 'none',
                    opacity: 0,
                    top: 0,
                    left: 0,
                } }),
            children)));
};
exports.default = DropdownButton;
