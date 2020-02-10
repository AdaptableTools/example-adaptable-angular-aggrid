"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var ColumnCategorySettingsWizard_1 = require("./ColumnCategorySettingsWizard");
var ColumnCategoryColumnsWizard_1 = require("./ColumnCategoryColumnsWizard");
var ColumnCategorySummaryWizard_1 = require("./ColumnCategorySummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ColumnCategoryWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnCategoryWizard, _super);
    function ColumnCategoryWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnCategoryWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ColumnCategoryStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Name',
                        Index: 0,
                        Element: (React.createElement(ColumnCategorySettingsWizard_1.ColumnCategorySettingsWizard, { ColumnCategorys: this.props.ColumnCategorys })),
                    },
                    {
                        StepName: 'Selected Columns',
                        Index: 1,
                        Element: React.createElement(ColumnCategoryColumnsWizard_1.ColumnCategoryColumnsWizard, { ColumnCategorys: this.props.ColumnCategorys }),
                    },
                    {
                        StepName: 'Summary',
                        Index: 2,
                        Element: React.createElement(ColumnCategorySummaryWizard_1.ColumnCategorySummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } })));
    };
    return ColumnCategoryWizard;
}(React.Component));
exports.ColumnCategoryWizard = ColumnCategoryWizard;
