"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var DualListBoxEditor_1 = require("../../Components/ListBox/DualListBoxEditor");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var WizardPanel_1 = require("../../../components/WizardPanel");
var HelpBlock_1 = require("../../../components/HelpBlock");
var LayoutGroupedColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutGroupedColumnWizard, _super);
    function LayoutGroupedColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            SelectedColumns: ColumnHelper_1.ColumnHelper.getFriendlyNamesFromColumnIds(_this.props.Data.GroupedColumns, _this.props.Columns),
        };
        return _this;
    }
    LayoutGroupedColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, { marginBottom: 2 },
                "Select which Columns, if any, should be ",
                React.createElement("b", null, "Grouped"),
                " in the Layout."),
            React.createElement(DualListBoxEditor_1.DualListBoxEditor, { style: { flex: 1, overflow: 'hidden' }, AvailableValues: this.props.GroupableColumns.map(function (x) { return x.FriendlyName; }), SelectedValues: this.state.SelectedColumns, HeaderAvailable: "Groupable Columns", HeaderSelected: "Grouped Columns in Layout", onChange: function (SelectedValues) { return _this.OnSelectedValuesChange(SelectedValues); }, DisplaySize: DualListBoxEditor_1.DisplaySize.Small })));
    };
    LayoutGroupedColumnWizard.prototype.OnSelectedValuesChange = function (newValues) {
        var _this = this;
        this.setState({ SelectedColumns: newValues }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    LayoutGroupedColumnWizard.prototype.canNext = function () {
        return true;
    };
    LayoutGroupedColumnWizard.prototype.canBack = function () {
        return true;
    };
    LayoutGroupedColumnWizard.prototype.Next = function () {
        this.props.Data.GroupedColumns = ColumnHelper_1.ColumnHelper.getColumnIdsFromFriendlyNames(this.state.SelectedColumns, this.props.Columns);
    };
    LayoutGroupedColumnWizard.prototype.Back = function () {
        // todo
    };
    LayoutGroupedColumnWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    LayoutGroupedColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return LayoutGroupedColumnWizard;
}(React.Component));
exports.LayoutGroupedColumnWizard = LayoutGroupedColumnWizard;
