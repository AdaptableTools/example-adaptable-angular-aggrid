"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var AdvancedSearchSettingsWizard_1 = require("./AdvancedSearchSettingsWizard");
var AdvancedSearchExpressionWizard_1 = require("./AdvancedSearchExpressionWizard");
var AdvancedSearchSummaryWizard_1 = require("./AdvancedSearchSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var AdvancedSearchWizard = /** @class */ (function (_super) {
    tslib_1.__extends(AdvancedSearchWizard, _super);
    function AdvancedSearchWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdvancedSearchWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.AdvancedSearchStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Query Builder',
                        Index: 0,
                        Element: (React.createElement(AdvancedSearchExpressionWizard_1.AdvancedSearchExpressionWizard, { UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories })),
                    },
                    {
                        StepName: 'Name',
                        Index: 1,
                        Element: (React.createElement(AdvancedSearchSettingsWizard_1.AdvancedSearchSettingsWizard, { AdvancedSearches: this.props.ConfigEntities })),
                    },
                    {
                        StepName: 'Summary',
                        Index: 2,
                        Element: React.createElement(AdvancedSearchSummaryWizard_1.AdvancedSearchSummaryWizard, { UserFilters: this.props.UserFilters }),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return AdvancedSearchWizard;
}(React.Component));
exports.AdvancedSearchWizard = AdvancedSearchWizard;
