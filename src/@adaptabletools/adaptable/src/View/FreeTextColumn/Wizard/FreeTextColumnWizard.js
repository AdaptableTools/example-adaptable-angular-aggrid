"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var FreeTextColumnSettingsWizard_1 = require("./FreeTextColumnSettingsWizard");
var FreeTextColumnSummaryWizard_1 = require("./FreeTextColumnSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var FreeTextColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(FreeTextColumnWizard, _super);
    function FreeTextColumnWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FreeTextColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.FreeTextColumnStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Settings',
                        Index: 0,
                        Element: React.createElement(FreeTextColumnSettingsWizard_1.FreeTextColumnSettingsWizard, null),
                    },
                    {
                        StepName: 'Summary',
                        Index: 1,
                        Element: React.createElement(FreeTextColumnSummaryWizard_1.FreeTextColumnSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return FreeTextColumnWizard;
}(React.Component));
exports.FreeTextColumnWizard = FreeTextColumnWizard;
