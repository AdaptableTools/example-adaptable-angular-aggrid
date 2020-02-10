"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptablePopover_1 = require("../../AdaptablePopover");
var rebass_1 = require("rebass");
var icons_1 = require("../../../components/icons");
var Panel_1 = require("../../../components/Panel");
//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
var PanelWithImageTwoButtons = /** @class */ (function (_super) {
    tslib_1.__extends(PanelWithImageTwoButtons, _super);
    function PanelWithImageTwoButtons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelWithImageTwoButtons.prototype.render = function () {
        var header = (React.createElement(rebass_1.Flex, { flexDirection: "column" },
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Flex, { flex: 9 },
                    React.createElement(icons_1.Icon, { name: this.props.glyphicon }),
                    this.props.header,
                    this.props.infoBody != null && (React.createElement("span", null,
                        React.createElement("label", null, " "),
                        React.createElement("span", null,
                            ' ',
                            React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: "", bodyText: this.props.infoBody }))))),
                React.createElement(rebass_1.Flex, { flex: 1 }),
                React.createElement(rebass_1.Box, null,
                    this.props.secondButton,
                    this.props.firstButton))));
        return (React.createElement(Panel_1.default, { header: header, style: this.props.style }, this.props.children));
    };
    return PanelWithImageTwoButtons;
}(React.Component));
exports.PanelWithImageTwoButtons = PanelWithImageTwoButtons;
