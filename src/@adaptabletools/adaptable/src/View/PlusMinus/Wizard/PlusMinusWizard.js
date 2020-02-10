"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var PlusMinusColumnWizard_1 = require("./PlusMinusColumnWizard");
var PlusMinusSettingsWizard_1 = require("./PlusMinusSettingsWizard");
var PlusMinusExpressionWizard_1 = require("./PlusMinusExpressionWizard");
var PlusMinusSummaryWizard_1 = require("./PlusMinusSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var PlusMinusWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PlusMinusWizard, _super);
    function PlusMinusWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlusMinusWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.PlusMinusStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Select Column',
                        Index: 0,
                        Element: (React.createElement(PlusMinusColumnWizard_1.PlusMinusColumnWizard, { NumericColumns: this.props.Columns.filter(function (x) { return x.DataType == Enums_1.DataType.Number; }) })),
                    },
                    {
                        StepName: 'Settings',
                        Index: 1,
                        Element: React.createElement(PlusMinusSettingsWizard_1.PlusMinusSettingsWizard, null),
                    },
                    {
                        StepName: 'Query Builder',
                        Index: 2,
                        Element: (React.createElement(PlusMinusExpressionWizard_1.PlusMinusExpressionWizard, { UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories })),
                    },
                    {
                        StepName: 'Summary',
                        Index: 3,
                        Element: React.createElement(PlusMinusSummaryWizard_1.PlusMinusSummaryWizard, { UserFilters: this.props.UserFilters }),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return PlusMinusWizard;
}(React.Component));
exports.PlusMinusWizard = PlusMinusWizard;
