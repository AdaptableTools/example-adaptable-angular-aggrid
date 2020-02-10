"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var UIHelper_1 = require("../UIHelper");
var ReminderEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(ReminderEntityRow, _super);
    function ReminderEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReminderEntityRow.prototype.render = function () {
        var _this = this;
        var reminder = this.props.AdaptableObject;
        //   let column = ColumnHelper.getColumnFromId(Reminder.ColumnId, this.props.Columns);
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: reminder.Alert.Msg });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: reminder.Alert.AlertDefinition.MessageType });
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: UIHelper_1.UIHelper.getScheduleDescription(reminder.Schedule) }));
        var buttons = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { editClick: function () { return _this.props.onEdit(reminder); }, shareClick: function () { return _this.props.onShare(); }, showShare: this.props.TeamSharingActivated, ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.ReminderStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        colItems[3].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    return ReminderEntityRow;
}(React.Component));
exports.ReminderEntityRow = ReminderEntityRow;
