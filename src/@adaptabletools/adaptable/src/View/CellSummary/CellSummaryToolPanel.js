"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var ToolPanelRedux = require("../../Redux/ActionsReducers/ToolPanelRedux");
var SelectedCellsRedux = require("../../Redux/ActionsReducers/CellSummaryRedux");
var GridRedux = require("../../Redux/ActionsReducers/GridRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var AdaptablePopover_1 = require("../AdaptablePopover");
var CellSummaryPopover_1 = require("./CellSummaryPopover");
var rebass_1 = require("rebass");
var PanelToolPanel_1 = require("../Components/Panels/PanelToolPanel");
var Dropdown_1 = require("../../components/Dropdown");
var CellSummaryToolPanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CellSummaryToolPanelComponent, _super);
    function CellSummaryToolPanelComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { IsMinimised: true };
        return _this;
    }
    CellSummaryToolPanelComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.Adaptable) {
            this.props.Adaptable._on('CellsSelected', function () {
                _this.props.onCreateCellSummary();
            });
        }
    };
    CellSummaryToolPanelComponent.prototype.render = function () {
        var _this = this;
        var operationMenuItems = EnumExtensions_1.EnumExtensions.getNames(Enums_1.CellSummaryOperation).map(function (summaryOperation, index) {
            return {
                label: summaryOperation,
                onClick: function () { return _this.props.onCellSummaryOperationChange(summaryOperation); },
            };
        });
        var CellSummaryOperationDefinitions = this.props.CellSummaryOperationDefinitions;
        var operationDefinitions = CellSummaryOperationDefinitions.map(function (operationDefinition) {
            return {
                onClick: function () { return _this.props.onCellSummaryOperationChange(operationDefinition.OperationName); },
                label: operationDefinition.OperationName,
            };
        });
        var options = tslib_1.__spread(operationMenuItems, operationDefinitions);
        var availableOptions = options.map(function (option, index) {
            return {
                label: option.label,
                value: option.label,
            };
        });
        var cellSummaryPopover = React.createElement(CellSummaryPopover_1.CellSummaryPopover, { CellSummary: this.props.CellSummary });
        var shouldDisable = this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ||
            this.props.Adaptable.api.internalApi.isGridInPivotMode() ||
            this.props.CellSummary == null;
        var operationValue = shouldDisable ? null : this.getOperationValue();
        var content = (React.createElement(rebass_1.Flex, { flexDirection: "column", alignItems: "stretch", className: shouldDisable ? GeneralConstants.READ_ONLY_STYLE : 'ab-ToolPanel__CellSummary__wrap' },
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: "ab-ToolPanel__CellSummary__wrap" },
                React.createElement(Dropdown_1.default, { style: { minWidth: 170 }, showEmptyItem: false, className: "ab-ToolPanel__CellSummary__select", placeholder: "Select Summary Operation", value: this.props.CellSummaryOperation, options: availableOptions, showClearButton: false, 
                    //  onChange={() => this.onSelectionChanged()}
                    onChange: function (summaryOperation) {
                        return _this.props.onCellSummaryOperationChange(summaryOperation);
                    } })),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: "ab-ToolPanel__CellSummary__wrap" }, !shouldDisable && (React.createElement(React.Fragment, null,
                operationValue && JSON.stringify(operationValue) != '""' && (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: "ab-ToolPanel__CellSummary__text", style: { borderRadius: 'var(--ab__border-radius)' }, marginRight: 2, marginLeft: 1, marginTop: 1, padding: 2, color: 'var( --ab-color-text-on-info)', backgroundColor: 'var(--ab-color-info)', fontSize: 'var( --ab-font-size-2)' }, this.getOperationValue())),
                this.props.CellSummary != null && this.props.CellSummary.Count > 0 && (React.createElement(AdaptablePopover_1.AdaptablePopover, { className: "ab-ToolPanel__CellSummary__info", bodyText: [cellSummaryPopover], useButton: true, showEvent: 'focus', hideEvent: "blur" })))))));
        return (React.createElement(PanelToolPanel_1.PanelToolPanel, { className: "ab-ToolPanel__ColumnFilter", headerText: StrategyConstants.CellSummaryStrategyFriendlyName, onConfigure: function () { return _this.props.onConfigure(); }, onMinimiseChanged: function () { return _this.setState({ IsMinimised: !_this.state.IsMinimised }); }, isMinimised: this.state.IsMinimised, onClose: function () { return _this.props.onClose('CellSummary'); } }, this.state.IsMinimised ? null : content));
    };
    CellSummaryToolPanelComponent.prototype.onSelectionChanged = function () {
        this.props.onCreateCellSummary();
    };
    CellSummaryToolPanelComponent.prototype.getOperationValue = function () {
        switch (this.props.CellSummaryOperation) {
            case Enums_1.CellSummaryOperation.Sum:
                return this.props.CellSummary.Sum;
            case Enums_1.CellSummaryOperation.Average:
                return this.props.CellSummary.Average;
            case Enums_1.CellSummaryOperation.Median:
                return this.props.CellSummary.Median;
            case Enums_1.CellSummaryOperation.Mode:
                return this.props.CellSummary.Mode;
            case Enums_1.CellSummaryOperation.Max:
                return this.props.CellSummary.Max;
            case Enums_1.CellSummaryOperation.Min:
                return this.props.CellSummary.Min;
            case Enums_1.CellSummaryOperation.Distinct:
                return this.props.CellSummary.Distinct;
            case Enums_1.CellSummaryOperation.Count:
                return this.props.CellSummary.Count;
            default:
                return this.props.CellSummary[this.props.CellSummaryOperation];
        }
    };
    return CellSummaryToolPanelComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        SelectedCellInfo: state.Grid.SelectedCellInfo,
        CellSummaryOperation: state.CellSummary.SummaryOperation,
        CellSummaryOperationDefinitions: state.CellSummary.CellSummaryOperationDefinitions,
        CellSummary: state.Grid.CellSummary,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onCellSummaryOperationChange: function (summaryOperation) {
            return dispatch(SelectedCellsRedux.CellSummaryChangeOperation(summaryOperation));
        },
        onCreateCellSummary: function () { return dispatch(GridRedux.GridCreateCellSummary()); },
        onClose: function (toolPanel) {
            return dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.CellSummaryStrategyId, ScreenPopups.CellSummaryPopup));
        },
    };
}
exports.CellSummaryToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CellSummaryToolPanelComponent);
