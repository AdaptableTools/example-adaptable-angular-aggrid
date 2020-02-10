"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var FormatColumnScopeWizard_1 = require("./FormatColumnScopeWizard");
var FormatColumnStyleWizard_1 = require("./FormatColumnStyleWizard");
var FormatColumnSummaryWizard_1 = require("./FormatColumnSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var FormatColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(FormatColumnWizard, _super);
    function FormatColumnWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormatColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.FormatColumnStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Select Column',
                        Index: 0,
                        Element: React.createElement(FormatColumnScopeWizard_1.FormatColumnScopeWizard, null),
                    },
                    {
                        StepName: 'Style',
                        Index: 1,
                        Element: (React.createElement(FormatColumnStyleWizard_1.FormatColumnStyleWizard, { ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames })),
                    },
                    {
                        StepName: 'Summary',
                        Index: 2,
                        Element: React.createElement(FormatColumnSummaryWizard_1.FormatColumnSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return FormatColumnWizard;
}(React.Component));
exports.FormatColumnWizard = FormatColumnWizard;
