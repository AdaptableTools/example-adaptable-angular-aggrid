import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
import { ChartType, OthersCategoryType, PieChartLabelPosition, SliceLabelOption, CategoryChartType, CrosshairDisplayMode, ToolTipType, AxisLabelsLocation, LabelVisibility, AxisScale, AxisAngle, HorizontalAlignment } from './Common/ChartEnums';
import { Expression } from './Common/Expression';
export interface ChartState extends RunTimeState {
    ChartDefinitions?: ChartDefinition[];
    CurrentChartName?: string;
    RefreshRate?: number;
}
/**
 * Our Chart Definitions which will get added to and updated as we add new charts
 * But the basic idea is that each chart will have a base chart defintion that just includes a name, description, type and chart properties
 * These chart properties are specialised for each chart type: they are all nullable types because we use defaults in the DefaultXXXProperties that we assign
 */
export interface ChartDefinition extends AdaptableObject {
    Name: string;
    Description: string;
    ChartProperties: ChartProperties;
    ChartType: ChartType;
    VisibleRowsOnly: boolean;
}
export interface ChartProperties extends AdaptableObject {
}
export interface PieChartDefinition extends ChartDefinition {
    PrimaryColumnId: string;
    SecondaryColumnId?: string;
    SecondaryColumnOperation: 'Sum' | 'Count';
    PrimaryKeyValues?: any[];
}
export interface SparklinesChartDefinition extends ChartDefinition {
    ColumnId: string;
    Expression?: Expression;
    PrimaryKeyValues?: any[];
}
export interface CategoryChartDefinition extends ChartDefinition {
    YAxisColumnIds: string[];
    YAxisTotal: 'Sum' | 'Average';
    XAxisColumnId: string;
    XAxisExpression?: Expression;
}
export interface PieChartProperties extends ChartProperties {
    OthersCategoryThreshold?: number;
    OthersCategoryType?: OthersCategoryType;
    PieChartLabelPosition?: PieChartLabelPosition;
    SliceLabelsMapping?: SliceLabelOption;
    SliceValuesMapping?: SliceLabelOption;
    SliceLegendMapping?: SliceLabelOption;
    ShowAsDoughnut?: boolean;
}
export interface SparklineChartProperties extends ChartProperties {
    Maximum?: number;
    Minimum?: number;
    DisplayType: 'Line' | 'Column' | 'Area';
    UseMinStaticValue: boolean;
    UseMaxStaticValue: boolean;
    Brush: string;
    NegativeBrush: string;
    HighMarkerVisibility: 'Visible' | 'Collapsed';
    LowMarkerVisibility: 'Visible' | 'Collapsed';
    FirstMarkerVisibility: 'Visible' | 'Collpsed';
    LastMarkerVisibility: 'Visible' | 'Collapsed';
    NegativeMarkerVisibility: 'Visible' | 'Collapsed';
    MarkerVisibility: 'Visible' | 'Collapsed';
    FirstMarkerBrush: string;
    LastMarkerBrush: string;
    HighMarkerBrush: string;
    LowMarkerBrush: string;
    NegativeMarkerBrush: string;
}
export interface CategoryChartProperties extends ChartProperties {
    CategoryChartType?: CategoryChartType;
    SeriesThickness?: number;
    MarkerType?: string;
    CalloutsType?: string;
    CalloutsInterval?: number;
    EnableFinalValueAnnotations?: boolean;
    CrosshairDisplayMode?: CrosshairDisplayMode;
    CrosshairSnapToData?: boolean;
    CrosshairAnnotationEnabled?: boolean;
    ToolTipType?: ToolTipType;
    YAxisLabelLocation?: AxisLabelsLocation;
    YAxisLabelVisibility?: LabelVisibility;
    YAxisLabelScale?: AxisScale;
    YAxisIntervalCustom?: boolean;
    YAxisIntervalValue?: number;
    YAxisTitle?: string;
    YAxisLabelColor?: string;
    YAxisTitleColor?: string;
    YAxisMinimumValue?: number;
    YAxisMaximumValue?: number;
    YAxisIsLogarithmic?: boolean;
    YAxisInverted?: boolean;
    XAxisLabelLocation?: AxisLabelsLocation;
    XAxisLabelVisibility?: LabelVisibility;
    XAxisLabelColor?: string;
    XAxisIntervalCustom?: boolean;
    XAxisIntervalValue?: number;
    XAxisTitle?: string;
    XAxisTitleColor?: string;
    XAxisGap?: number;
    XAxisOverlap: number;
    XAxisAngle?: AxisAngle;
    XAxisInverted?: boolean;
    EnableTransitions?: boolean;
    TransitionInDuration?: number;
    TitleAlignment?: HorizontalAlignment;
    SubTitleAlignment?: HorizontalAlignment;
    EnableSeriesHighlighting?: boolean;
    EnableCategoryHighlighting?: boolean;
    EnableItemHighlighting?: boolean;
}
export interface PieChartDataItem {
    Name: string;
    Value: any;
    Ratio: number;
    ValueAndName?: string;
    RatioAndName?: string;
    ErrorMessage?: string;
}
export interface ChartData {
    Data: any;
    ErrorMessage: string;
}
