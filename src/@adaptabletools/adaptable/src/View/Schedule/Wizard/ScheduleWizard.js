"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ScheduleSummaryWizard_1 = require("./ScheduleSummaryWizard");
var ScheduleSettingsWizard_1 = require("./ScheduleSettingsWizard");
var ScheduleScheduleWizard_1 = require("./ScheduleScheduleWizard");
var ScheduleWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ScheduleWizard, _super);
    function ScheduleWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScheduleWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ScheduleStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Settings',
                        Index: 0,
                        Element: React.createElement(ScheduleSettingsWizard_1.ScheduleSettingsWizard, null),
                    },
                    {
                        StepName: 'Schedule',
                        Index: 1,
                        Element: React.createElement(ScheduleScheduleWizard_1.ScheduleScheduleWizard, null),
                    },
                    {
                        StepName: 'Summary',
                        Index: 2,
                        Element: React.createElement(ScheduleSummaryWizard_1.ScheduleSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return ScheduleWizard;
}(React.Component));
exports.ScheduleWizard = ScheduleWizard;
