"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var ColumnCategoryEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnCategoryEntityRow, _super);
    function ColumnCategoryEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnCategoryEntityRow.prototype.render = function () {
        var _this = this;
        var ColumnCategory = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        var columnNames = ColumnCategory.ColumnIds.map(function (ci) {
            return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(ci, _this.props.Columns);
        });
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: ColumnCategory.ColumnCategoryId });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: columnNames.join(', ') });
        var buttons = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: function () { return _this.props.onEdit(ColumnCategory); }, shareClick: function () { return _this.props.onShare(); }, overrideDisableEdit: false, EntityType: StrategyConstants.ColumnCategoryStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        colItems[2].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    return ColumnCategoryEntityRow;
}(React.Component));
exports.ColumnCategoryEntityRow = ColumnCategoryEntityRow;
