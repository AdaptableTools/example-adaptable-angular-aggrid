"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var SparklineChart_1 = require("../../components/SparklineChart");
exports.getSparklineRendererForColumn = function (sparklineColumn) {
    var SparklineRenderer = function () { return ''; };
    var renderSparkline = function (params) {
        var min = sparklineColumn.MinimumValue;
        var max = sparklineColumn.MaximumValue;
        return (React.createElement(SparklineChart_1.default, { type: sparklineColumn.SparklineType, min: min, max: max, values: params.value, width: params.column.getActualWidth() - 5, height: params.node.rowHeight - 5, brush: sparklineColumn.LineColor }));
    };
    SparklineRenderer.prototype.init = function (params) {
        var el = document.createElement('div');
        this.eGui = el;
        ReactDOM.render(renderSparkline(params), this.eGui);
    };
    SparklineRenderer.prototype.getGui = function () {
        return this.eGui;
    };
    SparklineRenderer.prototype.refresh = function (params) {
        ReactDOM.render(renderSparkline(params), this.eGui);
        return true;
    };
    return SparklineRenderer;
};
