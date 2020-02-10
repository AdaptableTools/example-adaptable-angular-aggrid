"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
/// <reference path="../../typings/.d.ts" />
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var UserFilterEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(UserFilterEntityRow, _super);
    function UserFilterEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserFilterEntityRow.prototype.render = function () {
        var _this = this;
        var userFilter = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: userFilter.Name });
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(userFilter.ColumnId, this.props.Columns) }));
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(userFilter.Expression, this.props.Columns) }));
        colItems[3].Content = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { editClick: function () { return _this.props.onEdit(userFilter); }, shareClick: function () { return _this.props.onShare(); }, showShare: this.props.TeamSharingActivated, overrideDisableEdit: false, ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.UserFilterStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    return UserFilterEntityRow;
}(React.Component));
exports.UserFilterEntityRow = UserFilterEntityRow;
