"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var AdaptablePopover_1 = require("../../AdaptablePopover");
var Panel_1 = require("../../../components/Panel");
var rebass_1 = require("rebass");
var icons_1 = require("../../../components/icons");
//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
var PanelWithImageCmp = /** @class */ (function (_super) {
    tslib_1.__extends(PanelWithImageCmp, _super);
    function PanelWithImageCmp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelWithImageCmp.prototype.render = function () {
        var IconCmp = icons_1.default[(this.props.icon || this.props.glyphicon)];
        var headerStyle = {};
        if (this.props.headerColor) {
            headerStyle.color = this.props.headerColor;
            headerStyle.fill = this.props.headerColor;
        }
        var headerRow = (React.createElement(rebass_1.Flex, { style: { flex: 1 } },
            React.createElement(rebass_1.Flex, { alignItems: "center" },
                React.createElement(rebass_1.Flex, { alignItems: "center", style: headerStyle },
                    IconCmp ? React.createElement(IconCmp, null) : null,
                    React.createElement(rebass_1.Box, { marginRight: 2 }),
                    this.props.header,
                    React.createElement(rebass_1.Box, { marginRight: 3 }),
                    this.props.infoBody != null && (React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: "", bodyText: this.props.infoBody }))),
                React.createElement(rebass_1.Box, { flex: 1 }),
                this.props.button && React.cloneElement(this.props.button))));
        return (React.createElement(Panel_1.default, { header: headerRow, variant: this.props.variant, style: this.props.style, bodyScroll: this.props.bodyScroll !== undefined ? this.props.bodyScroll : true, border: "none", borderRadius: this.props.borderRadius || 'none', bodyProps: tslib_1.__assign({ padding: 0 }, this.props.bodyProps) }, this.props.children));
    };
    return PanelWithImageCmp;
}(React.Component));
exports.PanelWithImage = styled_components_1.withTheme(PanelWithImageCmp);
