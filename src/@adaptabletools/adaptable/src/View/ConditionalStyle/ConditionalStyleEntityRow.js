"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
/// <reference path="../../typings/.d.ts" />
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var StyleVisualItem_1 = require("../Components/StyleVisualItem");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var ConditionalStyleEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionalStyleEntityRow, _super);
    function ConditionalStyleEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConditionalStyleEntityRow.prototype.render = function () {
        var _this = this;
        var conditionalStyle = this.props.AdaptableObject;
        var column = conditionalStyle.ConditionalStyleScope == 'Column'
            ? ColumnHelper_1.ColumnHelper.getColumnFromId(conditionalStyle.ColumnId, this.props.Columns)
            : undefined;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.getScope(conditionalStyle) });
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: conditionalStyle.Style }) }));
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(conditionalStyle.Expression, this.props.Columns) }));
        var buttons = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { editClick: function () { return _this.props.onEdit(conditionalStyle); }, shareClick: function () { return _this.props.onShare(); }, showShare: this.props.TeamSharingActivated, overrideDisableEdit: !column && conditionalStyle.ConditionalStyleScope == 'Column', ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.ConditionalStyleStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        colItems[3].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    ConditionalStyleEntityRow.prototype.getScope = function (conditionalStyle) {
        switch (conditionalStyle.ConditionalStyleScope) {
            case 'Row':
                return 'Row';
            case 'Column':
                return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(conditionalStyle.ColumnId, this.props.Columns);
            //   case 'DataType':
            //     return conditionalStyle.DataType + ' Columns';
            case 'ColumnCategory':
                return 'Category: ' + conditionalStyle.ColumnCategoryId;
        }
    };
    return ConditionalStyleEntityRow;
}(React.Component));
exports.ConditionalStyleEntityRow = ConditionalStyleEntityRow;
