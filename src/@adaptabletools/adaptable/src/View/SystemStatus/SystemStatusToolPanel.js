"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var SystemStatusRedux = require("../../Redux/ActionsReducers/SystemStatusRedux");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ToolPanelRedux = require("../../Redux/ActionsReducers/ToolPanelRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var rebass_1 = require("rebass");
var UIHelper_1 = require("../UIHelper");
var SimpleButton_1 = require("../../components/SimpleButton");
var PanelToolPanel_1 = require("../Components/Panels/PanelToolPanel");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var SystemStatusToolPanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SystemStatusToolPanelComponent, _super);
    function SystemStatusToolPanelComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { IsMinimised: true };
        return _this;
    }
    SystemStatusToolPanelComponent.prototype.render = function () {
        var _this = this;
        var messageTypeColor = UIHelper_1.default.getColorByMessageType(this.props.StatusType);
        var buttonTextColor = UIHelper_1.default.getButtonTextColourForMessageType(this.props.StatusType);
        var isDefaultMessage = this.props.DefaultStatusMessage === this.props.StatusMessage &&
            this.props.DefaultStatusType === this.props.StatusType;
        var clearButton = (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.props.onClearSystemStatus(); }, tooltip: "Clear Message", tone: "neutral", variant: "text", disabled: isDefaultMessage, marginTop: 1, AccessLevel: Enums_1.AccessLevel.Full }, "Clear"));
        var content = StringExtensions_1.default.IsNotNullOrEmpty(this.props.StatusMessage) ? (React.createElement(rebass_1.Flex, { flexDirection: "column", alignItems: "stretch", className: "ab-ToolPanel__SystemStatus__wrap" },
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "stretch", className: "ab-ToolPanel__SystemStatus__text", style: { borderRadius: 'var(--ab__border-radius)' }, marginRight: 2, padding: 2, color: buttonTextColor, backgroundColor: messageTypeColor, fontSize: 'var( --ab-font-size-2)' }, this.props.StatusMessage),
            React.createElement(rebass_1.Flex, { flexDirection: "column", alignItems: "stretch", className: "ab-ToolPanel__SystemStatus__wrap" }, clearButton))) : (React.createElement(rebass_1.Text, { fontSize: 2 }, "No Status Message"));
        return (React.createElement(PanelToolPanel_1.PanelToolPanel, { className: "ab-ToolPanel_SystemStatus", headerText: StrategyConstants.SystemStatusStrategyFriendlyName, onConfigure: function () { return _this.props.onConfigure(); }, onMinimiseChanged: function () { return _this.setState({ IsMinimised: !_this.state.IsMinimised }); }, isMinimised: this.state.IsMinimised, onClose: function () { return _this.props.onClose('SystemStatus'); } }, this.state.IsMinimised ? null : content));
    };
    return SystemStatusToolPanelComponent;
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
        onClose: function (toolPanel) {
            return dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.SystemStatusStrategyId, ScreenPopups.SystemStatusPopup));
        },
    };
}
exports.SystemStatusToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SystemStatusToolPanelComponent);
