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
var ButtonMaximise_1 = require("../../Buttons/ButtonMaximise");
var PanelToolPanel = /** @class */ (function (_super) {
    tslib_1.__extends(PanelToolPanel, _super);
    function PanelToolPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelToolPanel.prototype.render = function () {
        var _a = this.props, useDefaultPanelStyle = _a.useDefaultPanelStyle, isMinimised = _a.isMinimised, onMinimiseChanged = _a.onMinimiseChanged, headerText = _a.headerText, onClose = _a.onClose, onConfigure = _a.onConfigure, props = tslib_1.__rest(_a, ["useDefaultPanelStyle", "isMinimised", "onMinimiseChanged", "headerText", "onClose", "onConfigure"]);
        var header = (React.createElement(React.Fragment, null,
            !isMinimised ? (React.createElement(ButtonMinimise_1.ButtonMinimise, { className: "ab-DashboardPanel__header-minimise", onClick: function () { return onMinimiseChanged(); }, marginRight: 1 })) : (React.createElement(ButtonMaximise_1.ButtonMaximise, { className: "ab-DashboardPanel__header-maximise", onClick: function () { return onMinimiseChanged(); }, marginRight: 1 })),
            React.createElement(rebass_1.Flex, { className: "ab-DashboardPanel__header-text", flex: 1, alignItems: "center", marginLeft: 0 }, headerText),
            React.createElement(ButtonConfigure_1.ButtonConfigure, { iconSize: 16, marginLeft: 1, className: "ab-DashboardPanel__header-configure-button", tooltip: 'Configure ' + headerText, onClick: function () { return onConfigure(); } }),
            React.createElement(ButtonClose_1.ButtonClose, { marginLeft: 0, className: "ab-DashboardPanel__header-close-button", tooltip: 'Close ' + headerText, onClick: function () { return onClose(); } })));
        return (React.createElement(Panel_1.default, tslib_1.__assign({ border: "var(--ab-cmp-dashboardpanel__border)" }, props, { className: join_1.default('ab-DashboardPanel', props.className), header: header, style: tslib_1.__assign({ minWidth: 180, color: 'var(--ab-cmp-dashboardpanel__color)', fill: 'var(--ab-cmp-dashboardpanel__fill)' }, props.style), headerProps: tslib_1.__assign(tslib_1.__assign({}, props.headerProps), { alignItems: 'stretch', style: tslib_1.__assign({ padding: 'var(--ab-cmp-dashboardpanel_header__padding)', background: 'var(--ab-cmp-dashboardpanel_header__background)', color: 'var(--ab-cmp-dashboardpanel_header__color)', fill: 'var(--ab-cmp-dashboardpanel_header__fill)' }, (props.headerProps ? props.headerProps.style : null)) }), bodyProps: tslib_1.__assign(tslib_1.__assign({}, props.bodyProps), { style: tslib_1.__assign(tslib_1.__assign({ padding: 'var(--ab-cmp-dashboardpanel_body__padding)', background: 'var(--ab-cmp-dashboardpanel_body__background)' }, (props.bodyProps ? props.bodyProps.style : null)), { display: 'flex', alignItems: 'center' }) }) })));
    };
    PanelToolPanel.defaultProps = {
        headerText: '',
        onClose: null,
        onConfigure: null,
        onMinimiseChanged: null,
        isMinimised: true,
    };
    return PanelToolPanel;
}(React.Component));
exports.PanelToolPanel = PanelToolPanel;
