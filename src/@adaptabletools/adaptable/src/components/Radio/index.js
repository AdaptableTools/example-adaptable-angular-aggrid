"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var rebass_1 = require("rebass");
var Radio = function (_a) {
    var children = _a.children, checked = _a.checked, onChange = _a.onChange, value = _a.value, name = _a.name, _b = _a.gapDistance, gapDistance = _b === void 0 ? 10 : _b, _c = _a.childrenPosition, childrenPosition = _c === void 0 ? 'end' : _c, _d = _a.as, as = _d === void 0 ? 'label' : _d, id = _a.id, props = tslib_1.__rest(_a, ["children", "checked", "onChange", "value", "name", "gapDistance", "childrenPosition", "as", "id"]);
    var _e = tslib_1.__read(react_1.useState(false), 2), stateChecked = _e[0], setStateChecked = _e[1];
    var computedChecked = checked !== undefined ? checked : stateChecked;
    var onInputChange = function (event) {
        var newChecked = event.target.checked;
        if (checked === undefined) {
            setStateChecked(newChecked);
        }
        if (onChange) {
            onChange(newChecked, event);
        }
    };
    var gap = React.createElement("div", { style: { marginLeft: gapDistance, display: 'inline-block' } });
    var before = childrenPosition === 'start' ? children : null;
    var beforeGap = childrenPosition === 'start' ? gap : null;
    var after = childrenPosition === 'end' ? children : null;
    var afterGap = childrenPosition === 'end' ? gap : null;
    return (React.createElement(rebass_1.Box, tslib_1.__assign({ className: "ab-Radio", my: 2 }, props, { style: tslib_1.__assign({ display: 'inline-flex', flexFlow: 'row', cursor: 'pointer', position: 'relative' }, props.style), as: as }),
        before,
        beforeGap,
        React.createElement("input", { className: "ab-Radio-input", id: id, checked: computedChecked, type: "radio", name: name, value: value, style: {
                verticalAlign: 'middle',
                borderRadius: '50%',
                cursor: 'pointer',
                position: 'relative',
            }, onChange: onInputChange }),
        afterGap,
        after));
};
exports.default = Radio;
