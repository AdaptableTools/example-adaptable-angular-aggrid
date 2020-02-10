"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var AlertSelectColumnWizard_1 = require("./AlertSelectColumnWizard");
var AlertExpressionWizard_1 = require("./AlertExpressionWizard");
var AlertRulesWizard_1 = require("./AlertRulesWizard");
var AlertSummaryWizard_1 = require("./AlertSummaryWizard");
var AlertSelectQueryWizard_1 = require("./AlertSelectQueryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var AlertTypeWizard_1 = require("./AlertTypeWizard");
var AlertScopeWizard_1 = require("./AlertScopeWizard");
var AlertWizard = /** @class */ (function (_super) {
    tslib_1.__extends(AlertWizard, _super);
    function AlertWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlertWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.AlertStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Select Column',
                        Index: 0,
                        Element: React.createElement(AlertSelectColumnWizard_1.AlertSelectColumnWizard, null),
                    },
                    {
                        StepName: 'Alert Rules',
                        Index: 1,
                        Element: React.createElement(AlertRulesWizard_1.AlertRulesWizard, null),
                    },
                    {
                        StepName: 'Message Type',
                        Index: 2,
                        Element: React.createElement(AlertTypeWizard_1.AlertTypeWizard, null),
                    },
                    {
                        StepName: 'Behaviour',
                        Index: 3,
                        Element: React.createElement(AlertScopeWizard_1.AlertScopeWizard, null),
                    },
                    {
                        StepName: 'Query Builder',
                        Index: 4,
                        Element: React.createElement(AlertSelectQueryWizard_1.AlertSelectQueryWizard, null),
                    },
                    {
                        StepName: 'Query Builder',
                        Index: 5,
                        Element: (React.createElement(AlertExpressionWizard_1.AlertExpressionWizard, { Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable })),
                    },
                    {
                        StepName: 'Summary',
                        Index: 5,
                        Element: React.createElement(AlertSummaryWizard_1.AlertSummaryWizard, { UserFilters: this.props.UserFilters }),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return AlertWizard;
}(React.Component));
exports.AlertWizard = AlertWizard;
