"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var DualListBoxEditor_1 = require("../../Components/ListBox/DualListBoxEditor");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var HelpBlock_1 = require("../../../components/HelpBlock");
var WizardPanel_1 = require("../../../components/WizardPanel");
var ColumnCategoryColumnsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnCategoryColumnsWizard, _super);
    function ColumnCategoryColumnsWizard(props) {
        var _this = _super.call(this, props) || this;
        var selectedFriendlyColumns = ColumnHelper_1.ColumnHelper.getFriendlyNamesFromColumnIds(_this.props.Data.ColumnIds, _this.props.Columns);
        var currentlyColumnCategorys = [];
        _this.props.ColumnCategorys.map(function (lk) {
            currentlyColumnCategorys.push.apply(currentlyColumnCategorys, tslib_1.__spread(lk.ColumnIds));
        });
        var allColumns = _this.props.Columns.map(function (c) { return c.ColumnId; });
        var availableColumns = [];
        allColumns.forEach(function (c) {
            if (ArrayExtensions_1.ArrayExtensions.NotContainsItem(currentlyColumnCategorys, c)) {
                availableColumns.push(c);
            }
        });
        var availableFriendlyColumns = ColumnHelper_1.ColumnHelper.getFriendlyNamesFromColumnIds(availableColumns, _this.props.Columns);
        selectedFriendlyColumns.forEach(function (sc) { return availableFriendlyColumns.push(sc); });
        _this.state = {
            AvailableColumns: availableFriendlyColumns,
            SelectedColumns: selectedFriendlyColumns,
            IsEdit: _this.props.Data.ColumnIds.length > 0,
        };
        return _this;
    }
    ColumnCategoryColumnsWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, { marginBottom: 2 }, "Press ctrl/cmd key while clicking to select multiple items."),
            React.createElement(DualListBoxEditor_1.DualListBoxEditor, { style: { flex: 1, overflow: 'hidden' }, AvailableValues: this.state.AvailableColumns, SelectedValues: this.state.SelectedColumns, HeaderAvailable: "Available Columns", HeaderSelected: "Selected Columns", onChange: function (SelectedValues) { return _this.OnSelectedValuesChange(SelectedValues); }, DisplaySize: DualListBoxEditor_1.DisplaySize.Small })));
    };
    ColumnCategoryColumnsWizard.prototype.OnSelectedValuesChange = function (newValues) {
        var _this = this;
        this.setState({ SelectedColumns: newValues }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ColumnCategoryColumnsWizard.prototype.canNext = function () {
        return this.state.SelectedColumns.length > 0;
    };
    ColumnCategoryColumnsWizard.prototype.canBack = function () {
        return !this.state.IsEdit;
    };
    ColumnCategoryColumnsWizard.prototype.Next = function () {
        this.props.Data.ColumnIds = ColumnHelper_1.ColumnHelper.getColumnIdsFromFriendlyNames(this.state.SelectedColumns, this.props.Columns);
    };
    ColumnCategoryColumnsWizard.prototype.Back = function () {
        // todo
    };
    ColumnCategoryColumnsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ColumnCategoryColumnsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ColumnCategoryColumnsWizard;
}(React.Component));
exports.ColumnCategoryColumnsWizard = ColumnCategoryColumnsWizard;
