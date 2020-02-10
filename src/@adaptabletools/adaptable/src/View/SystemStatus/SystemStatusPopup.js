"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var SystemStatusRedux = require("../../Redux/ActionsReducers/SystemStatusRedux");
var PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var rebass_1 = require("rebass");
var SimpleButton_1 = require("../../components/SimpleButton");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var SystemStatusPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SystemStatusPopupComponent, _super);
    function SystemStatusPopupComponent(props) {
        return _super.call(this, props) || this;
        // this.state = { EditedSystemStatusText: '', EditedStyle: null };
    }
    SystemStatusPopupComponent.prototype.onSystemStatusShowAlertChanged = function (showAlert) {
        this.props.onSetSystemStatusShowAlert(showAlert);
    };
    SystemStatusPopupComponent.prototype.onSystemStatusClear = function () {
        this.props.onClearSystemStatus();
    };
    SystemStatusPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'See any System Status messgages that have been set.',
            React.createElement("br", null),
            React.createElement("br", null),
            'Clear them if you have read them.',
        ];
        var messageTypeColor = UIHelper_1.default.getColorByMessageType(this.props.StatusType);
        var clearButton = (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.onSystemStatusClear(); }, tooltip: "Clear User Data", tone: "neutral", variant: "raised", marginTop: 3, AccessLevel: Enums_1.AccessLevel.Full }, "Clear System Status"));
        var content = StringExtensions_1.default.IsNotNullOrEmpty(this.props.StatusMessage) ? (React.createElement("div", null,
            ' ',
            React.createElement(rebass_1.Flex, { style: { borderRadius: 'var(--ab__border-radius)', fontWeight: 'bold' }, className: "ab-DashboardToolbar__SystemStatus__text", marginRight: 2, marginBottom: 3, padding: 2, color: 'text-on-secondary', backgroundColor: messageTypeColor, fontSize: 'var( --ab-font-size-2)', alignItems: "center" }, "System Status Message"),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Text, { style: { flex: 2 }, marginRight: 2 }, this.props.StatusMessage)),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Text, { style: { flex: 2 }, marginRight: 2, marginTop: 2 }, this.props.StatusFurtherInformation)),
            clearButton)) : (React.createElement(rebass_1.Text, { fontSize: 2 }, "No Status Message"));
        return (React.createElement(PanelWithImage_1.PanelWithImage, { variant: "primary", header: StrategyConstants.SystemStatusStrategyFriendlyName, glyphicon: StrategyConstants.SystemStatusGlyph, infoBody: infoBody, bodyProps: { padding: 2 } }, content));
    };
    return SystemStatusPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        StatusMessage: state.SystemStatus.StatusMessage,
        StatusType: state.SystemStatus.StatusType,
        StatusFurtherInformation: state.SystemStatus.StatusFurtherInformation,
        ShowAlert: state.SystemStatus.ShowAlert,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSetSystemStatusShowAlert: function (showAlert) {
            return dispatch(SystemStatusRedux.SystemStatusSetShowAlert(showAlert));
        },
        onClearSystemStatus: function () { return dispatch(SystemStatusRedux.SystemStatusClear()); },
    };
}
exports.SystemStatusPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SystemStatusPopupComponent);
