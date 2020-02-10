"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var UserFilterRedux = require("../../Redux/ActionsReducers/UserFilterRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var GridRedux = require("../../Redux/ActionsReducers/GridRedux");
var ColumnFilterRedux = require("../../Redux/ActionsReducers/ColumnFilterRedux");
var ButtonClear_1 = require("../Components/Buttons/ButtonClear");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var AdaptablePopover_1 = require("../AdaptablePopover");
var ActiveFiltersPanel_1 = require("./ActiveFiltersPanel");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var rebass_1 = require("rebass");
var CheckBox_1 = require("../../components/CheckBox");
var ColumnFilterToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnFilterToolbarControlComponent, _super);
    function ColumnFilterToolbarControlComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnFilterToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var activeFiltersPanel = (React.createElement(ActiveFiltersPanel_1.ActiveFiltersPanel, { Columns: this.props.Columns, ColumnFilters: this.props.ColumnFilters, AccessLevel: this.props.AccessLevel, onClear: function (columnFilter) { return _this.onClearColumnFilter(columnFilter); }, onSaveColumnFilterasUserFilter: function (columnFilter) {
                return _this.onSaveColumnFilterasUserFilter(columnFilter);
            } }));
        var content = (React.createElement(rebass_1.Flex, { alignItems: "stretch", className: "ab-DashboardToolbar__ColumnFilter__wrap" },
            ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters) && (React.createElement(React.Fragment, null,
                React.createElement(AdaptablePopover_1.AdaptablePopover, { className: "ab-DashboardToolbar__ColumnFilter__info", headerText: "", bodyText: [activeFiltersPanel], 
                    //  tooltipText={'Show Filter Details'}
                    useButton: true, showEvent: 'focus', hideEvent: "blur", popoverMinWidth: 400 }),
                React.createElement(ButtonClear_1.ButtonClear, { marginLeft: 1, className: "ab-DashboardToolbar__ColumnFilter__clear", onClick: function () { return _this.onClearFilters(); }, tooltip: "Clear Column Filters", disabled: this.props.ColumnFilters.length == 0, AccessLevel: this.props.AccessLevel }))),
            React.createElement(CheckBox_1.default, { className: "ab-DashboardToolbar__ColumnFilter__active-check", disabled: this.props.Adaptable.api.internalApi.isGridInPivotMode(), marginLeft: 3, fontSize: 2, checked: this.props.IsQuickFilterActive, onChange: function (checked) {
                    checked ? _this.props.onShowQuickFilterBar() : _this.props.onHideQuickFilterBar();
                } }, "Quick Filter")));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__ColumnFilter", headerText: StrategyConstants.ColumnFilterStrategyFriendlyName, glyphicon: StrategyConstants.ColumnFilterGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.ColumnFilterStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    ColumnFilterToolbarControlComponent.prototype.onClearFilters = function () {
        // better to put in store but lets test first...
        this.props.onClearAllFilters();
        this.props.Adaptable.clearGridFiltering();
    };
    ColumnFilterToolbarControlComponent.prototype.onClearColumnFilter = function (columnFilter) {
        this.props.onClearColumnFilter(columnFilter);
        this.props.Adaptable.clearColumnFiltering([columnFilter.ColumnId]);
    };
    ColumnFilterToolbarControlComponent.prototype.onSaveColumnFilterasUserFilter = function (columnFilter) {
        var prompt = {
            Header: 'Enter name for User Filter',
            Msg: '',
            ConfirmAction: UserFilterRedux.CreateUserFilterFromColumnFilter(columnFilter, ''),
        };
        this.props.onShowPrompt(prompt);
    };
    return ColumnFilterToolbarControlComponent;
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
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ColumnFilterStrategyId, ScreenPopups.ColumnFilterPopup));
        },
    };
}
exports.ColumnFilterToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnFilterToolbarControlComponent);
