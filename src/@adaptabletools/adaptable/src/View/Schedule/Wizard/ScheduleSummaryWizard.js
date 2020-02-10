"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var UIHelper_1 = require("../../UIHelper");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var ScheduleSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ScheduleSummaryWizard, _super);
    function ScheduleSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    ScheduleSummaryWizard.prototype.render = function () {
        var keyValuePairs = [];
        switch (this.props.Data.ScheduleType) {
            case Enums_1.ScheduleType.Reminder:
                var reminderKVP = [
                    { Key: 'Header', Value: this.props.Data.Alert.Header },
                    { Key: 'Message', Value: this.props.Data.Alert.Msg },
                    {
                        Key: 'Message Type',
                        Value: this.props.Data.Alert.AlertDefinition.MessageType,
                    },
                    {
                        Key: 'Show as Popup',
                        Value: this.props.Data.Alert.AlertDefinition.AlertProperties
                            .ShowPopup
                            ? 'True'
                            : 'False',
                    },
                ];
                keyValuePairs.push.apply(keyValuePairs, tslib_1.__spread(reminderKVP));
                break;
            case Enums_1.ScheduleType.Report:
                var reportKVP = [
                    { Key: 'Report Name', Value: this.props.Data.ReportName },
                    {
                        Key: 'Export Destination',
                        Value: this.props.Data.ExportDestination,
                    },
                ];
                keyValuePairs.push.apply(keyValuePairs, tslib_1.__spread(reportKVP));
                break;
            case Enums_1.ScheduleType.iPushPull:
                var iPushPullKVP = [
                    {
                        Key: 'Report',
                        Value: this.props.Data.IPushPullReport.ReportName,
                    },
                    { Key: 'Folder', Value: this.props.Data.IPushPullReport.Folder },
                    { Key: 'Page', Value: this.props.Data.IPushPullReport.Page },
                    {
                        Key: 'Export As',
                        Value: this.props.Data.Transmission,
                    },
                ];
                keyValuePairs.push.apply(keyValuePairs, tslib_1.__spread(iPushPullKVP));
                break;
            case Enums_1.ScheduleType.Glue42:
                var glue42KVP = [
                    {
                        Key: 'Report',
                        Value: this.props.Data.Glue42Report.ReportName,
                    },
                    {
                        Key: 'Export As',
                        Value: this.props.Data.Transmission,
                    },
                ];
                keyValuePairs.push.apply(keyValuePairs, tslib_1.__spread(glue42KVP));
                break;
        }
        keyValuePairs.push({
            Key: 'Schedule',
            Value: UIHelper_1.UIHelper.getScheduleDescription(this.props.Data.Schedule),
        });
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.ReminderStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    ScheduleSummaryWizard.prototype.canNext = function () {
        return true;
    };
    ScheduleSummaryWizard.prototype.canBack = function () {
        return true;
    };
    ScheduleSummaryWizard.prototype.Next = function () {
        /* no implementation */
    };
    ScheduleSummaryWizard.prototype.Back = function () {
        /* no implementation */
    };
    ScheduleSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ScheduleSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ScheduleSummaryWizard;
}(React.Component));
exports.ScheduleSummaryWizard = ScheduleSummaryWizard;
