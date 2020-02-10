"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var icons_1 = require("../icons");
var Arrows = function () {
    return (React.createElement("div", { style: {
            display: 'flex',
            flexFlow: 'column',
            position: 'absolute',
            background: 'var(--ab-color-defaultbackground)',
            fill: 'var(--ab-cmp-dropdown__fill)',
            top: '50%',
            right: 'var(--ab-space-1)',
            transform: 'translate3d(0px, -50%, 0px)',
            cursor: 'pointer',
        } },
        React.createElement(icons_1.Icon, { name: "triangle-up", size: 24, style: { position: 'relative', top: 7 } }),
        React.createElement(icons_1.Icon, { name: "triangle-down", size: 24, style: { position: 'relative', top: -7 } })));
};
exports.default = Arrows;
