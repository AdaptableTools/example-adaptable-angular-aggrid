"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var Dropdown_1 = require("../../components/Dropdown");
var CellValidationEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(CellValidationEntityRow, _super);
    function CellValidationEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellValidationEntityRow.prototype.render = function () {
        var _this = this;
        var cellValidationRule = this.props.AdaptableObject;
        var ActionModeTypes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.ActionMode).map(function (type) {
            return {
                value: type,
                label: type,
            };
        });
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.getColumnandRule(cellValidationRule) });
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.setExpressionDescription(cellValidationRule) }));
        colItems[2].Content = (React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: cellValidationRule.ActionMode, onChange: function (value) { return _this.onActionModeChanged(cellValidationRule, value); }, options: ActionModeTypes }));
        colItems[3].Content = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: function () { return _this.props.onEdit(cellValidationRule); }, shareClick: function () { return _this.props.onShare(); }, overrideDisableEdit: !this.props.Column, EntityType: StrategyConstants.CellValidationStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    CellValidationEntityRow.prototype.setExpressionDescription = function (CellValidation) {
        return ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(CellValidation.Expression)
            ? ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, this.props.Columns)
            : 'No Expression';
    };
    CellValidationEntityRow.prototype.getColumnandRule = function (cellValidation) {
        var columnInfo = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(cellValidation.ColumnId, this.props.Column);
        columnInfo +=
            ': ' +
                this.props.ValidationService.createCellValidationDescription(cellValidation, this.props.Columns);
        return columnInfo;
    };
    CellValidationEntityRow.prototype.onActionModeChanged = function (cellValidationRule, value) {
        var returnValue = value == 'Stop Edit' ? 'Stop Edit' : 'Warn User';
        this.props.onChangeActionMode(cellValidationRule, returnValue);
    };
    return CellValidationEntityRow;
}(React.Component));
exports.CellValidationEntityRow = CellValidationEntityRow;
