"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var UIHelper_1 = require("../../UIHelper");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var PanelWithImage_1 = require("../Panels/PanelWithImage");
var rebass_1 = require("rebass");
var SimpleButton_1 = require("../../../components/SimpleButton");
var Input_1 = require("../../../components/Input");
var Dialog_1 = require("../../../components/Dialog");
var AdaptablePopupConfirmation = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptablePopupConfirmation, _super);
    function AdaptablePopupConfirmation(props) {
        var _this = _super.call(this, props) || this;
        _this.changeContent = function (e) {
            _this.setState({ PromptText: e.target.value });
        };
        _this.state = { PromptText: '' };
        return _this;
    }
    AdaptablePopupConfirmation.prototype.render = function () {
        var _this = this;
        var header = this.props.Header;
        var glyph = UIHelper_1.UIHelper.getGlyphByMessageType(this.props.MessageType);
        return (this.props.ShowPopup && (React.createElement(Dialog_1.default, { modal: true, isOpen: this.props.ShowPopup, onDismiss: this.props.onCancel, showCloseButton: false, style: { minHeight: 'auto', maxWidth: '50%' } },
            React.createElement(PanelWithImage_1.PanelWithImage, { header: header, icon: glyph, variant: "primary" },
                React.createElement("div", null,
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center' } }, this.props.Msg.split('\n').map(function (item, index) {
                        return (React.createElement(rebass_1.Text, { key: index, margin: 2 },
                            item,
                            React.createElement("br", null)));
                    })),
                    this.props.ShowInputBox && (React.createElement(rebass_1.Box, { padding: 2 },
                        React.createElement("p", null, "Please enter a comment to confirm"),
                        React.createElement(Input_1.default, { marginTop: 2, width: '100%', value: this.state.PromptText, type: "string", placeholder: "Enter text", onChange: function (e) { return _this.changeContent(e); } }))),
                    React.createElement(rebass_1.Box, { marginTop: 3 },
                        React.createElement(rebass_1.Flex, { padding: 2 },
                            React.createElement(SimpleButton_1.default, { tone: "error", variant: "raised", disabled: !this.canConfirm(), onClick: function () { return _this.onConfirmmForm(); } }, this.props.ConfirmButtonText),
                            React.createElement("div", { style: { flex: 1 } }),
                            React.createElement(SimpleButton_1.default, { tone: "neutral", variant: "raised", onClick: function () { return _this.onCancelForm(); } }, this.props.CancelButtonText))))))));
    };
    AdaptablePopupConfirmation.prototype.onCancelForm = function () {
        this.setState({ PromptText: '' });
        this.props.onCancel();
    };
    AdaptablePopupConfirmation.prototype.onConfirmmForm = function () {
        var promptText = this.state.PromptText;
        this.setState({ PromptText: '' });
        this.props.onConfirm(promptText);
    };
    AdaptablePopupConfirmation.prototype.canConfirm = function () {
        if (this.props.ShowInputBox) {
            return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.PromptText);
        }
        return true;
    };
    return AdaptablePopupConfirmation;
}(React.Component));
exports.AdaptablePopupConfirmation = AdaptablePopupConfirmation;
