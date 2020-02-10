"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdvancedSearchRedux = require("../../Redux/ActionsReducers/AdvancedSearchRedux");
var ColumnFilterRedux = require("../../Redux/ActionsReducers/ColumnFilterRedux");
var UserFilterRedux = require("../../Redux/ActionsReducers/UserFilterRedux");
var QuickSearchRedux = require("../../Redux/ActionsReducers/QuickSearchRedux");
var DataSourceRedux = require("../../Redux/ActionsReducers/DataSourceRedux");
var GridRedux = require("../../Redux/ActionsReducers/GridRedux");
var StrategyConstants = require("../Constants/StrategyConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var AdaptableHelper_1 = require("../Helpers/AdaptableHelper");
var SearchService = /** @class */ (function () {
    function SearchService(adaptable) {
        var _this = this;
        this.adaptable = adaptable;
        this.adaptable.AdaptableStore.onAny(function (eventName) {
            if (_this.adaptable.isInitialised) {
                if (eventName == AdvancedSearchRedux.ADVANCED_SEARCH_ADD ||
                    eventName == AdvancedSearchRedux.ADVANCED_SEARCH_EDIT ||
                    eventName == AdvancedSearchRedux.ADVANCED_SEARCH_DELETE ||
                    eventName == AdvancedSearchRedux.ADVANCED_SEARCH_SELECT) {
                    _this.publishSearchChanged(Enums_1.SearchChangedTrigger.AdvancedSearch);
                }
                else if (eventName == ColumnFilterRedux.COLUMN_FILTER_ADD ||
                    eventName == ColumnFilterRedux.COLUMN_FILTER_EDIT ||
                    eventName == ColumnFilterRedux.COLUMN_FILTER_SET ||
                    eventName == ColumnFilterRedux.COLUMN_FILTER_CLEAR_ALL ||
                    eventName == ColumnFilterRedux.COLUMN_FILTER_CLEAR) {
                    setTimeout(function () { return _this.adaptable.applyGridFiltering(); }, 5);
                    _this.publishSearchChanged(Enums_1.SearchChangedTrigger.ColumnFilter);
                }
                else if (eventName == DataSourceRedux.DATA_SOURCE_SELECT ||
                    eventName == DataSourceRedux.DATA_SOURCE_ADD ||
                    eventName == DataSourceRedux.DATA_SOURCE_EDIT ||
                    eventName == DataSourceRedux.DATA_SOURCE_DELETE) {
                    _this.publishSearchChanged(Enums_1.SearchChangedTrigger.DataSource);
                }
                else if (eventName == QuickSearchRedux.QUICK_SEARCH_APPLY ||
                    eventName == QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY ||
                    eventName == QuickSearchRedux.QUICK_SEARCH_SET_STYLE) {
                    // if not highlighting cell then lets tell quick search strategy to create a range
                    if (_this.adaptable.api.quickSearchApi.getQuickSearchDisplayAction() !=
                        Enums_1.DisplayAction.HighlightCell) {
                        var quickSearchStrategy = _this.adaptable.strategies.get(StrategyConstants.QuickSearchStrategyId);
                        quickSearchStrategy.createQuickSearchRange();
                    }
                    _this.adaptable.applyGridFiltering();
                    _this.adaptable.redraw();
                    _this.publishSearchChanged(Enums_1.SearchChangedTrigger.QuickSearch);
                }
                else if (eventName == UserFilterRedux.USER_FILTER_ADD ||
                    eventName == UserFilterRedux.USER_FILTER_EDIT ||
                    eventName == UserFilterRedux.USER_FILTER_DELETE ||
                    eventName == UserFilterRedux.USER_FILTER_CREATE_FROM_COLUMN_FILTER) {
                    setTimeout(function () { return _this.adaptable.applyGridFiltering(); }, 5);
                    _this.publishSearchChanged(Enums_1.SearchChangedTrigger.UserFilter);
                }
                else if (eventName == GridRedux.GRID_SET_SORT) {
                    _this.publishSearchChanged(Enums_1.SearchChangedTrigger.Sort);
                }
            }
        });
    }
    /**
     * Each time any of the objects that make up search are changed (e.g. filters, quick search, advanced search, data sources etc.) we fire an event
     * This is primarily to help users who want to run search on the server and so need to know what has changed
     * @param searchChangedTrigger function that triggered the event
     */
    SearchService.prototype.publishSearchChanged = function (searchChangedTrigger) {
        if (this.adaptable.isInitialised) {
            var currentDataSource = this.adaptable.api.dataSourceApi.getCurrentDataSource();
            var currentAdvancedSearch = this.adaptable.api.advancedSearchApi.getCurrentAdvancedSearch();
            // lets get the searchstate
            var AdaptableSearchState = {
                dataSource: currentDataSource == null ? undefined : currentDataSource,
                advancedSearch: currentAdvancedSearch == null ? undefined : currentAdvancedSearch,
                quickSearch: this.adaptable.api.quickSearchApi.getQuickSearchValue(),
                columnFilters: this.adaptable.api.columnFilterApi.getAllColumnFilter(),
            };
            var AdaptableSortState = {
                columnSorts: this.adaptable.api.gridApi.getColumnSorts(),
                customSorts: this.adaptable.api.customSortApi.getAllCustomSort(),
            };
            var searchChangedInfo = {
                searchChangedTrigger: searchChangedTrigger,
                AdaptableSearchState: AdaptableSearchState,
                AdaptableSortState: AdaptableSortState,
                searchAsAtDate: new Date(),
            };
            var searchChangedArgs = AdaptableHelper_1.default.createFDC3Message('Search Changed Args', searchChangedInfo);
            this.adaptable.api.eventApi.emit('SearchChanged', searchChangedArgs);
        }
    };
    return SearchService;
}());
exports.SearchService = SearchService;
