"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
var WizardPanel_1 = require("../../../components/WizardPanel");
var PlusMinusColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PlusMinusColumnWizard, _super);
    function PlusMinusColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { SelectedColumnId: _this.props.Data.ColumnId };
        return _this;
    }
    PlusMinusColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.SelectedColumnId], ColumnList: this.props.NumericColumns, onColumnChange: function (columns) { return _this.onColumnSelectedChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single })));
    };
    PlusMinusColumnWizard.prototype.onColumnSelectedChanged = function (columns) {
        var _this = this;
        this.setState({ SelectedColumnId: columns.length > 0 ? columns[0].ColumnId : '' }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    PlusMinusColumnWizard.prototype.canNext = function () {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId);
    };
    PlusMinusColumnWizard.prototype.canBack = function () {
        return true;
    };
    PlusMinusColumnWizard.prototype.Next = function () {
        this.props.Data.ColumnId = this.state.SelectedColumnId;
    };
    PlusMinusColumnWizard.prototype.Back = function () {
        //todo
    };
    PlusMinusColumnWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    PlusMinusColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return PlusMinusColumnWizard;
}(React.Component));
exports.PlusMinusColumnWizard = PlusMinusColumnWizard;
