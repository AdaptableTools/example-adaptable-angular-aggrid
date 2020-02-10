"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var DualListBoxEditor_1 = require("../../Components/ListBox/DualListBoxEditor");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var WizardPanel_1 = require("../../../components/WizardPanel");
var HelpBlock_1 = require("../../../components/HelpBlock");
var LayoutColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutColumnWizard, _super);
    function LayoutColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            SelectedColumns: ColumnHelper_1.ColumnHelper.getFriendlyNamesFromColumnIds(_this.props.Data.Columns, _this.props.Columns),
        };
        return _this;
    }
    LayoutColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, { marginBottom: 2 },
                "Select which ",
                React.createElement("b", null, "Columns"),
                " to include in the Layout. Press ctrl/cmd key while clicking to select multiple items."),
            React.createElement(DualListBoxEditor_1.DualListBoxEditor, { style: { flex: 1, overflow: 'hidden' }, AvailableValues: this.props.Columns.map(function (x) { return x.FriendlyName; }), SelectedValues: this.state.SelectedColumns, HeaderAvailable: "Available Columns", HeaderSelected: "Columns in Layout", onChange: function (SelectedValues) { return _this.OnSelectedValuesChange(SelectedValues); }, DisplaySize: DualListBoxEditor_1.DisplaySize.Small })));
    };
    LayoutColumnWizard.prototype.OnSelectedValuesChange = function (newValues) {
        var _this = this;
        this.setState({ SelectedColumns: newValues }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    LayoutColumnWizard.prototype.canNext = function () {
        return this.state.SelectedColumns.length > 0;
    };
    LayoutColumnWizard.prototype.canBack = function () {
        return true;
    };
    LayoutColumnWizard.prototype.Next = function () {
        this.props.Data.Columns = ColumnHelper_1.ColumnHelper.getColumnIdsFromFriendlyNames(this.state.SelectedColumns, this.props.Columns);
    };
    LayoutColumnWizard.prototype.Back = function () {
        // todo
    };
    LayoutColumnWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    LayoutColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return LayoutColumnWizard;
}(React.Component));
exports.LayoutColumnWizard = LayoutColumnWizard;
