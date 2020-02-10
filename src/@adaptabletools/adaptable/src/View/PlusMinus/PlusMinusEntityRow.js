"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var Input_1 = require("../../components/Input");
var PlusMinusEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(PlusMinusEntityRow, _super);
    function PlusMinusEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlusMinusEntityRow.prototype.render = function () {
        var _this = this;
        var plusMinusRule = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(plusMinusRule.ColumnId, this.props.Column) }));
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(Input_1.default, { value: plusMinusRule.NudgeValue.toString(), style: { width: '100%' }, type: "number", placeholder: "Enter a Number", onChange: function (e) { return _this.props.onColumnDefaultNudgeValueChange(plusMinusRule, e); } }) }));
        colItems[2].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.wrapExpressionDescription(plusMinusRule) });
        var buttons = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, editClick: function () { return _this.props.onEdit(plusMinusRule); }, shareClick: function () { return _this.props.onShare(); }, showShare: this.props.TeamSharingActivated, overrideDisableEdit: false, EntityType: StrategyConstants.PlusMinusStrategyFriendlyName + ' Rule ', AccessLevel: this.props.AccessLevel }));
        colItems[3].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    PlusMinusEntityRow.prototype.wrapExpressionDescription = function (PlusMinusRule) {
        return PlusMinusRule.IsDefaultNudge
            ? '[Default Column Nudge Value]'
            : ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(PlusMinusRule.Expression, this.props.Columns);
    };
    return PlusMinusEntityRow;
}(React.Component));
exports.PlusMinusEntityRow = PlusMinusEntityRow;
