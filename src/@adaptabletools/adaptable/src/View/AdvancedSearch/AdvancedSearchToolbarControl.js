"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var AdvancedSearchRedux = require("../../Redux/ActionsReducers/AdvancedSearchRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ButtonEdit_1 = require("../Components/Buttons/ButtonEdit");
var ButtonDelete_1 = require("../Components/Buttons/ButtonDelete");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var rebass_1 = require("rebass");
var Dropdown_1 = require("../../components/Dropdown");
var AdvancedSearchToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AdvancedSearchToolbarControlComponent, _super);
    function AdvancedSearchToolbarControlComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdvancedSearchToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var savedSearch = this.props.AdvancedSearches.find(function (s) { return s.Name == _this.props.CurrentAdvancedSearchName; });
        var sortedAdvancedSearches = ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.props.AdvancedSearches, 'Name');
        var availableSearches = sortedAdvancedSearches.map(function (search, index) {
            return {
                label: search.Name,
                value: search.Name,
            };
        });
        var content = (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: "ab-DashboardToolbar__AdvancedSearch__wrap" },
            React.createElement(Dropdown_1.default, { className: "ab-DashboardToolbar__AdvancedSearch__select", disabled: availableSearches.length == 0, style: { minWidth: 160 }, options: availableSearches, value: this.props.CurrentAdvancedSearchName, placeholder: "Select Search", onChange: function (searchName) { return _this.onSelectedSearchChanged(searchName); }, marginRight: 2 }),
            React.createElement(ButtonEdit_1.ButtonEdit, { onClick: function () { return _this.props.onEditAdvancedSearch(); }, className: "ab-DashboardToolbar__AdvancedSearch__edit", tooltip: "Edit Current Advanced Search", disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchName), AccessLevel: this.props.AccessLevel }),
            React.createElement(ButtonNew_1.ButtonNew, { variant: "text", tone: "neutral", className: "ab-DashboardToolbar__AdvancedSearch__new", onClick: function () { return _this.props.onNewAdvancedSearch(); }, tooltip: "Create New Advanced Search", AccessLevel: this.props.AccessLevel, children: null }),
            React.createElement(ButtonDelete_1.ButtonDelete, { tooltip: "Delete Advanced Search", className: "ab-DashboardToolbar__AdvancedSearch__delete", disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchName), ConfirmAction: AdvancedSearchRedux.AdvancedSearchDelete(savedSearch), ConfirmationMsg: "Are you sure you want to delete '" + !savedSearch ? '' : savedSearch.Name + "'?", ConfirmationTitle: 'Delete Advanced Search', AccessLevel: this.props.AccessLevel })));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__AdvancedSearch", headerText: StrategyConstants.AdvancedSearchStrategyFriendlyName, glyphicon: StrategyConstants.AdvancedSearchGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.AdvancedSearchStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    AdvancedSearchToolbarControlComponent.prototype.onSelectedSearchChanged = function (searchName) {
        this.props.onSelectAdvancedSearch(searchName);
    };
    return AdvancedSearchToolbarControlComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectAdvancedSearch: function (advancedSearchName) {
            return dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName));
        },
        onNewAdvancedSearch: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.AdvancedSearchStrategyId, ScreenPopups.AdvancedSearchPopup, {
                action: 'New',
                source: 'Toolbar',
            }));
        },
        onEditAdvancedSearch: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.AdvancedSearchStrategyId, ScreenPopups.AdvancedSearchPopup, {
                action: 'Edit',
                source: 'Toolbar',
            }));
        },
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.AdvancedSearchStrategyId, ScreenPopups.AdvancedSearchPopup));
        },
    };
}
exports.AdvancedSearchToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchToolbarControlComponent);
