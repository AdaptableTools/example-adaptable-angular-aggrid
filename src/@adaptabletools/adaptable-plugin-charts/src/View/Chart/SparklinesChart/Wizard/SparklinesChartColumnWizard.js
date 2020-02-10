"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ColumnSelector_1 = require("@adaptabletools/adaptable/src/View/Components/Selectors/ColumnSelector");
var Enums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var WizardPanel_1 = require("@adaptabletools/adaptable/src/components/WizardPanel");
var FormLayout_1 = require("@adaptabletools/adaptable/src/components/FormLayout");
var Radio_1 = require("@adaptabletools/adaptable/src/components/Radio");
var ExpressionHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ExpressionHelper");
var SparklinesChartColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(SparklinesChartColumnWizard, _super);
    function SparklinesChartColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.setFiltered = function (Filtered) {
            var state = {
                Filtered: Filtered,
            };
            var Expression = _this.state.Expression;
            if (Filtered && ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(_this.state.Expression)) {
                Expression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
                state.Expression = Expression;
            }
            _this.setState(state);
        };
        _this.state = {
            Filtered: ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(props.Data.Expression),
            Expression: props.Data.Expression,
            ColumnId: props.Data.ColumnId,
        };
        return _this;
    }
    SparklinesChartColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(FormLayout_1.default, null,
                React.createElement(FormLayout_1.FormRow, { label: "Column" },
                    React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.ColumnId], ColumnList: this.props.Adaptable.api.gridApi.getNumericColumns(), onColumnChange: function (columns) { return _this.onColumnChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single })),
                React.createElement(FormLayout_1.FormRow, { label: "Column Values" },
                    React.createElement("div", null,
                        React.createElement(Radio_1.default, { name: "values", checked: !this.state.Filtered, onChange: function (checked) {
                                _this.setFiltered(!checked);
                            }, marginRight: 2 }, "All"),
                        React.createElement(Radio_1.default, { name: "values", checked: this.state.Filtered, onChange: function (checked) {
                                _this.setFiltered(checked);
                            } }, "Filtered"))))));
    };
    SparklinesChartColumnWizard.prototype.onColumnChanged = function (columns) {
        var _this = this;
        var isColumn = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columns);
        this.setState({
            ColumnId: isColumn ? columns[0].ColumnId : '',
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    SparklinesChartColumnWizard.prototype.canNext = function () {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
    };
    SparklinesChartColumnWizard.prototype.canBack = function () {
        return true;
    };
    SparklinesChartColumnWizard.prototype.Next = function () {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.Expression = !this.state.Filtered ? null : this.state.Expression;
    };
    SparklinesChartColumnWizard.prototype.Back = function () {
        // todo
    };
    SparklinesChartColumnWizard.prototype.GetIndexStepIncrement = function () {
        return this.state.Filtered ? 1 : 2;
    };
    SparklinesChartColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return SparklinesChartColumnWizard;
}(React.Component));
exports.SparklinesChartColumnWizard = SparklinesChartColumnWizard;
