"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PopupRedux = require("@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux");
var SystemRedux = require("@adaptabletools/adaptable/src/Redux/ActionsReducers/SystemRedux");
var ChartRedux = require("@adaptabletools/adaptable/src/Redux/ActionsReducers/ChartRedux");
var ToolPanelRedux = require("@adaptabletools/adaptable/src/Redux/ActionsReducers/ToolPanelRedux");
var ButtonEdit_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonEdit");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var ScreenPopups = require("@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups");
var Enums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums");
var GeneralConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants");
var ButtonShowChart_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonShowChart");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var ButtonDelete_1 = require("@adaptabletools/adaptable/src/View/Components/Buttons/ButtonDelete");
var ArrayExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions");
var icons_1 = require("@adaptabletools/adaptable/src/components/icons");
var rebass_1 = require("rebass");
var Dropdown_1 = require("@adaptabletools/adaptable/src/components/Dropdown");
var DropdownButton_1 = require("@adaptabletools/adaptable/src/components/DropdownButton");
var PanelToolPanel_1 = require("@adaptabletools/adaptable/src/View/Components/Panels/PanelToolPanel");
var AddIcon = icons_1.default.add;
var ChartToolPanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ChartToolPanelComponent, _super);
    function ChartToolPanelComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { IsMinimised: true };
        return _this;
    }
    ChartToolPanelComponent.prototype.render = function () {
        var _this = this;
        var selectChartString = 'Select a Chart';
        var currentChartDefinitionName = this.props.CurrentChartDefinition == null
            ? selectChartString
            : this.props.CurrentChartDefinition.Name;
        var currentChartDefinitionType = this.props.CurrentChartDefinition == null
            ? ChartEnums_1.ChartType.CategoryChart
            : this.props.CurrentChartDefinition.ChartType;
        var sortedChartDefinitions = ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.props.ChartDefinitions, 'Title');
        var availablechartDefinitions = sortedChartDefinitions
            // .filter(s => s.Name != currentChartDefinitionName)
            .map(function (chartDefinition) {
            return {
                label: chartDefinition.Name,
                value: chartDefinition.Name,
            };
        });
        var categoryChartMenuItem = {
            disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly,
            onClick: function () {
                return _this.props.onNewChartDefinition({
                    value: ChartEnums_1.ChartType.CategoryChart,
                    action: 'New',
                    source: 'Toolbar',
                });
            },
            label: 'Category Chart',
        };
        var pieChartMenuItem = {
            disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly,
            onClick: function () {
                return _this.props.onNewChartDefinition({
                    value: ChartEnums_1.ChartType.PieChart,
                    action: 'New',
                    source: 'Toolbar',
                });
            },
            label: 'Pie Chart',
        };
        var sparkLineMenuItem = {
            disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly,
            onClick: function () {
                return _this.props.onNewChartDefinition({
                    value: ChartEnums_1.ChartType.SparklinesChart,
                    action: 'New',
                    source: 'Toolbar',
                });
            },
            label: 'Sparkline',
        };
        var content = (React.createElement(rebass_1.Flex, { flexDirection: "column", alignItems: "stretch", className: "ab-ToolPanel__Chart__wrap" },
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: "ab-ToolPanel__Chart__wrap" },
                React.createElement(Dropdown_1.default, { className: "ab-ToolPanel__Chart__select", disabled: availablechartDefinitions.length == 0, style: { minWidth: 160 }, marginRight: 2, placeholder: "Select Chart", value: this.props.CurrentChartDefinition ? this.props.CurrentChartDefinition.Name : null, options: availablechartDefinitions, onChange: function (chartDefinitionName) {
                        return _this.onSelectedChartDefinitionChanged(chartDefinitionName);
                    }, showClearButton: true })),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly
                    ? GeneralConstants.READ_ONLY_STYLE
                    : 'ab-ToolPanel__Chart_wrap' },
                React.createElement(ButtonShowChart_1.ButtonShowChart, { className: "ab-ToolPanel__Chart__show", onClick: function () { return _this.onShowChart(); }, tooltip: "Show Chart", disabled: currentChartDefinitionName == selectChartString, AccessLevel: this.props.AccessLevel }),
                React.createElement(DropdownButton_1.default, { columns: ['label'], className: "ab-ToolPanel__Chart__select-type", mx: 2, variant: "text", items: [categoryChartMenuItem, pieChartMenuItem, sparkLineMenuItem] },
                    React.createElement(AddIcon, null)),
                React.createElement(ButtonEdit_1.ButtonEdit, { className: "ab-ToolPanel__Chart__edit", onClick: function () {
                        return _this.props.onNewChartDefinition({
                            value: currentChartDefinitionType,
                            action: 'Edit',
                            source: 'Toolbar',
                        });
                    }, tooltip: "Edit Chart Definition", disabled: currentChartDefinitionName == selectChartString, AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonDelete_1.ButtonDelete, { tooltip: "Delete Chart", className: "ab-ToolPanel__Chart__delete", disabled: currentChartDefinitionName == selectChartString, ConfirmAction: ChartRedux.ChartDefinitionDelete(this.props.CurrentChartDefinition), ConfirmationMsg: "Are you sure you want to delete '" + currentChartDefinitionName + "'?", ConfirmationTitle: 'Delete Chart', AccessLevel: this.props.AccessLevel }))));
        return (React.createElement(PanelToolPanel_1.PanelToolPanel, { className: "ab-ToolPanel__Chart", headerText: StrategyConstants.ChartStrategyFriendlyName, onConfigure: function () { return _this.props.onConfigure(); }, onMinimiseChanged: function () { return _this.setState({ IsMinimised: !_this.state.IsMinimised }); }, isMinimised: this.state.IsMinimised, onClose: function () { return _this.props.onClose('Chart'); } }, this.state.IsMinimised ? null : content));
    };
    ChartToolPanelComponent.prototype.onSelectedChartDefinitionChanged = function (chartDefinitionName) {
        this.props.onSelectChartDefinition(chartDefinitionName);
    };
    ChartToolPanelComponent.prototype.onShowChart = function () {
        this.props.onShowChart();
    };
    return ChartToolPanelComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        CurrentChartDefinition: state.Chart.ChartDefinitions.find(function (c) { return c.Name == state.Chart.CurrentChartName; }),
        ChartDefinitions: state.Chart.ChartDefinitions,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectChartDefinition: function (chartDefinition) {
            return dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition));
        },
        onNewChartDefinition: function (popupParams) {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup, popupParams));
        },
        onEditChartDefinition: function (popupParams) {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup, popupParams));
        },
        onShowChart: function () { return dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Maximised)); },
        onClose: function (toolPanel) {
            return dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup));
        },
    };
}
exports.ChartToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartToolPanelComponent);
