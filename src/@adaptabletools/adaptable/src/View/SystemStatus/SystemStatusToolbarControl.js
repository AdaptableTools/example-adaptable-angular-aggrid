"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var SystemStatusRedux = require("../../Redux/ActionsReducers/SystemStatusRedux");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var rebass_1 = require("rebass");
var UIHelper_1 = require("../UIHelper");
var SimpleButton_1 = require("../../components/SimpleButton");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var SystemStatusToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SystemStatusToolbarControlComponent, _super);
    function SystemStatusToolbarControlComponent(props) {
        return _super.call(this, props) || this;
    }
    SystemStatusToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var messageTypeColor = StringExtensions_1.default.IsNotNullOrEmpty(this.props.StatusMessage)
            ? UIHelper_1.default.getColorByMessageType(this.props.StatusType)
            : undefined;
        var buttonTextColor = UIHelper_1.default.getButtonTextColourForMessageType(this.props.StatusType);
        var isDefaultMessage = this.props.DefaultStatusMessage === this.props.StatusMessage &&
            this.props.DefaultStatusType === this.props.StatusType;
        var clearButton = (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.props.onClearSystemStatus(); }, tooltip: "Clear Message", tone: "neutral", variant: "text", disabled: isDefaultMessage, marginTop: 1, AccessLevel: Enums_1.AccessLevel.Full }, "Clear"));
        var message = StringExtensions_1.default.IsNotNullOrEmpty(this.props.StatusMessage)
            ? this.props.StatusMessage
            : 'No Status Message';
        var content = (React.createElement(rebass_1.Flex, { alignItems: "stretch", className: "ab-DashboardToolbar__SystemStatus__wrap" },
            React.createElement(rebass_1.Flex, { style: { borderRadius: 'var(--ab__border-radius)' }, className: "ab-DashboardToolbar__SystemStatus__text", marginRight: 2, padding: 2, color: buttonTextColor, backgroundColor: messageTypeColor, fontSize: 'var( --ab-font-size-2)', alignItems: "center" }, message),
            StringExtensions_1.default.IsNotNullOrEmpty(this.props.StatusMessage) && (React.createElement(rebass_1.Flex, { alignItems: "center" }, clearButton))));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__SystemStatus", headerText: StrategyConstants.SystemStatusStrategyFriendlyName, glyphicon: StrategyConstants.SystemStatusGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.SystemStatusStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    return SystemStatusToolbarControlComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        StatusMessage: state.SystemStatus.StatusMessage,
        StatusType: state.SystemStatus.StatusType,
        DefaultStatusMessage: state.SystemStatus.DefaultStatusMessage,
        DefaultStatusType: state.SystemStatus.DefaultStatusType,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClearSystemStatus: function () { return dispatch(SystemStatusRedux.SystemStatusClear()); },
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.SystemStatusStrategyId, ScreenPopups.SystemStatusPopup));
        },
    };
}
exports.SystemStatusToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SystemStatusToolbarControlComponent);
