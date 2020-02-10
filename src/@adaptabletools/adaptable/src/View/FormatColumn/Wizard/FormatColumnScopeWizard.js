"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var WizardPanel_1 = require("../../../components/WizardPanel");
var FormatColumnScopeWizard = /** @class */ (function (_super) {
    tslib_1.__extends(FormatColumnScopeWizard, _super);
    function FormatColumnScopeWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ColumnId: _this.props.Data.ColumnId,
        };
        return _this;
    }
    FormatColumnScopeWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.ColumnId], ColumnList: this.props.Columns, onColumnChange: function (columns) { return _this.onColumnSelectedChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single })));
    };
    FormatColumnScopeWizard.prototype.onColumnSelectedChanged = function (columns) {
        var _this = this;
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : '' }, function () { return _this.props.UpdateGoBackState(); });
    };
    FormatColumnScopeWizard.prototype.canNext = function () {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
    };
    FormatColumnScopeWizard.prototype.canBack = function () {
        return false;
    };
    FormatColumnScopeWizard.prototype.Next = function () {
        this.props.Data.ColumnId = this.state.ColumnId;
    };
    FormatColumnScopeWizard.prototype.Back = function () {
        //todo
    };
    FormatColumnScopeWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    FormatColumnScopeWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return FormatColumnScopeWizard;
}(React.Component));
exports.FormatColumnScopeWizard = FormatColumnScopeWizard;
