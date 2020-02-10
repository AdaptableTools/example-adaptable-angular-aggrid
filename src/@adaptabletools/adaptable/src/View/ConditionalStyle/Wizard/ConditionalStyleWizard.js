"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var ConditionalStyleStyleWizard_1 = require("./ConditionalStyleStyleWizard");
var ConditionalStyleScopeWizard_1 = require("./ConditionalStyleScopeWizard");
var ConditionalStyleExpressionWizard_1 = require("./ConditionalStyleExpressionWizard");
var ConditionalStyleSummaryWizard_1 = require("./ConditionalStyleSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ConditionalStyleWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionalStyleWizard, _super);
    function ConditionalStyleWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConditionalStyleWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ConditionalStyleStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Scope',
                        Index: 0,
                        Element: (React.createElement(ConditionalStyleScopeWizard_1.ConditionalStyleScopeWizard, { ColumnCategories: this.props.ColumnCategories })),
                    },
                    {
                        StepName: 'Style',
                        Index: 1,
                        Element: (React.createElement(ConditionalStyleStyleWizard_1.ConditionalStyleStyleWizard, { ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames })),
                    },
                    {
                        StepName: 'Query Builder',
                        Index: 2,
                        Element: (React.createElement(ConditionalStyleExpressionWizard_1.ConditionalStyleExpressionWizard, { UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories })),
                    },
                    {
                        StepName: 'Summary',
                        Index: 3,
                        Element: React.createElement(ConditionalStyleSummaryWizard_1.ConditionalStyleSummaryWizard, { UserFilters: this.props.UserFilters }),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return ConditionalStyleWizard;
}(React.Component));
exports.ConditionalStyleWizard = ConditionalStyleWizard;
