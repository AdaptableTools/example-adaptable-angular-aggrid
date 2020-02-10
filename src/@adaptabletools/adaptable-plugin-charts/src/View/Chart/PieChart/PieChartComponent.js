"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var igr_item_legend_module_1 = require("igniteui-react-charts/ES2015/igr-item-legend-module");
var igr_item_legend_1 = require("igniteui-react-charts/ES2015/igr-item-legend");
var igr_doughnut_chart_module_1 = require("igniteui-react-charts/ES2015/igr-doughnut-chart-module");
var igr_doughnut_chart_1 = require("igniteui-react-charts/ES2015/igr-doughnut-chart");
var igr_ring_series_module_1 = require("igniteui-react-charts/ES2015/igr-ring-series-module");
var igr_ring_series_1 = require("igniteui-react-charts/ES2015/igr-ring-series");
var igr_pie_chart_1 = require("igniteui-react-charts/ES2015/igr-pie-chart");
var igr_pie_chart_module_1 = require("igniteui-react-charts/ES2015/igr-pie-chart-module");
var PieChartUIHelper_1 = require("./PieChartUIHelper");
var ButtonMaximise_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonMaximise");
var ButtonMinimise_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonMinimise");
var ButtonClose_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonClose");
var ButtonGeneral_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonGeneral");
var Helper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/Helper");
var DefaultPieChartProperties_1 = require("@adaptabletools/adaptable/src/Utilities/Defaults/DefaultPieChartProperties");
var PanelWithTwoButtons_1 = require("@adaptabletools/adaptable/src/View/Components/Panels/PanelWithTwoButtons");
var PanelWithButton_1 = require("@adaptabletools/adaptable/src/View/Components/Panels/PanelWithButton");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var AdaptablePopover_1 = require("@adaptabletools/adaptable/src/View/AdaptablePopover");
var EnumExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/EnumExtensions");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var FormLayout_1 = require("@adaptabletools/adaptable/src/components/FormLayout");
var Dropdown_1 = require("@adaptabletools/adaptable/src/components/Dropdown");
var rebass_1 = require("rebass");
var Input_1 = require("@adaptabletools/adaptable/src/components/Input");
var HelpBlock_1 = require("@adaptabletools/adaptable/src/components/HelpBlock");
var Panel_1 = require("@adaptabletools/adaptable/src/components/Panel");
var CheckBox_1 = require("@adaptabletools/adaptable/src/components/CheckBox");
var ChartContainer_1 = require("@adaptabletools/adaptable/src/components/ChartContainer");
var defaultButtonProps = {
    variant: 'text',
};
var COLS = [{ name: 'label', style: { textAlign: 'start' } }, { name: '2' }];
/*
This is really only going to be for Category Charts.
As we add other chart types we will need to rethink this and some of the assumptions
*/
var PieChartComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PieChartComponent, _super);
    function PieChartComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.onOthersCategoryThresholdChanged = function (e) {
            var chartProperties = _this.state.ChartProperties;
            chartProperties.OthersCategoryThreshold = e.target.value;
            _this.updateChartProperties(chartProperties);
        };
        _this.state = PieChartUIHelper_1.PieChartUIHelper.setChartDisplayPopupState(_this.props.CurrentChartDefinition, _this.props.ChartData);
        igr_pie_chart_module_1.IgrPieChartModule.register();
        igr_doughnut_chart_module_1.IgrDoughnutChartModule.register();
        igr_ring_series_module_1.IgrRingSeriesModule.register();
        igr_item_legend_module_1.IgrItemLegendModule.register();
        _this.onPieChartRef = _this.onPieChartRef.bind(_this);
        _this.onDoughnutChartRef = _this.onDoughnutChartRef.bind(_this);
        _this.onDoughnutLegendRef = _this.onDoughnutLegendRef.bind(_this);
        _this.onPieChartLegendRef = _this.onPieChartLegendRef.bind(_this);
        return _this;
    }
    PieChartComponent.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, nextContext) {
        this.setState(PieChartUIHelper_1.PieChartUIHelper.setChartDisplayPopupState(nextProps.CurrentChartDefinition, nextProps.ChartData));
    };
    PieChartComponent.prototype.render = function () {
        var _this = this;
        var chartTitle = this.props.CurrentChartDefinition.Name;
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.CurrentChartDefinition.Description)) {
            chartTitle += ' : ' + this.props.CurrentChartDefinition.Description;
        }
        var chartErrorMessage = this.props.ChartData != null &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.ChartData.ErrorMessage)
            ? this.props.ChartData.ErrorMessage
            : null;
        var showGeneralPropertiesButton = this.state.IsGeneralMinimised ? (React.createElement(ButtonMaximise_1.ButtonMaximise, tslib_1.__assign({}, defaultButtonProps, { onClick: function () { return _this.onShowGeneralProperties(); }, tooltip: 'Show GeneralProperties' }))) : (React.createElement(ButtonMinimise_1.ButtonMinimise, tslib_1.__assign({}, defaultButtonProps, { onClick: function () { return _this.onHidePropertiesGroup(); }, tooltip: 'Hide General Properties' })));
        var closeChartSettingsButton = (React.createElement(ButtonClose_1.ButtonClose, tslib_1.__assign({}, defaultButtonProps, { style: { color: 'var(--ab-color-defaultbackground' }, onClick: function () { return _this.onHideChartSettings(); }, tooltip: 'Close Chart Settings' })));
        var openChartSettingsButton = (React.createElement(ButtonGeneral_1.ButtonGeneral, { style: { alignSelf: 'flex-end' }, onClick: function () { return _this.onShowChartSettings(); } }, "Show Chart Settings"));
        var setDefaultsButton = (React.createElement(ButtonGeneral_1.ButtonGeneral, { style: { color: 'var(--ab-color-defaultbackground' }, onClick: function () { return _this.onSetPropertyDefaults(); } }, "Reset"));
        var chart = this.state.ChartProperties.ShowAsDoughnut ? (React.createElement(igr_doughnut_chart_1.IgrDoughnutChart, { width: '400px', height: '400px', allowSliceSelection: "true", allowSliceExplosion: "true", sliceClick: function (s, e) { return _this.onSliceClick(e); }, ref: this.onDoughnutChartRef },
            React.createElement(igr_ring_series_1.IgrRingSeries, { name: "ring1", dataSource: this.state.DataSource, labelMemberPath: this.state.ChartProperties.SliceLabelsMapping, labelsPosition: this.state.ChartProperties.PieChartLabelPosition, valueMemberPath: this.state.ChartProperties.SliceValuesMapping, legendLabelMemberPath: this.state.ChartProperties.SliceLegendMapping, othersCategoryThreshold: this.state.ChartProperties.OthersCategoryThreshold, othersCategoryType: this.state.ChartProperties.OthersCategoryType, othersCategoryText: "Others", brushes: this.state.SliceBrushes, outlines: this.state.SliceBrushes, radiusFactor: 0.8 }))) : (React.createElement(igr_pie_chart_1.IgrPieChart, { ref: this.onPieChartRef, dataSource: this.state.DataSource, labelsPosition: this.state.ChartProperties.PieChartLabelPosition, width: '400px', height: '400px', radiusFactor: 0.8, labelMemberPath: this.state.ChartProperties.SliceLabelsMapping, valueMemberPath: this.state.ChartProperties.SliceValuesMapping, legendLabelMemberPath: this.state.ChartProperties.SliceLegendMapping, othersCategoryThreshold: this.state.ChartProperties.OthersCategoryThreshold, othersCategoryType: this.state.ChartProperties.OthersCategoryType, othersCategoryText: "Others", othersCategoryFill: "#9A9A9A", othersCategoryStroke: "#9A9A9A", brushes: this.state.SliceBrushes, outlines: this.state.SliceBrushes, selectionMode: "single", sliceClick: function (s, e) { return _this.onSliceClick(e); } }));
        var chartElement = this.props.ChartData != null && chartErrorMessage == null ? (chart) : (React.createElement(HelpBlock_1.default, null, chartErrorMessage));
        var legendPanel = (React.createElement(Panel_1.default, { variant: "default" },
            React.createElement(FormLayout_1.default, null,
                React.createElement(FormLayout_1.FormRow, { label: "Sort by" },
                    React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.SliceSortOption, onChange: function (x) { return _this.onSliceSortByColumnChanged(x); }, options: this.getOptionsForSliceSortOrders() }))),
            this.state.ChartProperties.ShowAsDoughnut ? (React.createElement("div", { className: "doughnutLegend" },
                React.createElement(igr_item_legend_1.IgrItemLegend, { ref: this.onDoughnutLegendRef }))) : (React.createElement("div", { className: "pieChartLegend" },
                React.createElement(igr_item_legend_1.IgrItemLegend, { ref: this.onPieChartLegendRef })))));
        var sidePanel = (React.createElement(PanelWithTwoButtons_1.PanelWithTwoButtons, { headerText: 'Chart Settings', firstButton: closeChartSettingsButton, secondButton: setDefaultsButton, variant: "primary" },
            React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", headerText: 'General', button: showGeneralPropertiesButton, style: { marginTop: '2px' } }, this.state.IsGeneralMinimised == false && (React.createElement(FormLayout_1.default, { columns: COLS },
                React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { style: { fontSize: 'small', marginBottom: '0px', marginTop: '0px' }, onChange: function (checked) { return _this.onPieOrDoughnutViewChanged(checked); }, checked: this.state.ChartProperties.ShowAsDoughnut }, "Show as 'Doughnut'") }),
                React.createElement(FormLayout_1.FormRow, { label: "Others Band" },
                    React.createElement(rebass_1.Flex, { alignItems: "row" },
                        React.createElement(Input_1.default, { type: "number", min: "0", step: "1", placeholder: 'Input', onChange: this.onOthersCategoryThresholdChanged, value: this.state.ChartProperties.OthersCategoryThreshold }),
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Pie Chart: Others Threshold', bodyText: [
                                'Items with value less than or equal to the Threshold will be assigned to the “Others” category.  Choose whether this will be interpreted as a percentage or as a value.',
                            ] }))),
                React.createElement(FormLayout_1.FormRow, { label: React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onThresholdAsPercentChanged(checked); }, checked: this.state.ChartProperties.OthersCategoryType == ChartEnums_1.OthersCategoryType.Percent }, "Others Band As %") }),
                React.createElement(FormLayout_1.FormRow, { label: "Labels Position" },
                    React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ChartProperties.PieChartLabelPosition, onChange: function (x) { return _this.onSliceLabelsPositionChanged(x); }, options: this.getOptionsForLabelsPosition() })),
                React.createElement(FormLayout_1.FormRow, { label: "Labels Content" },
                    React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.ChartProperties.SliceLabelsMapping, onChange: function (x) { return _this.onSliceLabelsMappingChanged(x); }, options: this.getOptionsForSliceLabelsMapping() }))))),
            legendPanel));
        return this.props.ChartData != null ? (React.createElement(ChartContainer_1.ChartContainer, { button: !this.state.IsChartSettingsVisible ? openChartSettingsButton : null, chart: chartElement, title: chartTitle, settingsPanel: this.state.IsChartSettingsVisible ? sidePanel : null })) : null;
    };
    PieChartComponent.prototype.onDoughnutChartRef = function (doughnutChart) {
        this.doughnutChart = doughnutChart;
        if (this.doughnutLegend && this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutLegend;
        }
    };
    PieChartComponent.prototype.onPieChartRef = function (pieChart) {
        this.pieChart = pieChart;
        if (this.pieChartLegend && this.pieChart) {
            this.pieChart.legend = this.pieChartLegend;
        }
    };
    PieChartComponent.prototype.onDoughnutLegendRef = function (legend) {
        this.doughnutLegend = legend;
        if (this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutLegend;
        }
    };
    PieChartComponent.prototype.onPieChartLegendRef = function (legend) {
        this.pieChartLegend = legend;
        if (this.pieChart) {
            this.pieChart.legend = this.pieChartLegend;
        }
    };
    PieChartComponent.prototype.onShowGeneralProperties = function () {
        this.setState({ IsGeneralMinimised: false });
    };
    PieChartComponent.prototype.onHidePropertiesGroup = function () {
        this.setState({ IsGeneralMinimised: true });
    };
    PieChartComponent.prototype.onShowChartSettings = function () {
        this.setState({ IsChartSettingsVisible: true });
    };
    PieChartComponent.prototype.onHideChartSettings = function () {
        this.setState({ IsChartSettingsVisible: false });
    };
    PieChartComponent.prototype.onSetPropertyDefaults = function () {
        // first update our state
        this.setState(PieChartUIHelper_1.PieChartUIHelper.setDefaultChartDisplayPopupState());
        // then update the properties
        var chartProperties = Helper_1.Helper.cloneObject(DefaultPieChartProperties_1.DefaultPieChartProperties);
        this.updateChartProperties(chartProperties);
    };
    PieChartComponent.prototype.updateChartProperties = function (chartProperties) {
        this.setState({ ChartProperties: chartProperties });
        this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Uuid, chartProperties);
    };
    PieChartComponent.prototype.onPieOrDoughnutViewChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.ShowAsDoughnut = checked;
        this.updateChartProperties(chartProperties);
    };
    PieChartComponent.prototype.onThresholdAsPercentChanged = function (checked) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.OthersCategoryType = checked
            ? ChartEnums_1.OthersCategoryType.Percent
            : ChartEnums_1.OthersCategoryType.Number;
        this.updateChartProperties(chartProperties);
    };
    PieChartComponent.prototype.onSliceLabelsPositionChanged = function (value) {
        var chartProperties = this.state.ChartProperties;
        chartProperties.PieChartLabelPosition = value;
        this.updateChartProperties(chartProperties);
    };
    PieChartComponent.prototype.onSliceLabelsMappingChanged = function (labelMapping) {
        var legendMapping = labelMapping.includes('Ratio')
            ? ChartEnums_1.SliceLabelOption.RatioAndName
            : ChartEnums_1.SliceLabelOption.ValueAndName;
        var chartProperties = this.state.ChartProperties;
        chartProperties.SliceLabelsMapping = labelMapping;
        chartProperties.SliceLegendMapping = legendMapping;
        this.updateChartProperties(chartProperties);
    };
    PieChartComponent.prototype.onSliceSortByColumnChanged = function (sliceSortOption) {
        var oldData = this.state.DataSource;
        var newData = PieChartUIHelper_1.PieChartUIHelper.sortDataSource(sliceSortOption, oldData);
        this.setState({
            SliceSortOption: sliceSortOption,
            DataSource: newData,
        });
    };
    PieChartComponent.prototype.onSliceClick = function (e) {
        e.isExploded = !e.isExploded;
        e.isSelected = !e.isSelected;
        if (e.isExploded) {
            //    this.setState({ CurrentColumnCount: ds.Value, CurrentColumnValue: ds.Name } as PieChartComponentState);
        }
        else {
            //    this.setState({ CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartComponentState);
        }
    };
    // want to move to helper - not sure why i cannot
    PieChartComponent.prototype.getOptionsForLabelsPosition = function () {
        return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.PieChartLabelPosition).map(function (v) {
            return { value: v, label: v };
        });
    };
    PieChartComponent.prototype.getOptionsForSliceLabelsMapping = function () {
        return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.SliceLabelOption).map(function (v) {
            return { value: v, label: v };
        });
    };
    PieChartComponent.prototype.getOptionsForSliceSortOrders = function () {
        return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.SliceSortOption).map(function (v) {
            return { value: v, label: v };
        });
    };
    return PieChartComponent;
}(React.Component));
exports.PieChartComponent = PieChartComponent;
