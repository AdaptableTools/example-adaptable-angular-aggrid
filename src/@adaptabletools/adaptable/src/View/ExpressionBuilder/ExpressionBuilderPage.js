"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ExpressionBuilderConditionSelector_1 = require("./ExpressionBuilderConditionSelector");
var rebass_1 = require("rebass");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var ExpressionBuilderPreview_1 = require("./ExpressionBuilderPreview");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var SimpleButton_1 = require("../../components/SimpleButton");
var ExpressionBuilderPage = /** @class */ (function (_super) {
    tslib_1.__extends(ExpressionBuilderPage, _super);
    function ExpressionBuilderPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.StepName = 'Build Expression';
        return _this;
    }
    ExpressionBuilderPage.prototype.render = function () {
        var _this = this;
        var queryBuildStatus = this.getQueryBuildStatus();
        var newButton = (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.onSelectedColumnChanged(); }, disabled: this.props.ExpressionMode == Enums_1.ExpressionMode.SingleColumn ||
                queryBuildStatus == Enums_1.QueryBuildStatus.SelectFirstColumn ||
                queryBuildStatus == Enums_1.QueryBuildStatus.SelectFurtherColumn ||
                queryBuildStatus == Enums_1.QueryBuildStatus.SingleConditionsAdded, tooltip: "Add Condition", variant: "raised", kind: "success", icon: "plus", tone: "accent", AccessLevel: Enums_1.AccessLevel.Full }, "Add Column Condition"));
        return (React.createElement(PanelWithButton_1.PanelWithButton, { button: newButton, headerText: "", variant: "default", bodyProps: {
                style: {
                    display: 'flex',
                    flexFlow: 'column',
                    overflow: 'auto',
                },
            }, style: { height: '100%' } },
            React.createElement(rebass_1.Flex, { flexDirection: "row", style: { height: '100%' } },
                React.createElement(ExpressionBuilderConditionSelector_1.ExpressionBuilderConditionSelector, { ColumnsList: this.props.Columns || [], QueryBuildStatus: queryBuildStatus, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Expression: this.state.Expression, ExpressionMode: this.props.ExpressionMode != null
                        ? this.props.ExpressionMode
                        : Enums_1.ExpressionMode.MultiColumn, onExpressionChange: function (expression) { return _this.onChangeExpression(expression); }, onSelectedColumnChange: function (columnId, tab) { return _this.onSelectedColumnChange(columnId, tab); }, SelectedColumnId: this.state.SelectedColumnId, SelectedTab: this.state.SelectedTab, Adaptable: this.props.Adaptable }),
                React.createElement(ExpressionBuilderPreview_1.ExpressionBuilderPreview, { Expression: this.state.Expression, UserFilters: this.props.UserFilters, onSelectedColumnChange: function (columnId, tab) { return _this.onSelectedColumnChange(columnId, tab); }, ColumnsList: this.props.Columns || [], DeleteColumnValue: function (columnId, value) { return _this.DeleteColumnValue(columnId, value); }, DeleteUserFilterExpression: function (columnId, index) {
                        return _this.DeleteUserFilterExpression(columnId, index);
                    }, DeleteRange: function (columnId, index) { return _this.DeleteRange(columnId, index); }, DeleteAllColumnExpression: function (columnId) { return _this.DeleteAllColumnExpression(columnId); }, ShowPanel: true }))));
    };
    ExpressionBuilderPage.prototype.getQueryBuildStatus = function () {
        // if no expression then assume its new  - fair?
        if (ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(this.state.Expression)) {
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)) {
                return Enums_1.QueryBuildStatus.SelectFirstColumn; // you neeed to select a column
            }
            else {
                return Enums_1.QueryBuildStatus.ColumnSelected; // column is selected but you need to add some elements
            }
        }
        else {
            // we have an expression
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)) {
                return Enums_1.QueryBuildStatus.SelectFurtherColumn; // you neeed to select another column
            }
            else {
                return this.props.ExpressionMode == Enums_1.ExpressionMode.SingleColumn
                    ? Enums_1.QueryBuildStatus.SingleConditionsAdded
                    : Enums_1.QueryBuildStatus.MultipleConditionsAdded; // do we need this status???
            }
        }
    };
    ExpressionBuilderPage.prototype.onSelectedColumnChanged = function () {
        var _this = this;
        this.setState({ SelectedColumnId: '' }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ExpressionBuilderPage.prototype.DeleteColumnValue = function (columnId, value) {
        var _this = this;
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        var columnValues = this.state.Expression.ColumnValueExpressions.find(function (x) { return x.ColumnId == columnId; });
        var index = columnValues.ColumnDisplayValues.indexOf(value);
        columnValues.ColumnDisplayValues.splice(index, 1);
        columnValues.ColumnRawValues.splice(index, 1);
        if (columnValues.ColumnDisplayValues.length == 0) {
            var columnValuesIndex = this.state.Expression.ColumnValueExpressions.findIndex(function (x) { return x.ColumnId == columnId; });
            this.state.Expression.ColumnValueExpressions.splice(columnValuesIndex, 1);
        }
        var newExpression = Object.assign({}, this.state.Expression);
        this.setState({ Expression: newExpression }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ExpressionBuilderPage.prototype.DeleteUserFilterExpression = function (columnId, index) {
        var _this = this;
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        var columnUserFilterExpressions = this.state.Expression.FilterExpressions.find(function (x) { return x.ColumnId == columnId; });
        columnUserFilterExpressions.Filters.splice(index, 1);
        if (columnUserFilterExpressions.Filters.length == 0) {
            var columnUserFilterExpressionIndex = this.state.Expression.FilterExpressions.findIndex(function (x) { return x.ColumnId == columnId; });
            this.state.Expression.FilterExpressions.splice(columnUserFilterExpressionIndex, 1);
        }
        var newExpression = Object.assign({}, this.state.Expression);
        this.setState({ Expression: newExpression }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ExpressionBuilderPage.prototype.DeleteRange = function (columnId, index) {
        var _this = this;
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        var columnRanges = this.state.Expression.RangeExpressions.find(function (x) { return x.ColumnId == columnId; });
        columnRanges.Ranges.splice(index, 1);
        if (columnRanges.Ranges.length == 0) {
            var columnRangesIndex = this.state.Expression.RangeExpressions.findIndex(function (x) { return x.ColumnId == columnId; });
            this.state.Expression.RangeExpressions.splice(columnRangesIndex, 1);
        }
        var newExpression = Object.assign({}, this.state.Expression);
        this.setState({ Expression: newExpression }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ExpressionBuilderPage.prototype.DeleteAllColumnExpression = function (columnId) {
        var _this = this;
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        var columnValuesIndex = this.state.Expression.ColumnValueExpressions.findIndex(function (x) { return x.ColumnId == columnId; });
        if (columnValuesIndex >= 0) {
            this.state.Expression.ColumnValueExpressions.splice(columnValuesIndex, 1);
        }
        var columnUserFilterExpressionIndex = this.state.Expression.FilterExpressions.findIndex(function (x) { return x.ColumnId == columnId; });
        if (columnUserFilterExpressionIndex >= 0) {
            this.state.Expression.FilterExpressions.splice(columnUserFilterExpressionIndex, 1);
        }
        var columnRangesIndex = this.state.Expression.RangeExpressions.findIndex(function (x) { return x.ColumnId == columnId; });
        if (columnRangesIndex >= 0) {
            this.state.Expression.RangeExpressions.splice(columnRangesIndex, 1);
        }
        var newExpression = Object.assign({}, this.state.Expression);
        this.setState({ Expression: newExpression }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ExpressionBuilderPage.prototype.onChangeExpression = function (newExpression) {
        var _this = this;
        this.setState({ Expression: newExpression }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ExpressionBuilderPage.prototype.onSelectedColumnChange = function (columnId, tab) {
        var _this = this;
        this.setState({ SelectedColumnId: columnId, SelectedTab: tab }, function () { return _this.props.UpdateGoBackState(); });
    };
    ExpressionBuilderPage.prototype.canNext = function () {
        return ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(this.state.Expression);
    };
    ExpressionBuilderPage.prototype.canBack = function () {
        return this.props.ExpressionMode != Enums_1.ExpressionMode.SingleColumn;
    };
    ExpressionBuilderPage.prototype.Next = function () {
        /*this.props.Data.Values = this.state.SelectedValues*/
    };
    ExpressionBuilderPage.prototype.Back = function () {
        // todo
    };
    ExpressionBuilderPage.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ExpressionBuilderPage.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ExpressionBuilderPage;
}(React.Component));
exports.ExpressionBuilderPage = ExpressionBuilderPage;
