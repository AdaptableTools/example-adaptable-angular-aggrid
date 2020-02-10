"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var UserFilterSettingsWizard_1 = require("./UserFilterSettingsWizard");
var UserFilterExpressionWizard_1 = require("./UserFilterExpressionWizard");
var UserFilterSelectColumnWizard_1 = require("./UserFilterSelectColumnWizard");
var UserFilterSummaryWizard_1 = require("./UserFilterSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var UserFilterWizard = /** @class */ (function (_super) {
    tslib_1.__extends(UserFilterWizard, _super);
    function UserFilterWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserFilterWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.UserFilterStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Select Column',
                        Index: 0,
                        Element: React.createElement(UserFilterSelectColumnWizard_1.UserFilterSelectColumnWizard, null),
                    },
                    {
                        StepName: 'Query Builder',
                        Index: 1,
                        Element: (React.createElement(UserFilterExpressionWizard_1.UserFilterExpressionWizard, { UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, ExpressionMode: Enums_1.ExpressionMode.SingleColumn })),
                    },
                    {
                        StepName: 'Settings',
                        Index: 2,
                        Element: React.createElement(UserFilterSettingsWizard_1.UserFilterSettingsWizard, { UserFilters: this.props.UserFilters }),
                    },
                    {
                        StepName: 'Summary',
                        Index: 3,
                        Element: React.createElement(UserFilterSummaryWizard_1.UserFilterSummaryWizard, { UserFilters: this.props.UserFilters }),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return UserFilterWizard;
}(React.Component));
exports.UserFilterWizard = UserFilterWizard;
