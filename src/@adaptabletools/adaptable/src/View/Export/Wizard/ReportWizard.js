"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var ReportColumnChooserWizard_1 = require("./ReportColumnChooserWizard");
var ReportColumnTypeWizard_1 = require("./ReportColumnTypeWizard");
var ReportExpressionWizard_1 = require("./ReportExpressionWizard");
var ReportSettingsWizard_1 = require("./ReportSettingsWizard");
var ReportSummaryWizard_1 = require("./ReportSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ReportRowTypeWizard_1 = require("./ReportRowTypeWizard");
var ReportWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ReportWizard, _super);
    function ReportWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReportWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ExportStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Select Column',
                        Index: 0,
                        Element: React.createElement(ReportColumnTypeWizard_1.ReportColumnTypeWizard, null),
                    },
                    {
                        StepName: 'Select Column',
                        Index: 1,
                        Element: React.createElement(ReportColumnChooserWizard_1.ReportColumnChooserWizard, null),
                    },
                    {
                        StepName: 'Rows',
                        Index: 2,
                        Element: React.createElement(ReportRowTypeWizard_1.ReportRowTypeWizard, null),
                    },
                    {
                        StepName: 'Rows',
                        Index: 3,
                        Element: (React.createElement(ReportExpressionWizard_1.ReportExpressionWizard, { UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories })),
                    },
                    {
                        StepName: 'Settings',
                        Index: 4,
                        Element: React.createElement(ReportSettingsWizard_1.ReportSettingsWizard, { Reports: this.props.ConfigEntities }),
                    },
                    {
                        StepName: 'Summary',
                        Index: 5,
                        Element: React.createElement(ReportSummaryWizard_1.ReportSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return ReportWizard;
}(React.Component));
exports.ReportWizard = ReportWizard;
