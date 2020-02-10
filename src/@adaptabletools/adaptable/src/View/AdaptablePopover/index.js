"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var UIHelper_1 = require("../UIHelper");
var ButtonInfo_1 = require("../Components/Buttons/ButtonInfo");
var icons_1 = require("../../components/icons");
var OverlayTrigger_1 = require("../../components/OverlayTrigger");
var rebass_1 = require("rebass");
var AdaptablePopover = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptablePopover, _super);
    function AdaptablePopover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptablePopover.prototype.render = function () {
        var messageType = this.props.MessageType != null ? this.props.MessageType : Enums_1.MessageType.Info;
        var useButton = this.props.useButton != null ? this.props.useButton : false;
        var popoverMinWidth = this.props.popoverMinWidth != null ? this.props.popoverMinWidth.toString() + 'px' : 'auto';
        var title = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.headerText)
            ? this.props.headerText
            : '';
        var popoverClickRootClose = (React.createElement(rebass_1.Box, { className: "ab-Popover", style: { margin: '0px', padding: '0px', minWidth: popoverMinWidth, maxWidth: 300 } },
            title ? (React.createElement(rebass_1.Text, { fontSize: 2, padding: 2 },
                React.createElement("b", null, title))) : null,
            React.createElement(rebass_1.Box, { padding: 2 }, this.props.bodyText.map(function (textOrHTML, index) { return (React.createElement("span", { key: index }, textOrHTML)); }))));
        var icon = 'info'; // - think this is wrong - UIHelper.getGlyphByMessageType(messageType);
        var color = UIHelper_1.UIHelper.getColorByMessageType(messageType);
        var iconStyle = {
            color: color,
            fill: 'currentColor',
        };
        return (React.createElement(rebass_1.Flex, { alignItems: "center", className: this.props.className },
            React.createElement(OverlayTrigger_1.default, { showTriangle: true, render: function () { return popoverClickRootClose; }, showEvent: (this.props.showEvent || 'mouseenter'), hideEvent: (this.props.hideEvent || 'mouseleave'), style: {
                    overflow: 'visible',
                }, defaultZIndex: 100000 }, useButton ? (React.createElement(ButtonInfo_1.ButtonInfo, { style: iconStyle, onClick: function () { return null; }, icon: icon, tooltip: this.props.tooltipText })) : (React.createElement("div", { tabIndex: 0, style: { cursor: 'pointer', display: 'inline-block' } },
                React.createElement(icons_1.Icon, { name: icon }))))));
    };
    return AdaptablePopover;
}(React.Component));
exports.AdaptablePopover = AdaptablePopover;
