"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var PanelWithImage_1 = require("../Panels/PanelWithImage");
var UIHelper_1 = require("../../UIHelper");
var rebass_1 = require("rebass");
var Dialog_1 = require("../../../components/Dialog");
var SimpleButton_1 = require("../../../components/SimpleButton");
var AdaptablePopupAlert = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptablePopupAlert, _super);
    function AdaptablePopupAlert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptablePopupAlert.prototype.render = function () {
        var _this = this;
        var messageType = this.props.MessageType || Enums_1.MessageType.Error;
        var headerContainsMessage = this.props.Header.indexOf(messageType) != -1;
        var headerColor = UIHelper_1.UIHelper.getColorByMessageType(messageType);
        var header = headerContainsMessage ? this.props.Header : messageType.toUpperCase();
        var glyph = UIHelper_1.UIHelper.getGlyphByMessageType(messageType);
        return (this.props.ShowPopup && (React.createElement(Dialog_1.default, { showCloseButton: false, isOpen: this.props.ShowPopup, onDismiss: this.props.onClose, style: {
                minHeight: 'auto',
                minWidth: '20vw',
            } },
            React.createElement(PanelWithImage_1.PanelWithImage, { header: header, headerColor: headerColor, glyphicon: glyph, bodyProps: { padding: 2 } },
                React.createElement("div", null,
                    headerContainsMessage == false && (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        React.createElement(rebass_1.Text, { my: 2 }, this.props.Header))),
                    React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" }, this.props.Msg.split('\n').map(function (item, index) {
                        return (React.createElement(rebass_1.Flex, { flexDirection: "row", key: index },
                            React.createElement(rebass_1.Text, { key: index, margin: 2 },
                                item,
                                React.createElement("br", null))));
                    })),
                    React.createElement(rebass_1.Flex, { flexDirection: "row", marginTop: 2, alignItems: "center", padding: 2 },
                        React.createElement(SimpleButton_1.default, { variant: "raised", tone: messageType.toLowerCase(), onClick: function () { return _this.props.onClose(); } }, "OK")))))));
    };
    return AdaptablePopupAlert;
}(React.Component));
exports.AdaptablePopupAlert = AdaptablePopupAlert;
