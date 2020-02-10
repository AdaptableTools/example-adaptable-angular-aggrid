"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ExpressionHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ExpressionHelper");
var ColumnSelector_1 = require("@adaptabletools/adaptable/src/View/Components/Selectors/ColumnSelector");
var Enums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var rebass_1 = require("rebass");
var WizardPanel_1 = require("@adaptabletools/adaptable/src/components/WizardPanel");
var Radio_1 = require("@adaptabletools/adaptable/src/components/Radio");
var HelpBlock_1 = require("@adaptabletools/adaptable/src/components/HelpBlock");
var CategoryChartXAxisWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryChartXAxisWizard, _super);
    function CategoryChartXAxisWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            XAxisColumnId: props.Data.XAxisColumnId,
            UseAllXAsisColumnValues: ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(_this.props.Data.XAxisExpression),
            XAxisExpression: _this.props.Data.XAxisExpression,
        };
        return _this;
    }
    CategoryChartXAxisWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, null, "Select a column for the X Axis (Horizontal)."),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3 },
                React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "X Axis Column:"),
                React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                    React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.XAxisColumnId], ColumnList: this.props.Columns, onColumnChange: function (columns) { return _this.onXAxisColumnChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single }))),
            React.createElement(HelpBlock_1.default, { marginTop: 3 }, "Choose whether to show all values for this column or to filter them (performed in next step)"),
            React.createElement(rebass_1.Flex, { paddingLeft: 2, marginTop: 3, flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "X Axis Column Values:"),
                React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                    React.createElement(Radio_1.default, { value: "All", marginRight: 2, checked: this.state.UseAllXAsisColumnValues == true, onChange: function (_, e) { return _this.onUseAllColumnValuesChanged(e); } }, "All"),
                    React.createElement(Radio_1.default, { value: "Filtered", checked: this.state.UseAllXAsisColumnValues == false, onChange: function (_, e) { return _this.onUseAllColumnValuesChanged(e); } }, "Filtered")))));
    };
    CategoryChartXAxisWizard.prototype.onUseAllColumnValuesChanged = function (event) {
        var _this = this;
        var e = event.target;
        var showAll = e.value == 'All';
        var expression = this.state.XAxisExpression;
        if (!showAll && ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(expression)) {
            expression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
        }
        this.setState({
            UseAllXAsisColumnValues: showAll,
            XAxisExpression: expression,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    CategoryChartXAxisWizard.prototype.onXAxisColumnChanged = function (columns) {
        var _this = this;
        var isColumn = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columns);
        this.setState({
            XAxisColumnId: isColumn ? columns[0].ColumnId : '',
            UseAllXAsisColumnValues: true,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    CategoryChartXAxisWizard.prototype.canNext = function () {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.XAxisColumnId);
    };
    CategoryChartXAxisWizard.prototype.canBack = function () {
        return true;
    };
    CategoryChartXAxisWizard.prototype.Next = function () {
        this.props.Data.XAxisColumnId = this.state.XAxisColumnId;
        this.props.Data.XAxisExpression = this.state.UseAllXAsisColumnValues
            ? null
            : this.state.XAxisExpression;
        if (this.props.Data.XAxisColumnId != this.state.XAxisColumnId) {
            this.props.Data.XAxisExpression = null;
        }
    };
    CategoryChartXAxisWizard.prototype.Back = function () {
        // todo
    };
    CategoryChartXAxisWizard.prototype.GetIndexStepIncrement = function () {
        return this.state.UseAllXAsisColumnValues ? 2 : 1;
    };
    CategoryChartXAxisWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return CategoryChartXAxisWizard;
}(React.Component));
exports.CategoryChartXAxisWizard = CategoryChartXAxisWizard;
