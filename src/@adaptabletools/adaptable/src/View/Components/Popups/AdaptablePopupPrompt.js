"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var UIHelper_1 = require("../../UIHelper");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var Dialog_1 = require("../../../components/Dialog");
var rebass_1 = require("rebass");
var SimpleButton_1 = require("../../../components/SimpleButton");
var Input_1 = require("../../../components/Input");
var AdaptablePopupPrompt = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptablePopupPrompt, _super);
    function AdaptablePopupPrompt(props) {
        var _this = _super.call(this, props) || this;
        _this.changeContent = function (e) {
            _this.setState({ PromptText: e.target.value });
        };
        _this.state = { PromptText: '' };
        return _this;
    }
    AdaptablePopupPrompt.prototype.render = function () {
        var _this = this;
        var modalContainer = UIHelper_1.UIHelper.getModalContainer(this.props.Adaptable.adaptableOptions, document);
        return (this.props.ShowPopup && (React.createElement(Dialog_1.default, { modal: true, isOpen: this.props.ShowPopup, onDismiss: this.props.onClose, showCloseButton: false, style: { minHeight: 'auto', maxWidth: '50%' } },
            React.createElement(rebass_1.Flex, { flexDirection: "column" },
                React.createElement(rebass_1.Box, { marginTop: 3, mx: 2 }, this.props.Header),
                StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.Msg) && (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } }, this.props.Msg.split('\n').map(function (item, index) {
                    return (React.createElement("span", { key: index },
                        item,
                        React.createElement("br", null)));
                }))),
                React.createElement(Input_1.default, { autoFocus: true, marginTop: 3, mx: 3, value: this.state.PromptText, type: "string", placeholder: "Enter text", onChange: function (e) { return _this.changeContent(e); } }),
                React.createElement(rebass_1.Box, { marginTop: 3 },
                    React.createElement(rebass_1.Flex, { padding: 2 },
                        React.createElement(SimpleButton_1.default, { tone: "accent", variant: "raised", disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.PromptText), onClick: function () { return _this.onConfirmmForm(); } }, "OK"),
                        React.createElement("div", { style: { flex: 1 } }),
                        React.createElement(SimpleButton_1.default, { tone: "neutral", variant: "raised", onClick: function () { return _this.onCloseForm(); } }, "Cancel")))))));
    };
    AdaptablePopupPrompt.prototype.onCloseForm = function () {
        this.setState({ PromptText: '' });
        this.props.onClose();
    };
    AdaptablePopupPrompt.prototype.onConfirmmForm = function () {
        var promptText = this.state.PromptText;
        this.setState({ PromptText: '' });
        this.props.onConfirm(promptText);
    };
    return AdaptablePopupPrompt;
}(React.Component));
exports.AdaptablePopupPrompt = AdaptablePopupPrompt;
