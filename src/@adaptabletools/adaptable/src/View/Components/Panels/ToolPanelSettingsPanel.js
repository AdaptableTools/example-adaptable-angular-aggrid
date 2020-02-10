"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var icons_1 = require("../../../components/icons");
var Panel_1 = require("../../../components/Panel");
//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
var ToolPanelSettingsPanel = /** @class */ (function (_super) {
    tslib_1.__extends(ToolPanelSettingsPanel, _super);
    function ToolPanelSettingsPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolPanelSettingsPanel.prototype.render = function () {
        var header = (React.createElement("span", { style: { verticalAlign: 'middle' } },
            ' ',
            React.createElement(icons_1.Icon, { name: 'build' }),
            " ",
            React.createElement("span", null, "Settings"),
            this.props.button &&
                React.cloneElement(this.props.button, {
                    style: {
                        float: 'right',
                        border: '0px',
                        background: 'none',
                        borderRadius: '0px',
                        boxShadow: 'none',
                    },
                })));
        return (React.createElement(Panel_1.default, { header: header, style: { margin: '0px', padding: '0px' } }, this.props.children));
    };
    return ToolPanelSettingsPanel;
}(React.Component));
exports.ToolPanelSettingsPanel = ToolPanelSettingsPanel;
