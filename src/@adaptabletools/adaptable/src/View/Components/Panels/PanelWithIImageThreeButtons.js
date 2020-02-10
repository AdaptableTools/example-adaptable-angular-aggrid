"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptablePopover_1 = require("../../AdaptablePopover");
var WizardPanel_1 = require("../../../components/WizardPanel");
var icons_1 = require("../../../components/icons");
var rebass_1 = require("rebass");
var ChartIcon = icons_1.default['chart'];
//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
var PanelWithImageThreeButtons = /** @class */ (function (_super) {
    tslib_1.__extends(PanelWithImageThreeButtons, _super);
    function PanelWithImageThreeButtons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelWithImageThreeButtons.prototype.render = function () {
        var _a = this.props, firstButton = _a.firstButton, secondButton = _a.secondButton, thirdButton = _a.thirdButton, infoBody = _a.infoBody, header = _a.header, panelProps = tslib_1.__rest(_a, ["firstButton", "secondButton", "thirdButton", "infoBody", "header"]);
        header = (React.createElement(rebass_1.Flex, { alignItems: "center", width: "100%" },
            React.createElement(ChartIcon, null),
            React.createElement(rebass_1.Text, { mx: 2 }, header),
            infoBody != null && React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: "", bodyText: infoBody }),
            React.createElement("div", { style: { flex: 1 } }),
            firstButton,
            secondButton,
            thirdButton));
        return React.createElement(WizardPanel_1.default, tslib_1.__assign({}, panelProps, { header: header }));
    };
    return PanelWithImageThreeButtons;
}(React.Component));
exports.PanelWithImageThreeButtons = PanelWithImageThreeButtons;
