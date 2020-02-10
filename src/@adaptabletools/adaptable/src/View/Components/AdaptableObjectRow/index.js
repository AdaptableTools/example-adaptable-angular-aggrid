"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
/// <reference path="../../typings/.d.ts" />
var rebass_1 = require("rebass");
var AdaptableObjectRow = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptableObjectRow, _super);
    function AdaptableObjectRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptableObjectRow.prototype.render = function () {
        var colItems = this.props.colItems.map(function (colItem, index) { return (React.createElement(rebass_1.Text, { key: index, fontSize: 'var(--ab-font-size-3)', title: typeof colItem.Content === 'string' ? colItem.Content : undefined, style: {
                flex: colItem.Size,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
            }, paddingLeft: 1, paddingRight: 1 }, colItem.Content)); });
        return (React.createElement("div", { className: "ab-AdaptableObjectRow", onClick: this.props.onClick, style: this.props.style },
            React.createElement(rebass_1.Box, { padding: 2, className: "list-group-item" },
                React.createElement(rebass_1.Flex, { alignItems: "center", padding: 0, margin: 0, style: {
                        overflowY: 'visible',
                    } }, colItems))));
    };
    return AdaptableObjectRow;
}(React.Component));
exports.AdaptableObjectRow = AdaptableObjectRow;
