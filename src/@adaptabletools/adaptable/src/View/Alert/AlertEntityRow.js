"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var Dropdown_1 = require("../../components/Dropdown");
var AlertEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(AlertEntityRow, _super);
    function AlertEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlertEntityRow.prototype.render = function () {
        var _this = this;
        var alertDefinition = this.props.AdaptableObject;
        var MessageTypes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.MessageType).map(function (type) {
            return {
                value: type,
                label: type,
            };
        });
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.getColumnandRule(alertDefinition) });
        colItems[1].Content = (React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: alertDefinition.MessageType, onChange: function (value) { return _this.onMessageTypeChanged(alertDefinition, value); }, options: MessageTypes }));
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.setExpressionDescription(alertDefinition) }));
        colItems[3].Content = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: function () { return _this.props.onEdit(alertDefinition); }, shareClick: function () { return _this.props.onShare(); }, overrideDisableEdit: !this.props.Column, EntityType: StrategyConstants.AlertStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    AlertEntityRow.prototype.setExpressionDescription = function (Alert) {
        return ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(Alert.Expression)
            ? ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(Alert.Expression, this.props.Columns)
            : 'No Expression';
    };
    AlertEntityRow.prototype.getColumnandRule = function (Alert) {
        var columnInfo = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(Alert.ColumnId, this.props.Column);
        columnInfo +=
            ': ' + this.props.StrategyService.createAlertDescription(Alert, this.props.Columns);
        return columnInfo;
    };
    AlertEntityRow.prototype.onMessageTypeChanged = function (alertDefinition, value) {
        this.props.onChangeMessageType(alertDefinition, value);
    };
    return AlertEntityRow;
}(React.Component));
exports.AlertEntityRow = AlertEntityRow;
