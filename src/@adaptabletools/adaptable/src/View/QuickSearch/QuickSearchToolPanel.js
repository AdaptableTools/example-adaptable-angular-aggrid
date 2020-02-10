"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var _ = require("lodash");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var ToolPanelRedux = require("../../Redux/ActionsReducers/ToolPanelRedux");
var QuickSearchRedux = require("../../Redux/ActionsReducers/QuickSearchRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var PanelToolPanel_1 = require("../Components/Panels/PanelToolPanel");
var AdaptableFormControlTextClear_1 = require("../Components/Forms/AdaptableFormControlTextClear");
var QuickSearchToolPanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(QuickSearchToolPanelComponent, _super);
    function QuickSearchToolPanelComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.debouncedRunQuickSearch = _.debounce(function () { return _this.props.onRunQuickSearch(_this.state.EditedQuickSearchText); }, 350);
        _this.state = { EditedQuickSearchText: _this.props.QuickSearchText, IsMinimised: true };
        return _this;
    }
    QuickSearchToolPanelComponent.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, nextContext) {
        this.setState({
            EditedQuickSearchText: nextProps.QuickSearchText,
        });
    };
    QuickSearchToolPanelComponent.prototype.render = function () {
        var _this = this;
        return (React.createElement(PanelToolPanel_1.PanelToolPanel, { className: "ab-ToolPanel__QuickSearch", headerText: StrategyConstants.QuickSearchStrategyFriendlyName, onConfigure: function () { return _this.props.onConfigure(); }, onMinimiseChanged: function () { return _this.setState({ IsMinimised: !_this.state.IsMinimised }); }, isMinimised: this.state.IsMinimised, onClose: function () { return _this.props.onClose('QuickSearch'); } }, !this.state.IsMinimised && (React.createElement(AdaptableFormControlTextClear_1.AdaptableFormControlTextClear, { type: "text", placeholder: "Search Text", className: "ab-ToolPanel__QuickSearch__text", value: this.state.EditedQuickSearchText, OnTextChange: function (x) { return _this.onUpdateQuickSearchText(x); }, style: { height: '100%' }, inputStyle: { width: '7rem' } }))));
    };
    QuickSearchToolPanelComponent.prototype.onUpdateQuickSearchText = function (searchText) {
        this.setState({ EditedQuickSearchText: searchText });
        this.debouncedRunQuickSearch();
    };
    return QuickSearchToolPanelComponent;
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
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.QuickSearchStrategyId, ScreenPopups.QuickSearchPopup));
        },
        onClose: function (toolPanel) {
            return dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel));
        },
    };
}
exports.QuickSearchToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(QuickSearchToolPanelComponent);
