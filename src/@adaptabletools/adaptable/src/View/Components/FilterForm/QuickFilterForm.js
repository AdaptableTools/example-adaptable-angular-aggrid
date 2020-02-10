"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var DeepDiff = require("deep-diff");
var React = require("react");
var ColumnFilterRedux = require("../../../Redux/ActionsReducers/ColumnFilterRedux");
var react_redux_1 = require("react-redux");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var ObjectFactory_1 = require("../../../Utilities/ObjectFactory");
var RangeHelper_1 = require("../../../Utilities/Helpers/RangeHelper");
var Input_1 = require("../../../components/Input");
var styled_components_1 = require("styled-components");
var theme_1 = require("../../../theme");
var QuickFilterFormComponent = /** @class */ (function (_super) {
    tslib_1.__extends(QuickFilterFormComponent, _super);
    function QuickFilterFormComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            quickFilterFormText: '',
            filterExpression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(),
            numberOperatorPairs: RangeHelper_1.RangeHelper.GetNumberOperatorPairs(),
            stringOperatorPairs: RangeHelper_1.RangeHelper.GetStringOperatorPairs(),
            dateOperatorPairs: RangeHelper_1.RangeHelper.GetDateOperatorPairs(),
            placeholder: '',
        };
        return _this;
    }
    QuickFilterFormComponent.prototype.componentDidUpdate = function (prevProps, prevState) {
        this.reconcileFilters();
    };
    QuickFilterFormComponent.prototype.componentDidMount = function () {
        this.reconcileFilters();
    };
    QuickFilterFormComponent.prototype.reconcileFilters = function () {
        var _this = this;
        var existingColumnFilter = this.props.ColumnFilters.find(function (cf) { return cf.ColumnId == _this.props.CurrentColumn.ColumnId; });
        if (existingColumnFilter) {
            // first check to see if we have an expression
            if (ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(this.state.filterExpression)) {
                // if we have no placeholder then set one - together with the placeholder
                var expressionDescription = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(existingColumnFilter.Filter, this.props.Columns, false);
                this.doUpdate({
                    filterExpression: existingColumnFilter.Filter,
                    placeholder: expressionDescription,
                });
            }
            else {
                // we have an expression also - but if its not the same as the new one then update it to the new one
                var diff = DeepDiff.diff(existingColumnFilter.Filter, this.state.filterExpression);
                if (diff) {
                    var expressionDescription = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(existingColumnFilter.Filter, this.props.Columns, false);
                    this.doUpdate({
                        filterExpression: existingColumnFilter.Filter,
                        placeholder: expressionDescription,
                        quickFilterFormText: '',
                    });
                }
            }
        }
        else {
            // no filter so make sure our stuff is clear
            if (this.state.placeholder != 'TEMP') {
                if (ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(this.state.filterExpression) ||
                    StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.placeholder) ||
                    StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.quickFilterFormText)) {
                    this.clearState();
                }
            }
        }
    };
    QuickFilterFormComponent.prototype.render = function () {
        var _this = this;
        var controlType = this.props.CurrentColumn && this.props.CurrentColumn.DataType == Enums_1.DataType.Date
            ? 'date'
            : 'text';
        return this.props.CurrentColumn &&
            this.props.CurrentColumn.Filterable &&
            this.props.CurrentColumn.DataType != Enums_1.DataType.Boolean ? (React.createElement(Input_1.default, { style: {
                width: this.props.ColumnWidth,
                padding: 0,
                margin: 'auto',
                minHeight: 20,
                maxHeight: 20,
                fontSize: 'var(--ab-font-size-1)',
            }, className: "ab-QuickFilterFormInput", autoFocus: false, type: controlType, placeholder: this.state.placeholder, value: this.state.quickFilterFormText, onChange: function (x) { return _this.OnTextChange(x.target.value); } })) : null;
    };
    // debouncedRunQuickSearch = _.debounce((searchText: string) => this.runTextchanged(searchText), 250);
    // debouncedSetFilter = _.debounce((columnFilter: ColumnFilter) => this.props.onAddEditColumnFilter(columnFilter), 1000);
    QuickFilterFormComponent.prototype.OnTextChange = function (searchText) {
        // as soon as anything changes clear existing column filter
        if (searchText.trim() != this.state.quickFilterFormText.trim()) {
            //   this.clearExistingColumnFilter();
        }
        // if text is empty then clear our state
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(searchText.trim())) {
            this.clearState();
            this.clearExistingColumnFilter();
            return;
        }
        // otherwise handle the change
        this.handleFilterChange(searchText);
    };
    QuickFilterFormComponent.prototype.clearExistingColumnFilter = function () {
        var _this = this;
        var existingColumnFilter = this.props.ColumnFilters.find(function (cf) { return cf.ColumnId == _this.props.CurrentColumn.ColumnId; });
        if (existingColumnFilter) {
            this.props.onClearColumnFilter(existingColumnFilter);
        }
    };
    QuickFilterFormComponent.prototype.createColumnFilter = function (expression, searchText) {
        var _this = this;
        var columnFilter = this.props.ColumnFilters.find(function (cf) { return cf.ColumnId == _this.props.CurrentColumn.ColumnId; });
        if (columnFilter == null) {
            columnFilter = ObjectFactory_1.ObjectFactory.CreateColumnFilter(this.props.CurrentColumn.ColumnId, expression);
        }
        else {
            columnFilter.Filter = expression;
        }
        this.setState({
            quickFilterFormText: searchText,
            filterExpression: expression,
            placeholder: '',
        });
        if (this.props.ColumnFilters.find(function (cf) { return cf.ColumnId == columnFilter.ColumnId; })) {
            this.props.onEditColumnFilter(columnFilter);
        }
        else {
            this.props.onAddColumnFilter(columnFilter);
        }
    };
    QuickFilterFormComponent.prototype.createRangeExpression = function (operatorKVP, searchText) {
        if (searchText.trim() == operatorKVP.Key) {
            // its operator only so do nothing (but set placeholder to ensure not wiped)
            this.clearExpressionState(searchText);
        }
        else {
            var operand1 = searchText.replace(operatorKVP.Key, '');
            var operand2 = null;
            if (operatorKVP.Value == Enums_1.LeafExpressionOperator.Between) {
                var values = searchText.trim().split(operatorKVP.Key);
                if (!this.isValidBetweenValues(values)) {
                    this.clearExpressionState(searchText);
                    return;
                }
                operand1 = values[0];
                operand2 = values[1];
            }
            var range = RangeHelper_1.RangeHelper.CreateValueRange(operatorKVP.Value, operand1, operand2);
            var expression = ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(this.props.CurrentColumn.ColumnId, [], [], [], [range]);
            this.createColumnFilter(expression, searchText);
        }
    };
    QuickFilterFormComponent.prototype.handleFilterChange = function (searchText) {
        var _this = this;
        // first check for existing operators and handle those
        var isRangeExpression = false;
        var operators;
        switch (this.props.CurrentColumn.DataType) {
            case Enums_1.DataType.Number:
                operators = this.state.numberOperatorPairs;
                break;
            case Enums_1.DataType.String:
                operators = this.state.stringOperatorPairs;
                break;
            case Enums_1.DataType.Date:
                operators = this.state.dateOperatorPairs;
                break;
            default:
                operators = [];
                break;
        }
        operators.forEach(function (op) {
            if (!isRangeExpression) {
                if (searchText.includes(op.Key)) {
                    _this.createRangeExpression(op, searchText);
                    isRangeExpression = true; // set to true so dont do >= and then later >
                }
            }
        });
        if (!isRangeExpression) {
            // next check to see if it has a ';' - if so then create an "In" for all values; not sure if raw or display...
            if (searchText.includes(';')) {
                var values = searchText.split(';').map(function (v) { return v.trim(); });
                var expression = ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(this.props.CurrentColumn.ColumnId, values, [], [], []);
                this.createColumnFilter(expression, searchText);
            }
            else {
                // if just a single, non-operator, value then do an "Equals" range
                var equalOperatorPair = this.state.numberOperatorPairs.find(function (op) { return op.Value == Enums_1.LeafExpressionOperator.Contains; });
                this.createRangeExpression(equalOperatorPair, searchText);
            }
        }
    };
    QuickFilterFormComponent.prototype.doUpdate = function (state) {
        if (JSON.stringify(state) === JSON.stringify(this.state)) {
            return;
        }
        this.setState(state);
    };
    QuickFilterFormComponent.prototype.clearState = function () {
        this.doUpdate({
            quickFilterFormText: '',
            filterExpression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(),
            placeholder: '',
        });
    };
    QuickFilterFormComponent.prototype.clearExpressionState = function (searchText) {
        this.setState({
            quickFilterFormText: searchText,
            filterExpression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(),
            placeholder: 'TEMP',
        });
    };
    QuickFilterFormComponent.prototype.isValidBetweenValues = function (values) {
        if (values.length != 2) {
            return false;
        }
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(values[0]) || StringExtensions_1.StringExtensions.IsNullOrEmpty(values[1])) {
            return false;
        }
        return true;
    };
    return QuickFilterFormComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        CurrentColumn: ownProps.CurrentColumn,
        Adaptable: ownProps.Adaptable,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        NamedFilters: state.NamedFilter.NamedFilters,
        ColumnFilters: state.ColumnFilter.ColumnFilters,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddColumnFilter: function (columnFilter) {
            return dispatch(ColumnFilterRedux.ColumnFilterAdd(columnFilter));
        },
        onEditColumnFilter: function (columnFilter) {
            return dispatch(ColumnFilterRedux.ColumnFilterEdit(columnFilter));
        },
        onClearColumnFilter: function (columnFilter) {
            return dispatch(ColumnFilterRedux.ColumnFilterClear(columnFilter));
        },
    };
}
exports.QuickFilterForm = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(QuickFilterFormComponent);
exports.QuickFilterFormReact = function (FilterContext) { return (React.createElement(react_redux_1.Provider, { store: FilterContext.Adaptable.AdaptableStore.TheStore },
    React.createElement(styled_components_1.ThemeProvider, { theme: theme_1.default },
        React.createElement(exports.QuickFilterForm, { Adaptable: FilterContext.Adaptable, CurrentColumn: FilterContext.Column, TeamSharingActivated: false, ColumnWidth: FilterContext.ColumnWidth, EmbedColumnMenu: FilterContext.Adaptable.embedColumnMenu })))); };
