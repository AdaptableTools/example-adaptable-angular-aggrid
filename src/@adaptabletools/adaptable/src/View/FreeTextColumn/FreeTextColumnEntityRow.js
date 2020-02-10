"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
/// <reference path="../../typings/.d.ts" />
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var FreeTextColumnEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(FreeTextColumnEntityRow, _super);
    function FreeTextColumnEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FreeTextColumnEntityRow.prototype.render = function () {
        var _this = this;
        var FreeTextColumn = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: FreeTextColumn.ColumnId });
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: StringExtensions_1.StringExtensions.IsNullOrEmpty(FreeTextColumn.DefaultValue)
                ? '[None]'
                : FreeTextColumn.DefaultValue }));
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(FreeTextColumn.FreeTextStoredValues)
                ? 0
                : FreeTextColumn.FreeTextStoredValues.length }));
        colItems[3].Content = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { editClick: function () { return _this.props.onEdit(FreeTextColumn); }, showShare: this.props.TeamSharingActivated, shareClick: function () { return _this.props.onShare(); }, ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.FreeTextColumnStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    return FreeTextColumnEntityRow;
}(React.Component));
exports.FreeTextColumnEntityRow = FreeTextColumnEntityRow;
