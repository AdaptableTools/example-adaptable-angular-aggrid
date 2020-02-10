"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var CustomSortColumnWizard_1 = require("./CustomSortColumnWizard");
var CustomSortValuesWizard_1 = require("./CustomSortValuesWizard");
var CustomSortSummaryWizard_1 = require("./CustomSortSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var CustomSortWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CustomSortWizard, _super);
    function CustomSortWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomSortWizard.prototype.render = function () {
        var _this = this;
        var customSorts = this.props.ConfigEntities;
        return (React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.CustomSortStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                {
                    StepName: 'Select Column',
                    Index: 0,
                    Element: (React.createElement(CustomSortColumnWizard_1.CustomSortColumnWizard, { SortedColumns: this.props.Columns.filter(function (x) { return !customSorts.find(function (y) { return y.ColumnId == x.ColumnId; }); }) })),
                },
                {
                    StepName: 'Sort Order',
                    Index: 1,
                    Element: React.createElement(CustomSortValuesWizard_1.CustomSortValuesWizard, null),
                },
                {
                    StepName: 'Summary',
                    Index: 2,
                    Element: React.createElement(CustomSortSummaryWizard_1.CustomSortSummaryWizard, null),
                },
            ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } }));
    };
    return CustomSortWizard;
}(React.Component));
exports.CustomSortWizard = CustomSortWizard;
