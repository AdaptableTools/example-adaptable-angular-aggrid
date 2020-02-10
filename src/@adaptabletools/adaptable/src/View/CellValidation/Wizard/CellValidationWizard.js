"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var CellValidationActionWizard_1 = require("./CellValidationActionWizard");
var CellValidationSelectColumnWizard_1 = require("./CellValidationSelectColumnWizard");
var CellValidationExpressionWizard_1 = require("./CellValidationExpressionWizard");
var CellValidationRulesWizard_1 = require("./CellValidationRulesWizard");
var CellValidationSummaryWizard_1 = require("./CellValidationSummaryWizard");
var CellValidationSelectQueryWizard_1 = require("./CellValidationSelectQueryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var CellValidationWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CellValidationWizard, _super);
    function CellValidationWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellValidationWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.CellValidationStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Select Column',
                        Index: 0,
                        Element: React.createElement(CellValidationSelectColumnWizard_1.CellValidationSelectColumnWizard, null),
                    },
                    {
                        StepName: 'Action',
                        Index: 1,
                        Element: React.createElement(CellValidationActionWizard_1.CellValidationActionWizard, null),
                    },
                    {
                        StepName: 'Validation',
                        Index: 2,
                        Element: React.createElement(CellValidationRulesWizard_1.CellValidationRulesWizard, null),
                    },
                    {
                        StepName: 'Query Builder',
                        Index: 3,
                        Element: React.createElement(CellValidationSelectQueryWizard_1.CellValidationSelectQueryWizard, null),
                    },
                    {
                        StepName: 'Query Builder',
                        Index: 4,
                        Element: (React.createElement(CellValidationExpressionWizard_1.CellValidationExpressionWizard, { UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories })),
                    },
                    {
                        StepName: 'Summary',
                        Index: 5,
                        Element: React.createElement(CellValidationSummaryWizard_1.CellValidationSummaryWizard, { UserFilters: this.props.UserFilters }),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return CellValidationWizard;
}(React.Component));
exports.CellValidationWizard = CellValidationWizard;
