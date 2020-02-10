"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var DualListBoxEditor_1 = require("../../Components/ListBox/DualListBoxEditor");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var HelpBlock_1 = require("../../../components/HelpBlock");
var WizardPanel_1 = require("../../../components/WizardPanel");
var CustomSortValuesWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CustomSortValuesWizard, _super);
    function CustomSortValuesWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ColumnValues: _this.props.Adaptable.getColumnValueDisplayValuePairDistinctList(_this.props.Data.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue, false),
            SelectedValues: _this.props.Data.SortedValues,
            IsEdit: _this.props.Data.SortedValues.length > 0,
        };
        return _this;
    }
    CustomSortValuesWizard.prototype.render = function () {
        var _this = this;
        var friendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns);
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, { marginBottom: 2 }, "Create a Custom Sort by moving items into the 'Custom Sort Order' listbox. The new sort for the column will consist first of the items in the 'Custom Sort Order' listbox; all other column values will then sort alphabetically."),
            React.createElement(DualListBoxEditor_1.DualListBoxEditor, { style: { flex: 1, overflow: 'hidden' }, AvailableValues: this.state.ColumnValues, SelectedValues: this.state.SelectedValues, HeaderAvailable: "Column Values", HeaderSelected: "Custom Sort Order", DisplayMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.DisplayValue], SortMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue], ValueMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.DisplayValue], onChange: function (SelectedValues) { return _this.OnSelectedValuesChange(SelectedValues); }, DisplaySize: DualListBoxEditor_1.DisplaySize.Small }),
            React.createElement(HelpBlock_1.default, { marginTop: 2 }, "Press ctrl/cmd key while clicking to select multiple items.")));
    };
    CustomSortValuesWizard.prototype.OnSelectedValuesChange = function (newValues) {
        var _this = this;
        this.setState({ SelectedValues: newValues }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    CustomSortValuesWizard.prototype.canNext = function () {
        return this.state.SelectedValues.length > 0;
    };
    CustomSortValuesWizard.prototype.canBack = function () {
        return !this.state.IsEdit;
    };
    CustomSortValuesWizard.prototype.Next = function () {
        this.props.Data.SortedValues = this.state.SelectedValues;
    };
    CustomSortValuesWizard.prototype.Back = function () {
        // todo
    };
    CustomSortValuesWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    CustomSortValuesWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return CustomSortValuesWizard;
}(React.Component));
exports.CustomSortValuesWizard = CustomSortValuesWizard;
