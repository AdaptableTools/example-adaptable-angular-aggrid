"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChartEnums_1 = require("../../PredefinedConfig/Common/ChartEnums");
exports.DefaultSparklinesChartProperties = {
    DisplayType: ChartEnums_1.SparklineTypeEnum.Line,
    UseMaxStaticValue: false,
    UseMinStaticValue: false,
    // Brush -- want to use same colour as UI but cannot re-use the constants
    Brush: '#006400',
    NegativeBrush: '#8B0000',
    // Marker Visibility
    HighMarkerVisibility: 'Visible',
    LowMarkerVisibility: 'Visible',
    FirstMarkerVisibility: 'Visible',
    LastMarkerVisibility: 'Visible',
    NegativeMarkerVisibility: 'Visible',
    MarkerVisibility: 'Collapsed',
    // Marker Brush
    FirstMarkerBrush: 'Gray',
    LastMarkerBrush: 'Gray',
    HighMarkerBrush: 'DarkBlue',
    LowMarkerBrush: 'Purple',
    NegativeMarkerBrush: 'Red',
};
