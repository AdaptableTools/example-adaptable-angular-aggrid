"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ReportSummaryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ReportSummaryWizard, _super);
    function ReportSummaryWizard(props) {
        return _super.call(this, props) || this;
    }
    ReportSummaryWizard.prototype.render = function () {
        // maybe add schedules later from getting them?
        var keyValuePairs = [
            { Key: 'Name', Value: this.props.Data.Name },
            {
                Key: 'Columns',
                Value: this.props.Adaptable.ReportService.GetReportColumnsDescription(this.props.Data, this.props.Columns),
            },
            {
                Key: 'Rows',
                Value: this.props.Adaptable.ReportService.GetReportExpressionDescription(this.props.Data, this.props.Columns),
            },
        ];
        var summaryPage = (React.createElement(WizardSummaryPage_1.WizardSummaryPage, { KeyValuePairs: keyValuePairs, header: StrategyConstants.ExportStrategyFriendlyName }));
        return React.createElement("div", null, summaryPage);
    };
    ReportSummaryWizard.prototype.canNext = function () {
        return true;
    };
    ReportSummaryWizard.prototype.canBack = function () {
        return true;
    };
    ReportSummaryWizard.prototype.Next = function () {
        //
    };
    ReportSummaryWizard.prototype.Back = function () {
        //todo
    };
    ReportSummaryWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ReportSummaryWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ReportSummaryWizard;
}(React.Component));
exports.ReportSummaryWizard = ReportSummaryWizard;
