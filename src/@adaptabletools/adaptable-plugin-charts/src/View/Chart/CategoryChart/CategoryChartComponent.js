"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ButtonClose_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonClose");
var ButtonMinimise_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonMinimise");
var ButtonMaximise_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonMaximise");
// ig chart imports
var igr_category_chart_1 = require("igniteui-react-charts/ES2015/igr-category-chart");
var igr_category_chart_module_1 = require("igniteui-react-charts/ES2015/igr-category-chart-module");
var igr_data_chart_annotation_module_1 = require("igniteui-react-charts/ES2015/igr-data-chart-annotation-module");
var Helper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/Helper");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var PanelWithButton_1 = require("@adaptabletools/adaptable/src/View/Components/Panels/PanelWithButton");
var ColorPicker_1 = require("@adaptabletools/adaptable/src/View/ColorPicker");
var ButtonGeneral_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonGeneral");
var DefaultCategoryChartProperties_1 = require("@adaptabletools/adaptable/src/Utilities/Defaults/DefaultCategoryChartProperties");
var PanelWithTwoButtons_1 = require("@adaptabletools/adaptable/src/View/Components/Panels/PanelWithTwoButtons");
var CategoryChartUIHelper_1 = require("./CategoryChartUIHelper");
var Dropdown_1 = require("@adaptabletools/adaptable/src/components/Dropdown");
var Input_1 = require("@adaptabletools/adaptable/src/components/Input");
var CheckBox_1 = require("@adaptabletools/adaptable/src/components/CheckBox");
var FormLayout_1 = require("@adaptabletools/adaptable/src/components/FormLayout");
var ChartContainer_1 = require("@adaptabletools/adaptable/src/components/ChartContainer");
var COLS = [{ name: 'label', style: { textAlign: 'start' } }, { name: '2' }];
var defaultButtonProps = {
    variant: 'text',
};
var CategoryChartComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryChartComponent, _super);
    function CategoryChartComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.seriesColors = new Map();
        _this.onYAxisMinValueChanged = function (e) {
            var chartProperties = _this.state.ChartProperties;
            chartProperties.YAxisMinimumValue = e.target.value;
            _this.updateChartProperties(chartProperties);
        };
        _this.onYAxisMaxValueChanged = function (e) {
            var chartProperties = _this.state.ChartProperties;
            chartProperties.YAxisMaximumValue = e.target.value;
            _this.updateChartProperties(chartProperties);
        };
        _this.onYAxisIntervalValueChanged = function (e) {
            var chartProperties = _this.state.ChartProperties;
            chartProperties.YAxisIntervalValue = e.target.value;
            _this.updateChartProperties(chartProperties);
        };
        _this.onXAxisIntervalValueChanged = function (e) {
            var chartProperties = _this.state.ChartProperties;
            chartProperties.XAxisIntervalValue = e.target.value;
            _this.updateChartProperties(chartProperties);
        };
        _this.onTransitionDurationChanged = function (e) {
            var chartProperties = _this.state.ChartProperties;
            chartProperties.TransitionInDuration = e.target.value;
            _this.updateChartProperties(chartProperties);
        };
        // added for synchronizing color of series with colors of callouts:
        _this.seriesAdded = _this.seriesAdded.bind(_this);
        _this.calloutStyleUpdating = _this.calloutStyleUpdating.bind(_this);
        _this.state = CategoryChartUIHelper_1.CategoryChartUIHelper.setChartDisplayPopupState(_this.props.CurrentChartDefinition, _this.props.Columns);
        igr_category_chart_module_1.IgrCategoryChartModule.register();
        igr_data_chart_annotation_module_1.IgrDataChartAnnotationModule.register();
        return _this;
    }
    CategoryChartComponent.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, nextContext) {
        if (nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
            this.setState(CategoryChartUIHelper_1.CategoryChartUIHelper.setChartDisplayPopupState(nextProps.CurrentChartDefinition, this.props.Columns));
        }
    };
    CategoryChartComponent.prototype.render = function () {
        var _this = this;
        var showGeneralPropertiesButton = this.state.IsGeneralMinimised ? (React.createElement(ButtonMaximise_1.ButtonMaximise, tslib_1.__assign({}, defaultButtonProps, { onClick: function () { return _this.onShowGeneralProperties(); }, tooltip: 'Show GeneralProperties' }))) : (React.createElement(ButtonMinimise_1.ButtonMinimise, tslib_1.__assign({}, defaultButtonProps, { onClick: function () { return _this.onHidePropertiesGroup(); }, tooltip: 'Hide General Properties' })));
        var showYAxisPropertiesButton = this.state.IsYAxisMinimised ? (React.createElement(ButtonMaximise_1.ButtonMaximise, tslib_1.__assign({}, defaultButtonProps, { onClick: function () { return _this.onShowYAxisProperties(); }, tooltip: 'Show YAxis Properties' }))) : (React.createElement(ButtonMinimise_1.ButtonMinimise, tslib_1.__assign({}, defaultButtonProps, { onClick: function () { return _this.onHidePropertiesGroup(); }, tooltip: 'Hide YAxis Properties' })));
        var showXAxisPropertiesButton = this.state.IsXAxisMinimised ? (React.createElement(ButtonMaximise_1.ButtonMaximise, tslib_1.__assign({}, defaultButtonProps, { onClick: function () { return _this.onShowXAxisProperties(); }, tooltip: 'Show XAxis Properties' }))) : (React.createElement(ButtonMinimise_1.ButtonMinimise, tslib_1.__assign({}, defaultButtonProps, { onClick: function () { return _this.onHidePropertiesGroup(); }, tooltip: 'Hide XAxis Properties' })));
        var showHighlightsPropertiesButton = this.state.IsHighlightsMinimised ? (React.createElement(ButtonMaximise_1.ButtonMaximise, tslib_1.__assign({}, defaultButtonProps, { onClick: function () { return _this.onShowHighlightsProperties(); }, tooltip: 'Show Highlights Properties' }))) : (React.createElement(ButtonMinimise_1.ButtonMinimise, tslib_1.__assign({}, defaultButtonProps, { onClick: function () { return _this.onHidePropertiesGroup(); }, tooltip: 'Hide Highlights Properties' })));
        var showMiscPropertiesButton = this.state.IsMiscMinimised ? (React.createElement(ButtonMaximise_1.ButtonMaximise, tslib_1.__assign({}, defaultButtonProps, { onClick: function () { return _this.onShowMiscProperties(); }, tooltip: 'Show Misc Properties' }))) : (React.createElement(ButtonMinimise_1.ButtonMinimise, tslib_1.__assign({}, defaultButtonProps, { onClick: function () { return _this.onHidePropertiesGroup(); }, tooltip: 'Hide XAxis Properties' })));
        var closeChartSettingsButton = (React.createElement(ButtonClose_1.ButtonClose, tslib_1.__assign({}, defaultButtonProps, { style: { color: 'var(--ab-color-defaultbackground)' }, onClick: function () { return _this.onHideChartSettings(); }, tooltip: 'Close Chart Settings' })));
        var openChartSettingsButton = (React.createElement(ButtonGeneral_1.ButtonGeneral, { style: { alignSelf: 'flex-end' }, onClick: function () { return _this.onShowChartSettings(); }, variant: "text", tooltip: null }, "Show Chart Settings"));
        var setDefaultsButton = (React.createElement(ButtonGeneral_1.ButtonGeneral, tslib_1.__assign({}, defaultButtonProps, { style: { color: 'var(--ab-color-defaultbackground)' }, onClick: function () { return _this.onSetPropertyDefaults(); }, tooltip: null }), "Reset"));
        var chartElement = (React.createElement(igr_category_chart_1.IgrCategoryChart
        // data source
        , { 
            // data source
            dataSource: this.props.ChartData.Data, 
            // chart type
            chartType: this.state.ChartProperties.CategoryChartType, markerTypes: CategoryChartUIHelper_1.CategoryChartUIHelper.getMarkerFromProps(this.state.ChartProperties), 
            // size
            width: '100%', height: '500px', 
            // titles (titles, alignment and margins)
            chartTitle: this.props.CurrentChartDefinition.Name, subtitle: this.props.CurrentChartDefinition.Description, titleAlignment: this.state.ChartProperties.TitleAlignment, titleRightMargin: this.state.TitleMargin, titleTopMargin: this.state.TitleMargin, subtitleAlignment: this.state.ChartProperties.SubTitleAlignment, subtitleRightMargin: this.state.SubTitleMargin, 
            // yAxis
            yAxisMinimumValue: this.state.ChartProperties.YAxisMinimumValue, yAxisMaximumValue: this.state.ChartProperties.YAxisMaximumValue, yAxisTitle: this.getYAxisTitle(this.state.UseDefaultYAxisTitle), yAxisLabelVisibility: this.state.ChartProperties.YAxisLabelVisibility, yAxisLabelLocation: this.state.ChartProperties.YAxisLabelLocation, yAxisLabelTextColor: this.state.ChartProperties.YAxisLabelColor, yAxisTitleTextColor: this.state.ChartProperties.YAxisTitleColor, yAxisIsLogarithmic: this.getYAxisIsLogarithmic(this.state.ChartProperties.YAxisLabelScale), yAxisInverted: this.state.ChartProperties.YAxisInverted, yAxisInterval: this.state.ChartProperties.YAxisIntervalValue, 
            // xAxis
            xAxisLabelVisibility: this.state.ChartProperties.XAxisLabelVisibility, xAxisTitle: this.getXAxisTitle(this.state.UseDefaultXAxisTitle), xAxisTitleTextColor: this.state.ChartProperties.XAxisTitleColor, xAxisLabelTextColor: this.state.ChartProperties.XAxisLabelColor, xAxisGap: this.state.ChartProperties.XAxisGap, xAxisOverlap: this.state.ChartProperties.XAxisOverlap, xAxisInverted: this.state.ChartProperties.XAxisInverted, xAxisInterval: this.state.ChartProperties.XAxisIntervalValue, 
            // TODO we will add 'xAxisLabelLocation' in the next release (ETA middle of 2019)
            // xAxisLabelLocation={this.state.ChartProperties.XAxisLabelLocation}
            // tooltip
            toolTipType: this.state.ChartProperties.ToolTipType, 
            // crosshairs
            crosshairsDisplayMode: this.state.ChartProperties.CrosshairDisplayMode, crosshairsSnapToData: this.state.ChartProperties.CrosshairSnapToData, crosshairsAnnotationEnabled: this.state.ChartProperties.CrosshairAnnotationEnabled, 
            // transitions
            isTransitionInEnabled: this.state.ChartProperties.EnableTransitions, 
            // transitionInEasingFunction={EasingFunctions.cubicEase}
            transitionInDuration: this.state.ChartProperties.TransitionInDuration, finalValueAnnotationsVisible: this.state.ChartProperties.EnableFinalValueAnnotations, 
            // hightlights
            isSeriesHighlightingEnabled: this.state.ChartProperties.EnableSeriesHighlighting, isCategoryHighlightingEnabled: this.state.ChartProperties.EnableCategoryHighlighting, isItemHighlightingEnabled: this.state.ChartProperties.EnableItemHighlighting, 
            //transitionDuration
            // playing
            //  xAxisTickStroke="gray"
            //  xAxisTickLength={5}
            //ubtitleRightMargin={this.state.TitleMargin}
            //subtitleTopMargin = {this.state.TitleMargin}
            // TODO consider adding this binding for Line, Spline, Area, Step ChartTypes
            // and showing controls for editing this value in Chart Settings UI under the General panel
            // thickness={this.state.ChartProperties.SeriesThickness}
            // callouts generated dynamiclly based on current data source and callout properties:
            calloutsDataSource: CategoryChartUIHelper_1.CategoryChartUIHelper.getCalloutsData(this.props.ChartData.Data, this.state.ChartProperties), calloutsVisible: true, calloutsXMemberPath: "CalloutsIndex", calloutsYMemberPath: "CalloutsValue", calloutsLabelMemberPath: "CalloutsLabel", calloutsContentMemberPath: "MemberPath", calloutStyleUpdating: this.calloutStyleUpdating, calloutStyleUpdatingEventEnabled: true, seriesAdded: this.seriesAdded, 
            //xAxisInterval={1}
            xAxisLabelAngle: CategoryChartUIHelper_1.CategoryChartUIHelper.getAngleFromEnum(this.state.ChartProperties.XAxisAngle) }));
        var settingsPanel = (React.createElement(PanelWithTwoButtons_1.PanelWithTwoButtons, { headerText: 'Chart Settings', variant: "primary", firstButton: closeChartSettingsButton, secondButton: setDefaultsButton },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: 'General', variant: "default", button: showGeneralPropertiesButton }, this.state.IsGeneralMinimised == false && (React.createElement(FormLayout_1.default, null,
                React.createElement(FormLayout_1.FormRow, { label: "Chart Type" },
                    React.createElement(Dropdown_1.default, { style: { maxWidth: 'inherit', width: '100%' }, placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ChartProperties.CategoryChartType, onChange: function (x) { return _this.onChartTypeChange(x); }, options: CategoryChartUIHelper_1.CategoryChartUIHelper.getChartTypeOptions() })),
                React.createElement(FormLayout_1.FormRow, { label: "Marker Type" },
                    React.createElement(Dropdown_1.default, { style: { maxWidth: 'inherit', width: '100%' }, placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ChartProperties.MarkerType, onChange: function (x) { return _this.onMarkerTypeChange(x); }, options: CategoryChartUIHelper_1.CategoryChartUIHelper.getMarkerTypeOptions() })),
                this.state.ChartProperties.CategoryChartType == ChartEnums_1.CategoryChartType.Column && (React.createElement(React.Fragment, null,
                    React.createElement(FormLayout_1.FormRow, { label: "Column Gap" },
                        React.createElement(Input_1.default, { value: this.state.ChartProperties.XAxisGap, width: "100%", type: "number", min: "0", step: "0.1", max: "1", placeholder: "Enter", onChange: function (e) { return _this.onXAxisGapChanged(e); } })),
                    React.createElement(FormLayout_1.FormRow, { label: "Column Overlap" },
                        React.createElement(Input_1.default, { width: "100%", value: this.state.ChartProperties.XAxisOverlap, type: "number", min: "0", step: "0.1", max: "1", placeholder: "Enter", onChange: function (e) { return _this.onXAxisOverlapChanged(e); } }))))))),
            React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'Y (Vertical) Axis', style: { marginTop: '2px' }, button: showYAxisPropertiesButton }, this.state.IsYAxisMinimised == false && (React.createElement(FormLayout_1.default, { columns: COLS },
                React.createElement(FormLayout_1.FormRow, null,
                    React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onYAxisVisibilityOptionChanged(checked); }, checked: this.state.ChartProperties.YAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible }, "Axis Visible")),
                this.state.ChartProperties.YAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible && (React.createElement(React.Fragment, null,
                    React.createElement(FormLayout_1.FormRow, null,
                        React.createElement(CheckBox_1.default, { marginTop: 2, onChange: function (checked) { return _this.onYAxisInvertedChanged(checked); }, checked: this.state.ChartProperties.YAxisInverted }, "Axis Inverted")),
                    React.createElement(FormLayout_1.FormRow, { label: "Axis Location" },
                        React.createElement(Dropdown_1.default, { style: { maxWidth: 'inherit', width: '100%' }, placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ChartProperties.YAxisLabelLocation, onChange: function (x) { return _this.onYAxisLabelLocationChange(x); }, options: CategoryChartUIHelper_1.CategoryChartUIHelper.getYAxisLabelsLocations() })),
                    React.createElement(FormLayout_1.FormRow, { label: "Labels Scale" },
                        React.createElement(Dropdown_1.default, { style: { maxWidth: 'inherit', width: '100%' }, placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ChartProperties.YAxisLabelScale, onChange: function (x) { return _this.onYAxisLabelScaleChanged(x); }, options: CategoryChartUIHelper_1.CategoryChartUIHelper.getAxisLabelScales() })),
                    React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                                return _this.onSetYAxisMinValueOptionChanged(checked);
                            }, checked: this.state.SetYAxisMinimumValue }, "Labels Min") }, this.state.SetYAxisMinimumValue && (React.createElement(Input_1.default, { type: "number", placeholder: 'Input', width: "100%", onChange: this.onYAxisMinValueChanged, value: this.state.ChartProperties.YAxisMinimumValue }))),
                    React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                                return _this.onSetYAxisMaxValueOptionChanged(checked);
                            }, checked: this.state.SetYAxisMinimumValue }, "Labels Max") }, this.state.SetYAxisMinimumValue && (React.createElement(Input_1.default, { type: "number", placeholder: 'Input', width: "100%", onChange: this.onYAxisMaxValueChanged, value: this.state.ChartProperties.YAxisMaximumValue }))),
                    React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                                return _this.onSetYAxisIntervalValueOptionChanged(checked);
                            }, checked: this.state.ChartProperties.YAxisIntervalCustom }, "Labels Interval") }, this.state.ChartProperties.YAxisIntervalCustom && (React.createElement(Input_1.default, { type: "number", placeholder: 'Input', onChange: this.onYAxisIntervalValueChanged, value: this.state.ChartProperties.YAxisIntervalValue }))),
                    React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                                return _this.onSetYAxisLabelColorOptionChanged(checked);
                            }, checked: this.state.SetYAxisLabelColor }, "Labels Color") }, this.state.SetYAxisLabelColor && (React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.ChartProperties.YAxisLabelColor, onChange: function (x) { return _this.onYAxisLabelColorChange(x); } }))),
                    React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                                return _this.onUseDefaultYAxisTitleOptionChanged(checked);
                            }, checked: this.state.UseDefaultYAxisTitle }, "Title Default") }, this.state.UseDefaultYAxisTitle == false && (React.createElement(Input_1.default, { type: "text", placeholder: 'Enter Title', onChange: function (e) { return _this.onYAxisTitleChanged(e); }, value: this.state.ChartProperties.YAxisTitle }))),
                    React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                                return _this.onSetYAxisTitleColorOptionChanged(checked);
                            }, checked: this.state.SetYAxisTitleColor }, "Title Color") }, this.state.SetYAxisTitleColor && (React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.ChartProperties.YAxisTitleColor, onChange: function (x) { return _this.onYAxisTitleColorChange(x); } })))))))),
            React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'X (Horizontal) Axis', button: showXAxisPropertiesButton, style: { marginTop: '2px' } }, this.state.IsXAxisMinimised == false && (React.createElement(FormLayout_1.default, { columns: COLS },
                React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onXAxisVisibilityOptionChanged(checked); }, checked: this.state.ChartProperties.XAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible }, "Axis Visible") }),
                this.state.ChartProperties.XAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible && (React.createElement(React.Fragment, null,
                    React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onXAxisInvertedChanged(checked); }, checked: this.state.ChartProperties.XAxisInverted }, "Axis Inverted") }),
                    React.createElement(FormLayout_1.FormRow, { label: "Labels Angle" },
                        React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ChartProperties.XAxisAngle, onChange: function (x) { return _this.onXAxisAngleChanged(x); }, options: CategoryChartUIHelper_1.CategoryChartUIHelper.getAxisAngleOptions() })),
                    React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                                return _this.onSetXAxisLabelColorOptionChanged(checked);
                            }, checked: this.state.SetXAxisLabelColor }, "Labels Color") }, this.state.SetXAxisLabelColor && (React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.ChartProperties.XAxisLabelColor, onChange: function (x) { return _this.onXAxisLabelColorChange(x); } }))),
                    React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                                return _this.onSetXAxisIntervalValueOptionChanged(checked);
                            }, checked: this.state.ChartProperties.XAxisIntervalCustom }, "Labels Interval") }, this.state.ChartProperties.XAxisIntervalCustom && (React.createElement(Input_1.default, { type: "number", placeholder: 'Input', onChange: this.onXAxisIntervalValueChanged, value: this.state.ChartProperties.XAxisIntervalValue }))),
                    React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                                return _this.onUseDefaultXAxisTitleOptionChanged(checked);
                            }, checked: this.state.UseDefaultXAxisTitle }, "Title Default") }, this.state.UseDefaultXAxisTitle == false && (React.createElement(Input_1.default, { type: "text", placeholder: 'Enter Title', onChange: function (e) { return _this.onXAxisTitleChanged(e); }, value: this.state.ChartProperties.XAxisTitle }))),
                    React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                                return _this.onSetXAxisTitleColorOptionChanged(checked);
                            }, checked: this.state.SetXAxisTitleColor }, "Title Color") }, this.state.SetXAxisTitleColor && (React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.ChartProperties.XAxisTitleColor, onChange: function (x) { return _this.onXAxisTitleColorChange(x); } })))))))),
            React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'Annotations', button: showHighlightsPropertiesButton, style: { marginTop: '2px' } }, this.state.IsHighlightsMinimised == false && (React.createElement(FormLayout_1.default, { columns: COLS },
                React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                            return _this.onEnableFinalValueAnnotationsOptionChanged(checked);
                        }, checked: this.state.ChartProperties.EnableFinalValueAnnotations }, "Final Values") }),
                React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (e) { return _this.onEnableSeriesHighlightingOptionChanged(e); }, checked: this.state.ChartProperties.EnableSeriesHighlighting }, "Highlight Series") }),
                React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                            return _this.onEnableCategoryHighlightingOptionChanged(checked);
                        }, checked: this.state.ChartProperties.EnableCategoryHighlighting }, "Highlight Category") }),
                React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) {
                            return _this.onEnableItemHighlightingOptionChanged(checked);
                        }, checked: this.state.ChartProperties.EnableItemHighlighting }, "Highlight Item") }),
                React.createElement(FormLayout_1.FormRow, { label: 'Callout Type' },
                    React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ChartProperties.CalloutsType, onChange: function (x) { return _this.onChangedCalloutsType(x); }, options: CategoryChartUIHelper_1.CategoryChartUIHelper.getCalloutTypeOptions() })),
                React.createElement(FormLayout_1.FormRow, { label: 'Callout Interval' },
                    React.createElement(Input_1.default, { value: this.state.ChartProperties.CalloutsInterval, type: "number", min: "1", step: "1", max: "20", placeholder: "Enter", onChange: function (e) { return _this.onChangedCalloutsInterval(e); } })),
                React.createElement(FormLayout_1.FormRow, { label: "Tooltips" },
                    React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ChartProperties.ToolTipType, onChange: function (x) { return _this.onToolTipTypeChange(x); }, options: CategoryChartUIHelper_1.CategoryChartUIHelper.getToolTipOptions() })),
                React.createElement(FormLayout_1.FormRow, { label: "Crosshairs" },
                    React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ChartProperties.CrosshairDisplayMode, onChange: function (x) { return _this.onCrosshairsModeChange(x); }, options: CategoryChartUIHelper_1.CategoryChartUIHelper.getCrossHairModeOptions() })),
                this.state.ChartProperties.CrosshairDisplayMode != ChartEnums_1.CrosshairDisplayMode.None && (React.createElement(React.Fragment, null,
                    React.createElement(FormLayout_1.FormRow, null,
                        React.createElement("div", null),
                        React.createElement(CheckBox_1.default, { onChange: function (checked) {
                                return _this.onCrosshairSnapToDataOptionChanged(checked);
                            }, checked: this.state.ChartProperties.CrosshairSnapToData }, "Snap to Data")),
                    React.createElement(FormLayout_1.FormRow, null,
                        React.createElement("div", null),
                        React.createElement(CheckBox_1.default, { onChange: function (checked) {
                                return _this.onCrosshairAnnotationEnabledOptionChanged(checked);
                            }, checked: this.state.ChartProperties.CrosshairAnnotationEnabled }, "Show Values"))))))),
            React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'Misc', button: showMiscPropertiesButton, style: { marginTop: '2px' } }, this.state.IsMiscMinimised == false && (React.createElement(FormLayout_1.default, { columns: COLS },
                React.createElement(FormLayout_1.FormRow, { label: "Title" },
                    React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ChartProperties.TitleAlignment, onChange: function (x) { return _this.onTitleAlignmentChange(x); }, options: CategoryChartUIHelper_1.CategoryChartUIHelper.getAlignmentOptions() })),
                React.createElement(FormLayout_1.FormRow, { label: "Subtitle" },
                    React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ChartProperties.SubTitleAlignment, onChange: function (x) { return _this.onSubTitleAlignmentChange(x); }, options: CategoryChartUIHelper_1.CategoryChartUIHelper.getAlignmentOptions() })),
                React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (e) { return _this.onEnableTransitionsOptionChanged(e); }, checked: this.state.ChartProperties.EnableTransitions }, "Enable Transitions") }),
                this.state.ChartProperties.EnableTransitions && (React.createElement(FormLayout_1.FormRow, { label: "Duration" },
                    React.createElement(Input_1.default, { placeholder: 'Length (ms)', type: "number", onChange: this.onTransitionDurationChanged, value: this.state.ChartProperties.TransitionInDuration }))))))));
        return this.props.ChartData.Data != null ? (React.createElement(ChartContainer_1.ChartContainer, { button: !this.state.IsChartSettingsVisible ? openChartSettingsButton : null, chart: chartElement, settingsPanel: this.state.IsChartSettingsVisible ? settingsPanel : null })) : null;
    };
    CategoryChartComponent.prototype.calloutStyleUpdating = function (args) {
        if (args.item && this.seriesColors.has(args.item)) {
            var color = this.seriesColors.get(args.item);
            args.outline = color;
            args.background = color;
            args.leaderBrush = '#d8d8d8';
            args.textColor = 'white';
        }
    };
    CategoryChartComponent.prototype.seriesAdded = function (args) {
        var series = args.series;
        if (series && series.valueMemberPath && series.valueMemberPath !== '') {
            this.seriesColors.set(series.valueMemberPath, args.series.actualBrush);
        }
    };
    CategoryChartComponent.prototype.onSetPropertyDefaults = function () {
        // this overrides what has been set in predefined config with defaults - is that right?
        // or should it just override what has been changed ?
        // first update our state
        this.setState(CategoryChartUIHelper_1.CategoryChartUIHelper.setDefaultChartDisplayPopupState());
        // then update the properties
        var chartProperties = Helper_1.Helper.cloneObject(DefaultCategoryChartProperties_1.DefaultCategoryChartProperties);
        // do the titles
        chartProperties.YAxisTitle = this.getYAxisTitle(true);
        chartProperties.XAxisTitle = this.getXAxisTitle(true);
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onShowGeneralProperties = function () {
        this.setState({
            IsYAxisMinimised: true,
            IsGeneralMinimised: false,
            IsXAxisMinimised: true,
            IsHighlightsMinimised: true,
            IsMiscMinimised: true,
        });
    };
    CategoryChartComponent.prototype.onShowYAxisProperties = function () {
        this.setState({
            IsYAxisMinimised: false,
            IsGeneralMinimised: true,
            IsXAxisMinimised: true,
            IsHighlightsMinimised: true,
            IsMiscMinimised: true,
        });
    };
    CategoryChartComponent.prototype.onShowXAxisProperties = function () {
        this.setState({
            IsYAxisMinimised: true,
            IsGeneralMinimised: true,
            IsXAxisMinimised: false,
            IsHighlightsMinimised: true,
            IsMiscMinimised: true,
        });
    };
    CategoryChartComponent.prototype.onShowHighlightsProperties = function () {
        this.setState({
            IsYAxisMinimised: true,
            IsGeneralMinimised: true,
            IsXAxisMinimised: true,
            IsHighlightsMinimised: false,
            IsMiscMinimised: true,
        });
    };
    CategoryChartComponent.prototype.onShowMiscProperties = function () {
        this.setState({
            IsYAxisMinimised: true,
            IsGeneralMinimised: true,
            IsXAxisMinimised: true,
            IsHighlightsMinimised: true,
            IsMiscMinimised: false,
        });
    };
    CategoryChartComponent.prototype.onHidePropertiesGroup = function () {
        this.setState({
            IsYAxisMinimised: true,
            IsGeneralMinimised: true,
            IsXAxisMinimised: true,
            IsHighlightsMinimised: true,
            IsMiscMinimised: true,
        });
    };
    CategoryChartComponent.prototype.onShowChartSettings = function () {
        this.setState({ IsChartSettingsVisible: true });
    };
    CategoryChartComponent.prototype.onHideChartSettings = function () {
        this.setState({ IsChartSettingsVisible: false });
    };
    CategoryChartComponent.prototype.onChartTypeChange = function (value) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.CategoryChartType = value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onMarkerTypeChange = function (value) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.MarkerType = value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onYAxisLabelLocationChange = function (value) {
        var chartProperties = this.state.ChartProperties;
        var selected = value;
        if (selected.indexOf('Left') > 0) {
            chartProperties.YAxisLabelLocation = ChartEnums_1.AxisLabelsLocation.OutsideLeft;
        }
        else {
            chartProperties.YAxisLabelLocation = ChartEnums_1.AxisLabelsLocation.OutsideRight;
        }
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onXAxisLabelLocationChange = function (event) {
        var e = event.target;
        var chartProperties = this.state.ChartProperties;
        var selected = e.value.toString();
        if (selected.indexOf('Top') > 0) {
            chartProperties.XAxisLabelLocation = ChartEnums_1.AxisLabelsLocation.OutsideTop;
        }
        else {
            chartProperties.XAxisLabelLocation = ChartEnums_1.AxisLabelsLocation.OutsideBottom;
        }
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onYAxisLabelColorChange = function (event) {
        var e = event.target;
        var chartProperties = this.state.ChartProperties;
        chartProperties.YAxisLabelColor = e.value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onXAxisLabelColorChange = function (event) {
        var e = event.target;
        var chartProperties = this.state.ChartProperties;
        chartProperties.XAxisLabelColor = e.value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onYAxisTitleColorChange = function (event) {
        var e = event.target;
        var chartProperties = this.state.ChartProperties;
        chartProperties.YAxisTitleColor = e.value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onXAxisTitleColorChange = function (event) {
        var e = event.target;
        var chartProperties = this.state.ChartProperties;
        chartProperties.XAxisTitleColor = e.value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onToolTipTypeChange = function (value) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.ToolTipType = value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onChangedCalloutsType = function (value) {
        var chartProperties = this.state.ChartProperties;
        // Note not changing to CalloutsType enum because a user might selected a da column name from data source
        chartProperties.CalloutsType = value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onChangedCalloutsInterval = function (event) {
        var e = event.target;
        var value = Number(e.value);
        if (value >= 1000) {
            value = 1000;
        }
        if (value < 1) {
            value = 1;
        }
        var chartProperties = this.state.ChartProperties;
        chartProperties.CalloutsInterval = value;
        // chartProperties.CalloutsInterval = e.target.value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onCrosshairsModeChange = function (value) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.CrosshairDisplayMode = value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onCrosshairSnapToDataOptionChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.CrosshairSnapToData = checked;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onCrosshairAnnotationEnabledOptionChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.CrosshairAnnotationEnabled = checked;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onEnableFinalValueAnnotationsOptionChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.EnableFinalValueAnnotations = checked;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onEnableSeriesHighlightingOptionChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.EnableSeriesHighlighting = checked;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onEnableCategoryHighlightingOptionChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.EnableCategoryHighlighting = checked;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onEnableItemHighlightingOptionChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.EnableItemHighlighting = checked;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onEnableTransitionsOptionChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.EnableTransitions = checked;
        if (checked == false) {
            chartProperties.TransitionInDuration = undefined;
        }
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onYAxisInvertedChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.YAxisInverted = checked;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onXAxisInvertedChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.XAxisInverted = checked;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onSetYAxisMinValueOptionChanged = function (checked) {
        if (checked) {
            this.setState({ SetYAxisMinimumValue: true });
        }
        else {
            // set YAxisMinValue to undefined
            this.setState({ SetYAxisMinimumValue: checked });
            var chartProperties = this.state.ChartProperties;
            chartProperties.YAxisMinimumValue = undefined;
            this.updateChartProperties(chartProperties);
        }
    };
    CategoryChartComponent.prototype.onSetYAxisMaxValueOptionChanged = function (checked) {
        if (checked) {
            this.setState({ SetYAxisMaximumValue: true });
        }
        else {
            // set YAxisMaxValue to undefined
            this.setState({ SetYAxisMaximumValue: checked });
            var chartProperties = this.state.ChartProperties;
            chartProperties.YAxisMaximumValue = undefined;
            this.updateChartProperties(chartProperties);
        }
    };
    CategoryChartComponent.prototype.onSetYAxisIntervalValueOptionChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.YAxisIntervalCustom = checked;
        if (!checked) {
            // set YAxisIntervalValue to undefined so it is auto calculated by the chart
            chartProperties.YAxisIntervalValue = undefined;
        }
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onSetXAxisIntervalValueOptionChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.XAxisIntervalCustom = checked;
        if (!checked) {
            // set XAxisIntervalValue to undefined so it is auto calculated by the chart
            chartProperties.XAxisIntervalValue = undefined;
        }
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onSetYAxisLabelColorOptionChanged = function (checked) {
        var e = event.target;
        if (checked) {
            this.setState({ SetYAxisLabelColor: true });
        }
        else {
            // set YAxisMinValue to undefined
            this.setState({ SetYAxisLabelColor: checked });
            var chartProperties = this.state.ChartProperties;
            chartProperties.YAxisLabelColor = '';
            this.updateChartProperties(chartProperties);
        }
    };
    CategoryChartComponent.prototype.onSetXAxisLabelColorOptionChanged = function (checked) {
        if (checked) {
            this.setState({ SetXAxisLabelColor: true });
        }
        else {
            // set YAxisMinValue to undefined
            this.setState({ SetXAxisLabelColor: checked });
            var chartProperties = this.state.ChartProperties;
            chartProperties.XAxisLabelColor = '';
            this.updateChartProperties(chartProperties);
        }
    };
    CategoryChartComponent.prototype.onSetYAxisTitleColorOptionChanged = function (checked) {
        if (checked) {
            this.setState({ SetYAxisTitleColor: true });
        }
        else {
            // set YAxisMinValue to undefined
            this.setState({ SetYAxisTitleColor: checked });
            var chartProperties = this.state.ChartProperties;
            chartProperties.YAxisTitleColor = '';
            this.updateChartProperties(chartProperties);
        }
    };
    CategoryChartComponent.prototype.onSetXAxisTitleColorOptionChanged = function (checked) {
        if (checked) {
            this.setState({ SetXAxisTitleColor: true });
        }
        else {
            // set YAxisMinValue to undefined
            this.setState({ SetXAxisTitleColor: checked });
            var chartProperties = this.state.ChartProperties;
            chartProperties.XAxisTitleColor = '';
            this.updateChartProperties(chartProperties);
        }
    };
    CategoryChartComponent.prototype.onTitleAlignmentChange = function (value) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.TitleAlignment = value;
        this.updateChartProperties(chartProperties);
        var titleMargin = value == ChartEnums_1.HorizontalAlignment.Right ? 5 : 0;
        this.setState({ TitleMargin: titleMargin });
    };
    CategoryChartComponent.prototype.onSubTitleAlignmentChange = function (value) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.SubTitleAlignment = value;
        this.updateChartProperties(chartProperties);
        var subtitleMargin = value == ChartEnums_1.HorizontalAlignment.Right ? 5 : 0;
        this.setState({ SubTitleMargin: subtitleMargin });
    };
    CategoryChartComponent.prototype.updateChartProperties = function (chartProperties) {
        this.setState({ ChartProperties: chartProperties });
        this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Uuid, chartProperties);
    };
    CategoryChartComponent.prototype.onXAxisVisibilityOptionChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.XAxisLabelVisibility = checked
            ? ChartEnums_1.LabelVisibility.Visible
            : ChartEnums_1.LabelVisibility.Collapsed;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onYAxisVisibilityOptionChanged = function (checked) {
        var e = event.target;
        var chartProperties = this.state.ChartProperties;
        chartProperties.YAxisLabelVisibility = checked
            ? ChartEnums_1.LabelVisibility.Visible
            : ChartEnums_1.LabelVisibility.Collapsed;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onYAxisTitleChanged = function (event) {
        var e = event.target;
        var chartProperties = this.state.ChartProperties;
        chartProperties.YAxisTitle = e.value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onXAxisGapChanged = function (event) {
        var e = event.target;
        var factor = Number(e.value);
        if (factor > 1) {
            factor = 1;
        }
        if (factor < 0) {
            factor = 0;
        }
        var chartProperties = this.state.ChartProperties;
        chartProperties.XAxisGap = factor;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onXAxisOverlapChanged = function (event) {
        var e = event.target;
        var factor = Number(e.value);
        if (factor > 1) {
            factor = 1;
        }
        if (factor < 0) {
            factor = 0;
        }
        var chartProperties = this.state.ChartProperties;
        chartProperties.XAxisOverlap = factor;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onXAxisTitleChanged = function (event) {
        var e = event.target;
        var chartProperties = this.state.ChartProperties;
        chartProperties.XAxisTitle = e.value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onXAxisAngleChanged = function (value) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.XAxisAngle = value;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onYAxisLabelScaleChanged = function (value) {
        var scale = value;
        var chartProperties = this.state.ChartProperties;
        // chartProperties.YAxisIsLogarithmic = scale == AxisScale.Log;
        chartProperties.YAxisLabelScale = scale;
        this.updateChartProperties(chartProperties);
    };
    CategoryChartComponent.prototype.onUseDefaultYAxisTitleOptionChanged = function (checked) {
        if (checked) {
            // if its not checked then we need to clear the title
            var chartProperties = this.state.ChartProperties;
            chartProperties.YAxisTitle = '';
            this.updateChartProperties(chartProperties);
        }
        // do we really need to update ChartDisplayPopupState?
        this.setState({ UseDefaultYAxisTitle: checked });
    };
    CategoryChartComponent.prototype.onUseDefaultXAxisTitleOptionChanged = function (checked) {
        if (checked) {
            // if its not checked then we need to clear the title
            var chartProperties = this.state.ChartProperties;
            chartProperties.XAxisTitle = '';
            this.updateChartProperties(chartProperties);
        }
        // do we really need to update ChartDisplayPopupState?
        this.setState({ UseDefaultXAxisTitle: checked });
    };
    CategoryChartComponent.prototype.getYAxisTitle = function (useDefault) {
        if (useDefault) {
            return CategoryChartUIHelper_1.CategoryChartUIHelper.createDefaultYAxisTitle(this.props.CurrentChartDefinition, this.props.Columns);
        }
        return this.state.ChartProperties.YAxisTitle;
    };
    CategoryChartComponent.prototype.getXAxisTitle = function (useDefault) {
        if (useDefault) {
            return CategoryChartUIHelper_1.CategoryChartUIHelper.createDefaultXAxisTitle(this.props.CurrentChartDefinition, this.props.Columns);
        }
        return this.state.ChartProperties.XAxisTitle;
    };
    CategoryChartComponent.prototype.getYAxisIsLogarithmic = function (scaleMode) {
        return scaleMode == ChartEnums_1.AxisScale.Log;
    };
    return CategoryChartComponent;
}(React.Component));
exports.CategoryChartComponent = CategoryChartComponent;
