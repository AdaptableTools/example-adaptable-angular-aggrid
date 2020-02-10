"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var CalculatedColumnEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(CalculatedColumnEntityRow, _super);
    function CalculatedColumnEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalculatedColumnEntityRow.prototype.render = function () {
        var _this = this;
        var calculatedColumn = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: calculatedColumn.ColumnId });
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.props.CalculatedColumnExpressionService.GetExpressionString(calculatedColumn.ColumnExpression, this.props.Columns) }));
        var buttons = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, editClick: function () { return _this.props.onEdit(calculatedColumn); }, shareClick: function () { return _this.props.onShare(); }, showShare: this.props.TeamSharingActivated, EntityType: StrategyConstants.CalculatedColumnStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        colItems[2].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    return CalculatedColumnEntityRow;
}(React.Component));
exports.CalculatedColumnEntityRow = CalculatedColumnEntityRow;
