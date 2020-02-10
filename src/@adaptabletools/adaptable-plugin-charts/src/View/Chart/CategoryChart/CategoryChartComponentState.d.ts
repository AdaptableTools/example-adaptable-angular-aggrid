import { CategoryChartProperties } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
export interface CategoryChartComponentState {
    IsChartSettingsVisible: boolean;
    ChartProperties: CategoryChartProperties;
    IsGeneralMinimised: boolean;
    SetYAxisMinimumValue: boolean;
    SetYAxisMaximumValue: boolean;
    SetYAxisLabelColor: boolean;
    SetYAxisTitleColor: boolean;
    IsYAxisMinimised: boolean;
    UseDefaultYAxisTitle: boolean;
    IsXAxisMinimised: boolean;
    SetXAxisLabelColor: boolean;
    SetXAxisTitleColor: boolean;
    UseDefaultXAxisTitle: boolean;
    IsHighlightsMinimised: boolean;
    IsMiscMinimised: boolean;
    TitleMargin: number;
    SubTitleMargin: number;
}
