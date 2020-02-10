"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Panel_1 = require("../../../../components/Panel");
var ButtonClose_1 = require("../../Buttons/ButtonClose");
var ButtonConfigure_1 = require("../../Buttons/ButtonConfigure");
var ButtonMinimise_1 = require("../../Buttons/ButtonMinimise");
var rebass_1 = require("rebass");
var join_1 = require("../../../../components/utils/join");
var icons_1 = require("../../../../components/icons");
//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
var PanelDashboard = /** @class */ (function (_super) {
    tslib_1.__extends(PanelDashboard, _super);
    function PanelDashboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelDashboard.prototype.render = function () {
        var _a = this.props, useDefaultPanelStyle = _a.useDefaultPanelStyle, onMinimise = _a.onMinimise, glyphicon = _a.glyphicon, showGlyphIcon = _a.showGlyphIcon, headerText = _a.headerText, showMinimiseButton = _a.showMinimiseButton, showConfigureButton = _a.showConfigureButton, showCloseButton = _a.showCloseButton, onClose = _a.onClose, onConfigure = _a.onConfigure, props = tslib_1.__rest(_a, ["useDefaultPanelStyle", "onMinimise", "glyphicon", "showGlyphIcon", "headerText", "showMinimiseButton", "showConfigureButton", "showCloseButton", "onClose", "onConfigure"]);
        var header = (React.createElement(React.Fragment, null,
            showMinimiseButton ? (React.createElement(ButtonMinimise_1.ButtonMinimise, { className: "ab-DashboardPanel__header-minimise", onClick: function () { return (onMinimise ? onMinimise() : null); }, marginRight: 2 })) : null,
            showGlyphIcon ? (React.createElement(icons_1.Icon, { style: {
                    alignSelf: 'center',
                    marginLeft: 'var(--ab-space-2)',
                    color: 'var(--ab-cmp-dashboardpanel_header__fill)',
                }, className: "ab-DashboardPanel__header-icon", name: glyphicon })) : null,
            React.createElement(rebass_1.Flex, { className: "ab-DashboardPanel__header-text", flex: 1, alignItems: "center", marginLeft: 2 }, headerText),
            showConfigureButton ? (React.createElement(ButtonConfigure_1.ButtonConfigure, { iconSize: 16, marginLeft: 2, className: "ab-DashboardPanel__header-configure-button", tooltip: 'Configure ' + headerText, onClick: function () { return onConfigure(); } })) : null,
            showCloseButton ? (React.createElement(ButtonClose_1.ButtonClose, { marginLeft: showConfigureButton ? 0 : 3, className: "ab-DashboardPanel__header-close-button", tooltip: 'Close ' + headerText, onClick: function () { return onClose(); } })) : null));
        return (React.createElement(Panel_1.default, tslib_1.__assign({ border: "var(--ab-cmp-dashboardpanel__border)" }, props, { className: join_1.default('ab-DashboardPanel', props.className), header: header, style: tslib_1.__assign({ color: 'var(--ab-cmp-dashboardpanel__color)', fill: 'var(--ab-cmp-dashboardpanel__fill)' }, props.style), headerProps: tslib_1.__assign(tslib_1.__assign({}, props.headerProps), { alignItems: 'stretch', style: tslib_1.__assign({ padding: 'var(--ab-cmp-dashboardpanel_header__padding)', background: 'var(--ab-cmp-dashboardpanel_header__background)', color: 'var(--ab-cmp-dashboardpanel_header__color)', fill: 'var(--ab-cmp-dashboardpanel_header__fill)' }, (props.headerProps ? props.headerProps.style : null)) }), bodyProps: tslib_1.__assign(tslib_1.__assign({}, props.bodyProps), { style: tslib_1.__assign(tslib_1.__assign({ padding: 'var(--ab-cmp-dashboardpanel_body__padding)', background: 'var(--ab-cmp-dashboardpanel_body__background)' }, (props.bodyProps ? props.bodyProps.style : null)), { display: 'flex', alignItems: 'center' }) }) })));
    };
    PanelDashboard.defaultProps = {
        showCloseButton: true,
        showConfigureButton: true,
        showMinimiseButton: false,
        headerText: 'Function',
        glyphicon: 'home',
        onClose: null,
        onConfigure: null,
        onMinimise: null,
        showGlyphIcon: true,
    };
    return PanelDashboard;
}(React.Component));
exports.PanelDashboard = PanelDashboard;
