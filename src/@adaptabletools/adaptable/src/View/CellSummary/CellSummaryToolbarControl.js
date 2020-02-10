"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var SelectedCellsRedux = require("../../Redux/ActionsReducers/CellSummaryRedux");
var GridRedux = require("../../Redux/ActionsReducers/GridRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var AdaptablePopover_1 = require("../AdaptablePopover");
var CellSummaryPopover_1 = require("./CellSummaryPopover");
var DropdownButton_1 = require("../../components/DropdownButton");
var rebass_1 = require("rebass");
var CellSummaryToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CellSummaryToolbarControlComponent, _super);
    function CellSummaryToolbarControlComponent(props) {
        return _super.call(this, props) || this;
    }
    CellSummaryToolbarControlComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.Adaptable) {
            this.props.Adaptable._on('CellsSelected', function () {
                _this.props.onCreateCellSummary();
            });
        }
    };
    // needed?
    // public componentWillUnmount() {
    //   if (this.props.Adaptable) {
    //     this.props.Adaptable.onSelectedCellsChanged().Unsubscribe(this.state.SubFunc);
    //   }
    // }
    CellSummaryToolbarControlComponent.prototype.render = function () {
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
        var cellSummaryPopover = React.createElement(CellSummaryPopover_1.CellSummaryPopover, { CellSummary: this.props.CellSummary });
        var shouldDisable = this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ||
            this.props.Adaptable.api.internalApi.isGridInPivotMode() ||
            this.props.CellSummary == null;
        var content = (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", width: "100%", className: shouldDisable ? GeneralConstants.READ_ONLY_STYLE : '' },
            React.createElement(DropdownButton_1.default, { marginRight: 2, columns: ['label'], className: "ab-DashboardToolbar__CellSummary__select", items: tslib_1.__spread(operationMenuItems, operationDefinitions), disabled: shouldDisable }, this.props.CellSummaryOperation),
            !shouldDisable && (React.createElement(React.Fragment, null,
                React.createElement(rebass_1.Flex, { flex: 1, marginRight: 2, justifyContent: "center", className: "ab-DashboardToolbar__CellSummary__value", color: 'var(--ab-color-text-on-primary)' }, this.getOperationValue()),
                this.props.CellSummary != null && this.props.CellSummary.Count > 0 && (React.createElement(AdaptablePopover_1.AdaptablePopover, { className: "ab-DashboardToolbar__CellSummary__info", bodyText: [cellSummaryPopover], 
                    // tooltipText={'Show Cell Summary'}
                    useButton: true, showEvent: 'focus', hideEvent: "blur" }))))));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__CellSummary", headerText: StrategyConstants.CellSummaryStrategyFriendlyName, glyphicon: StrategyConstants.CellSummaryGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.CellSummaryStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    CellSummaryToolbarControlComponent.prototype.onSelectionChanged = function () {
        this.props.onCreateCellSummary();
    };
    CellSummaryToolbarControlComponent.prototype.getOperationValue = function () {
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
    return CellSummaryToolbarControlComponent;
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
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.CellSummaryStrategyId, ScreenPopups.CellSummaryPopup));
        },
    };
}
exports.CellSummaryToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CellSummaryToolbarControlComponent);
