"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Panel_1 = require("../../../components/Panel");
var rebass_1 = require("rebass");
//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
var PanelWithTwoButtons = /** @class */ (function (_super) {
    tslib_1.__extends(PanelWithTwoButtons, _super);
    function PanelWithTwoButtons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelWithTwoButtons.prototype.render = function () {
        var header = (React.createElement(rebass_1.Flex, { alignItems: "center", width: "100%" },
            React.createElement(rebass_1.Flex, { flex: 1 }, this.props.headerText),
            this.props.secondButton,
            this.props.firstButton));
        return (React.createElement(Panel_1.default, tslib_1.__assign({}, this.props, { header: header }), this.props.children));
    };
    return PanelWithTwoButtons;
}(React.Component));
exports.PanelWithTwoButtons = PanelWithTwoButtons;
