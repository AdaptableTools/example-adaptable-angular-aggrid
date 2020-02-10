"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var Enums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums");
var PanelWithImage_1 = require("@adaptabletools/adaptable/src/View/Components/Panels/PanelWithImage");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var ColumnSelector_1 = require("@adaptabletools/adaptable/src/View/Components/Selectors/ColumnSelector");
var igr_item_legend_module_1 = require("igniteui-react-charts/ES2015/igr-item-legend-module");
var igr_item_legend_1 = require("igniteui-react-charts/ES2015/igr-item-legend");
var igr_doughnut_chart_module_1 = require("igniteui-react-charts/ES2015/igr-doughnut-chart-module");
var igr_doughnut_chart_1 = require("igniteui-react-charts/ES2015/igr-doughnut-chart");
var igr_ring_series_module_1 = require("igniteui-react-charts/ES2015/igr-ring-series-module");
var igr_ring_series_1 = require("igniteui-react-charts/ES2015/igr-ring-series");
var igr_pie_chart_1 = require("igniteui-react-charts/ES2015/igr-pie-chart");
var igr_pie_chart_module_1 = require("igniteui-react-charts/ES2015/igr-pie-chart-module");
var AdaptablePopover_1 = require("@adaptabletools/adaptable/src/View/AdaptablePopover");
var EnumExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/EnumExtensions");
var ObjectFactory_1 = require("@adaptabletools/adaptable/src/Utilities/ObjectFactory");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var PieChartUIHelper_1 = require("../Chart/PieChart/PieChartUIHelper");
var rebass_1 = require("rebass");
var ErrorBox_1 = require("@adaptabletools/adaptable/src/components/ErrorBox");
var HelpBlock_1 = require("@adaptabletools/adaptable/src/components/HelpBlock");
var Input_1 = require("@adaptabletools/adaptable/src/components/Input");
var CheckBox_1 = require("@adaptabletools/adaptable/src/components/CheckBox");
var Panel_1 = require("@adaptabletools/adaptable/src/components/Panel");
var Dropdown_1 = require("@adaptabletools/adaptable/src/components/Dropdown");
var ArrayExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions");
var ChartContainer_1 = require("@adaptabletools/adaptable/src/components/ChartContainer");
var PieChartPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PieChartPopupComponent, _super);
    function PieChartPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.SliceValueOptions = ['Value', 'Ratio'];
        _this.SliceLabelOptions = ['Value', 'ValueAndName', 'Ratio', 'RatioAndName', 'Name'];
        _this.SliceSorByOptions = [
            'Value Descending',
            'Value Ascending',
            'Name Descending',
            'Name Ascending',
        ];
        _this.onOthersCategoryThresholdChanged = function (e) {
            _this.setState({ OthersCategoryThreshold: e.target.value });
        };
        _this.state = {
            PieChartDefinition: ObjectFactory_1.ObjectFactory.CreateEmptyPieChartDefinition(),
            ErrorMessage: null,
            DataSource: null,
            OthersCategoryType: ChartEnums_1.OthersCategoryType.Percent,
            OthersCategoryThreshold: 2,
            ShowAsDoughnut: false,
            SliceValuesMapping: 'Value',
            SliceLabelsMapping: 'Name',
            SliceLegendMapping: 'ValueAndName',
            SliceSortOption: ChartEnums_1.SliceSortOption.ValueDescending,
            SliceLabelsPosition: ChartEnums_1.PieChartLabelPosition.BestFit,
            SliceBrushes: PieChartUIHelper_1.PieChartUIHelper.getBrushesEven(),
        };
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
    PieChartPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.columnId) {
                var column = this.props.PopupParams.columnId;
                if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(column)) {
                    this.updateDataSource(null, column, this.props.PopupParams.primaryKeyValues);
                }
            }
        }
    };
    PieChartPopupComponent.prototype.getOptionsForLabelsPosition = function () {
        var optionElements = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.PieChartLabelPosition).map(function (v) {
            return {
                value: v,
                label: v,
            };
        });
        return optionElements;
    };
    PieChartPopupComponent.prototype.getOptionsForSliceLabelsMapping = function () {
        var optionElements = this.SliceLabelOptions.map(function (v) {
            return {
                value: v,
                label: v,
            };
        });
        return optionElements;
    };
    PieChartPopupComponent.prototype.getOptionsForSliceValuesMapping = function () {
        var optionElements = this.SliceValueOptions.map(function (v) {
            return {
                value: v,
                label: v,
            };
        });
        return optionElements;
    };
    PieChartPopupComponent.prototype.getOptionsForSliceSortOrders = function () {
        var optionElements = this.SliceSorByOptions.map(function (v) {
            return {
                value: v,
                label: v,
            };
        });
        return optionElements;
    };
    PieChartPopupComponent.prototype.hasValidDataSelection = function () {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.PieChartDefinition.SecondaryColumnId) ||
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.PieChartDefinition.PrimaryColumnId));
    };
    PieChartPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'See the count for each distinct visible value in the column as pie chart.',
            React.createElement("br", null),
            "There are options to view as doughnut, set the 'Others' threshold (and type) and manage labels.",
        ];
        var radiusFactor = 0.8;
        var chartBlock = (React.createElement(ChartContainer_1.ChartContainer, { chart: this.state.ShowAsDoughnut ? (React.createElement(igr_doughnut_chart_1.IgrDoughnutChart, { allowSliceSelection: "true", allowSliceExplosion: "true", ref: this.onDoughnutChartRef },
                React.createElement(igr_ring_series_1.IgrRingSeries, { name: "ring1", dataSource: this.state.DataSource, labelsPosition: this.state.SliceLabelsPosition, labelMemberPath: this.state.SliceLabelsMapping, valueMemberPath: this.state.SliceValuesMapping, legendLabelMemberPath: this.state.SliceLegendMapping, othersCategoryThreshold: this.state.OthersCategoryThreshold, othersCategoryType: this.state.OthersCategoryType, othersCategoryText: "Others", brushes: this.state.SliceBrushes, outlines: this.state.SliceBrushes, radiusFactor: radiusFactor }))) : (React.createElement(igr_pie_chart_1.IgrPieChart, { ref: this.onPieChartRef, dataSource: this.state.DataSource, labelsPosition: this.state.SliceLabelsPosition, labelMemberPath: this.state.SliceLabelsMapping, valueMemberPath: this.state.SliceValuesMapping, legendLabelMemberPath: this.state.SliceLegendMapping, othersCategoryThreshold: this.state.OthersCategoryThreshold, othersCategoryType: this.state.OthersCategoryType, othersCategoryText: "Others", othersCategoryFill: "#9A9A9A", othersCategoryStroke: "#9A9A9A", brushes: this.state.SliceBrushes, outlines: this.state.SliceBrushes, radiusFactor: radiusFactor, selectionMode: "single" })) }));
        var settingsBlock = (React.createElement(Panel_1.default, { header: 'Settings', bodyScroll: true, style: {
                borderTop: 0,
                borderRight: 0,
                borderBottom: 0,
                height: '100%',
                width: '100%',
            }, bodyProps: {
                padding: 0,
            } },
            React.createElement(rebass_1.Flex, { as: HelpBlock_1.default, flexDirection: "column", justifyContent: "center", padding: 2, style: { width: '100%' } },
                React.createElement(CheckBox_1.default, { marginLeft: 2, onChange: function (checked) { return _this.onShowDoughnutChanged(checked); }, checked: this.state.ShowAsDoughnut }, "Doughnut View"),
                React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row", marginTop: 2 },
                    "Others Threshold",
                    ' ',
                    React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Pie Chart: Others Threshold', bodyText: [
                            'Items with value less than or equal to the Threshold will be assigned to the “Others” category.  Choose whether this will be interpreted as a percentage or as a value.',
                        ] })),
                React.createElement(Input_1.default, { marginTop: 2, type: "number", min: "0", step: "1", placeholder: 'Input', onChange: this.onOthersCategoryThresholdChanged, value: this.state.OthersCategoryThreshold }),
                React.createElement(CheckBox_1.default, { marginTop: 3, marginLeft: 2, onChange: function (checked) { return _this.onThresholdAsPercentChanged(checked); }, checked: this.state.OthersCategoryType == ChartEnums_1.OthersCategoryType.Percent }, "Others Threshold %"),
                React.createElement(rebass_1.Text, { marginTop: 3, marginBottom: 2 },
                    "Labels Position:",
                    ' '),
                React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.SliceLabelsPosition, onChange: function (v) { return _this.onSliceLabelsPositionChanged(v); }, options: this.getOptionsForLabelsPosition() }),
                React.createElement(rebass_1.Text, { marginTop: 3, marginBottom: 2 },
                    "Labels Content:",
                    ' '),
                React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.SliceLabelsMapping, onChange: function (x) { return _this.onSliceLabelsMappingChanged(x); }, options: this.getOptionsForSliceLabelsMapping() }),
                React.createElement(rebass_1.Text, { marginTop: 3, marginBottom: 2 },
                    "Slices Sort By:",
                    ' '),
                React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.SliceSortOption, onChange: function (x) { return _this.onSliceSortByColumnChanged(x); }, options: this.getOptionsForSliceSortOrders(), marginBottom: 3 }),
                this.state.ShowAsDoughnut ? (React.createElement(rebass_1.Box, { className: "doughnutLegend" },
                    React.createElement(igr_item_legend_1.IgrItemLegend, { ref: this.onDoughnutLegendRef }))) : (React.createElement(rebass_1.Box, { className: "pieChartLegend" },
                    React.createElement(igr_item_legend_1.IgrItemLegend, { ref: this.onPieChartLegendRef }))))));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithImage_1.PanelWithImage, { header: StrategyConstants.PieChartStrategyFriendlyName, glyphicon: StrategyConstants.PieChartGlyph, infoBody: infoBody, variant: "primary", style: { height: '100%' }, bodyProps: { style: { display: 'flex' } } },
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "start", flex: 1 },
                    React.createElement(rebass_1.Flex, { flex: 8, flexDirection: "column" },
                        React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row", padding: 2 },
                            React.createElement(rebass_1.Text, { marginRight: 2 }, "Selected Column"),
                            React.createElement(ColumnSelector_1.ColumnSelector, { style: { flex: 1 }, SelectedColumnIds: [this.state.PieChartDefinition.PrimaryColumnId], SelectionMode: Enums_1.SelectionMode.Single, ColumnList: this.props.Columns, onColumnChange: function (columns) { return _this.onDataGroupColumnChanged(columns); } })),
                        this.hasValidDataSelection() ? (React.createElement(React.Fragment, null, this.state.ErrorMessage == null ? (React.createElement("span", null, chartBlock)) : (React.createElement(ErrorBox_1.default, null, this.state.ErrorMessage)))) : null),
                    React.createElement(rebass_1.Flex, { flex: 4, style: { overflow: 'auto', height: '100%' } }, this.hasValidDataSelection() ? settingsBlock : null)))));
    };
    PieChartPopupComponent.prototype.onDataValueColumnChanged = function (columns) {
        var valueColumn = null;
        var labelColumn = this.state.PieChartDefinition.PrimaryColumnId;
        if (columns.length > 0) {
            valueColumn = columns[0].ColumnId;
        }
        this.updateDataSource(valueColumn, labelColumn);
    };
    PieChartPopupComponent.prototype.onDataGroupColumnChanged = function (columns) {
        var valueColumn = this.state.PieChartDefinition.SecondaryColumnId;
        var labelColumn = null;
        if (columns.length > 0) {
            labelColumn = columns[0].ColumnId;
        }
        this.updateDataSource(valueColumn, labelColumn);
    };
    PieChartPopupComponent.prototype.updateDataSource = function (valueColumn, labelColumn, primaryKeyValues) {
        var pieChartDefinition = this.state.PieChartDefinition;
        pieChartDefinition.PrimaryColumnId = labelColumn;
        pieChartDefinition.SecondaryColumnId = valueColumn;
        if (ArrayExtensions_1.default.IsNotNullOrEmpty(primaryKeyValues)) {
            pieChartDefinition.PrimaryKeyValues = primaryKeyValues;
        }
        var chartData = this.props.Adaptable.ChartService.BuildPieChartData(pieChartDefinition);
        var dataSource = chartData.Data;
        var errorMessage = chartData.ErrorMessage;
        dataSource = PieChartUIHelper_1.PieChartUIHelper.sortDataSource(this.state.SliceSortOption, dataSource);
        this.setState({
            PieChartDefinition: pieChartDefinition,
            DataSource: dataSource,
            ErrorMessage: errorMessage,
            // making sure the first and last slice do not have the same brush
            SliceBrushes: dataSource.length % 2 == 0
                ? PieChartUIHelper_1.PieChartUIHelper.getBrushesOdd()
                : PieChartUIHelper_1.PieChartUIHelper.getBrushesEven(),
        });
    };
    PieChartPopupComponent.prototype.onDoughnutChartRef = function (doughnutChart) {
        this.doughnutChart = doughnutChart;
        if (this.doughnutLegend && this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutLegend;
        }
    };
    PieChartPopupComponent.prototype.onPieChartRef = function (pieChart) {
        this.pieChart = pieChart;
        if (this.pieChartLegend && this.pieChart) {
            this.pieChart.legend = this.pieChartLegend;
        }
    };
    PieChartPopupComponent.prototype.onDoughnutLegendRef = function (legend) {
        this.doughnutLegend = legend;
        if (this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutLegend;
        }
    };
    PieChartPopupComponent.prototype.onPieChartLegendRef = function (legend) {
        this.pieChartLegend = legend;
        if (this.pieChart) {
            this.pieChart.legend = this.pieChartLegend;
        }
    };
    PieChartPopupComponent.prototype.onShowDoughnutChanged = function (checked) {
        this.setState({ ShowAsDoughnut: checked });
    };
    PieChartPopupComponent.prototype.onThresholdAsPercentChanged = function (checked) {
        var e = event.target;
        var othersCategoryType = checked
            ? ChartEnums_1.OthersCategoryType.Percent
            : ChartEnums_1.OthersCategoryType.Number;
        this.setState({ OthersCategoryType: othersCategoryType });
    };
    PieChartPopupComponent.prototype.onSliceLabelsPositionChanged = function (value) {
        this.setState({ SliceLabelsPosition: value });
    };
    PieChartPopupComponent.prototype.onSliceLabelsMappingChanged = function (value) {
        var labelMapping = value;
        var legendMapping = labelMapping.includes('Ratio') ? 'RatioAndName' : 'ValueAndName';
        this.setState({
            SliceLabelsMapping: labelMapping,
            SliceLegendMapping: legendMapping,
        });
    };
    PieChartPopupComponent.prototype.onSliceValuesMappingChanged = function (event) {
        var e = event.target;
        this.setState({ SliceValuesMapping: e.value });
    };
    PieChartPopupComponent.prototype.onSliceSortByColumnChanged = function (value) {
        var sliceSortOption = value;
        var oldData = this.state.DataSource;
        var newData = PieChartUIHelper_1.PieChartUIHelper.sortDataSource(sliceSortOption, oldData);
        this.setState({ DataSource: newData, SliceSortOption: sliceSortOption });
    };
    return PieChartPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps() {
    return {};
}
exports.PieChartPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PieChartPopupComponent);
