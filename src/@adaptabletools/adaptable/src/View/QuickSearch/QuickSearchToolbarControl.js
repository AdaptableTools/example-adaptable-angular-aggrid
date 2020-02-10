"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var _ = require("lodash");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var QuickSearchRedux = require("../../Redux/ActionsReducers/QuickSearchRedux");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var AdaptableFormControlTextClear_1 = require("../Components/Forms/AdaptableFormControlTextClear");
var QuickSearchToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(QuickSearchToolbarControlComponent, _super);
    function QuickSearchToolbarControlComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.debouncedRunQuickSearch = _.debounce(function () { return _this.props.onRunQuickSearch(_this.state.EditedQuickSearchText); }, 250);
        _this.state = { EditedQuickSearchText: _this.props.QuickSearchText };
        return _this;
    }
    QuickSearchToolbarControlComponent.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, nextContext) {
        this.setState({
            EditedQuickSearchText: nextProps.QuickSearchText,
        });
    };
    QuickSearchToolbarControlComponent.prototype.render = function () {
        var _this = this;
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__QuickSearch", headerText: StrategyConstants.QuickSearchStrategyFriendlyName, glyphicon: StrategyConstants.QuickSearchGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.QuickSearchStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } },
            React.createElement(AdaptableFormControlTextClear_1.AdaptableFormControlTextClear, { type: "text", placeholder: "Search Text", className: "ab-DashboardToolbar__QuickSearch__text", value: this.state.EditedQuickSearchText, OnTextChange: function (x) { return _this.onUpdateQuickSearchText(x); }, style: { height: '100%' }, inputStyle: { width: '7rem' } })));
    };
    QuickSearchToolbarControlComponent.prototype.onUpdateQuickSearchText = function (searchText) {
        this.setState({ EditedQuickSearchText: searchText });
        this.debouncedRunQuickSearch();
    };
    return QuickSearchToolbarControlComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onRunQuickSearch: function (newQuickSearchText) {
            return dispatch(QuickSearchRedux.QuickSearchApply(newQuickSearchText));
        },
        onShowQuickSearchPopup: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.QuickSearchStrategyId, ScreenPopups.QuickSearchPopup));
        },
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.QuickSearchStrategyId, ScreenPopups.QuickSearchPopup));
        },
    };
}
exports.QuickSearchToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(QuickSearchToolbarControlComponent);
