"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var ColumnFilterRedux = require("../../../Redux/ActionsReducers/ColumnFilterRedux");
var UserFilterRedux = require("../../../Redux/ActionsReducers/UserFilterRedux");
var GridRedux = require("../../../Redux/ActionsReducers/GridRedux");
var PopupRedux = require("../../../Redux/ActionsReducers/PopupRedux");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var ListBoxFilterForm_1 = require("./ListBoxFilterForm");
var ButtonClose_1 = require("../Buttons/ButtonClose");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ButtonClear_1 = require("../Buttons/ButtonClear");
var Waiting_1 = require("./Waiting");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var ListBoxMenu_1 = require("./ListBoxMenu");
var FilterFormPanel_1 = require("../Panels/FilterFormPanel");
var ButtonSave_1 = require("../Buttons/ButtonSave");
var ObjectFactory_1 = require("../../../Utilities/ObjectFactory");
var HelpBlock_1 = require("../../../components/HelpBlock");
var styled_components_1 = require("styled-components");
var theme_1 = require("../../../theme");
var panelStyle = {
    width: 235,
};
var FilterFormComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FilterFormComponent, _super);
    function FilterFormComponent(props) {
        var _this = _super.call(this, props) || this;
        var existingColumnFilter = _this.props.ColumnFilters.find(function (cf) { return cf.ColumnId == _this.props.CurrentColumn.ColumnId; });
        if (!existingColumnFilter) {
            existingColumnFilter = ObjectFactory_1.ObjectFactory.CreateColumnFilter(_this.props.CurrentColumn.ColumnId, ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression());
        }
        _this.state = {
            ColumnValuePairs: [],
            ShowWaitingMessage: false,
            SelectedTab: Enums_1.ColumnMenuTab.Filter,
            DistinctCriteriaPairValue: Enums_1.DistinctCriteriaPairValue.DisplayValue,
            editedColumnFilter: existingColumnFilter,
        };
        return _this;
    }
    FilterFormComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.CurrentColumn.DataType != Enums_1.DataType.Boolean) {
            var columnValuePairs_1 = [];
            var existingColumnFilter_1 = this.props.ColumnFilters.find(function (cf) { return cf.ColumnId == _this.props.CurrentColumn.ColumnId; });
            if (!existingColumnFilter_1) {
                existingColumnFilter_1 = ObjectFactory_1.ObjectFactory.CreateColumnFilter(this.props.CurrentColumn.ColumnId, ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression());
            }
            if (this.props.Adaptable.adaptableOptions.queryOptions.getColumnValues != null) {
                this.setState({ ShowWaitingMessage: true });
                this.props.Adaptable.adaptableOptions.queryOptions
                    .getColumnValues(this.props.CurrentColumn.ColumnId)
                    .then(function (result) {
                    if (result == null) {
                        // if nothing returned then default to normal
                        columnValuePairs_1 = _this.props.Adaptable.getColumnValueDisplayValuePairDistinctList(_this.props.CurrentColumn.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue, false);
                        columnValuePairs_1 = ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, columnValuePairs_1, Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue]);
                        _this.setState({
                            ColumnValuePairs: columnValuePairs_1,
                            ShowWaitingMessage: false,
                            DistinctCriteriaPairValue: Enums_1.DistinctCriteriaPairValue.DisplayValue,
                            editedColumnFilter: existingColumnFilter_1,
                        });
                    }
                    else {
                        // get the distinct items and make sure within max items that can be displayed
                        var distinctItems = ArrayExtensions_1.ArrayExtensions.RetrieveDistinct(result.ColumnValues).slice(0, _this.props.Adaptable.adaptableOptions.queryOptions.maxColumnValueItemsDisplayed);
                        distinctItems.forEach(function (distinctItem) {
                            var displayValue = result.DistinctCriteriaPairValue == Enums_1.DistinctCriteriaPairValue.DisplayValue
                                ? _this.props.Adaptable.getDisplayValueFromRawValue(_this.props.CurrentColumn.ColumnId, distinctItem)
                                : distinctItem;
                            columnValuePairs_1.push({ RawValue: distinctItem, DisplayValue: displayValue });
                        });
                        var distinctCriteriaPairValue = result.DistinctCriteriaPairValue == Enums_1.DistinctCriteriaPairValue.RawValue
                            ? Enums_1.DistinctCriteriaPairValue.RawValue
                            : Enums_1.DistinctCriteriaPairValue.DisplayValue;
                        _this.setState({
                            ColumnValuePairs: columnValuePairs_1,
                            ShowWaitingMessage: false,
                            DistinctCriteriaPairValue: distinctCriteriaPairValue,
                            editedColumnFilter: existingColumnFilter_1,
                        });
                        // set the UIPermittedValues for this column to what has been sent
                        _this.props.Adaptable.api.userInterfaceApi.setColumnPermittedValues(_this.props.CurrentColumn.ColumnId, distinctItems);
                    }
                });
            }
            else {
                columnValuePairs_1 = this.props.Adaptable.getColumnValueDisplayValuePairDistinctList(this.props.CurrentColumn.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue, false);
                columnValuePairs_1 = ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, columnValuePairs_1, Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue]);
                this.setState({
                    ColumnValuePairs: columnValuePairs_1,
                    ShowWaitingMessage: false,
                    DistinctCriteriaPairValue: Enums_1.DistinctCriteriaPairValue.DisplayValue,
                    editedColumnFilter: existingColumnFilter_1,
                });
            }
        }
    };
    FilterFormComponent.prototype.render = function () {
        var _this = this;
        var isFilterable = this.isFilterable();
        // get user filter expressions appropriate for this column
        var appropriateFilters = this.props.Adaptable.FilterService.GetUserFiltersForColumn(this.props.CurrentColumn, this.props.UserFilters)
            .map(function (uf) { return uf.Name; })
            .concat(this.props.Adaptable.FilterService.GetNamedFiltersForColumn(this.props.CurrentColumn, this.props.NamedFilters, this.props.ColumnCategories).map(function (nf) { return nf.Name; }))
            .concat(this.props.Adaptable.FilterService.GetSystemFiltersForColumn(this.props.CurrentColumn, this.props.SystemFilters).map(function (sf) { return sf; })); //.filter(u => this.props.Adaptable.FilterService.ShowUserFilterForColumn(this.props.UserFilterState.UserFilters, u.Name, this.props.CurrentColumn));
        var appropriateFilterItems = appropriateFilters.map(function (uf) {
            return { RawValue: uf, DisplayValue: uf };
        });
        // populate any missing arrays
        if (this.state.editedColumnFilter && this.state.editedColumnFilter.Filter) {
            if (ArrayExtensions_1.ArrayExtensions.IsNull(this.state.editedColumnFilter.Filter.ColumnValueExpressions)) {
                this.state.editedColumnFilter.Filter.ColumnValueExpressions = [];
            }
            if (ArrayExtensions_1.ArrayExtensions.IsNull(this.state.editedColumnFilter.Filter.FilterExpressions)) {
                this.state.editedColumnFilter.Filter.FilterExpressions = [];
            }
            if (ArrayExtensions_1.ArrayExtensions.IsNull(this.state.editedColumnFilter.Filter.RangeExpressions)) {
                this.state.editedColumnFilter.Filter.RangeExpressions = [];
            }
        }
        var uiSelectedColumnValues = this.state.editedColumnFilter &&
            this.state.editedColumnFilter.Filter.ColumnValueExpressions.length > 0
            ? this.state.editedColumnFilter.Filter.ColumnValueExpressions[0].ColumnDisplayValues
            : [];
        var uiSelectedUserFilters = this.state.editedColumnFilter &&
            this.state.editedColumnFilter.Filter.FilterExpressions.length > 0
            ? this.state.editedColumnFilter.Filter.FilterExpressions[0].Filters
            : [];
        var uiSelectedRangeExpression = this.state.editedColumnFilter &&
            this.state.editedColumnFilter.Filter.RangeExpressions.length > 0
            ? this.state.editedColumnFilter.Filter.RangeExpressions[0].Ranges[0]
            : ExpressionHelper_1.ExpressionHelper.CreateEmptyRange();
        var leafExpressionOperators = this.getLeafExpressionOperatorsForDataType(this.props.CurrentColumn.DataType);
        var isEmptyFilter = uiSelectedColumnValues.length == 0 &&
            uiSelectedUserFilters.length == 0 &&
            ExpressionHelper_1.ExpressionHelper.IsEmptyRange(uiSelectedRangeExpression);
        var hasUserFilter = uiSelectedUserFilters.length > 0;
        var closeButton = (React.createElement(ButtonClose_1.ButtonClose, { onClick: function () { return _this.onCloseForm(); }, tooltip: null, AccessLevel: Enums_1.AccessLevel.Full }));
        var clearFilterButton = (React.createElement(ButtonClear_1.ButtonClear, { onClick: function () { return _this.onClearFilter(); }, disabled: isEmptyFilter, tooltip: null, AccessLevel: Enums_1.AccessLevel.Full }));
        var saveButton = (React.createElement(ButtonSave_1.ButtonSave, { onClick: function () { return _this.onSaveFilter(); }, disabled: isEmptyFilter || hasUserFilter, tooltip: 'Save as User Filter', AccessLevel: Enums_1.AccessLevel.Full }));
        var useVendorStyle = !!this.props.Adaptable.adaptableOptions.filterOptions
            .useVendorFilterFormStyle;
        return (React.createElement("div", null, StringExtensions_1.StringExtensions.IsNullOrEmpty(isFilterable) ? (React.createElement(FilterFormPanel_1.FilterFormPanel, { style: panelStyle, ColumnMenuTab: this.state.SelectedTab, ColumnMenuTabChanged: function (e) { return _this.onSelectTab(e); }, IsAlwaysFilter: this.props.EmbedColumnMenu, clearFilterButton: clearFilterButton, saveButton: saveButton, closeButton: closeButton, showCloseButton: this.props.ShowCloseButton, autoApplyFilter: this.props.Adaptable.adaptableOptions.filterOptions.autoApplyFilter ? true : false, useVendorStyle: useVendorStyle, applyFilterButtonDisabled: ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(this.state.editedColumnFilter.Filter), onFilterApplied: function () { return _this.onFilterApplied(); } }, this.state.SelectedTab == Enums_1.ColumnMenuTab.Menu ? (React.createElement(ListBoxMenu_1.ListBoxMenu, { MenuItems: this.props.MenuItems, onMenuItemClick: function (action) { return _this.onMenuItemClick(action); } })) : (React.createElement("div", null, this.state.ShowWaitingMessage ? (React.createElement(Waiting_1.Waiting, { WaitingMessage: "Retrieving Column Values..." })) : (React.createElement(ListBoxFilterForm_1.ListBoxFilterForm, { CurrentColumn: this.props.CurrentColumn, Columns: this.props.Columns, ColumnValuePairs: this.state.ColumnValuePairs, DataType: this.props.CurrentColumn.DataType, DistinctCriteriaPairValue: this.state.DistinctCriteriaPairValue, UiSelectedColumnValues: uiSelectedColumnValues, UiSelectedUserFilters: uiSelectedUserFilters, UiSelectedRange: uiSelectedRangeExpression, UserFilters: appropriateFilterItems, useVendorStyle: useVendorStyle, onColumnValueSelectedChange: function (list) { return _this.onClickColumValue(list); }, onUserFilterSelectedChange: function (list) { return _this.onClickUserFilter(list); }, Operators: leafExpressionOperators, onCustomRangeExpressionChange: function (range) { return _this.onSetCustomExpression(range); } })))))) : (React.createElement(HelpBlock_1.default, null, isFilterable))));
    };
    FilterFormComponent.prototype.isFilterable = function () {
        if (!this.props.CurrentColumn.Filterable) {
            return 'Column is not filterable';
        }
        return '';
    };
    FilterFormComponent.prototype.onSelectTab = function (tab) {
        this.setState({ SelectedTab: tab });
    };
    FilterFormComponent.prototype.getLeafExpressionOperatorsForDataType = function (dataType) {
        return ExpressionHelper_1.ExpressionHelper.GetOperatorsForDataType(dataType);
    };
    FilterFormComponent.prototype.onClickColumValue = function (columnValues) {
        var _this = this;
        var displayValues = [];
        var rawValues = [];
        columnValues.forEach(function (columnValue) {
            var columnValuePair = _this.state.DistinctCriteriaPairValue == Enums_1.DistinctCriteriaPairValue.DisplayValue
                ? _this.state.ColumnValuePairs.find(function (cvp) { return cvp.DisplayValue == columnValue; })
                : _this.state.ColumnValuePairs.find(function (cvp) { return cvp.RawValue == columnValue; });
            if (columnValuePair) {
                // might not be if previous filter is not in current list
                displayValues.push(columnValuePair.DisplayValue);
                rawValues.push(columnValuePair.RawValue);
            }
        });
        var userFilters = this.state.editedColumnFilter &&
            this.state.editedColumnFilter.Filter.FilterExpressions.length > 0
            ? this.state.editedColumnFilter.Filter.FilterExpressions[0].Filters
            : [];
        var rangeExpressions = this.state.editedColumnFilter &&
            this.state.editedColumnFilter.Filter.RangeExpressions.length > 0
            ? this.state.editedColumnFilter.Filter.RangeExpressions[0].Ranges
            : [];
        this.persistFilter(displayValues, rawValues, userFilters, rangeExpressions);
    };
    FilterFormComponent.prototype.onClickUserFilter = function (userFilters) {
        var columnDisplayValues = this.state.editedColumnFilter &&
            this.state.editedColumnFilter.Filter.ColumnValueExpressions.length > 0
            ? this.state.editedColumnFilter.Filter.ColumnValueExpressions[0].ColumnDisplayValues
            : [];
        var columnRawValues = this.state.editedColumnFilter &&
            this.state.editedColumnFilter.Filter.ColumnValueExpressions.length > 0
            ? this.state.editedColumnFilter.Filter.ColumnValueExpressions[0].ColumnRawValues
            : [];
        var rangeExpressions = this.state.editedColumnFilter &&
            this.state.editedColumnFilter.Filter.RangeExpressions.length > 0
            ? this.state.editedColumnFilter.Filter.RangeExpressions[0].Ranges
            : [];
        this.persistFilter(columnDisplayValues, columnRawValues, userFilters, rangeExpressions);
    };
    FilterFormComponent.prototype.onSetCustomExpression = function (rangeExpression) {
        var userFilters = this.state.editedColumnFilter &&
            this.state.editedColumnFilter.Filter.FilterExpressions.length > 0
            ? this.state.editedColumnFilter.Filter.FilterExpressions[0].Filters
            : [];
        var columnDisplayValues = this.state.editedColumnFilter &&
            this.state.editedColumnFilter.Filter.ColumnValueExpressions.length > 0
            ? this.state.editedColumnFilter.Filter.ColumnValueExpressions[0].ColumnDisplayValues
            : [];
        var columnRawValues = this.state.editedColumnFilter &&
            this.state.editedColumnFilter.Filter.ColumnValueExpressions.length > 0
            ? this.state.editedColumnFilter.Filter.ColumnValueExpressions[0].ColumnRawValues
            : [];
        if (rangeExpression == null) {
            this.persistFilter(columnDisplayValues, columnRawValues, userFilters, []);
        }
        else {
            this.persistFilter(columnDisplayValues, columnRawValues, userFilters, [rangeExpression]);
        }
    };
    FilterFormComponent.prototype.persistFilter = function (columnDisplayValues, columnRawValues, userFilters, rangeExpressions) {
        var expression;
        expression = ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(this.props.CurrentColumn.ColumnId, columnDisplayValues, columnRawValues, userFilters, rangeExpressions);
        var columnFilter = this.state.editedColumnFilter;
        columnFilter.Filter = expression;
        this.setState({
            editedColumnFilter: columnFilter,
        });
        //delete if empty
        if (columnDisplayValues.length == 0 &&
            columnRawValues.length == 0 &&
            userFilters.length == 0 &&
            rangeExpressions.length == 0) {
            this.props.onClearColumnFilter(columnFilter);
        }
        else {
            if (this.props.Adaptable.adaptableOptions.filterOptions.autoApplyFilter) {
                this.props.onSetColumnFilter(columnFilter);
            }
        }
    };
    FilterFormComponent.prototype.onSaveFilter = function () {
        var prompt = {
            Header: 'Enter name for User Filter',
            Msg: '',
            ConfirmAction: UserFilterRedux.CreateUserFilterFromColumnFilter(this.state.editedColumnFilter, ''),
        };
        this.props.onShowPrompt(prompt);
    };
    FilterFormComponent.prototype.onClearFilter = function () {
        this.persistFilter([], [], [], []);
    };
    FilterFormComponent.prototype.onFilterApplied = function () {
        // do some existing or real
        this.props.onAddColumnFilter(this.state.editedColumnFilter);
        this.props.onHideFilterForm();
    };
    FilterFormComponent.prototype.onCloseForm = function () {
        this.props.onHideFilterForm();
    };
    FilterFormComponent.prototype.onMenuItemClick = function (action) {
        this.props.onMenuItemClick(action);
        this.props.onHideFilterForm();
    };
    return FilterFormComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        CurrentColumn: ownProps.CurrentColumn,
        Adaptable: ownProps.Adaptable,
        Columns: state.Grid.Columns,
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        UserFilters: state.UserFilter.UserFilters,
        ColumnCategories: state.ColumnCategory.ColumnCategories,
        SystemFilters: state.SystemFilter.SystemFilters,
        NamedFilters: state.NamedFilter.NamedFilters,
        ShowCloseButton: ownProps.ShowCloseButton,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onMenuItemClick: function (action) { return dispatch(action); },
        onClearColumnFilter: function (columnFilter) {
            return dispatch(ColumnFilterRedux.ColumnFilterClear(columnFilter));
        },
        onAddColumnFilter: function (columnFilter) {
            return dispatch(ColumnFilterRedux.ColumnFilterAdd(columnFilter));
        },
        onEditColumnFilter: function (columnFilter) {
            return dispatch(ColumnFilterRedux.ColumnFilterEdit(columnFilter));
        },
        onSetColumnFilter: function (columnFilter) {
            return dispatch(ColumnFilterRedux.ColumnFilterSet(columnFilter));
        },
        onShowPrompt: function (prompt) { return dispatch(PopupRedux.PopupShowPrompt(prompt)); },
        onHideFilterForm: function () { return dispatch(GridRedux.FilterFormHide()); },
    };
}
exports.FilterForm = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FilterFormComponent);
exports.FilterFormReact = function (FilterContext) { return (React.createElement(react_redux_1.Provider, { store: FilterContext.Adaptable.AdaptableStore.TheStore },
    React.createElement(styled_components_1.ThemeProvider, { theme: theme_1.default },
        React.createElement(exports.FilterForm, { Adaptable: FilterContext.Adaptable, CurrentColumn: FilterContext.Column, TeamSharingActivated: false, EmbedColumnMenu: FilterContext.Adaptable.embedColumnMenu, ShowCloseButton: FilterContext.ShowCloseButton })))); };
