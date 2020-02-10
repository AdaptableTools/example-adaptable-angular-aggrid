"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var rebass_1 = require("rebass");
var join_1 = require("../utils/join");
var DefaultIcon_1 = require("../icons/DefaultIcon");
var CheckBox = function (_a) {
    var children = _a.children, checked = _a.checked, onChange = _a.onChange, value = _a.value, name = _a.name, disabled = _a.disabled, _b = _a.variant, variant = _b === void 0 ? 'default' : _b, _c = _a.gapDistance, gapDistance = _c === void 0 ? 'var(--ab-space-1)' : _c, _d = _a.childrenPosition, childrenPosition = _d === void 0 ? 'end' : _d, _e = _a.as, as = _e === void 0 ? 'label' : _e, props = tslib_1.__rest(_a, ["children", "checked", "onChange", "value", "name", "disabled", "variant", "gapDistance", "childrenPosition", "as"]);
    var _f = tslib_1.__read(react_1.useState(false), 2), stateChecked = _f[0], setStateChecked = _f[1];
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
    children = React.createElement("div", { style: { display: 'inline-block' } }, children);
    var before = childrenPosition === 'start' ? children : null;
    var beforeGap = childrenPosition === 'start' ? gap : null;
    var after = childrenPosition === 'end' ? children : null;
    var afterGap = childrenPosition === 'end' ? gap : null;
    var indeterminate = computedChecked === null;
    var checkboxRef = react_1.useRef();
    React.useEffect(function () {
        checkboxRef.current.indeterminate = indeterminate;
    }, [indeterminate]);
    return (React.createElement(rebass_1.Box, tslib_1.__assign({ my: 2 }, props, { className: join_1.default('ab-CheckBox', disabled ? 'ab-CheckBox--disabled' : '', props.className), style: tslib_1.__assign({ display: 'inline-flex', flexFlow: 'row', alignItems: 'center', cursor: 'pointer', position: 'relative' }, props.style), as: as }),
        before,
        beforeGap,
        React.createElement("input", { className: "ab-CheckBox-input", ref: checkboxRef, disabled: disabled, checked: !!computedChecked, type: "checkbox", name: name, value: value, style: {
                verticalAlign: 'middle',
                opacity: 0,
                cursor: 'pointer',
                position: 'relative',
                top: -2,
            }, onChange: onInputChange }),
        variant !== 'agGrid' ? (React.createElement("svg", { viewBox: "0 0 40 40", height: DefaultIcon_1.getSize(19), className: "ab-CheckBox-svg" },
            React.createElement("rect", { x: "2", y: "2", width: "36", height: "36" }),
            indeterminate ? (React.createElement("rect", { x: "10", y: "10", width: "20", height: "20", style: { fill: 'currentColor' } })) : (React.createElement("polyline", { points: "9,22 18,30 33,14" })))) : (React.createElement("span", { className: "ag-icon ag-icon-checkbox-" + (computedChecked ? 'checked' : 'unchecked') })),
        afterGap,
        after));
};
exports.default = CheckBox;
