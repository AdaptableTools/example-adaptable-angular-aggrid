"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
/// <reference path="../../typings/.d.ts" />
var AdaptableObjectRow_1 = require("../AdaptableObjectRow");
var SummaryRowItem = /** @class */ (function (_super) {
    tslib_1.__extends(SummaryRowItem, _super);
    function SummaryRowItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SummaryRowItem.prototype.render = function () {
        var colItems = [];
        colItems.push({ Size: 3, Content: this.props.SummaryItems[0] });
        colItems.push({ Size: 7, Content: this.props.SummaryItems[1] });
        colItems.push({ Size: 2, Content: this.props.SummaryItems[2] });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    return SummaryRowItem;
}(React.Component));
exports.SummaryRowItem = SummaryRowItem;
