"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ExpressionBuilderColumnValues_1 = require("./ExpressionBuilderColumnValues");
var ExpressionBuilderUserFilter_1 = require("./ExpressionBuilderUserFilter");
var ExpressionBuilderRanges_1 = require("./ExpressionBuilderRanges");
var SimpleButton_1 = require("../../components/SimpleButton");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ColumnSelector_1 = require("../Components/Selectors/ColumnSelector");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var Waiting_1 = require("../Components/FilterForm/Waiting");
var rebass_1 = require("rebass");
var HelpBlock_1 = require("../../components/HelpBlock");
var ExpressionBuilderConditionSelector = /** @class */ (function (_super) {
    tslib_1.__extends(ExpressionBuilderConditionSelector, _super);
    function ExpressionBuilderConditionSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.lazyLoadColumnValues = function (props) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, props
                        .Adaptable.adaptableOptions.queryOptions.getColumnValues(props.SelectedColumnId)
                        .then(function (result) {
                        var newState = {};
                        var columnValuePairs = [];
                        // we have got the result back from the function we've invoked; if the return value is null then lets get distinct values instead
                        if (result == null) {
                            //  nothing returned so get the distinct column values via Adaptable method
                            columnValuePairs = props.Adaptable.getColumnValueDisplayValuePairDistinctList(props.SelectedColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue, false);
                            columnValuePairs = ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, columnValuePairs, Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue]);
                            newState = tslib_1.__assign(tslib_1.__assign({}, newState), { ColumnRawValueDisplayValuePairs: columnValuePairs, ShowWaitingMessage: false, SelectedColumnId: props.SelectedColumnId });
                        }
                        else {
                            // we have return values from our function so lets populate the state with them
                            // make sure that we only return within max items that can be displayed
                            var distinctItems = ArrayExtensions_1.ArrayExtensions.RetrieveDistinct(result.ColumnValues).slice(0, props.Adaptable.adaptableOptions.queryOptions.maxColumnValueItemsDisplayed);
                            distinctItems.forEach(function (di) {
                                var displayValue = props.Adaptable.getDisplayValueFromRawValue(props.SelectedColumnId, di);
                                columnValuePairs.push({ RawValue: di, DisplayValue: displayValue });
                            });
                            newState = tslib_1.__assign(tslib_1.__assign({}, newState), { ColumnRawValueDisplayValuePairs: columnValuePairs, ShowWaitingMessage: false, SelectedColumnId: props.SelectedColumnId });
                            // set the UIPermittedValues for this column to what has been sent
                            props.Adaptable.api.userInterfaceApi.setColumnPermittedValues(props.SelectedColumnId, distinctItems);
                        }
                        return newState;
                    })];
            });
        }); };
        return _this;
    }
    ExpressionBuilderConditionSelector.getDerivedStateFromProps = function (props, state) {
        state = tslib_1.__assign(tslib_1.__assign({}, state), ExpressionBuilderConditionSelector.buildState(props, state));
        return tslib_1.__assign(tslib_1.__assign({}, state), ExpressionBuilderConditionSelector.buildColumnValuesState(props, state));
    };
    ExpressionBuilderConditionSelector.buildState = function (theProps, state) {
        var _a;
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(theProps.SelectedColumnId)) {
            return {
                SelectedColumnId: '',
                ColumnRawValueDisplayValuePairs: [],
                SelectedColumnDisplayValues: [],
                AllFilterExpresions: [],
                SelectedFilterExpressions: [],
                SelectedColumnRanges: [],
                QueryBuildStatus: theProps.QueryBuildStatus,
                ShowWaitingMessage: false,
                SelectedTab: theProps.SelectedTab,
            };
        }
        else {
            if (state == null && theProps.ExpressionMode == Enums_1.ExpressionMode.SingleColumn) {
                // no state so we have come in with a column and nothing else
                return {
                    SelectedColumnId: theProps.SelectedColumnId,
                    ColumnRawValueDisplayValuePairs: [],
                    SelectedColumnDisplayValues: [],
                    AllFilterExpresions: [],
                    SelectedFilterExpressions: [],
                    SelectedColumnRanges: [],
                    QueryBuildStatus: Enums_1.QueryBuildStatus.ColumnSelected,
                    ShowWaitingMessage: false,
                    SelectedTab: Enums_1.QueryTab.ColumnValue,
                };
            }
            else {
                var selectedColumnDisplayValues = void 0;
                var selectedColumnFilterExpressions_1;
                var selectedColumnRanges = void 0;
                // get selected column values
                var keyValuePair = theProps.Expression.ColumnValueExpressions.find(function (x) { return x.ColumnId == theProps.SelectedColumnId; });
                if (keyValuePair) {
                    selectedColumnDisplayValues = keyValuePair.ColumnDisplayValues;
                }
                else {
                    selectedColumnDisplayValues = [];
                }
                // get selected filter expressions
                var filterExpression = null;
                if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(theProps.Expression.FilterExpressions)) {
                    filterExpression = theProps.Expression.FilterExpressions.find(function (x) { return x.ColumnId == theProps.SelectedColumnId; });
                }
                selectedColumnFilterExpressions_1 = [];
                if (filterExpression) {
                    filterExpression.Filters.forEach(function (fe) {
                        // if its a userfilter add it to that list
                        var userFilter = theProps.UserFilters.find(function (uf) { return uf.Name == fe; });
                        if (userFilter) {
                            selectedColumnFilterExpressions_1.push(fe);
                        }
                        // if it is a system filter add it ot that list
                        var selectedSystemFilter = theProps.SystemFilters.find(function (sf) { return sf == fe; });
                        if (selectedSystemFilter) {
                            selectedColumnFilterExpressions_1.push(fe);
                        }
                    });
                }
                var availableFilterExpressions = (_a = theProps.UserFilters.map(function (f) { return f.Name; })).concat.apply(_a, tslib_1.__spread(theProps.SystemFilters.map(function (sf) { return sf; })));
                // get ranges
                var range = null;
                if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(theProps.Expression.RangeExpressions)) {
                    range = theProps.Expression.RangeExpressions.find(function (x) { return x.ColumnId == theProps.SelectedColumnId; });
                }
                selectedColumnRanges = range ? range.Ranges : [];
                return {
                    SelectedColumnId: state.SelectedColumnId,
                    ColumnRawValueDisplayValuePairs: state.ColumnRawValueDisplayValuePairs,
                    SelectedColumnDisplayValues: selectedColumnDisplayValues,
                    AllFilterExpresions: availableFilterExpressions,
                    SelectedFilterExpressions: selectedColumnFilterExpressions_1,
                    SelectedColumnRanges: selectedColumnRanges,
                    QueryBuildStatus: theProps.QueryBuildStatus,
                    ShowWaitingMessage: false,
                    SelectedTab: theProps.SelectedTab == null ? Enums_1.QueryTab.ColumnValue : theProps.SelectedTab,
                };
            }
        }
    };
    ExpressionBuilderConditionSelector.buildColumnValuesState = function (props, state) {
        var shouldGetColumnValues = false;
        if (props.SelectedColumnId != state.SelectedColumnId) {
            shouldGetColumnValues = true;
        }
        else if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(state.ColumnRawValueDisplayValuePairs) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(props.SelectedColumnId)) {
            shouldGetColumnValues = true;
        }
        var newState = {};
        if (shouldGetColumnValues) {
            var columnValuePairs = [];
            /*
              NOTE: We have a big bug here.  If we try to get the values from the function provided by the dev (see below)
              then we never seem to reload the page with the new state and so the listbox is never populated and the waiting message is never removed
            */
            // There are 2 ways to get column values to show in the dropdown
            // 1. By invoking the function provided by the dev at design-time in getColumnValues property of Query Options
            // Note: if we invoke this function and the result is null then we get the distinct values for the column
            // 2. If the property above is not set then instead, we get the distinct values for the column
            if (props.Adaptable.adaptableOptions.queryOptions.getColumnValues != null) {
                // The dev has provided us with a function to call that will retrieve the column values
                newState = { ShowWaitingMessage: true };
            }
            else {
                // the developer hasnt given us a property that we need to invoke to get column values, so lets get the distinct values for the column instead
                columnValuePairs = props.Adaptable.getColumnValueDisplayValuePairDistinctList(props.SelectedColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue, false);
                columnValuePairs = ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, columnValuePairs, Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue]);
                newState = tslib_1.__assign(tslib_1.__assign({}, newState), { ColumnRawValueDisplayValuePairs: columnValuePairs, ShowWaitingMessage: false, SelectedColumnId: props.SelectedColumnId });
            }
        }
        return newState;
    };
    ExpressionBuilderConditionSelector.prototype.componentDidMount = function () {
        if (this.props.Adaptable.adaptableOptions.queryOptions.getColumnValues) {
            this.setStateForColumnValues();
        }
    };
    ExpressionBuilderConditionSelector.prototype.setStateForColumnValues = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        this.lazyLoadColumnValues(props).then(function (state) {
            _this.setState(state);
        });
    };
    ExpressionBuilderConditionSelector.prototype.componentDidUpdate = function (_prevState, prevProps) {
        if (this.props.SelectedColumnId != prevProps.SelectedColumnId &&
            this.props.Adaptable.adaptableOptions.queryOptions.getColumnValues) {
            this.setStateForColumnValues();
        }
    };
    ExpressionBuilderConditionSelector.prototype.render = function () {
        var _this = this;
        var column = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.SelectedColumnId)
            ? null
            : this.props.ColumnsList.find(function (x) { return x.ColumnId == _this.props.SelectedColumnId; });
        var selectedColumn = column;
        var selectedColumnFriendlyName = selectedColumn ? selectedColumn.FriendlyName : '';
        // get filter names
        // first system filters
        var availableSystemFilterNames = this.props.Adaptable.FilterService.GetSystemFiltersForColumn(selectedColumn, this.props.SystemFilters).map(function (sf) {
            return sf;
        });
        // then user filters
        var availableUserFilterNames = this.props.Adaptable.FilterService.GetUserFiltersForColumn(selectedColumn, this.props.UserFilters).map(function (uf) {
            return uf.Name;
        });
        // then named filters
        var availableNamedFilterNames = this.props.Adaptable.FilterService.GetNamedFiltersForColumn(selectedColumn, this.props.NamedFilters, this.props.ColumnCategories).map(function (uf) {
            return uf.Name;
        });
        // get the help descriptions
        var firstTimeText = 'Start creating the query by selecting a column';
        var secondTimeText = 'Select another column for the query.';
        var panelHeader = this.state.QueryBuildStatus == Enums_1.QueryBuildStatus.SelectFirstColumn
            ? 'Select a Column'
            : 'Column: ' + selectedColumnFriendlyName;
        var clearButton = (React.createElement(SimpleButton_1.default, { onClick: function () { return _this.onSelectedColumnChanged(); }, disabled: this.props.ExpressionMode == Enums_1.ExpressionMode.SingleColumn ||
                this.state.QueryBuildStatus == Enums_1.QueryBuildStatus.SelectFirstColumn ||
                this.state.QueryBuildStatus == Enums_1.QueryBuildStatus.SelectFurtherColumn, tooltip: "Clear", variant: "text" }, "Clear"));
        var firstSelected = selectedColumn &&
            selectedColumn.DataType != Enums_1.DataType.Boolean &&
            this.state.SelectedTab == Enums_1.QueryTab.ColumnValue;
        var secondSelected = this.state.SelectedTab == Enums_1.QueryTab.Filter;
        var thirdSelected = this.state.SelectedTab == Enums_1.QueryTab.QueryRange;
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: panelHeader, variant: "default", button: clearButton, bodyScroll: false, bodyProps: {
                padding: 0,
                style: {
                    display: 'flex',
                    flexFlow: 'column',
                },
            }, style: {
                flex: '1 0 0%',
                marginRight: 'var(--ab-space-2)',
            } }, this.state.QueryBuildStatus == Enums_1.QueryBuildStatus.SelectFirstColumn ||
            this.state.QueryBuildStatus == Enums_1.QueryBuildStatus.SelectFurtherColumn ? (React.createElement("div", { style: { marginLeft: 2, marginRight: 2 } },
            this.state.QueryBuildStatus == Enums_1.QueryBuildStatus.SelectFirstColumn ? (React.createElement(HelpBlock_1.default, { marginBottom: 2, marginTop: 2 }, firstTimeText)) : (React.createElement(HelpBlock_1.default, { marginBottom: 2, marginTop: 2 }, secondTimeText)),
            this.state.ShowWaitingMessage ? (React.createElement(Waiting_1.Waiting, { WaitingMessage: "Retrieving Column Values..." })) : (React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.props.SelectedColumnId], ColumnList: this.props.ColumnsList, onColumnChange: function (columns) { return _this.onColumnSelectChange(columns); }, SelectionMode: Enums_1.SelectionMode.Single })))) : (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" }, selectedColumn && (React.createElement(React.Fragment, null, this.props.Adaptable.adaptableOptions.queryOptions.columnValuesOnlyInQueries ? (React.createElement(React.Fragment, null, this.state.ShowWaitingMessage ? (React.createElement(Waiting_1.Waiting, { WaitingMessage: "Retrieving Column Values..." })) : (React.createElement(ExpressionBuilderColumnValues_1.ExpressionBuilderColumnValues, { ColumnValues: this.state.ColumnRawValueDisplayValuePairs, SelectedValues: this.state.SelectedColumnDisplayValues, onColumnValuesChange: function (selectedValues) {
                return _this.onSelectedColumnValuesChange(selectedValues);
            } })))) : (React.createElement(React.Fragment, null,
            React.createElement(rebass_1.Box, { marginBottom: 2, marginTop: 2 },
                React.createElement(SimpleButton_1.default, { onClick: function () { return _this.onTabChanged(Enums_1.QueryTab.ColumnValue); }, marginRight: 2, tone: (firstSelected ? 'accent' : 'neutral'), variant: firstSelected ? 'raised' : 'outlined' }, "Column Values"),
                React.createElement(SimpleButton_1.default, { onClick: function () { return _this.onTabChanged(Enums_1.QueryTab.Filter); }, marginRight: 2, tone: (secondSelected ? 'accent' : 'neutral'), variant: secondSelected ? 'raised' : 'outlined' }, "Filters"),
                React.createElement(SimpleButton_1.default, { tone: thirdSelected ? 'accent' : 'neutral', onClick: function () { return _this.onTabChanged(Enums_1.QueryTab.QueryRange); }, variant: thirdSelected ? 'raised' : 'outlined' }, "Ranges")),
            firstSelected ? (React.createElement(React.Fragment, null, this.state.ShowWaitingMessage ? (React.createElement(Waiting_1.Waiting, { WaitingMessage: "Retrieving Column Values..." })) : (React.createElement(ExpressionBuilderColumnValues_1.ExpressionBuilderColumnValues, { ColumnValues: this.state.ColumnRawValueDisplayValuePairs, SelectedValues: this.state.SelectedColumnDisplayValues, onColumnValuesChange: function (selectedValues) {
                    return _this.onSelectedColumnValuesChange(selectedValues);
                } })))) : null,
            secondSelected ? (React.createElement(ExpressionBuilderUserFilter_1.ExpressionBuilderUserFilter, { AvailableSystemFilterNames: availableSystemFilterNames, AvailableUserFilterNames: availableUserFilterNames, AvailableNamedFilterNames: availableNamedFilterNames, SelectedFilterNames: this.state.SelectedFilterExpressions, onFilterNameChange: function (selectedValues) {
                    return _this.onSelectedFiltersChanged(selectedValues);
                } })) : null,
            thirdSelected ? (React.createElement(ExpressionBuilderRanges_1.ExpressionBuilderRanges, { SelectedColumn: selectedColumn, Ranges: this.state.SelectedColumnRanges, Columns: this.props.ColumnsList, onRangesChange: function (ranges) { return _this.onSelectedColumnRangesChange(ranges); } })) : null))))))));
    };
    ExpressionBuilderConditionSelector.prototype.onSelectTab = function () {
        // empty
    };
    ExpressionBuilderConditionSelector.prototype.onTabChanged = function (tab) {
        this.props.onSelectedColumnChange(this.props.SelectedColumnId, tab);
    };
    ExpressionBuilderConditionSelector.prototype.onSelectedColumnChanged = function () {
        this.props.onSelectedColumnChange('', Enums_1.QueryTab.ColumnValue);
    };
    ExpressionBuilderConditionSelector.prototype.onSelectedColumnRangesChange = function (selectedRanges) {
        var _this = this;
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        var colRangesExpression = this.props.Expression.RangeExpressions;
        var rangeExpression = null;
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(colRangesExpression)) {
            rangeExpression = colRangesExpression.find(function (x) { return x.ColumnId == _this.props.SelectedColumnId; });
        }
        if (rangeExpression) {
            if (selectedRanges.length == 0) {
                var keyValuePairIndex = colRangesExpression.findIndex(function (x) { return x.ColumnId == _this.props.SelectedColumnId; });
                colRangesExpression.splice(keyValuePairIndex, 1);
            }
            else {
                rangeExpression.Ranges = selectedRanges;
            }
        }
        else {
            colRangesExpression.push({ ColumnId: this.props.SelectedColumnId, Ranges: selectedRanges });
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { RangeExpressions: colRangesExpression }));
        this.setState({
            SelectedColumnRanges: selectedRanges,
        });
    };
    ExpressionBuilderConditionSelector.prototype.onSelectedColumnValuesChange = function (selectedColumnDisplayValues) {
        var _this = this;
        var colValuesExpression = this.props.Expression.ColumnValueExpressions;
        var columnRawValues = this.getRawValuesForDisplayValues(selectedColumnDisplayValues);
        var valuesCol = colValuesExpression.find(function (x) { return x.ColumnId == _this.props.SelectedColumnId; });
        if (valuesCol) {
            if (selectedColumnDisplayValues.length == 0) {
                var keyValuePairIndex = colValuesExpression.findIndex(function (x) { return x.ColumnId == _this.props.SelectedColumnId; });
                colValuesExpression.splice(keyValuePairIndex, 1);
            }
            else {
                valuesCol.ColumnDisplayValues = selectedColumnDisplayValues;
                valuesCol.ColumnRawValues = columnRawValues;
            }
        }
        else {
            colValuesExpression.push({
                ColumnId: this.props.SelectedColumnId,
                ColumnDisplayValues: selectedColumnDisplayValues,
                ColumnRawValues: columnRawValues,
            });
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { ColumnValueExpressions: colValuesExpression }));
        this.setState({
            SelectedColumnDisplayValues: selectedColumnDisplayValues,
        });
    };
    ExpressionBuilderConditionSelector.prototype.onSelectedFiltersChanged = function (selectedFilters) {
        var _this = this;
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        var colUserFilterExpression = this.props.Expression.FilterExpressions;
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(colUserFilterExpression)) {
            colUserFilterExpression = [];
        }
        var userFilterExpressionCol = colUserFilterExpression.find(function (x) { return x.ColumnId == _this.props.SelectedColumnId; });
        if (userFilterExpressionCol) {
            if (selectedFilters.length == 0) {
                var keyValuePairIndex = colUserFilterExpression.findIndex(function (x) { return x.ColumnId == _this.props.SelectedColumnId; });
                colUserFilterExpression.splice(keyValuePairIndex, 1);
            }
            else {
                userFilterExpressionCol.Filters = selectedFilters;
            }
        }
        else {
            colUserFilterExpression.push({
                ColumnId: this.props.SelectedColumnId,
                Filters: selectedFilters,
            });
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { FilterExpressions: colUserFilterExpression }));
        this.setState({
            SelectedFilterExpressions: selectedFilters,
        });
    };
    ExpressionBuilderConditionSelector.prototype.onColumnSelectChange = function (columns) {
        this.props.onSelectedColumnChange(columns.length > 0 ? columns[0].ColumnId : '', Enums_1.QueryTab.ColumnValue);
    };
    ExpressionBuilderConditionSelector.prototype.getRawValuesForDisplayValues = function (selectedColumnDisplayValues) {
        var _this = this;
        var columnRawValues = [];
        selectedColumnDisplayValues.forEach(function (scv) {
            var rawValueDisplayValuePair = _this.state.ColumnRawValueDisplayValuePairs.find(function (rvdv) { return rvdv.DisplayValue == scv; });
            if (rawValueDisplayValuePair) {
                columnRawValues.push(rawValueDisplayValuePair.RawValue);
            }
        });
        return columnRawValues;
    };
    return ExpressionBuilderConditionSelector;
}(React.Component));
exports.ExpressionBuilderConditionSelector = ExpressionBuilderConditionSelector;
