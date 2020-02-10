"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var useProperty_1 = require("../utils/useProperty");
var getAvailableSizeInfo_1 = require("../utils/getAvailableSizeInfo");
var OverlayTrigger_1 = require("../OverlayTrigger");
exports.default = (function (props, positionerRef) {
    var positionInfoRef = react_1.useRef({
        maxHeight: '50vh',
        maxWidth: '50vw',
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
    });
    var updatePosition = function () {
        var positionRect = positionerRef.current.getBoundingClientRect();
        positionInfoRef.current = getAvailableSizeInfo_1.default({
            constrainRect: OverlayTrigger_1.getConstrainRect(positionerRef.current, props.constrainTo),
            targetRect: positionRect,
            maxSizeOffset: 30,
        });
    };
    var _a = tslib_1.__read(useProperty_1.default(props, 'expanded', false, {
        onChange: function (expanded) {
            if (expanded) {
                if (props.onExpand) {
                    props.onExpand();
                }
            }
            else if (props.onCollapse) {
                props.onCollapse();
            }
            if (props.onToggle) {
                props.onToggle(expanded);
            }
            if (props.onExpandedChange) {
                props.onExpandedChange(expanded);
            }
        },
    }), 2), expanded = _a[0], doSetExpanded = _a[1];
    var setExpanded = function (newExpanded) {
        // if (!newExpanded) {
        //   return;
        // }
        if (!expanded && newExpanded) {
            updatePosition();
        }
        doSetExpanded(newExpanded);
    };
    var toggle = function () {
        setExpanded(!expanded);
    };
    return {
        expanded: expanded,
        setExpanded: setExpanded,
        toggle: toggle,
        positionInfo: positionInfoRef.current,
    };
});
