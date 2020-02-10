"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
var LayoutSelectionWizard_1 = require("./LayoutSelectionWizard");
var LayoutColumnWizard_1 = require("./LayoutColumnWizard");
var LayoutSettingsWizard_1 = require("./LayoutSettingsWizard");
var LayoutGridSortWizard_1 = require("./LayoutGridSortWizard");
var LayoutSummaryWizard_1 = require("./LayoutSummaryWizard");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var LayoutGroupedColumnWizard_1 = require("./LayoutGroupedColumnWizard");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var LayoutSetPivotingWizard_1 = require("./LayoutSetPivotingWizard");
var LayoutPivotColumnWizard_1 = require("./LayoutPivotColumnWizard");
var LayoutPivotAggregationColumnWizard_1 = require("./LayoutPivotAggregationColumnWizard");
var LayoutWizard = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutWizard, _super);
    function LayoutWizard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutWizard.prototype.render = function () {
        var _this = this;
        var layouts = this.props.ConfigEntities;
        return (React.createElement("div", null,
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.LayoutStrategyFriendlyName, ModalContainer: this.props.ModalContainer, Adaptable: this.props.Adaptable, Columns: this.props.Columns, Steps: [
                    {
                        StepName: 'Source',
                        Index: 0,
                        Element: (React.createElement(LayoutSelectionWizard_1.LayoutSelectionWizard, { Layouts: layouts, ColumnSorts: this.props.ColumnSorts })),
                    },
                    {
                        StepName: 'Columns',
                        Index: 1,
                        Element: React.createElement(LayoutColumnWizard_1.LayoutColumnWizard, null),
                    },
                    {
                        StepName: 'Sorting',
                        Index: 2,
                        Element: (React.createElement(LayoutGridSortWizard_1.LayoutGridSortWizard, { SortableColumns: ColumnHelper_1.default.getSortableColumns(this.props.Columns) })),
                    },
                    {
                        StepName: 'Grouping',
                        Index: 3,
                        Element: (React.createElement(LayoutGroupedColumnWizard_1.LayoutGroupedColumnWizard, { GroupableColumns: ColumnHelper_1.default.getGroupableColumns(this.props.Columns) })),
                    },
                    {
                        StepName: 'Pivoting',
                        Index: 4,
                        Element: React.createElement(LayoutSetPivotingWizard_1.LayoutSetPivotingWizard, null),
                    },
                    {
                        StepName: 'Pivoting',
                        Index: 5,
                        Element: (React.createElement(LayoutPivotColumnWizard_1.LayoutPivotColumnWizard, { PivotableColumns: ColumnHelper_1.default.getPivotableColumns(this.props.Columns) })),
                    },
                    {
                        StepName: 'Pivoting',
                        Index: 6,
                        Element: (React.createElement(LayoutPivotAggregationColumnWizard_1.LayoutAggregationColumnWizard, { AggregetableColumns: ColumnHelper_1.default.getAggregetableColumns(this.props.Columns) })),
                    },
                    {
                        StepName: 'Settings',
                        Index: 7,
                        Element: React.createElement(LayoutSettingsWizard_1.LayoutSettingsWizard, { Layouts: layouts }),
                    },
                    {
                        StepName: 'Summary',
                        Index: 8,
                        Element: React.createElement(LayoutSummaryWizard_1.LayoutSummaryWizard, null),
                    },
                ], Data: this.props.EditedAdaptableObject, StepStartIndex: this.props.WizardStartIndex, onHide: function () { return _this.props.onCloseWizard(); }, onFinish: function () { return _this.props.onFinishWizard(); }, canFinishWizard: function () { return _this.props.canFinishWizard(); } }),
            ">"));
    };
    return LayoutWizard;
}(React.Component));
exports.LayoutWizard = LayoutWizard;
