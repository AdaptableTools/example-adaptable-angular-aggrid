"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var UIHelper_1 = require("../UIHelper");
var ButtonPreviewDelete_1 = require("../Components/Buttons/ButtonPreviewDelete");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var rebass_1 = require("rebass");
var icons_1 = require("../../components/icons");
var ListGroupItem_1 = require("../../components/List/ListGroupItem");
var ListGroup_1 = require("../../components/List/ListGroup");
var SimpleButton_1 = require("../../components/SimpleButton");
var AlertsPanel = /** @class */ (function (_super) {
    tslib_1.__extends(AlertsPanel, _super);
    function AlertsPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlertsPanel.prototype.componentWillUnmount = function () {
        this.props.onRender();
    };
    AlertsPanel.prototype.render = function () {
        var _this = this;
        var alerts = this.props.Alerts.map(function (alert, index) {
            var alertHasheader = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(alert.Header);
            var textColor = UIHelper_1.UIHelper.getColorByMessageType(alert.AlertDefinition.MessageType);
            var textStyle = {
                color: textColor,
                fill: textColor,
            };
            var iconName = UIHelper_1.UIHelper.getGlyphByMessageType(alert.AlertDefinition.MessageType);
            var IconCmp = icons_1.default[iconName];
            var icon = IconCmp ? React.createElement(IconCmp, null) : null;
            var alertText = (React.createElement("div", { key: alert.Uuid, style: { maxWidth: '600px', width: '100%' } },
                React.createElement(rebass_1.Flex, { alignItems: "center", width: "100%" },
                    React.createElement(rebass_1.Text, { style: textStyle }, icon),
                    alertHasheader ? (React.createElement("b", { style: { flex: 1 } }, alert.Header)) : (React.createElement("div", { style: { fontSize: 10, flex: 1, display: 'inline-block' } }, alert.Msg)),
                    React.createElement(ButtonPreviewDelete_1.default, { onClick: function () { return _this.props.onClearAlert(alert); }, tooltip: "Clear Alert", disabled: false, style: { float: 'left' }, AccessLevel: Enums_1.AccessLevel.Full })),
                React.createElement("div", null, alertHasheader && React.createElement("span", { style: { fontSize: 10 } }, alert.Msg))));
            return React.createElement(ListGroupItem_1.default, { key: index }, alertText);
        });
        var clearAllButton = (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.props.onClearAllAlerts(_this.props.Alerts); }, variant: "raised", tone: "neutral", AccessLevel: Enums_1.AccessLevel.Full }, "Clear All"));
        return (React.createElement(PanelWithButton_1.PanelWithButton, { variant: "default", bodyProps: { padding: 0 }, headerText: 'Alerts', button: clearAllButton },
            React.createElement(ListGroup_1.default, null, alerts)));
    };
    return AlertsPanel;
}(React.Component));
exports.AlertsPanel = AlertsPanel;
