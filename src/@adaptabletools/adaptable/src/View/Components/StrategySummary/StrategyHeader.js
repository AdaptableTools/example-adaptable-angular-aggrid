"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
/// <reference path="../../typings/.d.ts" />
var ButtonNew_1 = require("../Buttons/ButtonNew");
var SummaryRowItem_1 = require("./SummaryRowItem");
var StrategyProfile_1 = require("../StrategyProfile");
var StrategyHeader = /** @class */ (function (_super) {
    tslib_1.__extends(StrategyHeader, _super);
    function StrategyHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StrategyHeader.prototype.render = function () {
        var _this = this;
        var summaryItems = [];
        var newButton = this.props.NewButtonDisabled ? null : (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.props.onNew(); }, tooltip: 'Create ' + this.props.NewButtonTooltip, AccessLevel: this.props.AccessLevel }));
        summaryItems.push(React.createElement("b", null, React.createElement(StrategyProfile_1.StrategyProfile, { FunctionName: this.props.FunctionName })));
        summaryItems.push(this.props.StrategySummary);
        summaryItems.push(newButton);
        return React.createElement(SummaryRowItem_1.SummaryRowItem, { SummaryItems: summaryItems });
    };
    return StrategyHeader;
}(React.Component));
exports.StrategyHeader = StrategyHeader;
