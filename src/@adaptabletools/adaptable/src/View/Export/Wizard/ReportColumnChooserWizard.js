"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var DualListBoxEditor_1 = require("../../Components/ListBox/DualListBoxEditor");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var WizardPanel_1 = require("../../../components/WizardPanel");
var HelpBlock_1 = require("../../../components/HelpBlock");
var ReportColumnChooserWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ReportColumnChooserWizard, _super);
    function ReportColumnChooserWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            AllColumnValues: _this.props.Columns.map(function (c) { return c.FriendlyName; }),
            SelectedColumnValues: ColumnHelper_1.default.getFriendlyNamesFromColumnIds(_this.props.Data.ColumnIds, _this.props.Columns),
        };
        return _this;
    }
    ReportColumnChooserWizard.prototype.render = function () {
        var _this = this;
        return this.props.Data.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns ? (React.createElement(WizardPanel_1.default, { bodyProps: { style: { border: 'none' } }, headerProps: { style: { border: 'none' } } },
            React.createElement(HelpBlock_1.default, { marginBottom: 2 }, "Press ctrl/cmd key while clicking to select multiple items."),
            React.createElement(DualListBoxEditor_1.DualListBoxEditor, { style: { flex: 1, overflow: 'hidden' }, AvailableValues: this.state.AllColumnValues, SelectedValues: this.state.SelectedColumnValues, HeaderAvailable: "Columns", HeaderSelected: "Columns in Report", onChange: function (SelectedValues) { return _this.OnSelectedValuesChange(SelectedValues); }, DisplaySize: DualListBoxEditor_1.DisplaySize.Small }))) : null;
    };
    ReportColumnChooserWizard.prototype.OnSelectedValuesChange = function (newValues) {
        var _this = this;
        this.setState({ SelectedColumnValues: newValues }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ReportColumnChooserWizard.prototype.canNext = function () {
        return this.state.SelectedColumnValues.length > 0;
    };
    ReportColumnChooserWizard.prototype.canBack = function () {
        return true;
    };
    ReportColumnChooserWizard.prototype.Next = function () {
        var _this = this;
        this.props.Data.ColumnIds = this.state.SelectedColumnValues.map(function (c) { return _this.props.Columns.find(function (col) { return col.FriendlyName == c; }).ColumnId; });
    };
    ReportColumnChooserWizard.prototype.Back = function () {
        //todo
    };
    ReportColumnChooserWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ReportColumnChooserWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ReportColumnChooserWizard;
}(React.Component));
exports.ReportColumnChooserWizard = ReportColumnChooserWizard;
