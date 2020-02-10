"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var UIHelper_1 = require("../UIHelper");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ScheduleEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(ScheduleEntityRow, _super);
    function ScheduleEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScheduleEntityRow.prototype.render = function () {
        var _this = this;
        var baseSchedule = this.props.AdaptableObject;
        var details = '';
        switch (baseSchedule.ScheduleType) {
            case Enums_1.ScheduleType.Reminder:
                var reminderSchedule = baseSchedule;
                details =
                    reminderSchedule.Alert.Msg +
                        ' (' +
                        reminderSchedule.Alert.AlertDefinition.MessageType +
                        ')';
                break;
            case Enums_1.ScheduleType.Report:
                var reportSchedule = baseSchedule;
                details = reportSchedule.ReportName + ' (' + reportSchedule.ExportDestination + ')';
                break;
            case Enums_1.ScheduleType.iPushPull:
                var iPushPullSchedule = baseSchedule;
                details =
                    iPushPullSchedule.IPushPullReport.ReportName +
                        ' (' +
                        iPushPullSchedule.IPushPullReport.Folder +
                        '/' +
                        iPushPullSchedule.IPushPullReport.Page +
                        ' - ' +
                        iPushPullSchedule.Transmission +
                        ')';
                break;
            case Enums_1.ScheduleType.Glue42:
                var glue42Schedule = baseSchedule;
                details = glue42Schedule.Glue42Report.ReportName;
                break;
        }
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: baseSchedule.ScheduleType });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: details });
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: UIHelper_1.default.getScheduleDescription(baseSchedule.Schedule) }));
        var buttons = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { editClick: function () { return _this.props.onEdit(baseSchedule); }, shareClick: function () { return _this.props.onShare(); }, showShare: this.props.TeamSharingActivated, ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.ScheduleStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        colItems[3].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    return ScheduleEntityRow;
}(React.Component));
exports.ScheduleEntityRow = ScheduleEntityRow;
