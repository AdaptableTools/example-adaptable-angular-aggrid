"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var UIHelper_1 = require("../UIHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var rebass_1 = require("rebass");
var SimpleButton_1 = require("../../components/SimpleButton");
var HelpBlock_1 = require("../../components/HelpBlock");
var StateManagementPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(StateManagementPopupComponent, _super);
    function StateManagementPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    StateManagementPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Function that clears user config - advisable for development use only.',
        ];
        var clearButton = (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.onClearLocalStorage(); }, tooltip: "Clear User Data", tone: "error", variant: "raised", marginTop: 2, AccessLevel: Enums_1.AccessLevel.Full }, "Clear User Data"));
        var copyAllButton = (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.onCopyAllStateToClipboard(); }, tooltip: "Copy All Data to Clipboard", tone: "neutral", variant: "raised", marginTop: 2, marginRight: 3, AccessLevel: Enums_1.AccessLevel.Full }, "Copy All Data to Clipboard"));
        var copyUserStateButton = (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.onCopyUserStateToClipboard(); }, tooltip: "Copy User State to Clipboard", tone: "neutral", variant: "raised", marginTop: 2, marginRight: 3, AccessLevel: Enums_1.AccessLevel.Full }, "Copy User Data to Clipboard"));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.StateManagementStrategyFriendlyName, button: null, glyphicon: StrategyConstants.StateManagementGlyph, infoBody: infoBody },
                React.createElement(rebass_1.Box, null,
                    React.createElement(HelpBlock_1.default, null, 'Clear all current user state that has been applied.   When you restart / refresh Adaptable any state that you have previously created will be lost.  However your Predefined Config will then be re-applied.'),
                    clearButton,
                    React.createElement(HelpBlock_1.default, { marginTop: 3 }, 'Copy either everything in the State, or just the User State, to the Clipboard.'),
                    copyAllButton,
                    copyUserStateButton))));
    };
    StateManagementPopupComponent.prototype.onClearLocalStorage = function () {
        this.props.Adaptable.api.configApi.configDeleteLocalStorage();
    };
    StateManagementPopupComponent.prototype.onCopyAllStateToClipboard = function () {
        this.props.Adaptable.api.configApi.configCopyAllStateToClipboard();
    };
    StateManagementPopupComponent.prototype.onCopyUserStateToClipboard = function () {
        this.props.Adaptable.api.configApi.configCopyUserStateToClipboard();
    };
    return StateManagementPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {};
}
exports.StateManagementPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(StateManagementPopupComponent);
