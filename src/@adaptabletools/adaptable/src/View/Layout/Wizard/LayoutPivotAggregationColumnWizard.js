"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var DualListBoxEditor_1 = require("../../Components/ListBox/DualListBoxEditor");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var WizardPanel_1 = require("../../../components/WizardPanel");
var HelpBlock_1 = require("../../../components/HelpBlock");
var ObjectFactory_1 = require("../../../Utilities/ObjectFactory");
var LayoutAggregationColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutAggregationColumnWizard, _super);
    function LayoutAggregationColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        // is this right?
        if (_this.props.Data.PivotDetails == null) {
            _this.props.Data.PivotDetails = ObjectFactory_1.default.CreateEmptyPivotDetails();
        }
        _this.state = {
            SelectedColumns: ColumnHelper_1.ColumnHelper.getFriendlyNamesFromColumnIds(_this.props.Data.PivotDetails.AggregationColumns, _this.props.Columns),
        };
        return _this;
    }
    LayoutAggregationColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, { marginBottom: 2 },
                "2. Select the ",
                React.createElement("b", null, "Aggregation Columns"),
                " (which are 'summed' in the pivot)."),
            React.createElement(DualListBoxEditor_1.DualListBoxEditor, { style: { flex: 1, overflow: 'hidden' }, AvailableValues: this.props.AggregetableColumns.map(function (x) { return x.FriendlyName; }), SelectedValues: this.state.SelectedColumns, HeaderAvailable: "Available Aggregation Columns", HeaderSelected: "Aggregation Columns in Layout", onChange: function (SelectedValues) { return _this.OnSelectedValuesChange(SelectedValues); }, DisplaySize: DualListBoxEditor_1.DisplaySize.Small })));
    };
    LayoutAggregationColumnWizard.prototype.OnSelectedValuesChange = function (newValues) {
        var _this = this;
        this.setState({ SelectedColumns: newValues }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    LayoutAggregationColumnWizard.prototype.canNext = function () {
        return true;
    };
    LayoutAggregationColumnWizard.prototype.canBack = function () {
        return true;
    };
    LayoutAggregationColumnWizard.prototype.Next = function () {
        this.props.Data.PivotDetails.AggregationColumns = ColumnHelper_1.ColumnHelper.getColumnIdsFromFriendlyNames(this.state.SelectedColumns, this.props.Columns);
    };
    LayoutAggregationColumnWizard.prototype.Back = function () {
        // todo
    };
    LayoutAggregationColumnWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    LayoutAggregationColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return LayoutAggregationColumnWizard;
}(React.Component));
exports.LayoutAggregationColumnWizard = LayoutAggregationColumnWizard;
