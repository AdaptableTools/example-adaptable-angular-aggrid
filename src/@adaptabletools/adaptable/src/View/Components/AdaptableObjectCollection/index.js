"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
/// <reference path="../../typings/.d.ts" />
var PanelWithRow_1 = require("../Panels/PanelWithRow");
var AdaptableObjectCollection = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptableObjectCollection, _super);
    function AdaptableObjectCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptableObjectCollection.prototype.render = function () {
        var allowOverflow = this.props.allowOverflow ? 'visible' : 'auto';
        return (React.createElement("div", { style: tslib_1.__assign({}, this.props.style) },
            React.createElement(PanelWithRow_1.PanelWithRow, { border: "none", colItems: this.props.colItems }),
            React.createElement("div", { style: { overflowY: allowOverflow, boxShadow: 'none' } }, this.props.items)));
    };
    return AdaptableObjectCollection;
}(React.Component));
exports.AdaptableObjectCollection = AdaptableObjectCollection;
