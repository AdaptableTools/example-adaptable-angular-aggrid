"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var WizardPanel_1 = require("../../../components/WizardPanel");
var CustomSortColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CustomSortColumnWizard, _super);
    function CustomSortColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { SelectedColumnId: _this.props.Data.ColumnId };
        return _this;
    }
    CustomSortColumnWizard.prototype.render = function () {
        var _this = this;
        var sortableCols = ColumnHelper_1.ColumnHelper.getSortableColumns(this.props.Columns);
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.SelectedColumnId], ColumnList: sortableCols, onColumnChange: function (columns) { return _this.onColumnSelectedChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single })));
    };
    CustomSortColumnWizard.prototype.onColumnSelectedChanged = function (columns) {
        var _this = this;
        this.setState({ SelectedColumnId: columns.length > 0 ? columns[0].ColumnId : '' }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    CustomSortColumnWizard.prototype.canNext = function () {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId);
    };
    CustomSortColumnWizard.prototype.canBack = function () {
        return true;
    };
    CustomSortColumnWizard.prototype.Next = function () {
        this.props.Data.ColumnId = this.state.SelectedColumnId;
    };
    // tslint:disable-next-line:no-empty
    CustomSortColumnWizard.prototype.Back = function () { };
    CustomSortColumnWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    CustomSortColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return CustomSortColumnWizard;
}(React.Component));
exports.CustomSortColumnWizard = CustomSortColumnWizard;
