"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var UserFilterRedux = require("../../Redux/ActionsReducers/UserFilterRedux");
var ToolPanelRedux = require("../../Redux/ActionsReducers/ToolPanelRedux");
var GridRedux = require("../../Redux/ActionsReducers/GridRedux");
var ColumnFilterRedux = require("../../Redux/ActionsReducers/ColumnFilterRedux");
var ButtonClear_1 = require("../Components/Buttons/ButtonClear");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var AdaptablePopover_1 = require("../AdaptablePopover");
var ActiveFiltersPanel_1 = require("./ActiveFiltersPanel");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var rebass_1 = require("rebass");
var CheckBox_1 = require("../../components/CheckBox");
var PanelToolPanel_1 = require("../Components/Panels/PanelToolPanel");
var ColumnFilterToolPanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnFilterToolPanelComponent, _super);
    function ColumnFilterToolPanelComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { IsMinimised: true };
        return _this;
    }
    ColumnFilterToolPanelComponent.prototype.render = function () {
        var _this = this;
        var activeFiltersPanel = (React.createElement(ActiveFiltersPanel_1.ActiveFiltersPanel, { Columns: this.props.Columns, ColumnFilters: this.props.ColumnFilters, AccessLevel: this.props.AccessLevel, onClear: function (columnFilter) { return _this.onClearColumnFilter(columnFilter); }, onSaveColumnFilterasUserFilter: function (columnFilter) {
                return _this.onSaveColumnFilterasUserFilter(columnFilter);
            } }));
        var content = (React.createElement(rebass_1.Flex, { flexDirection: "column", alignItems: "stretch", className: "ab-ToolPanel__ColumnFilter__wrap" },
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: 'ab-ToolPanel__BulkUpdate__wrap' }, ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters) && (React.createElement(React.Fragment, null,
                React.createElement(AdaptablePopover_1.AdaptablePopover, { className: "ab-ToolPanel__ColumnFilter__info", headerText: "", bodyText: [activeFiltersPanel], 
                    //  tooltipText={'Show Filter Details'}
                    useButton: true, showEvent: 'focus', hideEvent: "blur", popoverMinWidth: 400 }),
                React.createElement(ButtonClear_1.ButtonClear, { marginLeft: 1, marginBottom: 0, className: "ab-ToolPanel__ColumnFilter__clear", onClick: function () { return _this.onClearFilters(); }, tooltip: "Clear Column Filters", disabled: this.props.ColumnFilters.length == 0, AccessLevel: this.props.AccessLevel }, "Clear")))),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: 'ab-ToolPanel__BulkUpdate__wrap' },
                React.createElement(CheckBox_1.default, { className: "ab-ToolPanel__ColumnFilter__active-check", disabled: this.props.Adaptable.api.internalApi.isGridInPivotMode(), marginLeft: 1, marginTop: 0, fontSize: 2, padding: 1, checked: this.props.IsQuickFilterActive, onChange: function (checked) {
                        checked ? _this.props.onShowQuickFilterBar() : _this.props.onHideQuickFilterBar();
                    } }, "Show Quick Filter"))));
        return (React.createElement(PanelToolPanel_1.PanelToolPanel, { className: "ab-ToolPanel__ColumnFilter", headerText: StrategyConstants.ColumnFilterStrategyFriendlyName, onConfigure: function () { return _this.props.onConfigure(); }, onMinimiseChanged: function () { return _this.setState({ IsMinimised: !_this.state.IsMinimised }); }, isMinimised: this.state.IsMinimised, onClose: function () { return _this.props.onClose('ColumnFilter'); } }, this.state.IsMinimised ? null : content));
    };
    ColumnFilterToolPanelComponent.prototype.onClearFilters = function () {
        // better to put in store but lets test first...
        this.props.onClearAllFilters();
        this.props.Adaptable.clearGridFiltering();
    };
    ColumnFilterToolPanelComponent.prototype.onClearColumnFilter = function (columnFilter) {
        this.props.onClearColumnFilter(columnFilter);
        this.props.Adaptable.clearColumnFiltering([columnFilter.ColumnId]);
    };
    ColumnFilterToolPanelComponent.prototype.onSaveColumnFilterasUserFilter = function (columnFilter) {
        var prompt = {
            Header: 'Enter name for User Filter',
            Msg: '',
            ConfirmAction: UserFilterRedux.CreateUserFilterFromColumnFilter(columnFilter, ''),
        };
        this.props.onShowPrompt(prompt);
    };
    return ColumnFilterToolPanelComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        Entitlements: state.Entitlements.FunctionEntitlements,
        IsQuickFilterActive: state.Grid.IsQuickFilterActive,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClearColumnFilter: function (columnFilter) {
            return dispatch(ColumnFilterRedux.ColumnFilterClear(columnFilter));
        },
        onShowPrompt: function (prompt) { return dispatch(PopupRedux.PopupShowPrompt(prompt)); },
        onClearAllFilters: function () { return dispatch(ColumnFilterRedux.ColumnFilterClearAll()); },
        onHideQuickFilterBar: function () { return dispatch(GridRedux.QuickFilterBarHide()); },
        onShowQuickFilterBar: function () { return dispatch(GridRedux.QuickFilterBarShow()); },
        onClose: function (toolPanel) {
            return dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ColumnFilterStrategyId, ScreenPopups.ColumnFilterPopup));
        },
    };
}
exports.ColumnFilterToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnFilterToolPanelComponent);
