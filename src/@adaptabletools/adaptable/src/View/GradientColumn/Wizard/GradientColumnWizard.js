"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var GradientColumnSelectColumnWizard_1 = require("./GradientColumnSelectColumnWizard");
var GradientColumnSummaryWizard_1 = require("./GradientColumnSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var GradientColumnBaseValuesWizard_1 = require("./GradientColumnBaseValuesWizard");
var GradientColumnPositiveValuesWizard_1 = require("./GradientColumnPositiveValuesWizard");
var GradientColumnNegativeValuesWizard_1 = require("./GradientColumnNegativeValuesWizard");
var GradientColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(GradientColumnWizard, _super);
    function GradientColumnWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GradientColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.GradientColumnStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Select Column',
                        Index: 0,
                        Element: React.createElement(GradientColumnSelectColumnWizard_1.GradientColumnSelectColumnWizard, null),
                    },
                    {
                        StepName: 'Base Value',
                        Index: 1,
                        Element: React.createElement(GradientColumnBaseValuesWizard_1.GradientColumnBaseValuesWizard, null),
                    },
                    {
                        StepName: 'Positive Value',
                        Index: 2,
                        Element: (React.createElement(GradientColumnPositiveValuesWizard_1.GradientColumnPositiveValuesWizard, { ColorPalette: this.props.ColorPalette })),
                    },
                    {
                        StepName: 'Negative Value',
                        Index: 3,
                        Element: (React.createElement(GradientColumnNegativeValuesWizard_1.GradientColumnNegativeValuesWizard, { ColorPalette: this.props.ColorPalette })),
                    },
                    {
                        StepName: 'Summary',
                        Index: 4,
                        Element: React.createElement(GradientColumnSummaryWizard_1.GradientColumnSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return GradientColumnWizard;
}(React.Component));
exports.GradientColumnWizard = GradientColumnWizard;
