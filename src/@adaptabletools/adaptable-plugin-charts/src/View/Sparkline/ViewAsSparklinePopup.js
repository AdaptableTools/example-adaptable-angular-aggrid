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
var ObjectFactory_1 = require("@adaptabletools/adaptable/src/Utilities/ObjectFactory");
var rebass_1 = require("rebass");
var ErrorBox_1 = require("@adaptabletools/adaptable/src/components/ErrorBox");
var Panel_1 = require("@adaptabletools/adaptable/src/components/Panel");
var ChartContainer_1 = require("@adaptabletools/adaptable/src/components/ChartContainer");
var SparklineChart_1 = require("../../components/SparklineChart");
var FormLayout_1 = require("@adaptabletools/adaptable/src/components/FormLayout");
var CheckBox_1 = require("@adaptabletools/adaptable/src/components/CheckBox");
var Input_1 = require("@adaptabletools/adaptable/src/components/Input");
var SparklineColumnSettingsWizard_1 = require("./Wizard/SparklineColumnSettingsWizard");
var ArrayExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions");
var DefaultSparklinesChartProperties_1 = require("@adaptabletools/adaptable/src/Utilities/Defaults/DefaultSparklinesChartProperties");
var ColorPicker_1 = require("@adaptabletools/adaptable/src/View/ColorPicker");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var ViewAsSparklinesPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewAsSparklinesPopupComponent, _super);
    function ViewAsSparklinesPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            DisplayType: ChartEnums_1.SparklineTypeEnum.Line,
            UseMaxStaticValue: false,
            UseMinStaticValue: false,
            SparklinesChartDefinition: ObjectFactory_1.ObjectFactory.CreateEmptySparklinesChartDefinition(),
            ErrorMessage: null,
            DataSource: null,
            Brush: DefaultSparklinesChartProperties_1.DefaultSparklinesChartProperties.Brush,
            NegativeBrush: DefaultSparklinesChartProperties_1.DefaultSparklinesChartProperties.NegativeBrush,
        };
        return _this;
    }
    ViewAsSparklinesPopupComponent.prototype.hasValidDataSelection = function () {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.SparklinesChartDefinition.ColumnId);
    };
    ViewAsSparklinesPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = ['See all the values in the selected column as a sparkline chart'];
        var settingsBlock = (React.createElement(Panel_1.default, { header: 'Sparkline Settings', marginTop: 2, bodyScroll: true },
            React.createElement(FormLayout_1.default, { columns: [1, 2] },
                React.createElement(FormLayout_1.FormRow, null,
                    React.createElement("label", null, "Sparkline type"),
                    React.createElement(SparklineColumnSettingsWizard_1.SparklineTypeDropdown, { style: { width: '10rem' }, value: this.state.DisplayType, onChange: function (DisplayType) {
                            return _this.setState({
                                DisplayType: DisplayType,
                            });
                        } })),
                React.createElement(FormLayout_1.FormRow, null,
                    React.createElement(CheckBox_1.default, { checked: this.state.UseMinStaticValue, onChange: function (UseMinStaticValue) {
                            _this.setState({
                                UseMinStaticValue: UseMinStaticValue,
                            });
                        } }, "Use static min value"),
                    this.state.UseMinStaticValue ? (React.createElement(Input_1.default, { style: { width: '10rem' }, value: this.state.MinStaticValue, type: "number", onChange: function (event) {
                            _this.setState({
                                MinStaticValue: Number(event.target.value),
                            });
                        } })) : (React.createElement("div", null))),
                React.createElement(FormLayout_1.FormRow, null,
                    React.createElement(CheckBox_1.default, { checked: this.state.UseMaxStaticValue, onChange: function (UseMaxStaticValue) {
                            _this.setState({
                                UseMaxStaticValue: UseMaxStaticValue,
                            });
                        } }, "Use static max value"),
                    this.state.UseMaxStaticValue ? (React.createElement(Input_1.default, { style: { width: '10rem' }, value: this.state.MaxStaticValue, type: "number", onChange: function (event) {
                            _this.setState({
                                MaxStaticValue: Number(event.target.value),
                            });
                        } })) : (React.createElement("div", null))),
                React.createElement(FormLayout_1.FormRow, null,
                    React.createElement("label", null, "Line Color"),
                    React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.Brush, onChange: function (x) { return _this.onBrushColorChange(x); } })),
                React.createElement(FormLayout_1.FormRow, null,
                    React.createElement("label", null, "Negative Color (for Columns)"),
                    React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.NegativeBrush, onChange: function (x) { return _this.onNegativeBrushColorChange(x); } })))));
        var chartBlock = (React.createElement(ChartContainer_1.ChartContainer, { sizeAsString: false, flexDirection: 'column', settingsPanel: settingsBlock, style: {
                padding: 'var(--ab-space-2)',
            }, chart: React.createElement(SparklineChart_1.default, { values: this.state.DataSource || [], type: this.state.DisplayType, min: this.state.UseMinStaticValue ? this.state.MinStaticValue : undefined, max: this.state.UseMaxStaticValue ? this.state.MaxStaticValue : undefined, brush: this.state.Brush, negativeBrush: this.state.NegativeBrush }) }));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithImage_1.PanelWithImage, { header: StrategyConstants.SparklineStrategyFriendlyName, glyphicon: StrategyConstants.SparklinesGlyph, infoBody: infoBody, variant: "primary", style: { height: '100%' }, bodyProps: { style: { display: 'flex', flexDirection: 'column' } } },
                React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row", padding: 2 },
                    React.createElement(rebass_1.Text, { marginRight: 2 }, "Selected Column"),
                    React.createElement(ColumnSelector_1.ColumnSelector, { style: { flex: 1 }, showClearButton: false, SelectedColumnIds: [this.state.SparklinesChartDefinition.ColumnId], SelectionMode: Enums_1.SelectionMode.Single, ColumnList: this.props.Adaptable.api.gridApi.getNumericColumns(), onColumnChange: function (columns) { return _this.onDataColumnChanged(columns); } })),
                this.hasValidDataSelection() ? (React.createElement(React.Fragment, null, this.state.ErrorMessage == null ? (chartBlock) : (React.createElement(ErrorBox_1.default, null, this.state.ErrorMessage)))) : null)));
    };
    ViewAsSparklinesPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            var column = this.props.PopupParams.columnId;
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(column)) {
                this.updateDataSource(column, this.props.PopupParams.primaryKeyValues);
            }
        }
    };
    ViewAsSparklinesPopupComponent.prototype.onDataColumnChanged = function (columns) {
        var columnId = this.state.SparklinesChartDefinition.ColumnId;
        if (columns.length > 0) {
            columnId = columns[0].ColumnId;
        }
        this.updateDataSource(columnId, this.props.PopupParams.primaryKeyValues);
    };
    ViewAsSparklinesPopupComponent.prototype.updateDataSource = function (columnId, primaryKeyValues) {
        var sparklinesChartDefinition = this.state.SparklinesChartDefinition;
        sparklinesChartDefinition = tslib_1.__assign(tslib_1.__assign({}, sparklinesChartDefinition), { ColumnId: columnId });
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(primaryKeyValues)) {
            sparklinesChartDefinition.PrimaryKeyValues = primaryKeyValues;
        }
        var chartData = this.props.Adaptable.ChartService.BuildSparklinesChartData(sparklinesChartDefinition, this.props.Columns);
        var dataSource = chartData.Data;
        var errorMessage = chartData.ErrorMessage;
        this.setState({
            SparklinesChartDefinition: sparklinesChartDefinition,
            DataSource: dataSource,
            ErrorMessage: errorMessage,
        });
    };
    ViewAsSparklinesPopupComponent.prototype.onBrushColorChange = function (event) {
        var e = event.target;
        this.setState({ Brush: e.value });
    };
    ViewAsSparklinesPopupComponent.prototype.onNegativeBrushColorChange = function (event) {
        var e = event.target;
        this.setState({ NegativeBrush: e.value });
    };
    return ViewAsSparklinesPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps() {
    return {};
}
exports.ViewAsSparklinesPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ViewAsSparklinesPopupComponent);
