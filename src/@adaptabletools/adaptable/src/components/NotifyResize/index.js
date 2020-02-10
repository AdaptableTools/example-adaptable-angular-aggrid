"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var resize_observer_polyfill_1 = require("resize-observer-polyfill");
var globalObject = typeof globalThis !== 'undefined' ? globalThis : window;
var RO = globalObject.ResizeObserver || resize_observer_polyfill_1.default;
var NotifyResize = function (props) {
    var domRef = React.useRef(null);
    React.useEffect(function () {
        var ro = new RO(function (entries) {
            var entry = entries[0];
            if (entry) {
                var _a = entry.contentRect, width = _a.width, height = _a.height;
                props.onResize({ width: width, height: height });
            }
        });
        ro.observe(domRef.current);
        return function () {
            ro.unobserve(domRef.current);
        };
    }, []);
    return (React.createElement("div", { ref: domRef, style: {
            visibility: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
        } }));
};
exports.default = NotifyResize;
