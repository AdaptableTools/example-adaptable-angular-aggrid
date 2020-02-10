"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var NotifyResize_1 = require("../NotifyResize");
var SizedContainer = function (props) {
    var domProps = tslib_1.__rest(props, []);
    var _a = tslib_1.__read(React.useState(null), 2), size = _a[0], onResize = _a[1];
    var sizeFn = props.children;
    return (React.createElement(rebass_1.Box, tslib_1.__assign({}, domProps, { style: tslib_1.__assign(tslib_1.__assign({ flex: 1 }, domProps.style), { position: 'relative' }) }),
        React.createElement(rebass_1.Box, { style: { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }, "data-width": size ? size.width : null, "data-height": size ? size.height : null },
            React.createElement(NotifyResize_1.default, { onResize: onResize }),
            size ? sizeFn(size) : null)));
};
exports.default = SizedContainer;
