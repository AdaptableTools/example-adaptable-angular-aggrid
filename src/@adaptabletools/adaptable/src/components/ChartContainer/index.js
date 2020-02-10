"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var rebass_1 = require("rebass");
var SizedContainer_1 = require("../SizedContainer");
var ChartContainer = function (props) { return (React.createElement(rebass_1.Flex, { flexDirection: props.flexDirection || 'row', className: "ab-ChartContainer", style: props.style },
    React.createElement(rebass_1.Flex, { flexDirection: "column", flex: 1, style: { textAlign: 'center' } },
        props.button,
        props.title,
        React.createElement(SizedContainer_1.default, { style: { minHeight: props.minHeight || '60vh' } }, function (_a) {
            var width = _a.width, height = _a.height;
            height = Math.round(height);
            width = Math.round(width);
            return React.cloneElement(props.chart, {
                height: props.sizeAsString !== false ? height + "px" : height,
                width: props.sizeAsString !== false ? width + "px" : width,
            });
        })),
    props.settingsPanel)); };
exports.ChartContainer = ChartContainer;
exports.default = ChartContainer;
