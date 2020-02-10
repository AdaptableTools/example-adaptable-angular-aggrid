"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
var WizardPanel_1 = require("../../../components/WizardPanel");
var HelpBlock_1 = require("../../../components/HelpBlock");
var UserFilterSelectColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(UserFilterSelectColumnWizard, _super);
    function UserFilterSelectColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ColumnId: props.Data.ColumnId,
        };
        return _this;
    }
    UserFilterSelectColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, { marginBottom: 2 }, 'Choose which column the User Filter will apply to.'),
            React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.ColumnId], ColumnList: this.props.Columns, onColumnChange: function (columns) { return _this.onColumnSelectedChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single })));
    };
    UserFilterSelectColumnWizard.prototype.onColumnSelectedChanged = function (columns) {
        var _this = this;
        this.setState({
            ColumnId: columns.length > 0 ? columns[0].ColumnId : '',
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    UserFilterSelectColumnWizard.prototype.canNext = function () {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
    };
    UserFilterSelectColumnWizard.prototype.canBack = function () {
        return true;
    };
    UserFilterSelectColumnWizard.prototype.Next = function () {
        if (this.props.Data.ColumnId != this.state.ColumnId) {
            this.props.Data.Expression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
        }
        this.props.Data.ColumnId = this.state.ColumnId;
    };
    UserFilterSelectColumnWizard.prototype.Back = function () {
        //
    };
    UserFilterSelectColumnWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    UserFilterSelectColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return UserFilterSelectColumnWizard;
}(React.Component));
exports.UserFilterSelectColumnWizard = UserFilterSelectColumnWizard;
