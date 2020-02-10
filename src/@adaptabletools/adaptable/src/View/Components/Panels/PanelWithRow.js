"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var Panel_1 = require("../../../components/Panel");
// We cannot destructure this.props using the react way in typescript which is a real pain as you
// need to transfer props individually as a consequence
// let { buttonContent, ...other } = this.props
var PanelWithRow = /** @class */ (function (_super) {
    tslib_1.__extends(PanelWithRow, _super);
    function PanelWithRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelWithRow.prototype.render = function () {
        var headerItems = this.props.colItems.map(function (colItem, index) { return (React.createElement(rebass_1.Text, { key: colItem.key || colItem.Content || index, fontWeight: "bold", fontSize: 'var(--ab-font-size-3)', paddingLeft: 1, paddingRight: 1, style: {
                flex: colItem.Size,
            } }, colItem.Content)); });
        var header = (React.createElement(rebass_1.Flex, { alignItems: "center", style: { width: '100%' } }, headerItems));
        return (React.createElement("div", { style: this.props.style },
            React.createElement(Panel_1.default, { bodyScroll: true, header: header, border: this.props.border, bodyProps: this.props.bodyProps }, this.props.children)));
    };
    return PanelWithRow;
}(React.Component));
exports.PanelWithRow = PanelWithRow;
