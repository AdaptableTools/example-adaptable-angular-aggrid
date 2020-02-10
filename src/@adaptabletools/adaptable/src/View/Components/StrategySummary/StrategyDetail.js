"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Buttons/EntityListActionButtons");
var SummaryRowItem_1 = require("./SummaryRowItem");
var StrategyDetail = /** @class */ (function (_super) {
    tslib_1.__extends(StrategyDetail, _super);
    function StrategyDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StrategyDetail.prototype.render = function () {
        var _this = this;
        var summaryItems = [];
        this.props.showBold
            ? summaryItems.push(React.createElement("b", null, this.props.Item1))
            : summaryItems.push(React.createElement("i", null, this.props.Item1));
        summaryItems.push(React.createElement("i", null, this.props.Item2));
        summaryItems.push(React.createElement(EntityListActionButtons_1.EntityListActionButtons, { justifyContent: "start", ConfirmDeleteAction: this.props.onDelete, showEdit: this.props.showEdit, editClick: function () { return _this.props.onEdit(); }, shareClick: function () { return _this.props.onShare(); }, showShare: this.props.showShare, EntityType: this.props.EntityType }));
        return React.createElement(SummaryRowItem_1.SummaryRowItem, { SummaryItems: summaryItems });
    };
    return StrategyDetail;
}(React.Component));
exports.StrategyDetail = StrategyDetail;
