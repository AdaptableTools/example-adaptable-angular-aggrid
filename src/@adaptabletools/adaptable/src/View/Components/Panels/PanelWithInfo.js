"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptablePopover_1 = require("../../AdaptablePopover");
var WizardPanel_1 = require("../../../components/WizardPanel");
var rebass_1 = require("rebass");
var PanelWithInfo = /** @class */ (function (_super) {
    tslib_1.__extends(PanelWithInfo, _super);
    function PanelWithInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelWithInfo.prototype.render = function () {
        var className = 'panel-with-info';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        var headerProps = this.props.headerProps;
        var headerRow = (React.createElement(rebass_1.Flex, { flexDirection: "row" },
            this.props.header,
            React.createElement(rebass_1.Box, { marginLeft: 2 },
                React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: "", bodyText: this.props.infoBody }))));
        return (React.createElement(WizardPanel_1.default, { headerProps: headerProps, header: headerRow, className: className, bodyScroll: true, style: this.props.style }, this.props.children));
    };
    return PanelWithInfo;
}(React.Component));
exports.PanelWithInfo = PanelWithInfo;
