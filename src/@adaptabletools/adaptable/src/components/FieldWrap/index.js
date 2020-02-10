"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var join_1 = require("../utils/join");
var FieldWrap = function (props) {
    return React.createElement(rebass_1.Flex, tslib_1.__assign({}, props, { className: join_1.default(props.className, 'ab-FieldWrap') }));
};
FieldWrap.defaultProps = {
    flexDirection: 'row',
    alignItems: 'center',
};
exports.default = FieldWrap;
