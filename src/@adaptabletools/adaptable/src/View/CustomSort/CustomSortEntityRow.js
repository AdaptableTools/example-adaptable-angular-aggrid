"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var CustomSortEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(CustomSortEntityRow, _super);
    function CustomSortEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomSortEntityRow.prototype.render = function () {
        var _this = this;
        var customSort = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.props.ColumnLabel });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: customSort.SortedValues.join(', ') });
        colItems[2].Content = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, editClick: function () { return _this.props.onEdit(customSort); }, shareClick: function () { return _this.props.onShare(); }, showShare: this.props.TeamSharingActivated, overrideDisableEdit: this.props.ColumnLabel.includes(GeneralConstants.MISSING_COLUMN), EntityType: StrategyConstants.CustomSortStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    return CustomSortEntityRow;
}(React.Component));
exports.CustomSortEntityRow = CustomSortEntityRow;
