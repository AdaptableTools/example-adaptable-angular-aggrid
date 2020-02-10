"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ButtonClose_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonClose");
var Helper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/Helper");
var ButtonGeneral_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonGeneral");
var DefaultSparklinesChartProperties_1 = require("@adaptabletools/adaptable/src/Utilities/Defaults/DefaultSparklinesChartProperties");
var PanelWithTwoButtons_1 = require("@adaptabletools/adaptable/src/View/Components/Panels/PanelWithTwoButtons");
var SparklinesChartUIHelper_1 = require("./SparklinesChartUIHelper");
var ChartContainer_1 = require("@adaptabletools/adaptable/src/components/ChartContainer");
var SparklineChart_1 = require("../../../components/SparklineChart");
var FormLayout_1 = require("@adaptabletools/adaptable/src/components/FormLayout");
var Radio_1 = require("@adaptabletools/adaptable/src/components/Radio");
var Input_1 = require("@adaptabletools/adaptable/src/components/Input");
var CheckBox_1 = require("@adaptabletools/adaptable/src/components/CheckBox");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var defaultButtonProps = {
    variant: 'text',
};
var SparklinesChartComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SparklinesChartComponent, _super);
    function SparklinesChartComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.seriesColors = new Map();
        _this.onMinMaxValueChange = function (minOrMax, value) {
            var _a;
            if (isNaN(value)) {
                value = undefined;
            }
            _this.updateChartProperties((_a = {},
                _a[minOrMax] = value,
                _a));
        };
        _this.state = SparklinesChartUIHelper_1.SparklinesChartUIHelper.setChartDisplayPopupState(_this.props.CurrentChartDefinition);
        return _this;
    }
    SparklinesChartComponent.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, nextContext) {
        if (nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
            this.setState(SparklinesChartUIHelper_1.SparklinesChartUIHelper.setChartDisplayPopupState(nextProps.CurrentChartDefinition));
        }
    };
    SparklinesChartComponent.prototype.render = function () {
        var _this = this;
        var closeChartSettingsButton = (React.createElement(ButtonClose_1.ButtonClose, tslib_1.__assign({}, defaultButtonProps, { style: { color: 'var(--ab-color-defaultbackground)' }, onClick: function () { return _this.onHideChartSettings(); }, tooltip: 'Close Chart Settings' })));
        var openChartSettingsButton = (React.createElement(ButtonGeneral_1.ButtonGeneral, { style: { alignSelf: 'flex-end' }, onClick: function () { return _this.onShowChartSettings(); }, variant: "text", tooltip: null }, "Show Chart Settings"));
        var setDefaultsButton = (React.createElement(ButtonGeneral_1.ButtonGeneral, tslib_1.__assign({}, defaultButtonProps, { style: { color: 'var(--ab-color-defaultbackground)' }, onClick: function () { return _this.onSetPropertyDefaults(); }, tooltip: null }), "Reset"));
        var chartElement = (React.createElement(SparklineChart_1.default
        // data source
        , { 
            // data source
            values: this.props.ChartData.Data, min: this.state.ChartProperties.UseMinStaticValue
                ? this.state.ChartProperties.Minimum
                : undefined, max: this.state.ChartProperties.UseMaxStaticValue
                ? this.state.ChartProperties.Maximum
                : undefined, 
            // chart type
            type: this.state.ChartProperties.DisplayType }));
        var settingsPanel = (React.createElement(PanelWithTwoButtons_1.PanelWithTwoButtons, { marginBottom: 2, headerText: 'Chart Settings', variant: "primary", firstButton: closeChartSettingsButton, secondButton: setDefaultsButton },
            React.createElement(FormLayout_1.default, null,
                React.createElement(FormLayout_1.FormRow, { label: React.createElement("b", null, "Sparkline Type") },
                    React.createElement(Radio_1.default, { checked: this.state.ChartProperties.DisplayType === ChartEnums_1.SparklineTypeEnum.Line, onChange: function (checked) {
                            _this.updateChartProperties({
                                DisplayType: checked ? ChartEnums_1.SparklineTypeEnum.Line : ChartEnums_1.SparklineTypeEnum.Column,
                            });
                        } }, "Line"),
                    React.createElement(Radio_1.default, { marginLeft: 2, checked: this.state.ChartProperties.DisplayType === ChartEnums_1.SparklineTypeEnum.Column, onChange: function (checked) {
                            _this.updateChartProperties({
                                DisplayType: checked ? ChartEnums_1.SparklineTypeEnum.Column : ChartEnums_1.SparklineTypeEnum.Line,
                            });
                        } }, "Column"),
                    React.createElement(Radio_1.default, { marginLeft: 2, checked: this.state.ChartProperties.DisplayType === ChartEnums_1.SparklineTypeEnum.Area, onChange: function (checked) {
                            _this.updateChartProperties({
                                DisplayType: checked ? ChartEnums_1.SparklineTypeEnum.Area : ChartEnums_1.SparklineTypeEnum.Line,
                            });
                        } }, "Area")),
                React.createElement(FormLayout_1.FormRow, { label: React.createElement("b", null, "Minimum Value") },
                    React.createElement(React.Fragment, null,
                        React.createElement(CheckBox_1.default, { checked: this.state.ChartProperties.UseMinStaticValue, marginRight: 2, onChange: function (UseMinStaticValue) { return _this.updateChartProperties({ UseMinStaticValue: UseMinStaticValue }); } }, "Use static minimum value"),
                        this.state.ChartProperties.UseMinStaticValue ? (React.createElement(Input_1.default, { type: 'number', style: { width: '10rem' }, placeholder: "Min Value", onChange: function (e) { return _this.onMinMaxValueChange('Minimum', Number(e.target.value)); }, value: this.state.ChartProperties.Minimum })) : null)),
                React.createElement(FormLayout_1.FormRow, { label: React.createElement("b", null, "Maximum Value") },
                    React.createElement(React.Fragment, null,
                        React.createElement(CheckBox_1.default, { checked: this.state.ChartProperties.UseMaxStaticValue, marginRight: 2, onChange: function (UseMaxStaticValue) { return _this.updateChartProperties({ UseMaxStaticValue: UseMaxStaticValue }); } }, "Use static maximum value"),
                        this.state.ChartProperties.UseMaxStaticValue ? (React.createElement(Input_1.default, { type: 'number', style: { width: '10rem' }, placeholder: "Min Value", onChange: function (e) { return _this.onMinMaxValueChange('Maximum', Number(e.target.value)); }, value: this.state.ChartProperties.Maximum })) : null)))));
        return this.props.ChartData.Data != null ? (React.createElement(ChartContainer_1.ChartContainer, { flexDirection: 'column-reverse', sizeAsString: false, button: !this.state.IsChartSettingsVisible ? openChartSettingsButton : null, chart: chartElement, settingsPanel: this.state.IsChartSettingsVisible ? settingsPanel : null })) : null;
    };
    SparklinesChartComponent.prototype.onSetPropertyDefaults = function () {
        var chartProperties = Helper_1.Helper.cloneObject(DefaultSparklinesChartProperties_1.DefaultSparklinesChartProperties);
        this.updateChartProperties(chartProperties);
    };
    SparklinesChartComponent.prototype.onShowChartSettings = function () {
        this.setState({ IsChartSettingsVisible: true });
    };
    SparklinesChartComponent.prototype.onHideChartSettings = function () {
        this.setState({ IsChartSettingsVisible: false });
    };
    SparklinesChartComponent.prototype.updateChartProperties = function (chartProperties) {
        this.setState({
            ChartProperties: tslib_1.__assign(tslib_1.__assign({}, this.state.ChartProperties), chartProperties),
        });
        this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Uuid, chartProperties);
    };
    return SparklinesChartComponent;
}(React.Component));
exports.SparklinesChartComponent = SparklinesChartComponent;
