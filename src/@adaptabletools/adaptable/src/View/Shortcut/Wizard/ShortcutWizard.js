"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var ShortcutSettingsWizard_1 = require("./ShortcutSettingsWizard");
var ShortcutSummaryWizard_1 = require("./ShortcutSummaryWizard");
var ShortcutTypeWizard_1 = require("./ShortcutTypeWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ShortcutWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ShortcutWizard, _super);
    function ShortcutWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShortcutWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ShortcutStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Column Data Type',
                        Index: 0,
                        Element: React.createElement(ShortcutTypeWizard_1.ShortcutTypeWizard, null),
                    },
                    {
                        StepName: 'Settings',
                        Index: 1,
                        Element: (React.createElement(ShortcutSettingsWizard_1.ShortcutSettingsWizard, { NumericKeysAvailable: this.props.NumericKeysAvailable, DateKeysAvailable: this.props.DateKeysAvailable })),
                    },
                    {
                        StepName: 'Summary',
                        Index: 2,
                        Element: React.createElement(ShortcutSummaryWizard_1.ShortcutSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return ShortcutWizard;
}(React.Component));
exports.ShortcutWizard = ShortcutWizard;
