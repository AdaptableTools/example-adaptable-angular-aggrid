"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
/// <reference path="../../typings/.d.ts" />
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var StyleVisualItem_1 = require("../Components/StyleVisualItem");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var FormatColumnEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(FormatColumnEntityRow, _super);
    function FormatColumnEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormatColumnEntityRow.prototype.render = function () {
        var _this = this;
        var formatColumn = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(formatColumn.ColumnId, this.props.Columns) }));
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: formatColumn.Style }) }));
        colItems[2].Content = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { editClick: function () { return _this.props.onEdit(formatColumn); }, showShare: this.props.TeamSharingActivated, shareClick: function () { return _this.props.onShare(); }, ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.FormatColumnStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    return FormatColumnEntityRow;
}(React.Component));
exports.FormatColumnEntityRow = FormatColumnEntityRow;
