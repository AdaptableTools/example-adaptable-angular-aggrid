"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptablePopover_1 = require("../../AdaptablePopover");
var SimpleButton_1 = require("../../../components/SimpleButton");
var Panel_1 = require("../../../components/Panel");
var rebass_1 = require("rebass");
var icons_1 = require("../../../components/icons");
//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
var PanelWithButton = /** @class */ (function (_super) {
    tslib_1.__extends(PanelWithButton, _super);
    function PanelWithButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelWithButton.prototype.render = function () {
        var _this = this;
        var buttonContent = this.props.buttonContent;
        var IconCmp = icons_1.default[this.props.glyphicon];
        var header = (React.createElement(rebass_1.Flex, { alignItems: "center", width: "100%" },
            React.createElement(rebass_1.Flex, { alignItems: "center" },
                this.props.glyphicon != null && (IconCmp ? React.createElement(IconCmp, null) : null),
                React.createElement(rebass_1.Box, { marginRight: 2 }),
                this.props.headerText,
                React.createElement(rebass_1.Box, { marginRight: 3 }),
                this.props.infoBody != null && (React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: "", bodyText: this.props.infoBody }))),
            React.createElement(rebass_1.Box, { style: { flex: 1 } }),
            buttonContent ? (React.createElement(SimpleButton_1.default, { variant: "raised", tone: "accent", disabled: this.props.buttonDisabled, onClick: function () { return (_this.props.buttonClick ? _this.props.buttonClick() : null); } }, buttonContent)) : null,
            this.props.button ? React.cloneElement(this.props.button) : null));
        return (React.createElement(Panel_1.default, { flex: 1, bodyScroll: this.props.bodyScroll != null ? this.props.bodyScroll : true, bodyProps: this.props.bodyProps, variant: this.props.variant || 'primary', header: header, style: this.props.style, borderRadius: (this.props.borderRadius || 'none'), border: (this.props.border || 'none') }, this.props.children));
    };
    return PanelWithButton;
}(React.Component));
exports.PanelWithButton = PanelWithButton;
