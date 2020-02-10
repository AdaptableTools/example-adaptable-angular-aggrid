"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var ToolPanelRedux = require("../../Redux/ActionsReducers/ToolPanelRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var PanelToolPanel_1 = require("../Components/Panels/PanelToolPanel");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var Dropdown_1 = require("../../components/Dropdown");
var DashboardToolPanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardToolPanelComponent, _super);
    function DashboardToolPanelComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { IsMinimised: true };
        return _this;
    }
    DashboardToolPanelComponent.prototype.render = function () {
        var _this = this;
        var visibilityOptions = EnumExtensions_1.default.getNames(Enums_1.Visibility).map(function (type) {
            return {
                value: type,
                label: type,
            };
        });
        return (React.createElement(PanelToolPanel_1.PanelToolPanel, { className: "ab-ToolPanel__Dashboard", headerText: StrategyConstants.DashboardStrategyFriendlyName, onConfigure: function () { return _this.props.onConfigure(); }, onMinimiseChanged: function () { return _this.setState({ IsMinimised: !_this.state.IsMinimised }); }, isMinimised: this.state.IsMinimised, onClose: function () { return _this.props.onClose('Dashboard'); } }, !this.state.IsMinimised && (React.createElement(Dropdown_1.default, { key: 'dashboardvisibility', style: { minWidth: 170 }, placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.props.DashboardVisibility, onChange: function (value) { return _this.props.onSetDashboardVisibility(value); }, options: visibilityOptions }))));
    };
    return DashboardToolPanelComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        DashboardVisibility: state.Dashboard.DashboardVisibility,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSetDashboardVisibility: function (visibility) {
            return dispatch(DashboardRedux.DashboardSetVisibility(visibility));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.DashboardStrategyId, ScreenPopups.DashboardPopup));
        },
        onClose: function (toolPanel) {
            return dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel));
        },
    };
}
exports.DashboardToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DashboardToolPanelComponent);
