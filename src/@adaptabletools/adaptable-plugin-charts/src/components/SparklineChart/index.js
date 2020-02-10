"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var igr_sparkline_module_1 = require("igniteui-react-charts/ES5/igr-sparkline-module");
var igr_sparkline_1 = require("igniteui-react-charts/ES5/igr-sparkline");
var igr_sparkline_core_module_1 = require("igniteui-react-charts/ES5/igr-sparkline-core-module");
var DefaultSparklinesChartProperties_1 = require("@adaptabletools/adaptable/src/Utilities/Defaults/DefaultSparklinesChartProperties");
igr_sparkline_core_module_1.IgrSparklineCoreModule.register();
igr_sparkline_module_1.IgrSparklineModule.register();
var SparklineChart = function (props) {
    var dataSource = props.values.map(function (value) { return ({
        value: value,
        label: value,
    }); });
    var minMax = {};
    if (props.min != null) {
        minMax.minimum = props.min;
    }
    if (props.max != null) {
        minMax.maximum = props.max;
    }
    var defaultSparklineProperties = DefaultSparklinesChartProperties_1.DefaultSparklinesChartProperties;
    return (React.createElement("div", { style: { padding: '0px', margin: '0px' } },
        React.createElement(igr_sparkline_1.IgrSparkline, tslib_1.__assign({}, minMax, { 
            /* the IgrSparkline chart does not respond to setting/unsetting min and max dynamically, so we have to use those as key in order to remount the cmp */
            key: props.min + "-" + props.max, dataSource: dataSource, valueMemberPath: "value", labelMemberPath: "label", displayType: props.type ? props.type : defaultSparklineProperties.DisplayType, height: props.height ? props.height + "px" : undefined, width: props.width ? props.width + "px" : undefined, 
            // brush
            brush: props.brush ? props.brush : defaultSparklineProperties.Brush, negativeBrush: props.negativeBrush ? props.negativeBrush : defaultSparklineProperties.NegativeBrush, 
            // showing markers
            // marker brushes
            firstMarkerBrush: props.firstMarkerBrush
                ? props.firstMarkerBrush
                : defaultSparklineProperties.FirstMarkerBrush, lastMarkerBrush: props.lastMarkerBrush ? props.lastMarkerBrush : defaultSparklineProperties.LastMarkerBrush, highMarkerBrush: props.highMarkerBrush ? props.highMarkerBrush : defaultSparklineProperties.HighMarkerBrush, lowMarkerBrush: props.lowMarkerBrush ? props.lowMarkerBrush : defaultSparklineProperties.LowMarkerBrush, negativeMarkerBrush: props.negativeMarkerBrush
                ? props.negativeMarkerBrush
                : defaultSparklineProperties.NegativeMarkerBrush }))));
};
exports.default = SparklineChart;
