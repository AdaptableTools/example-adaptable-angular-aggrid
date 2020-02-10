"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var DualListBoxEditor_1 = require("../../Components/ListBox/DualListBoxEditor");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var WizardPanel_1 = require("../../../components/WizardPanel");
var HelpBlock_1 = require("../../../components/HelpBlock");
var ObjectFactory_1 = require("../../../Utilities/ObjectFactory");
var LayoutPivotColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutPivotColumnWizard, _super);
    function LayoutPivotColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        // is this right?
        if (_this.props.Data.PivotDetails == null) {
            _this.props.Data.PivotDetails = ObjectFactory_1.default.CreateEmptyPivotDetails();
        }
        _this.state = {
            SelectedColumns: ColumnHelper_1.ColumnHelper.getFriendlyNamesFromColumnIds(_this.props.Data.PivotDetails.PivotColumns, _this.props.Columns),
        };
        return _this;
    }
    LayoutPivotColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, { marginBottom: 2 },
                "1. Select the ",
                React.createElement("b", null, "Pivot Columns"),
                " (which appear along the top of the pivot)."),
            React.createElement(DualListBoxEditor_1.DualListBoxEditor, { style: { flex: 1, overflow: 'hidden' }, AvailableValues: this.props.PivotableColumns.map(function (x) { return x.FriendlyName; }), SelectedValues: this.state.SelectedColumns, HeaderAvailable: "Available Pivot Columns", HeaderSelected: "Pivot Columns in Layout", onChange: function (SelectedValues) { return _this.OnSelectedValuesChange(SelectedValues); }, DisplaySize: DualListBoxEditor_1.DisplaySize.Small })));
    };
    LayoutPivotColumnWizard.prototype.OnSelectedValuesChange = function (newValues) {
        var _this = this;
        this.setState({ SelectedColumns: newValues }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    LayoutPivotColumnWizard.prototype.canNext = function () {
        return true;
    };
    LayoutPivotColumnWizard.prototype.canBack = function () {
        return true;
    };
    LayoutPivotColumnWizard.prototype.Next = function () {
        this.props.Data.PivotDetails.PivotColumns = ColumnHelper_1.ColumnHelper.getColumnIdsFromFriendlyNames(this.state.SelectedColumns, this.props.Columns);
    };
    LayoutPivotColumnWizard.prototype.Back = function () {
        // todo
    };
    LayoutPivotColumnWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    LayoutPivotColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return LayoutPivotColumnWizard;
}(React.Component));
exports.LayoutPivotColumnWizard = LayoutPivotColumnWizard;
