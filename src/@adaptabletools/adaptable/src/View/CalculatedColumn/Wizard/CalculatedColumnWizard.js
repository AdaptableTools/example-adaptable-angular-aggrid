"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var CalculatedColumnExpressionWizard_1 = require("./CalculatedColumnExpressionWizard");
var CalculatedColumnSettingsWizard_1 = require("./CalculatedColumnSettingsWizard");
var CalculatedColumnSummaryWizard_1 = require("./CalculatedColumnSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var CalculatedColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CalculatedColumnWizard, _super);
    function CalculatedColumnWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalculatedColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.CalculatedColumnStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Settings',
                        Index: 0,
                        Element: React.createElement(CalculatedColumnSettingsWizard_1.CalculatedColumnSettingsWizard, null),
                    },
                    {
                        StepName: 'Expression',
                        Index: 1,
                        Element: (React.createElement(CalculatedColumnExpressionWizard_1.CalculatedColumnExpressionWizard, { GetErrorMessage: this.props.GetErrorMessage, IsExpressionValid: this.props.IsExpressionValid })),
                    },
                    {
                        StepName: 'Summary',
                        Index: 2,
                        Element: React.createElement(CalculatedColumnSummaryWizard_1.CalculatedColumnSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return CalculatedColumnWizard;
}(React.Component));
exports.CalculatedColumnWizard = CalculatedColumnWizard;
