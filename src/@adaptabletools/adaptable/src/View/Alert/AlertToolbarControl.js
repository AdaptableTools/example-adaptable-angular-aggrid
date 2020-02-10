"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var AdaptablePopover_1 = require("../AdaptablePopover");
var AlertsPanel_1 = require("./AlertsPanel");
var rebass_1 = require("rebass");
var UIHelper_1 = require("../UIHelper");
var AlertToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AlertToolbarControlComponent, _super);
    function AlertToolbarControlComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ShowMessage: false,
            Alerts: _this.props.AdaptableAlerts,
        };
        return _this;
    }
    AlertToolbarControlComponent.prototype.componentDidUpdate = function () {
        if (this.state.Alerts.length != this.props.AdaptableAlerts.length) {
            this.setState({ ShowMessage: true, Alerts: this.props.AdaptableAlerts });
        }
    };
    AlertToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var messageType = UIHelper_1.default.getMessageTypeFromAdaptableAlerts(this.props.AdaptableAlerts);
        var messageTypeColor = UIHelper_1.default.getColorByMessageType(messageType);
        var alertsPanel = (React.createElement(AlertsPanel_1.AlertsPanel, { Alerts: this.props.AdaptableAlerts, ShowPanel: true, ShowHeader: false, onClearAlert: this.props.onDeleteAlert, onRender: function () { return _this.setState({ ShowMessage: false }); }, onClearAllAlerts: this.props.onDeleteAllAlert }));
        var collapsedText = this.props.AdaptableAlerts.length == 0
            ? '0 Alerts'
            : this.props.AdaptableAlerts.length == 1
                ? '1 Alert'
                : this.props.AdaptableAlerts.length + ' Alerts';
        var buttonColor = UIHelper_1.default.getButtonColourForAdaptableAlerts(this.props.AdaptableAlerts, messageTypeColor);
        var buttonTextColor = UIHelper_1.default.getButtonTextColourForArrayandMessageType(this.props.AdaptableAlerts, messageType);
        var content = (React.createElement(rebass_1.Flex, { alignItems: "stretch", className: "ab-DashboardToolbar__Alert__wrap" },
            React.createElement(rebass_1.Flex, { style: { borderRadius: 'var(--ab__border-radius)' }, className: "ab-DashboardToolbar__Alert__text", marginRight: 2, padding: 2, color: buttonTextColor, backgroundColor: buttonColor, fontSize: 'var( --ab-font-size-2)', alignItems: "center" }, collapsedText),
            this.props.AdaptableAlerts.length > 0 && (React.createElement(rebass_1.Flex, { alignItems: "center" },
                React.createElement(AdaptablePopover_1.AdaptablePopover, { className: "ab-DashboardToolbar__Alert__info", headerText: "", 
                    // tooltipText="Alerts"
                    bodyText: [alertsPanel], MessageType: messageType, useButton: true, showEvent: 'focus', hideEvent: "blur" })))));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__Alert", headerText: StrategyConstants.AlertStrategyFriendlyName, glyphicon: StrategyConstants.AlertGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.AlertStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    return AlertToolbarControlComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        AlertDefinitions: state.Alert.AlertDefinitions,
        AdaptableAlerts: state.System.AdaptableAlerts,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onDeleteAlert: function (alert) { return dispatch(SystemRedux.SystemAlertDelete(alert)); },
        onDeleteAllAlert: function (alerts) {
            return dispatch(SystemRedux.SystemAlertDeleteAll(alerts));
        },
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.AlertStrategyId, ScreenPopups.AlertPopup));
        },
    };
}
exports.AlertToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AlertToolbarControlComponent);
