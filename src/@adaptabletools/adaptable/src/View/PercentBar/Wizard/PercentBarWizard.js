"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var PercentBarSelectColumnWizard_1 = require("././PercentBarSelectColumnWizard");
var PercentBarSummaryWizard_1 = require("././PercentBarSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var PercentBarSettingsWizard_1 = require("./PercentBarSettingsWizard");
var PercentBarPositiveValuesWizard_1 = require("./PercentBarPositiveValuesWizard");
var PercentBarNegativeValuesWizard_1 = require("./PercentBarNegativeValuesWizard");
var PercentBarWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PercentBarWizard, _super);
    function PercentBarWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PercentBarWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.PercentBarStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Select Column',
                        Index: 0,
                        Element: React.createElement(PercentBarSelectColumnWizard_1.PercentBarSelectColumnWizard, null),
                    },
                    {
                        StepName: 'Positive Values',
                        Index: 1,
                        Element: React.createElement(PercentBarPositiveValuesWizard_1.PercentBarPositiveValuesWizard, { ColorPalette: this.props.ColorPalette }),
                    },
                    {
                        StepName: 'Negative Values',
                        Index: 1,
                        Element: React.createElement(PercentBarNegativeValuesWizard_1.PercentBarNegativeValuesWizard, { ColorPalette: this.props.ColorPalette }),
                    },
                    {
                        StepName: 'Settings',
                        Index: 2,
                        Element: React.createElement(PercentBarSettingsWizard_1.PercentBarSettingsWizard, null),
                    },
                    {
                        StepName: 'Summary',
                        Index: 3,
                        Element: React.createElement(PercentBarSummaryWizard_1.PercentBarSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return PercentBarWizard;
}(React.Component));
exports.PercentBarWizard = PercentBarWizard;
