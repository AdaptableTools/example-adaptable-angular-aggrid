"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var all_modules_1 = require("@ag-grid-community/all-modules");
var ReactDOM = require("react-dom");
var React = require("react");
var _ = require("lodash");
var Emitter_1 = require("../Utilities/Emitter");
var AdaptableView_1 = require("../View/AdaptableView");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var StyleConstants = require("../Utilities/Constants/StyleConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var AdaptableStore_1 = require("../Redux/Store/AdaptableStore");
var SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
var AuditLogService_1 = require("../Utilities/Services/AuditLogService");
var StyleService_1 = require("../Utilities/Services/StyleService");
var CalendarService_1 = require("../Utilities/Services/CalendarService");
var DataService_1 = require("../Utilities/Services/DataService");
var ValidationService_1 = require("../Utilities/Services/ValidationService");
var ChartService_1 = require("../Utilities/Services/ChartService");
var FreeTextColumnService_1 = require("../Utilities/Services/FreeTextColumnService");
var CalculatedColumnExpressionService_1 = require("../Utilities/Services/CalculatedColumnExpressionService");
// components
var FilterWrapper_1 = require("./FilterWrapper");
var FloatingFilterWrapper_1 = require("./FloatingFilterWrapper");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var color_1 = require("../Utilities/color");
// Helpers
var ColumnHelper_1 = require("../Utilities/Helpers/ColumnHelper");
var ExpressionHelper_1 = require("../Utilities/Helpers/ExpressionHelper");
var LoggingHelper_1 = require("../Utilities/Helpers/LoggingHelper");
var StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var Helper_1 = require("../Utilities/Helpers/Helper");
var RangeHelper_1 = require("../Utilities/Helpers/RangeHelper");
var AdaptableApiImpl_1 = require("../Api/Implementation/AdaptableApiImpl");
var GeneralConstants_1 = require("../Utilities/Constants/GeneralConstants");
var agGridHelper_1 = require("./agGridHelper");
var AdaptableToolPanel_1 = require("../View/Components/ToolPanel/AdaptableToolPanel");
var ScheduleService_1 = require("../Utilities/Services/ScheduleService");
var SearchService_1 = require("../Utilities/Services/SearchService");
var ActionColumnRenderer_1 = require("./ActionColumnRenderer");
var DefaultSparklinesChartProperties_1 = require("../Utilities/Defaults/DefaultSparklinesChartProperties");
var AdaptableWizardView_1 = require("../View/AdaptableWizardView");
var Glue42Service_1 = require("../Utilities/Services/Glue42Service");
var ReportService_1 = require("../Utilities/Services/ReportService");
var PushPullService_1 = require("../Utilities/Services/PushPullService");
var StrategyService_1 = require("../Utilities/Services/StrategyService");
var LayoutService_1 = require("../Utilities/Services/LayoutService");
var FilterService_1 = require("../Utilities/Services/FilterService");
var DefaultAdaptableOptions_1 = require("../Utilities/Defaults/DefaultAdaptableOptions");
var AdaptableHelper_1 = require("../Utilities/Helpers/AdaptableHelper");
var all_modules_2 = require("@ag-grid-community/all-modules");
all_modules_2.ModuleRegistry.registerModules(all_modules_2.AllCommunityModules);
var RowNodeProto = all_modules_1.RowNode.prototype;
var RowNode_dispatchLocalEvent = RowNodeProto.dispatchLocalEvent;
/**
 * Since column definitions can be nested and have groups
 * we use this forEachColumn function to call the passed-in `fn`
 * which will be called with just ColDef (not ColGroupDef), so just column definitions, not group definitions
 */
var forEachColumn = function (cols, fn, parentColGroup) {
    cols.forEach(function (col, i, arr) {
        if (col.children) {
            forEachColumn(col.children, fn, col);
        }
        else {
            fn(col, i, arr, parentColGroup);
        }
    });
};
var Adaptable = /** @class */ (function () {
    // the 'old' constructor which takes an Adaptable adaptable object
    // this is still used internally but should not be used externally as a preference
    function Adaptable(adaptableOptions, renderGrid, runtimeConfig, _staticInit) {
        var _this = this;
        if (renderGrid === void 0) { renderGrid = true; }
        this.calculatedColumnPathMap = new Map();
        // only for our private / internal events used within Adaptable
        // public events are emitted through the EventApi
        this._on = function (eventName, callback) {
            return _this.emitter.on(eventName, callback);
        };
        this._emit = function (eventName, data) {
            return _this.emitter.emit(eventName, data);
        };
        // debounced methods
        this.debouncedSetColumnIntoStore = _.debounce(function () { return _this.setColumnIntoStore(); }, GeneralConstants_1.HALF_SECOND);
        this.debouncedSaveGridLayout = _.debounce(function () { return _this.saveGridLayout(); }, GeneralConstants_1.HALF_SECOND);
        this.debouncedSetSelectedCells = _.debounce(function () { return _this.setSelectedCells(); }, 250);
        this.debouncedSetSelectedRows = _.debounce(function () { return _this.setSelectedRows(); }, GeneralConstants_1.HALF_SECOND);
        this.debouncedFilterGrid = _.debounce(function () { return _this.applyGridFiltering(); }, GeneralConstants_1.HALF_SECOND);
        this.forEachColumn = function (fn) {
            forEachColumn(_this.getColumnDefs(), fn);
        };
        /**
         * This creates a clone of the current column definitions. If config.removeEmpty is true, will also remove empty column groups
         *
         */
        this.mapColumnDefs = function (fn, config) {
            config = config || { removeEmpty: false };
            var colDefs = tslib_1.__spread(_this.getColumnDefs());
            forEachColumn(colDefs, function (columnDef, i, colDefs, parentColGroup) {
                var result = fn(columnDef, i, colDefs);
                var parentArray = parentColGroup ? parentColGroup.children : colDefs;
                parentArray[i] = result;
                if (i === colDefs.length - 1 && config.removeEmpty) {
                    if (parentColGroup) {
                        parentColGroup.children = parentArray.filter(function (x) { return !!x; });
                    }
                }
            });
            if (config.removeEmpty) {
                colDefs = colDefs.filter(function (x) { return !!x; });
            }
            return colDefs;
        };
        this.getColumnDefs = function () {
            return _this.gridOptions.columnApi.columnController.columnDefs || [];
        };
        if (!_staticInit) {
            LoggingHelper_1.LoggingHelper.LogAdaptableWarning("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n!!!!!!! You should not use the \"Adaptable\" constructor directly, as it is deprecated and will not work in a future version!\n!!!!!!!\n!!!!!!! Use Adaptable.init(adaptableOptions) instead.\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
        this.emitter = new Emitter_1.default();
        this.renderGrid = renderGrid;
        // we create AdaptableOptions by merging the values provided by the user with the defaults (where no value has been set)
        this.adaptableOptions = AdaptableHelper_1.default.assignadaptableOptions(adaptableOptions);
        AdaptableHelper_1.default.CheckadaptableOptions(this.adaptableOptions);
        this.runtimeConfig = runtimeConfig;
        this.gridOptions = this.adaptableOptions.vendorGrid;
        if (this.gridOptions.allowContextMenuWithControlKey === undefined) {
            this.gridOptions.allowContextMenuWithControlKey = true;
        }
        this.vendorGridName = 'agGrid';
        this.embedColumnMenu = true;
        this.isInitialised = false;
        this.useRowNodeLookUp = false; // we will set later in instantiate if possible to be true
        this.forPlugins(function (plugin) { return plugin.afterInitOptions(_this, _this.adaptableOptions); });
        // get the api ready
        this.api = new AdaptableApiImpl_1.AdaptableApiImpl(this);
        this.forPlugins(function (plugin) { return plugin.afterInitApi(_this, _this.api); });
        // data source needs to be created before Audit Log Service
        this.DataService = new DataService_1.DataService(this);
        // the audit service needs to be created before the store
        this.AuditLogService = new AuditLogService_1.AuditLogService(this);
        // create the store
        this.initStore();
        // set up the helper
        this.agGridHelper = new agGridHelper_1.agGridHelper(this, this.gridOptions);
        // create the services
        this.CalendarService = new CalendarService_1.CalendarService(this);
        this.ValidationService = new ValidationService_1.ValidationService(this);
        this.StyleService = new StyleService_1.StyleService(this);
        this.ChartService = new ChartService_1.ChartService(this);
        this.FreeTextColumnService = new FreeTextColumnService_1.FreeTextColumnService(this);
        this.ScheduleService = new ScheduleService_1.ScheduleService(this);
        this.SearchService = new SearchService_1.SearchService(this);
        this.Glue42Service = new Glue42Service_1.Glue42Service(this);
        this.PushPullService = new PushPullService_1.PushPullService(this);
        this.ReportService = new ReportService_1.ReportService(this);
        this.LayoutService = new LayoutService_1.LayoutService(this);
        this.FilterService = new FilterService_1.FilterService(this);
        this.StrategyService = new StrategyService_1.StrategyService(this);
        this.CalculatedColumnExpressionService = new CalculatedColumnExpressionService_1.CalculatedColumnExpressionService(this, function (columnId, rowNode) { return _this.gridOptions.api.getValue(columnId, rowNode); });
        this.forPlugins(function (plugin) { return plugin.afterInitServices(_this); });
        // we prefer the grid to be NOT instantiated so that we can do it
        // perhaps in future we will force instantiation only?
        var isGridInstantiated = this.gridOptions.api && typeof this.gridOptions.api.getValue === 'function';
        if (!isGridInstantiated) {
            var canInstantiateGrid = this.tryInstantiateAgGrid();
            if (!canInstantiateGrid) {
                // we have no grid, we can't do anything
                LoggingHelper_1.LoggingHelper.LogAdaptableError('Unable to set up ag-Grid');
                return;
            }
        }
        // add our adaptable object to the grid options api object
        // this is VERY useful for when we need to access Adaptable inside of agGrid only functions
        if (this.gridOptions.api) {
            this.gridOptions.api.__adaptable = this;
        }
        // Set up strategies - we set up all the strategies suitable for the vendor grid
        // But users can make some hidden or readonly in their entitlements
        this.strategies = this.agGridHelper.setUpStrategies();
        this.forPlugins(function (plugin) { return plugin.afterInitStrategies(_this, _this.strategies); });
        // Load the store
        this.AdaptableStore.Load.then(function () { return _this.strategies.forEach(function (strat) { return strat.initializeWithRedux(); }); }, function (e) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError('Failed to Init AdaptableStore : ', e);
            // for now we initiliaze the strategies even if loading state has failed (perhaps revisit this?)
            _this.strategies.forEach(function (strat) { return strat.initializeWithRedux(); });
            _this.api.internalApi.hideLoadingScreen(); // doesnt really help but at least clears the screen
        })
            .then(function () { return _this.initInternalGridLogic(); }, function (e) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError('Failed to Init Strategies : ', e);
            // for now we initiliaze the grid even if initialising strategies has failed (perhaps revisit this?)
            _this.initInternalGridLogic();
            _this.api.internalApi.hideLoadingScreen(); // doesnt really help but at least clears the screen
        })
            .then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.applyFinalRendering();
                this.isInitialised = true;
                this.api.internalApi.hideLoadingScreen();
                return [2 /*return*/];
            });
        }); });
        // render Adaptable - might be false because for example the react wrapper will skip rendering
        // as it will do rendering by itself
        if (renderGrid) {
            if (this.abContainerElement == null) {
                this.abContainerElement = this.getadaptableContainerElement();
            }
            if (this.abContainerElement != null) {
                this.abContainerElement.innerHTML = '';
                ReactDOM.render(AdaptableView_1.AdaptableApp({ Adaptable: this }), this.abContainerElement);
            }
        }
        // create debounce methods that take a time based on user settings
        this.throttleOnDataChangedUser = _.throttle(this.applyDataChange, this.adaptableOptions.filterOptions.filterActionOnUserDataChange.ThrottleDelay);
        this.throttleOnDataChangedExternal = _.throttle(this.applyDataChange, this.adaptableOptions.filterOptions.filterActionOnExternalDataChange.ThrottleDelay);
    }
    // new static constructor which takes an Adaptable adaptable object and returns the api object
    // going forward this should be the only way that we instantiate and use Adaptable and everything should be accessible via the API
    Adaptable.init = function (adaptableOptions) {
        var extraOptions = {
            renderGrid: undefined,
            runtimeConfig: null,
        };
        if (Array.isArray(adaptableOptions.plugins)) {
            adaptableOptions.plugins.forEach(function (plugin) {
                plugin.beforeInit(adaptableOptions, extraOptions);
            });
        }
        var ab = new Adaptable(adaptableOptions, extraOptions.renderGrid, extraOptions.runtimeConfig, true);
        if (Array.isArray(adaptableOptions.plugins)) {
            adaptableOptions.plugins.forEach(function (plugin) {
                plugin.afterInit(ab);
            });
        }
        return ab.api;
    };
    Adaptable.prototype.forPlugins = function (callback) {
        if (Array.isArray(this.adaptableOptions.plugins)) {
            this.adaptableOptions.plugins.forEach(function (plugin) {
                callback(plugin);
            });
        }
    };
    Adaptable.prototype.lookupPlugins = function (propertyName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var plugins = this.adaptableOptions.plugins || [];
        for (var i = 0, len = plugins.length; i < len; i++) {
            var plugin = plugins[i];
            if (plugin.hasProperty(propertyName)) {
                return plugin.getProperty(propertyName).apply(void 0, tslib_1.__spread(args));
            }
        }
    };
    Adaptable.prototype.initStore = function () {
        var _this = this;
        this.AdaptableStore = new AdaptableStore_1.AdaptableStore(this);
        this.forPlugins(function (plugin) { return plugin.afterInitStore(_this, _this.AdaptableStore); });
        this.AdaptableStore.onAny(function (eventName, data) {
            _this.forPlugins(function (plugin) { return plugin.onStoreEvent(eventName, data, _this.AdaptableStore); });
            if (eventName == AdaptableStore_1.INIT_STATE) {
                // and reset state also?
                _this.forPlugins(function (plugin) { return plugin.onAdaptableReady(_this, _this.adaptableOptions); });
                _this.api.eventApi.emit('AdaptableReady', {
                    adaptableApi: _this.api,
                    vendorGrid: _this.adaptableOptions.vendorGrid,
                });
            }
        });
    };
    Adaptable.prototype.tryInstantiateAgGrid = function () {
        var vendorContainer = this.getGridContainerElement();
        if (!vendorContainer) {
            LoggingHelper_1.LoggingHelper.LogAdaptableError('You must provide an element id in `containerOptions.vendorContainer`');
            return false;
        }
        // set up whether we use the getRowNode method or loop when finding a rowNode (former is preferable)
        // can only do that here as the gridOptions not yet set up
        this.useRowNodeLookUp = this.agGridHelper.TrySetUpNodeIds();
        // Create Adaptable adaptable Tool Panel
        if (this.adaptableOptions.userInterfaceOptions.showAdaptableToolPanel) {
            LoggingHelper_1.LoggingHelper.LogAdaptableInfo('Adding Adaptable Tool Panel');
            this.gridOptions.sideBar = this.gridOptions.sideBar || {};
            this.gridOptions.components = this.gridOptions.components || {};
            // https://www.ag-grid.com/javascript-grid-side-bar/
            if (this.gridOptions.sideBar) {
                var sidebar = this.gridOptions.sideBar;
                if (sidebar === true) {
                    // Possibility 1: Sidebar is true - meaning that they want the default filter and columns, so create both:
                    this.gridOptions.sideBar = this.agGridHelper.createAdaptableSideBarDefs(true, true);
                }
                else if (sidebar === 'columns') {
                    // Possibility 2: Sidebar is 'columns' (string) - meaning column only so create just that
                    this.gridOptions.sideBar = this.agGridHelper.createAdaptableSideBarDefs(false, true);
                }
                else if (sidebar === 'filters') {
                    // Possibility 3: Sidebar is 'filters' (string) - meaning filters only so create just that
                    this.gridOptions.sideBar = this.agGridHelper.createAdaptableSideBarDefs(true, false);
                }
                else {
                    // Possibilty 4: either no sidebar or they created their own; in either case, should add adaptable Tool panel
                    var sidebarDef = this.gridOptions.sideBar;
                    if (sidebarDef) {
                        sidebarDef.toolPanels = sidebarDef.toolPanels || [];
                        sidebarDef.toolPanels.push(this.agGridHelper.createAdaptableToolPanel());
                    }
                }
                var toolpanelContext = { Adaptable: this };
                this.gridOptions.components.AdaptableToolPanel = AdaptableToolPanel_1.AdaptableToolPanelBuilder(toolpanelContext);
            }
        }
        // now create the grid itself - we have to do it this way as previously when we instantiated the Grid 'properly' it got created as J.Grid
        var grid;
        var modules = (this.adaptableOptions.vendorGrid || {}).modules || [];
        delete this.gridOptions.modules;
        if (this.runtimeConfig && this.runtimeConfig.instantiateGrid) {
            grid = this.runtimeConfig.instantiateGrid(vendorContainer, this.gridOptions, { modules: modules });
        }
        else {
            grid = new all_modules_1.Grid(vendorContainer, this.gridOptions, { modules: modules });
        }
        return grid != null;
    };
    Adaptable.prototype.filterOnUserDataChange = function (rowNodes) {
        if (this.adaptableOptions.filterOptions.filterActionOnUserDataChange.RunFilter ==
            Enums_1.FilterOnDataChangeOptions.Always) {
            this.applyDataChange(rowNodes);
        }
        else if (this.adaptableOptions.filterOptions.filterActionOnUserDataChange.RunFilter ==
            Enums_1.FilterOnDataChangeOptions.Throttle) {
            this.throttleOnDataChangedUser(rowNodes);
        }
    };
    Adaptable.prototype.filterOnExternalDataChange = function (rowNodes) {
        if (this.adaptableOptions.filterOptions.filterActionOnExternalDataChange.RunFilter ==
            Enums_1.FilterOnDataChangeOptions.Always) {
            this.applyDataChange(rowNodes);
        }
        else if (this.adaptableOptions.filterOptions.filterActionOnExternalDataChange.RunFilter ==
            Enums_1.FilterOnDataChangeOptions.Throttle) {
            this.throttleOnDataChangedExternal(rowNodes);
        }
    };
    Adaptable.prototype.createFilterWrapper = function (col) {
        this.gridOptions.api.destroyFilter(col);
        this.gridOptions.api.getColumnDef(col).filter = FilterWrapper_1.FilterWrapperFactory(this);
        col.initialise();
    };
    Adaptable.prototype.createQuickFilterWrapper = function (col) {
        var vendorColDef = this.gridOptions.api.getColumnDef(col);
        if (vendorColDef) {
            vendorColDef.floatingFilterComponentParams = {
                suppressFilterButton: false,
            };
            vendorColDef.floatingFilterComponent = FloatingFilterWrapper_1.FloatingFilterWrapperFactory(this);
        }
    };
    Adaptable.prototype.reloadGrid = function () {
        this._emit('GridReloaded');
    };
    Adaptable.prototype.applyGridFiltering = function () {
        this.gridOptions.api.onFilterChanged();
        this._emit('SearchApplied');
        this._emit('GridFiltered');
        this.setSelectedCells();
        this.setSelectedRows();
    };
    Adaptable.prototype.applyDataChange = function (rowNodes) {
        var _this = this;
        var itemsToUpdate = rowNodes
            .filter(function (node) { return !_this.isGroupRowNode(node); })
            .filter(function (rowNode) { return _this.isDataInModel(rowNode); })
            .map(function (rowNode) {
            return rowNode.data;
        });
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(itemsToUpdate)) {
            this.gridOptions.api.updateRowData({ update: itemsToUpdate });
        }
    };
    Adaptable.prototype.isGroupRowNode = function (rowNode) {
        if (!rowNode) {
            return false;
        }
        if (rowNode.isEmptyRowGroupNode()) {
            return true;
        }
        if (rowNode.group && rowNode.group === true) {
            return true;
        }
        if (rowNode.leafGroup && rowNode.leafGroup === true) {
            return true;
        }
        return false;
    };
    Adaptable.prototype.isDataInModel = function (rowNode) {
        if (!rowNode) {
            return false;
        }
        var data = rowNode.data[this.adaptableOptions.primaryKey];
        if (!data) {
            return false;
        }
        return this.getRowNodeForPrimaryKey(data) ? true : false;
    };
    Adaptable.prototype.isPinnedRowNode = function (rowNode) {
        if (!rowNode) {
            return false;
        }
        if (rowNode.isRowPinned()) {
            return true;
        }
        return false;
    };
    Adaptable.prototype.clearGridFiltering = function () {
        this.gridOptions.columnApi.getAllColumns().forEach(function (c) {
            c.setFilterActive(false);
        });
    };
    Adaptable.prototype.clearColumnFiltering = function (columnIds) {
        var _this = this;
        columnIds.forEach(function (c) {
            var column = _this.gridOptions.columnApi
                .getAllColumns()
                .find(function (col) { return col.getColId() == c; });
            if (column) {
                column.setFilterActive(false);
            }
        });
    };
    Adaptable.prototype.hideFilterForm = function () {
        if (this.hideFilterFormPopup) {
            this.hideFilterFormPopup();
        }
    };
    Adaptable.prototype.setNewColumnListOrder = function (VisibleColumnList) {
        var _this = this;
        var allColumns = this.gridOptions.columnApi.getAllGridColumns();
        var startIndex = 0;
        if (this.api.internalApi.isGridInPivotMode()) {
            return;
        }
        //  this is not quite right as it assumes that only the first column can be grouped
        //  but lets do this for now and then refine and refactor later to deal with weirder use cases
        if (ColumnHelper_1.ColumnHelper.isSpecialColumn(allColumns[0].getColId())) {
            startIndex++;
        }
        VisibleColumnList.forEach(function (column, index) {
            var col = _this.gridOptions.columnApi.getColumn(column.ColumnId);
            if (!col) {
                LoggingHelper_1.LoggingHelper.LogAdaptableError("Cannot find vendor column:" + column.ColumnId);
            }
            else {
                if (!col.isVisible()) {
                    _this.setColumnVisible(_this.gridOptions.columnApi, col, true, 'api');
                }
                _this.moveColumn(_this.gridOptions.columnApi, col, startIndex + index, 'api');
            }
        });
        allColumns
            .filter(function (x) { return VisibleColumnList.findIndex(function (y) { return y.ColumnId == x.getColId(); }) < 0; })
            .forEach(function (col) {
            _this.setColumnVisible(_this.gridOptions.columnApi, col, false, 'api');
        });
        // we need to do this to make sure agGrid and adaptable column collections are in sync
        this.setColumnIntoStore();
    };
    Adaptable.prototype.setColumnIntoStore = function () {
        var _this = this;
        // if pivotnig and we have 'special' columns as a result then do nothing ...
        if (this.gridOptions.columnApi.isPivotMode()) {
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.gridOptions.columnApi.getPivotColumns())) {
                return;
            }
        }
        var allColumns = [];
        var existingColumns = this.api.gridApi.getColumns();
        var vendorCols = this.gridOptions.columnApi.getAllGridColumns();
        vendorCols.forEach(function (vendorColumn) {
            var colId = vendorColumn.getColId();
            if (!ColumnHelper_1.ColumnHelper.isSpecialColumn(colId)) {
                var existingColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(colId, existingColumns);
                if (existingColumn) {
                    existingColumn.Visible = vendorColumn.isVisible();
                    if (existingColumn.DataType == Enums_1.DataType.Unknown) {
                        existingColumn.DataType = _this.agGridHelper.getColumnDataType(vendorColumn);
                    }
                }
                else {
                    existingColumn = _this.createAdaptableColumn(vendorColumn);
                }
                allColumns.push(existingColumn);
            }
        });
        this.api.internalApi.setColumns(allColumns);
        // Save the layout if required
        this.LayoutService.autoSaveLayout();
    };
    Adaptable.prototype.createAdaptableColumn = function (vendorColumn) {
        var abColumn = this.agGridHelper.createAdaptableColumnFromVendorColumn(vendorColumn);
        this.applyStylingToColumn(vendorColumn, abColumn);
        return abColumn;
    };
    Adaptable.prototype.applyStylingToColumn = function (vendorColumn, abColumn) {
        if (vendorColumn.getColDef().filter &&
            this.adaptableOptions.filterOptions.useAdaptableFilterForm) {
            this.createFilterWrapper(vendorColumn);
        }
        if (this.isQuickFilterActive()) {
            this.createQuickFilterWrapper(vendorColumn);
        }
        var quickSearchClassName = this.getQuickSearchClassName();
        if (abColumn == null) {
            abColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(vendorColumn.getColId(), this.api.gridApi.getColumns());
        }
        if (abColumn) {
            this.addQuickSearchStyleToColumn(abColumn, quickSearchClassName);
        }
    };
    Adaptable.prototype.safeSetColDefs = function (colDefs) {
        var _this = this;
        // bizarrely we need this line otherwise ag-Grid mangles the ColIds (e.g. 'tradeId' becomes 'tradeId_1')
        this.gridOptions.api.setColumnDefs([]);
        this.gridOptions.api.setColumnDefs(colDefs);
        var vendorCols = this.gridOptions.columnApi.getAllGridColumns();
        vendorCols.forEach(function (vendorColumn) {
            var abColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(vendorColumn.getColId(), _this.api.gridApi.getColumns());
            _this.applyStylingToColumn(vendorColumn, abColumn);
        });
        this.redraw();
    };
    Adaptable.prototype.getQuickSearchClassName = function () {
        var quickSearchClassName = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.api.quickSearchApi.getQuickSearchStyle().ClassName)
            ? this.api.quickSearchApi.getQuickSearchStyle().ClassName
            : this.StyleService.CreateStyleName(StrategyConstants.QuickSearchStrategyId);
        return quickSearchClassName;
    };
    Adaptable.prototype.addQuickSearchStyleToColumn = function (col, quickSearchClassName) {
        var adaptable = this;
        var cellClassRules = {};
        cellClassRules[quickSearchClassName] = function (params) {
            if (params.node && !params.node.group) {
                var columnId = params.colDef.field ? params.colDef.field : params.colDef.colId;
                var quickSearchState = adaptable.api.quickSearchApi.getQuickSearchState();
                if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText) &&
                    (quickSearchState.DisplayAction == Enums_1.DisplayAction.HighlightCell ||
                        quickSearchState.DisplayAction == Enums_1.DisplayAction.ShowRowAndHighlightCell)) {
                    if (col.IsExcludedFromQuickSearch) {
                        return false;
                    }
                    //  let excludeColumnFromQuickSearch = adaptable.adaptableOptions.searchOptions!
                    //      .excludeColumnFromQuickSearch;
                    //    if (excludeColumnFromQuickSearch) {
                    //      if (excludeColumnFromQuickSearch(col)) {
                    //   return false;
                    //      }
                    //    }
                    var range = RangeHelper_1.RangeHelper.CreateValueRangeFromOperand(quickSearchState.QuickSearchText);
                    if (range) {
                        // not right but just checking...
                        if (RangeHelper_1.RangeHelper.IsColumnAppropriateForRange(range, col)) {
                            var expression = ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(columnId, null, null, null, [range]);
                            if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRowNode(expression, params.node, [col], adaptable)) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        this.setCellClassRules(cellClassRules, col.ColumnId, 'QuickSearch');
    };
    Adaptable.prototype.createFunctionMenu = function () {
        var menuItems = [];
        this.strategies.forEach(function (strat) {
            strat.setStrategyEntitlement();
            var menuItem = strat.addFunctionMenuItem();
            if (Helper_1.Helper.objectExists(menuItem)) {
                if (menuItems.findIndex(function (m) { return m.FunctionName == menuItem.FunctionName; }) == -1) {
                    menuItems.push(menuItem);
                }
            }
        });
        // store the main menu as we will re-use (and it never changes)
        this.api.internalApi.setMainMenuItems(menuItems);
    };
    Adaptable.prototype.getPrimaryKeyValueFromRowNode = function (rowNode) {
        return this.gridOptions.api.getValue(this.adaptableOptions.primaryKey, rowNode);
    };
    Adaptable.prototype.gridHasCurrentEditValue = function () {
        if (this._currentEditor) {
            return true;
        }
        return false;
    };
    Adaptable.prototype.getCurrentCellEditValue = function () {
        // TODO: Jo: This is a workaround as we are accessing private members of agGrid.
        // Currently used by Shortcut to get the current edit value - is there a better way?
        if (this._currentEditor) {
            return this._currentEditor.getValue();
        }
        return '';
    };
    // this is only used by Shortcut
    Adaptable.prototype.getActiveCell = function () {
        var activeCell = this.gridOptions.api.getFocusedCell();
        if (activeCell) {
            var rowNode = this.gridOptions.api.getModel().getRow(activeCell.rowIndex);
            // if the selected cell is from a group cell we don't return it
            // that's a design choice as this is used only when editing and you cant edit those cells
            if (rowNode && !this.isGroupRowNode(rowNode)) {
                return {
                    columnId: activeCell.column.getColId(),
                    primaryKeyValue: this.getPrimaryKeyValueFromRowNode(rowNode),
                    rawValue: this.getRawValueFromRowNode(rowNode, activeCell.column.getColId()),
                    displayValue: this.getDisplayValueFromRowNode(rowNode, activeCell.column.getColId()),
                };
            }
        }
    };
    Adaptable.prototype.saveGridLayout = function () {
        if (this.adaptableOptions.layoutOptions != null &&
            this.adaptableOptions.layoutOptions.includeVendorStateInLayouts != null &&
            this.adaptableOptions.layoutOptions.includeVendorStateInLayouts) {
            this.LayoutService.autoSaveLayout();
        }
    };
    // This method returns selected cells ONLY (if selection mode is cells or multiple cells).
    // If the selection mode is row it will returns nothing - use the setSelectedRows() method
    Adaptable.prototype.setSelectedCells = function () {
        var _this = this;
        var selected = this.gridOptions.api.getCellRanges();
        var columns = [];
        var selectedCells = [];
        if (this.api.internalApi.isGridInPivotMode()) {
            //  LoggingHelper.LogAdaptableWarning(
            //    'cannot currently perform cell selection in pivot mode'
            //  );
            return;
        }
        if (selected) {
            // we iterate for each ranges
            selected.forEach(function (rangeSelection, index) {
                var e_1, _a;
                var shouldIncludeRange = true;
                var isStartRowPin = rangeSelection.startRow.rowPinned != null;
                var isEndRowPin = rangeSelection.endRow.rowPinned != null;
                // Warn user if trying to select pinned rows
                // If only selecting pinned rows then stop
                if (isStartRowPin) {
                    if (isEndRowPin) {
                        shouldIncludeRange = false;
                    }
                    LoggingHelper_1.LoggingHelper.LogWarning('Cannot select pinned rows in ag-Grid.');
                }
                if (shouldIncludeRange) {
                    var y1 = Math.min(rangeSelection.startRow.rowIndex, rangeSelection.endRow.rowIndex);
                    var y2 = Math.max(rangeSelection.startRow.rowIndex, rangeSelection.endRow.rowIndex);
                    var _loop_1 = function (column) {
                        if (column != null) {
                            var colId = column.getColId();
                            var selectedColumn_1 = ColumnHelper_1.ColumnHelper.getColumnFromId(colId, _this.api.gridApi.getColumns());
                            if (selectedColumn_1 &&
                                columns.find(function (c) { return c.ColumnId == selectedColumn_1.ColumnId; }) == null) {
                                columns.push(selectedColumn_1);
                            }
                            for (var rowIndex = y1; rowIndex <= y2; rowIndex++) {
                                var rowNode = _this.gridOptions.api.getModel().getRow(rowIndex);
                                // we used NOT to return grouped rows but I think that was wrong - if someone wants to return them then that is up to them...
                                // we definitely dont return pinned rows as they cannot be selected
                                if (rowNode && !_this.isPinnedRowNode(rowNode)) {
                                    var primaryKey = _this.getPrimaryKeyValueFromRowNode(rowNode);
                                    // const value = this.gridOptions.api!.getValue(column, rowNode);
                                    var selectedCell = {
                                        columnId: colId,
                                        rawValue: _this.getRawValueFromRowNode(rowNode, colId),
                                        displayValue: _this.getDisplayValueFromRowNode(rowNode, colId),
                                        primaryKeyValue: primaryKey,
                                    };
                                    selectedCells.push(selectedCell);
                                }
                            }
                        }
                    };
                    try {
                        for (var _b = tslib_1.__values(rangeSelection.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var column = _c.value;
                            _loop_1(column);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            });
        }
        var selectedCellInfo = { Columns: columns, GridCells: selectedCells };
        this.api.internalApi.setSelectedCells(selectedCellInfo);
        this._emit('CellsSelected');
        this.agGridHelper.fireSelectionChangedEvent();
    };
    Adaptable.prototype.setSelectedRows = function () {
        var _this = this;
        var nodes = this.gridOptions.api.getSelectedNodes();
        var selectedRows = [];
        if (this.gridOptions.columnApi.isPivotMode()) {
            //  dont perform row selection in pivot mode
            return;
        }
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(nodes)) {
            nodes.forEach(function (node) {
                var rowInfo = {
                    isMaster: !!(node.master != null && node.master == true),
                    isExpanded: !!(node.expanded != null && node.expanded == true),
                    isGroup: !!(node.group != null && node.group == true),
                    level: node.level,
                };
                var gridRow = {
                    primaryKeyValue: _this.getPrimaryKeyValueFromRowNode(node),
                    rowData: node.data,
                    rowInfo: rowInfo,
                };
                selectedRows.push(gridRow);
            });
        }
        var selectedRowInfo = { GridRows: selectedRows };
        this.api.internalApi.setSelectedRows(selectedRowInfo);
        this._emit('RowsSelected');
        this.agGridHelper.fireSelectionChangedEvent();
    };
    Adaptable.prototype.setValue = function (dataChangedInfo, internalUpdate) {
        var _this = this;
        var newValue;
        var dataType = ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(dataChangedInfo.ColumnId, this.api.gridApi.getColumns());
        newValue =
            dataType == Enums_1.DataType.Number ? Number(dataChangedInfo.NewValue) : dataChangedInfo.NewValue;
        if (dataChangedInfo.RowNode) {
            dataChangedInfo.RowNode.setDataValue(dataChangedInfo.ColumnId, newValue);
        }
        else {
            if (this.useRowNodeLookUp) {
                var rowNode = this.gridOptions.api.getRowNode(dataChangedInfo.PrimaryKeyValue);
                if (rowNode != null) {
                    rowNode.setDataValue(dataChangedInfo.ColumnId, newValue);
                    dataChangedInfo.RowNode = rowNode;
                }
            }
            else {
                var isUpdated_1 = false;
                // prefer not to use this method but if we do then at least we can prevent further lookups once we find
                this.gridOptions.api.getModel().forEachNode(function (rowNode) {
                    if (!isUpdated_1) {
                        if (dataChangedInfo.PrimaryKeyValue == _this.getPrimaryKeyValueFromRowNode(rowNode)) {
                            //  dataChangedInfo = this.updateValue(gridCell, rowNode);
                            rowNode.setDataValue(dataChangedInfo.ColumnId, newValue);
                            dataChangedInfo.RowNode = rowNode;
                            isUpdated_1 = true;
                        }
                    }
                });
            }
        }
        // its from a function so we want to update user filter but not external
        this.performPostEditChecks(dataChangedInfo, internalUpdate, !internalUpdate);
        if (internalUpdate) {
            this.agGridHelper.reselectSelectedCells();
        }
    };
    Adaptable.prototype.cancelEdit = function () {
        this.gridOptions.api.stopEditing(true);
    };
    Adaptable.prototype.getRowNodeIsSatisfiedFunction = function (id, distinctCriteria) {
        var _this = this;
        if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.RawValue) {
            var rowNode_1;
            if (this.useRowNodeLookUp) {
                rowNode_1 = this.gridOptions.api.getRowNode(id);
            }
            else {
                var foundRow_1 = false;
                this.gridOptions.api.getModel().forEachNode(function (node) {
                    if (!foundRow_1 && id == _this.getPrimaryKeyValueFromRowNode(node)) {
                        rowNode_1 = node;
                        foundRow_1 = true;
                    }
                });
            }
            return function (columnId) { return _this.gridOptions.api.getValue(columnId, rowNode_1); };
        }
        return function (columnId) { return _this.getDisplayValue(id, columnId); };
    };
    Adaptable.prototype.getRowNodeIsSatisfiedFunctionFromRowNode = function (rowwNode, distinctCriteria) {
        var _this = this;
        if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.RawValue) {
            var testreturnvalue = function (columnId) {
                return _this.gridOptions.api.getValue(columnId, rowwNode);
            };
            return testreturnvalue;
        }
        return function (columnId) { return _this.getDisplayValueFromRowNode(rowwNode, columnId); };
    };
    Adaptable.prototype.setCustomSort = function (columnId, comparer) {
        var sortModel = this.gridOptions.api.getSortModel();
        var columnDef = this.gridOptions.api.getColumnDef(columnId);
        if (columnDef) {
            columnDef.comparator = comparer;
        }
        this.gridOptions.api.setSortModel(sortModel);
    };
    Adaptable.prototype.removeCustomSort = function (columnId) {
        var sortModel = this.gridOptions.api.getSortModel();
        var columnDef = this.gridOptions.api.getColumnDef(columnId);
        if (columnDef) {
            columnDef.comparator = null;
        }
        this.gridOptions.api.setSortModel(sortModel);
    };
    Adaptable.prototype.getColumnValueDisplayValuePairDistinctList = function (columnId, distinctCriteria, visibleRowsOnly) {
        var _this = this;
        var returnMap = new Map();
        // check if there are permitted column values for that column
        // NB.  this currently contains a small bug as we dont check for visibility so if using permitted values then ALL are returned :(
        var permittedValuesForColumn = this.api.userInterfaceApi.getPermittedValuesForColumn(columnId);
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(permittedValuesForColumn)) {
            permittedValuesForColumn.forEach(function (pv) {
                returnMap.set(pv, { RawValue: pv, DisplayValue: pv });
            });
        }
        else {
            var useRawValue_1 = this.useRawValueForColumn(columnId);
            if (visibleRowsOnly) {
                this.gridOptions.api.forEachNodeAfterFilter(function (rowNode) {
                    _this.addDistinctColumnValue(rowNode, columnId, useRawValue_1, distinctCriteria, returnMap);
                });
            }
            else {
                this.gridOptions.api.forEachNode(function (rowNode) {
                    _this.addDistinctColumnValue(rowNode, columnId, useRawValue_1, distinctCriteria, returnMap);
                });
            }
        }
        return Array.from(returnMap.values()).slice(0, this.adaptableOptions.queryOptions.maxColumnValueItemsDisplayed);
    };
    Adaptable.prototype.getColumnValueDisplayValuePairList = function (columnId, visibleRowsOnly, onlyIncludeIds) {
        var _this = this;
        var returnArray = [];
        var permittedMap = new Map();
        // check if there are permitted column values for that column
        // NB.  this currently contains a small bug as we dont check for visibility so if using permitted values then ALL are returned :(
        var permittedValuesForColumn = this.api.userInterfaceApi.getPermittedValuesForColumn(columnId);
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(permittedValuesForColumn)) {
            permittedValuesForColumn.forEach(function (pv) {
                permittedMap.set(pv, { RawValue: pv, DisplayValue: pv });
            });
        }
        else {
            permittedMap = null;
        }
        var useRawValue = this.useRawValueForColumn(columnId);
        var eachFn = function (rowNode, columnId, useRawValue) {
            if (rowNode && !_this.isGroupRowNode(rowNode)) {
                var rawValue = _this.gridOptions.api.getValue(columnId, rowNode);
                var displayValue = useRawValue
                    ? Helper_1.Helper.StringifyValue(rawValue)
                    : _this.getDisplayValueFromRowNode(rowNode, columnId);
                var allowed = !permittedMap || permittedMap.has(displayValue);
                if (allowed && onlyIncludeIds) {
                    var id = _this.getPrimaryKeyValueFromRowNode(rowNode);
                    allowed = !!onlyIncludeIds[id];
                }
                if (allowed) {
                    returnArray.push({ RawValue: rawValue, DisplayValue: displayValue });
                }
            }
        };
        if (visibleRowsOnly) {
            this.gridOptions.api.forEachNodeAfterFilter(function (rowNode) {
                eachFn(rowNode, columnId, useRawValue);
            });
        }
        else {
            this.gridOptions.api.forEachNode(function (rowNode) {
                eachFn(rowNode, columnId, useRawValue);
            });
        }
        return returnArray.slice(0, this.adaptableOptions.queryOptions.maxColumnValueItemsDisplayed);
    };
    Adaptable.prototype.addDistinctColumnValue = function (rowNode, columnId, useRawValue, distinctCriteria, returnMap) {
        // we do not return the values of the aggregates when in grouping mode
        // otherwise they would appear in the filter dropdown etc....
        if (rowNode && !this.isGroupRowNode(rowNode)) {
            var rawValue = this.gridOptions.api.getValue(columnId, rowNode);
            var displayValue = useRawValue
                ? Helper_1.Helper.StringifyValue(rawValue)
                : this.getDisplayValueFromRowNode(rowNode, columnId);
            if (distinctCriteria == Enums_1.DistinctCriteriaPairValue.RawValue) {
                returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayValue });
            }
            else {
                returnMap.set(displayValue, { RawValue: rawValue, DisplayValue: displayValue });
            }
        }
    };
    Adaptable.prototype.useRawValueForColumn = function (columnId) {
        // we need to return false if the column has a cell rendeerer i think...
        var colDef = this.gridOptions.api.getColumnDef(columnId);
        if (colDef) {
            if (colDef.cellRenderer != null) {
                return true;
            }
        }
        // will add more in due course I'm sure but for now only percent bar columns return false...
        var percentBars = this.api.percentBarApi.getAllPercentBar();
        if (ArrayExtensions_1.ArrayExtensions.IsEmpty(percentBars)) {
            return false;
        }
        return ArrayExtensions_1.ArrayExtensions.ContainsItem(percentBars.map(function (pb) { return pb.ColumnId; }), columnId);
    };
    Adaptable.prototype.getDisplayValue = function (id, columnId) {
        var _this = this;
        var returnValue;
        if (this.useRowNodeLookUp) {
            var rowNode = this.gridOptions.api.getRowNode(id);
            returnValue = this.getDisplayValueFromRowNode(rowNode, columnId);
        }
        else {
            var foundRow_2 = false;
            this.gridOptions.api.getModel().forEachNode(function (rowNode) {
                if (!foundRow_2 && id == _this.getPrimaryKeyValueFromRowNode(rowNode)) {
                    returnValue = _this.getDisplayValueFromRowNode(rowNode, columnId);
                    foundRow_2 = true;
                }
            });
        }
        return returnValue;
    };
    Adaptable.prototype.getDisplayValueFromRowNode = function (row, columnId) {
        if (row == null) {
            return '';
        }
        var rawValue = this.gridOptions.api.getValue(columnId, row);
        if (this.useRawValueForColumn(columnId)) {
            return Helper_1.Helper.StringifyValue(rawValue);
        }
        return this.getDisplayValueFromRawValue(columnId, rawValue);
    };
    Adaptable.prototype.getDisplayValueFromRawValue = function (columnId, rawValue) {
        var colDef = this.gridOptions.api.getColumnDef(columnId);
        if (colDef) {
            if (colDef.valueFormatter) {
                var column = this.gridOptions.columnApi
                    .getAllColumns()
                    .find(function (c) { return c.getColId() == columnId; });
                var formatter = colDef.valueFormatter;
                var params = {
                    value: rawValue,
                    node: null,
                    data: null,
                    colDef: colDef,
                    column: column,
                    api: this.gridOptions.api,
                    columnApi: this.gridOptions.columnApi,
                    context: null,
                };
                var formattedValue = formatter(params);
                if (colDef.cellRenderer) {
                    return this.getRenderedValue(colDef, formattedValue);
                }
                return formattedValue || '';
            }
            if (colDef.cellRenderer) {
                return this.getRenderedValue(colDef, rawValue);
            }
        }
        return this.agGridHelper.getCleanValue(rawValue);
    };
    Adaptable.prototype.getRenderedValue = function (colDef, valueToRender) {
        return this.agGridHelper.getRenderedValue(this.api.percentBarApi.getAllPercentBar(), colDef, valueToRender);
    };
    Adaptable.prototype.getRawValueFromRowNode = function (rowNode, columnId) {
        return this.gridOptions.api.getValue(columnId, rowNode);
    };
    Adaptable.prototype.getDataRowFromRowNode = function (rowNode) {
        return rowNode != null && rowNode != undefined ? rowNode.data : undefined;
    };
    Adaptable.prototype.getRowNodeForPrimaryKey = function (primaryKeyValue) {
        var _this = this;
        if (this.useRowNodeLookUp) {
            return this.gridOptions.api.getRowNode(primaryKeyValue);
        }
        else {
            this.gridOptions.api.getModel().forEachNode(function (rowNode) {
                if (primaryKeyValue == _this.getPrimaryKeyValueFromRowNode(rowNode)) {
                    return rowNode;
                }
            });
        }
    };
    Adaptable.prototype.getRowNodesForPrimaryKeys = function (primaryKeyValues) {
        var _this = this;
        var rowNodes = [];
        if (this.useRowNodeLookUp) {
            primaryKeyValues.forEach(function (pkValue) {
                var rowNode = _this.gridOptions.api.getRowNode(pkValue);
                if (rowNode) {
                    rowNodes.push(rowNode);
                }
            });
        }
        else {
            primaryKeyValues.forEach(function (pkValue) {
                var foundRow = false;
                _this.gridOptions.api.getModel().forEachNode(function (rowNode) {
                    if (!foundRow && pkValue == _this.getPrimaryKeyValueFromRowNode(rowNode)) {
                        rowNodes.push(rowNode);
                        foundRow = true;
                    }
                });
            });
        }
        return rowNodes;
    };
    Adaptable.prototype.setCellClassRules = function (cellClassRules, columnId, type) {
        var vendorColumn = this.gridOptions.columnApi.getColumn(columnId);
        if (vendorColumn) {
            var colDef = vendorColumn.getColDef();
            if (colDef) {
                var localCellClassRules = colDef.cellClassRules;
                if (localCellClassRules) {
                    if (type == 'FormatColumn') {
                        for (var prop in localCellClassRules) {
                            if (prop.includes(StrategyConstants.FormatColumnStrategyId)) {
                                delete localCellClassRules[prop];
                            }
                        }
                    }
                    else if (type == 'ConditionalStyle') {
                        var cssStyles = this.api.conditionalStyleApi
                            .getAllConditionalStyle()
                            .map(function (c) { return c.Style.ClassName; });
                        for (var prop in localCellClassRules) {
                            if (prop.includes(StrategyConstants.ConditionalStyleStrategyId) ||
                                ArrayExtensions_1.ArrayExtensions.ContainsItem(cssStyles, prop)) {
                                delete localCellClassRules[prop];
                            }
                        }
                    }
                    // Is initialized in setColumnIntoStore
                    else if (type == 'QuickSearch') {
                        for (var prop in localCellClassRules) {
                            if (prop.includes(StrategyConstants.QuickSearchStrategyId)) {
                                delete localCellClassRules[prop];
                            }
                        }
                    } // doing Alert - hope this is correct
                    else if (type == 'Alert') {
                        for (var prop in localCellClassRules) {
                            if (prop.includes(StyleConstants.ALERT_STYLE)) {
                                delete localCellClassRules[prop];
                            }
                        }
                    }
                    else if (type == 'UpdatedRow') {
                        for (var prop in localCellClassRules) {
                            if (prop.includes(StyleConstants.UPDATED_ROW_NEUTRAL_STYLE)) {
                                delete localCellClassRules[prop];
                            }
                        }
                    }
                    // Is initialized in Flash
                    else if (type == 'FlashingCell') {
                        for (var prop in localCellClassRules) {
                            if (prop.includes(StyleConstants.FLASH_CELL_UP_STYLE)) {
                                delete localCellClassRules[prop];
                            }
                            if (prop.includes(StyleConstants.FLASH_CELL_DOWN_STYLE)) {
                                delete localCellClassRules[prop];
                            }
                        }
                    }
                    for (var prop in cellClassRules) {
                        localCellClassRules[prop] = cellClassRules[prop];
                    }
                }
                else {
                    colDef.cellClassRules = cellClassRules;
                }
            }
        }
    };
    Adaptable.prototype.forAllRowNodesDo = function (func) {
        this.gridOptions.api.getModel().forEachNode(function (rowNode) {
            func(rowNode);
        });
    };
    Adaptable.prototype.forAllVisibleRowNodesDo = function (func) {
        this.gridOptions.api.forEachNodeAfterFilterAndSort(function (rowNode) {
            func(rowNode);
        });
    };
    Adaptable.prototype.redraw = function () {
        this.gridOptions.api.redrawRows();
        this.gridOptions.api.refreshHeader();
        this._emit('GridRefreshed');
    };
    Adaptable.prototype.redrawRow = function (rowNode) {
        this.gridOptions.api.redrawRows({ rowNodes: [rowNode] });
    };
    Adaptable.prototype.refreshCells = function (rowNodes, columnIds) {
        var refreshCellParams = {
            rowNodes: rowNodes,
            columns: columnIds,
            force: true,
        };
        this.gridOptions.api.refreshCells(refreshCellParams);
    };
    Adaptable.prototype.jumpToRow = function (rowNode) {
        this.gridOptions.api.ensureNodeVisible(rowNode, 'middle');
    };
    Adaptable.prototype.jumpToColumn = function (columnId) {
        this.gridOptions.api.ensureColumnVisible(columnId);
    };
    Adaptable.prototype.jumpToCell = function (columnId, rowNode) {
        this.jumpToRow(rowNode);
        this.jumpToColumn(columnId);
    };
    Adaptable.prototype.editCalculatedColumnInGrid = function (calculatedColumn) {
        var e_2, _a, e_3, _b;
        var _this = this;
        // the name of the column might have changed so lets get the column from store as that will be the 'old' one
        var cols = this.api.gridApi.getColumns();
        var existingABColumn = cols.find(function (c) { return c.Uuid == calculatedColumn.Uuid; });
        var cleanedExpression = this.CalculatedColumnExpressionService.CleanExpressionColumnNames(calculatedColumn.ColumnExpression, cols);
        var dataType = this.CalculatedColumnExpressionService.GetCalculatedColumnDataType(cleanedExpression);
        var agGridDataType = dataType == Enums_1.DataType.Number ? 'abColDefNumber' : 'abColDefString';
        if (existingABColumn) {
            // now get the ag-Grid ColDef Index
            var colDefs = this.mapColumnDefs(function (colDef) {
                if (colDef.headerName === existingABColumn.ColumnId) {
                    // clean the expression in case it got dirty
                    var newColDef = tslib_1.__assign({}, colDef);
                    //  change the value getter in the coldefs
                    newColDef.valueGetter = function (params) {
                        return Helper_1.Helper.RoundValueIfNumeric(_this.CalculatedColumnExpressionService.ComputeExpressionValue(cleanedExpression, params.node), 4);
                    };
                    newColDef.type = agGridDataType;
                    // reset the name in case its changed
                    newColDef.headerName = calculatedColumn.ColumnId;
                    newColDef.colId = calculatedColumn.ColumnId;
                    return newColDef;
                }
                return colDef;
            });
            this.safeSetColDefs(colDefs);
            try {
                // for column list its an itnernal map only so we can first delete
                for (var _c = tslib_1.__values(this.calculatedColumnPathMap.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var columnList_2 = _d.value;
                    var index = columnList_2.indexOf(calculatedColumn.ColumnId);
                    if (index > -1) {
                        columnList_2.splice(index, 1);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            // and then add
            var columnList = this.CalculatedColumnExpressionService.GetColumnListFromExpression(cleanedExpression);
            try {
                for (var columnList_1 = tslib_1.__values(columnList), columnList_1_1 = columnList_1.next(); !columnList_1_1.done; columnList_1_1 = columnList_1.next()) {
                    var column = columnList_1_1.value;
                    var childrenColumnList = this.calculatedColumnPathMap.get(column);
                    if (!childrenColumnList) {
                        childrenColumnList = [];
                        this.calculatedColumnPathMap.set(column, childrenColumnList);
                    }
                    childrenColumnList.push(calculatedColumn.ColumnId);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (columnList_1_1 && !columnList_1_1.done && (_b = columnList_1.return)) _b.call(columnList_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            // finally the name of the column or the datatype might have changed so lets update the column in the store to be sure
            // re-apply the datatype in case it has been changed as a result of the expression changing
            existingABColumn.ColumnId = calculatedColumn.ColumnId;
            existingABColumn.DataType = dataType;
            this.api.internalApi.addAdaptableColumn(existingABColumn);
        }
        this.postSpecialColumnEditDelete(true);
    };
    Adaptable.prototype.removeCalculatedColumnFromGrid = function (calculatedColumnID) {
        var e_4, _a;
        var foundColDef = false;
        var newColDefs = this.mapColumnDefs(function (colDef) {
            if (colDef.headerName === calculatedColumnID) {
                foundColDef = true;
                return null;
            }
            return colDef;
        }, { removeEmpty: true });
        if (foundColDef) {
            this.safeSetColDefs(newColDefs);
        }
        try {
            for (var _b = tslib_1.__values(this.calculatedColumnPathMap.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var columnList = _c.value;
                var index = columnList.indexOf(calculatedColumnID);
                if (index > -1) {
                    columnList.splice(index, 1);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.postSpecialColumnEditDelete(true);
    };
    Adaptable.prototype.addCalculatedColumnToGrid = function (calculatedColumn) {
        var e_5, _a;
        var _this = this;
        var colDefs = tslib_1.__spread((this.getColumnDefs() || []));
        var cols = this.api.gridApi.getColumns();
        var cleanedExpression = this.CalculatedColumnExpressionService.CleanExpressionColumnNames(calculatedColumn.ColumnExpression, cols);
        var dataType = this.CalculatedColumnExpressionService.GetCalculatedColumnDataType(cleanedExpression);
        var agGridDataType = dataType == Enums_1.DataType.Number ? 'abColDefNumber' : 'abColDefString';
        var newColDef = {
            headerName: calculatedColumn.ColumnId,
            colId: calculatedColumn.ColumnId,
            hide: true,
            enableValue: true,
            editable: false,
            filter: true,
            resizable: true,
            enableRowGroup: true,
            sortable: true,
            type: agGridDataType,
            valueGetter: function (params) {
                return Helper_1.Helper.RoundValueIfNumeric(_this.CalculatedColumnExpressionService.ComputeExpressionValue(cleanedExpression, params.node), 4);
            },
        };
        colDefs.push(newColDef);
        this.safeSetColDefs(colDefs);
        var columnList = this.CalculatedColumnExpressionService.GetColumnListFromExpression(cleanedExpression);
        try {
            for (var columnList_3 = tslib_1.__values(columnList), columnList_3_1 = columnList_3.next(); !columnList_3_1.done; columnList_3_1 = columnList_3.next()) {
                var column = columnList_3_1.value;
                var childrenColumnList = this.calculatedColumnPathMap.get(column);
                if (!childrenColumnList) {
                    childrenColumnList = [];
                    this.calculatedColumnPathMap.set(column, childrenColumnList);
                }
                childrenColumnList.push(calculatedColumn.ColumnId);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (columnList_3_1 && !columnList_3_1.done && (_a = columnList_3.return)) _a.call(columnList_3);
            }
            finally { if (e_5) throw e_5.error; }
        }
        this.addSpecialColumnToState(calculatedColumn.Uuid, calculatedColumn.ColumnId, dataType);
    };
    Adaptable.prototype.addFreeTextColumnToGrid = function (freeTextColumn) {
        var _this = this;
        var colDefs = tslib_1.__spread(this.getColumnDefs());
        var newColDef = {
            headerName: freeTextColumn.ColumnId,
            colId: freeTextColumn.ColumnId,
            editable: true,
            hide: true,
            filter: true,
            sortable: true,
            resizable: true,
            cellEditor: 'agLargeTextCellEditor',
            type: 'abColDefString',
            valueSetter: function (params) {
                return (params.data[freeTextColumn.ColumnId] = params.newValue);
            },
            valueGetter: function (params) {
                return _this.FreeTextColumnService.GetFreeTextValue(freeTextColumn, params.node);
            },
        };
        colDefs.push(newColDef);
        this.safeSetColDefs(colDefs);
        this.addSpecialColumnToState(freeTextColumn.Uuid, freeTextColumn.ColumnId, Enums_1.DataType.String);
    };
    Adaptable.prototype.removeFreeTextColumnFromGrid = function (freeTextColumnId) {
        var foundColDef = false;
        var newColDefs = this.mapColumnDefs(function (colDef) {
            if (colDef.headerName === freeTextColumnId) {
                foundColDef = true;
                return null;
            }
            return colDef;
        }, { removeEmpty: true });
        if (foundColDef) {
            this.safeSetColDefs(newColDefs);
        }
        this.postSpecialColumnEditDelete(true);
    };
    Adaptable.prototype.editFreeTextColumnInGrid = function (freeTextColumn) {
        this.postSpecialColumnEditDelete(true);
    };
    Adaptable.prototype.addActionColumnToGrid = function (actionColumn) {
        var colDefs = tslib_1.__spread(this.getColumnDefs());
        var newColDef = {
            headerName: actionColumn.FriendlyName ? actionColumn.FriendlyName : actionColumn.ColumnId,
            colId: actionColumn.ColumnId,
            editable: false,
            hide: false,
            filter: false,
            sortable: false,
            resizable: true,
            cellRenderer: ActionColumnRenderer_1.ActionColumnRenderer,
        };
        colDefs.push(newColDef);
        this.safeSetColDefs(colDefs);
        this.addSpecialColumnToState(actionColumn.Uuid, actionColumn.ColumnId, Enums_1.DataType.String);
    };
    Adaptable.prototype.addSpecialColumnToState = function (uuid, columnId, dataType) {
        var vendorColumn = this.gridOptions
            .columnApi.getAllColumns()
            .find(function (vc) { return vc.getColId() == columnId; });
        if (vendorColumn) {
            var vendorColDef = vendorColumn.getColDef();
            var specialColumn = {
                Uuid: uuid,
                ColumnId: columnId,
                FriendlyName: columnId,
                DataType: dataType,
                Visible: false,
                ReadOnly: this.agGridHelper.isColumnReadonly(vendorColDef),
                Sortable: this.agGridHelper.isColumnSortable(vendorColDef),
                Filterable: this.agGridHelper.isColumnFilterable(vendorColDef),
                Groupable: this.agGridHelper.isColumnGroupable(vendorColDef),
                Pivotable: this.agGridHelper.isColumnPivotable(vendorColDef),
                Aggregatable: this.agGridHelper.isColumnAggregetable(vendorColDef),
                IsSparkline: dataType == Enums_1.DataType.NumberArray,
                SpecialColumn: true,
                IsExcludedFromQuickSearch: false,
            };
            this.api.internalApi.addAdaptableColumn(specialColumn);
            this.applyStylingToColumn(vendorColumn, specialColumn);
            this.postSpecialColumnEditDelete(false);
        }
    };
    Adaptable.prototype.getFirstRowNode = function () {
        // TODO: we can find a better way but its only used by Calccolumn on creation so not urgent
        var rowNode;
        this.gridOptions.api.forEachNode(function (node) {
            if (!node.group) {
                if (!rowNode) {
                    rowNode = node;
                }
            }
        });
        return rowNode;
    };
    // need to destroy more than just this...
    // TODO;  manage destruction properly
    Adaptable.prototype.destroy = function () {
        var abContainerElement = this.getadaptableContainerElement();
        if (abContainerElement != null) {
            ReactDOM.unmountComponentAtNode(abContainerElement);
        }
    };
    // really really need to do this properly but as a temp fix lets create a default style for when no data
    Adaptable.prototype.getDefaultIPPStyle = function () {
        return {
            Header: {
                headerColor: '#000000',
                headerBackColor: '#f5f7f7',
                headerFontFamily: 'sans-serif',
                headerFontSize: '12px',
                headerFontStyle: 'normal',
                headerFontWeight: '400',
                height: 65,
                Columns: this.api.gridApi.getColumns().map(function (col) {
                    return {
                        columnFriendlyName: col.FriendlyName,
                        width: 200,
                        textAlign: 'start',
                    };
                }),
            },
            Row: {
                color: '#000000',
                backColor: '#ffffff',
                altBackColor: '#fcfdfe',
                fontFamily: 'sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: '400',
                height: 30,
                Columns: this.api.gridApi.getColumns().map(function (col) {
                    return {
                        columnFriendlyName: col.FriendlyName,
                        width: 200,
                        textAlign: 'start',
                    };
                }),
            },
        };
    };
    // This horrible method is used to get the grid style for when we export to ipushpull
    // We need to find a better implementation
    Adaptable.prototype.getCurrentIPPStyle = function () {
        var headerFirstCol = document
            .querySelectorAll('.ag-header-cell')
            .item(0);
        var header = document.querySelector('.ag-header');
        var headerColStyle = header ? window.getComputedStyle(header, null) : null;
        var firstRow = document.querySelector('.ag-row-even');
        var firstRowStyle = firstRow ? window.getComputedStyle(firstRow, null) : null;
        var secondRow = document.querySelector('.ag-row-odd');
        var secondRowStyle = secondRow
            ? window.getComputedStyle(secondRow, null)
            : {
                backgroundColor: '#fff',
            };
        return {
            Header: {
                headerColor: new color_1.Color(headerColStyle.color).toHex(),
                headerBackColor: new color_1.Color(headerColStyle.backgroundColor).toHex(),
                headerFontFamily: headerColStyle.fontFamily,
                headerFontSize: headerColStyle.fontSize,
                headerFontStyle: headerColStyle.fontStyle,
                headerFontWeight: headerColStyle.fontWeight,
                height: Number(headerColStyle.height.replace('px', '')),
                Columns: this.api.gridApi.getColumns().map(function (col) {
                    var headerColumn = document.querySelector(".ag-header-cell[col-id='" + col.ColumnId + "']");
                    var headerColumnStyle = window.getComputedStyle(headerColumn || headerFirstCol, null);
                    return {
                        columnFriendlyName: col.FriendlyName,
                        width: Number(headerColumnStyle.width.replace('px', '')),
                        textAlign: headerColumnStyle.textAlign,
                    };
                }),
            },
            Row: {
                color: new color_1.Color(firstRowStyle.color).toHex(),
                backColor: new color_1.Color(firstRowStyle.backgroundColor).toHex(),
                altBackColor: new color_1.Color(secondRowStyle.backgroundColor).toHex(),
                fontFamily: firstRowStyle.fontFamily,
                fontSize: firstRowStyle.fontSize,
                fontStyle: firstRowStyle.fontStyle,
                fontWeight: firstRowStyle.fontWeight,
                height: Number(firstRowStyle.height.replace('px', '')),
                Columns: this.api.gridApi.getColumns().map(function (col) {
                    var cellElement = document.querySelector(".ag-cell[col-id='" + col.ColumnId + "']");
                    var headerColumnStyle = window.getComputedStyle(cellElement || firstRow, null);
                    return {
                        columnFriendlyName: col.FriendlyName,
                        width: Number(headerColumnStyle.width.replace('px', '')),
                        textAlign: headerColumnStyle.textAlign,
                    };
                }),
            },
        };
    };
    Adaptable.prototype.getadaptableContainerElement = function () {
        if (!this.abContainerElement) {
            this.abContainerElement = document.getElementById(this.adaptableOptions.containerOptions.adaptableContainer);
            if (!this.abContainerElement) {
                var oldContainer = document.getElementById('adaptableBlotter');
                if (oldContainer) {
                    LoggingHelper_1.LoggingHelper.LogAdaptableWarning("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n!!!!! The old default container element for Adaptable was \"#adaptableBlotter\", configured via 'containerOptions.adaptableContainer=\"adaptableBlotter\"'.\n!!!!! Seems like you haven't updated your html container selector, so we're falling back to using that one.\n!!!!!\n!!!!! To make this warning go away, update your html structure and make sure you have an element with id=\"adaptable\" in your app!\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");
                    this.abContainerElement = oldContainer;
                }
            }
        }
        return this.abContainerElement;
    };
    Adaptable.prototype.getGridContainerElement = function () {
        if (!this.gridContainerElement) {
            this.gridContainerElement = document.getElementById(this.adaptableOptions.containerOptions.vendorContainer);
        }
        return this.gridContainerElement;
    };
    Adaptable.prototype.initInternalGridLogic = function () {
        var _this = this;
        if (this.renderGrid) {
            if (this.abContainerElement == null) {
                this.abContainerElement = this.getadaptableContainerElement();
            }
            if (this.abContainerElement == null) {
                LoggingHelper_1.LoggingHelper.LogAdaptableError("There is no DIV with id=\"" + this.adaptableOptions.containerOptions.adaptableContainer + "\" so cannot render Adaptable");
                return;
            }
        }
        var gridContainerElement = this.getGridContainerElement();
        if (gridContainerElement) {
            gridContainerElement.addEventListener('keydown', function (event) { return _this._emit('KeyDown', event); });
        }
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_COLUMN_VISIBLE, function (params) {
            if (params.visible && params.column) {
                _this.updateQuickSearchRangeVisibleColumn(params.column.colId);
            }
        });
        // we could use the single event listener but for this one it makes sense to listen to all of them and filter on the type
        // since there are many events and we want them to behave the same
        var columnEventsThatTriggersStateChange = [
            all_modules_1.Events.EVENT_COLUMN_MOVED,
            all_modules_1.Events.EVENT_GRID_COLUMNS_CHANGED,
            all_modules_1.Events.EVENT_COLUMN_EVERYTHING_CHANGED,
            all_modules_1.Events.EVENT_DISPLAYED_COLUMNS_CHANGED,
            //   Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED,
            all_modules_1.Events.EVENT_COLUMN_VISIBLE,
            //   Events.EVENT_COLUMN_PINNED,
            all_modules_1.Events.EVENT_NEW_COLUMNS_LOADED,
        ];
        this.gridOptions.api.addGlobalListener(function (type) {
            if (columnEventsThatTriggersStateChange.indexOf(type) > -1) {
                // bit messy but better than alternative which was calling setColumnIntoStore for every single column
                var popupState = _this.getState().Popup.ScreenPopup;
                if (popupState.ShowScreenPopup &&
                    (popupState.ComponentName == ScreenPopups.ColumnChooserPopup ||
                        ScreenPopups.CalculatedColumnPopup)) {
                    // ignore
                }
                else {
                    // set the column into the store
                    _this.debouncedSetColumnIntoStore();
                }
                // refilter the grid if required
                _this.debouncedFilterGrid();
            }
        });
        // dealing with scenario where the data is providee to adaptable after grid has been setup
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_FIRST_DATA_RENDERED, function () {
            _this.debouncedSetColumnIntoStore();
        });
        // once the grid is ready we should make sure we are too
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_GRID_READY, function () {
            // do something?
        });
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_COLUMN_PIVOT_MODE_CHANGED, function (params) {
            if (params.type == 'columnPivotModeChanged' &&
                params.columnApi != null &&
                params.columnApi.columnController != null &&
                params.columnApi.columnController.pivotMode == true) {
                if (_this.adaptableOptions.layoutOptions.autoSizeColumnsInPivotLayout == true) {
                    _this.gridOptions.columnApi.autoSizeAllColumns();
                }
                _this.api.internalApi.setPivotModeOn();
            }
            else {
                _this.api.internalApi.setPivotModeOff();
            }
        });
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_COLUMN_PIVOT_CHANGED, function (params) {
            if (params.type == 'columnPivotChanged' &&
                params.columnApi != null &&
                params.columnApi.columnController != null &&
                params.columnApi.columnController.pivotMode == true) {
                if (_this.adaptableOptions.layoutOptions.autoSizeColumnsInPivotLayout == true) {
                    _this.gridOptions.columnApi.autoSizeAllColumns();
                }
            }
        });
        // Pinning columms and changing column widths will trigger an auto save (if that and includvendorstate are both turned on)
        var columnEventsThatTriggersAutoLayoutSave = [
            all_modules_1.Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED,
            all_modules_1.Events.EVENT_COLUMN_PINNED,
            all_modules_1.Events.EVENT_COLUMN_PIVOT_CHANGED,
            all_modules_1.Events.EVENT_COLUMN_PIVOT_MODE_CHANGED,
            all_modules_1.Events.EVENT_DISPLAYED_COLUMNS_CHANGED,
            all_modules_1.Events.EVENT_SORT_CHANGED,
        ];
        this.gridOptions.api.addGlobalListener(function (type) {
            if (columnEventsThatTriggersAutoLayoutSave.indexOf(type) > -1) {
                _this.debouncedSaveGridLayout();
            }
        });
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_COLUMN_RESIZED, function (params) {
            // if a column is resized there are a couple of things we need to do once its finished
            if (params.type == 'columnResized' && params.finished == true) {
                // refresh the header if you have quick filter bar to ensure its full length
                if (_this.isQuickFilterActive()) {
                    _this.gridOptions.api.refreshHeader();
                }
                if (params.column) {
                    _this._emit('ColumnResized', params.column.colId);
                }
            }
        });
        // this event deals with when the user makes an edit - it doesnt look at ticking data
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_CELL_EDITING_STARTED, function (params) {
            // TODO: Jo: This is a workaround as we are accessing private members of agGrid.
            // I still wonder if we can do this nicer by using :   this.gridOptions.api!.getEditingCells();
            // must be a good reason why we don't use it
            if (_this.gridOptions.columnApi.isPivotMode()) {
                return;
            }
            var rowRenderer = _this.gridOptions.api.rowRenderer;
            if (rowRenderer) {
                var index = rowRenderer.rowCompsByIndex[params.node.rowIndex];
                if (index) {
                    var editor = index.cellComps[params.column.getColId()].cellEditor;
                    // editor might be type Popup like agPopupTextCellEditor or agPopupSelectCellEditor (see: https://www.ag-grid.com/javascript-grid-cell-editing/)
                    // if so then we need to get the inner editor
                    if (editor instanceof all_modules_1.PopupEditorWrapper) {
                        _this._currentEditor = editor.cellEditor;
                    }
                    else {
                        _this._currentEditor = editor;
                    }
                }
            }
            // No need to register for the keydown on the editor since we already register on the main div
            // if there was already an implementation set by the dev we keep the reference to it and execute it at the end
            if (_this._currentEditor) {
                var oldIsCancelAfterEnd_1 = _this._currentEditor.isCancelAfterEnd;
                _this._currentEditor.isCancelAfterEnd = function () {
                    var dataChangedInfo = {
                        OldValue: _this.gridOptions.api.getValue(params.column.getColId(), params.node),
                        NewValue: _this._currentEditor.getValue(),
                        ColumnId: params.column.getColId(),
                        PrimaryKeyValue: _this.getPrimaryKeyValueFromRowNode(params.node),
                        RowNode: params.node,
                    };
                    if (dataChangedInfo.OldValue === dataChangedInfo.NewValue) {
                        return true;
                    }
                    if (!_this.ValidationService.PerformCellValidation(dataChangedInfo)) {
                        return true;
                    }
                    var onServerValidationCompleted = function () {
                        var whatToReturn = oldIsCancelAfterEnd_1 ? oldIsCancelAfterEnd_1() : false;
                        if (!whatToReturn) {
                            // its from a user edit (I think!) but the filter is working anyway...
                            _this.performPostEditChecks(dataChangedInfo, false, false);
                        }
                        return whatToReturn;
                    };
                    var isCancelAfterEnd = _this.adaptableOptions.editOptions.validateOnServer
                        ? _this.ValidationService.PerformServerValidation(dataChangedInfo, {
                            onServerValidationCompleted: onServerValidationCompleted,
                        })
                        : onServerValidationCompleted;
                    return isCancelAfterEnd();
                };
            }
        });
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_CELL_EDITING_STOPPED, function (params) {
            // (<any>this._currentEditor).getGui().removeEventListener("keydown", (event: any) => this._onKeyDown.Dispatch(this, event))
            // We refresh the filter so we get live search/filter when editing.
            // Note: I know it will be triggered as well when cancelling an edit but I don't think it's a prb
            _this._currentEditor = undefined;
            if (params && params.node) {
                var column = params.column;
                // for numeric columns we want to make sure its a numeric update in case they have aggregation
                if (column) {
                    var abColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(column.colId, _this.api.gridApi.getColumns());
                    if (abColumn && abColumn.DataType == Enums_1.DataType.Number) {
                        params.node.setDataValue(column.colId, Number(params.value));
                    }
                }
                // if they have set to run filter after edit then lets do it
                _this.filterOnUserDataChange([params.node]);
                _this.debouncedSetSelectedCells();
            }
        });
        var columnEventsThatTriggerSetRowSelection = [
            all_modules_1.Events.EVENT_ROW_GROUP_OPENED,
            all_modules_1.Events.EVENT_SELECTION_CHANGED,
            all_modules_1.Events.EVENT_ROW_SELECTED,
        ];
        this.gridOptions.api.addGlobalListener(function (type) {
            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(columnEventsThatTriggerSetRowSelection, type)) {
                _this.debouncedSetSelectedRows();
            }
        });
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_ROW_GROUP_OPENED, function () {
            //      this.debouncedSetSelectedRows();
        });
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_SELECTION_CHANGED, function () {
            //     this.debouncedSetSelectedRows();
        });
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_ROW_SELECTED, function () {
            //     this.debouncedSetSelectedRows();
        });
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_RANGE_SELECTION_CHANGED, function () {
            _this.debouncedSetSelectedCells();
        });
        // this.gridOptions.api!.addEventListener(Events.EVENT_TOOL_PANEL_VISIBLE_CHANGED, () => {
        // });
        //  this.gridOptions.api!.addEventListener(Events.EVENT_COLUMN_ROW_GROUP_CHANGED, (params: any) => {
        // });
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_SORT_CHANGED, function () {
            _this.onSortChanged();
            _this.debouncedSetSelectedCells();
        });
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_MODEL_UPDATED, function (params) {
            if (_this.adaptableOptions.generalOptions.showGroupingTotalsAsHeader) {
                if (params && params.api) {
                    var pinnedData = params.api.getPinnedTopRow(0);
                    var model = params.api.getModel();
                    var rootNode = model.getRootNode();
                    if (!pinnedData) {
                        params.api.setPinnedTopRowData([rootNode.aggData]);
                    }
                    else {
                        pinnedData.updateData(rootNode.aggData);
                    }
                }
            }
            _this.checkColumnsDataTypeSet();
        });
        var rowListeners = {
            dataChanged: function (event) {
                return _this.onRowDataChanged({
                    //  myevent: event,
                    rowNode: event.node,
                    oldData: event.oldData,
                    newData: event.newData,
                });
            },
        };
        /**
         * AgGrid does not expose Events.EVENT_ROW_DATA_CHANGED
         * so we have to override `dispatchLocalEvent`
         * and hook our own functionality into it
         *
         */
        RowNodeProto.dispatchLocalEvent = function (event) {
            var result = RowNode_dispatchLocalEvent.apply(this, arguments);
            var fn = rowListeners[event.type];
            if (fn) {
                fn(event);
            }
            return result;
        };
        // this handles ticking data
        // except it doesnt handle when data has been added to ag-Grid using updateRowData
        this.gridOptions.api.addEventListener(all_modules_1.Events.EVENT_CELL_VALUE_CHANGED, function (params) {
            // this gets called as soon as opening editor so make sure the values are different before starting any work...
            if (params.newValue != params.oldValue) {
                // not sure I need this now as we ALWAYS do this in performPostEditChecks();
                /*
                const dataChangedInfo: DataChangedInfo = {
                  OldValue: params.oldValue,
                  NewValue: params.newValue,
                  ColumnId: colId,
                  PrimaryKeyValue: identifierValue,
                  RowNode: params.node,
                };
                 this.DataService.CreateDataChangedEvent(dataChangedInfo);
             */
                var colId = params.colDef.field;
                if (colId) {
                    // 24/08/17 : AgGrid doesn't raise an event for computed columns that depends on that column
                    // so we manually raise.
                    // https://github.com/JonnyAdaptableTools/adaptableadaptable/issues/118
                    var refreshColumnList_1 = [colId];
                    var columnList = _this.calculatedColumnPathMap.get(colId);
                    if (columnList) {
                        var identifierValue_1 = _this.getPrimaryKeyValueFromRowNode(params.node);
                        columnList.forEach(function (columnId) {
                            var dataChangedInfo = {
                                OldValue: params.oldValue,
                                NewValue: _this.gridOptions.api.getValue(columnId, params.node),
                                ColumnId: columnId,
                                PrimaryKeyValue: identifierValue_1,
                                RowNode: params.node,
                            };
                            _this.DataService.CreateDataChangedEvent(dataChangedInfo);
                            ArrayExtensions_1.ArrayExtensions.AddItem(refreshColumnList_1, columnId);
                        });
                    }
                    // see if we need to refresh any percent bars
                    _this.api.percentBarApi.getAllPercentBar().forEach(function (pb) {
                        refreshColumnList_1.forEach(function (changedColId) {
                            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(pb.PositiveValueColumnId) &&
                                pb.PositiveValueColumnId == changedColId) {
                                ArrayExtensions_1.ArrayExtensions.AddItem(refreshColumnList_1, pb.ColumnId);
                            }
                            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(pb.NegativeValueColumnId) &&
                                pb.NegativeValueColumnId == changedColId) {
                                ArrayExtensions_1.ArrayExtensions.AddItem(refreshColumnList_1, pb.ColumnId);
                            }
                        });
                    });
                }
                // this is new  - giving users ability to filter on external data changes
                _this.filterOnExternalDataChange([params.node]);
            }
        });
        // We plug our filter mechanism and if there is already something like external widgets... we save ref to the function
        var originalisExternalFilterPresent = this.gridOptions.isExternalFilterPresent;
        this.gridOptions.isExternalFilterPresent = function () {
            var e_6, _a;
            var columnFilters = _this.api.columnFilterApi.getAllColumnFilter();
            var isFilterActive = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columnFilters);
            if (isFilterActive) {
                try {
                    // used in particular at init time to show the filter icon correctly
                    for (var columnFilters_1 = tslib_1.__values(columnFilters), columnFilters_1_1 = columnFilters_1.next(); !columnFilters_1_1.done; columnFilters_1_1 = columnFilters_1.next()) {
                        var colFilter = columnFilters_1_1.value;
                        var agGridCol = _this.gridOptions.columnApi.getColumn(colFilter.ColumnId);
                        if (agGridCol) {
                            if (!agGridCol.isFilterActive()) {
                                agGridCol.setFilterActive(true);
                            }
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (columnFilters_1_1 && !columnFilters_1_1.done && (_a = columnFilters_1.return)) _a.call(columnFilters_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            var isSearchActive = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(_this.api.advancedSearchApi.getAdvancedSearchState().CurrentAdvancedSearch);
            var isQuickSearchActive = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(_this.api.quickSearchApi.getQuickSearchValue());
            // it means that originaldoesExternalFilterPass will be called to we reinit that collection
            return (isFilterActive ||
                isSearchActive ||
                isQuickSearchActive ||
                (originalisExternalFilterPresent ? originalisExternalFilterPresent() : false));
        };
        var originaldoesExternalFilterPass = this.gridOptions.doesExternalFilterPass;
        this.gridOptions.doesExternalFilterPass = function (node) {
            var e_7, _a, e_8, _b;
            var columns = _this.api.gridApi.getColumns();
            // first we assess AdvancedSearch (if its running locally)
            if (_this.adaptableOptions.searchOptions.serverSearchOption == 'None') {
                var currentSearch = _this.api.advancedSearchApi.getCurrentAdvancedSearch();
                if (currentSearch) {
                    // See if our rowNode passes the Expression - using Expression Helper; if not then return false
                    if (!ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRowNode(currentSearch.Expression, node, columns, _this)) {
                        return false;
                    }
                }
            }
            // we then assess filters
            if (_this.adaptableOptions.searchOptions.serverSearchOption == 'None' ||
                _this.adaptableOptions.searchOptions.serverSearchOption == 'AdvancedSearch') {
                var columnFilters = _this.api.columnFilterApi.getAllColumnFilter();
                if (columnFilters.length > 0) {
                    try {
                        for (var columnFilters_2 = tslib_1.__values(columnFilters), columnFilters_2_1 = columnFilters_2.next(); !columnFilters_2_1.done; columnFilters_2_1 = columnFilters_2.next()) {
                            var columnFilter = columnFilters_2_1.value;
                            if (!ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRowNode(columnFilter.Filter, node, columns, _this)) {
                                return false;
                            }
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (columnFilters_2_1 && !columnFilters_2_1.done && (_a = columnFilters_2.return)) _a.call(columnFilters_2);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                }
                // we next assess quicksearch
                var quickSearchState = _this.api.quickSearchApi.getQuickSearchState();
                if (quickSearchState.DisplayAction != Enums_1.DisplayAction.HighlightCell) {
                    if (StringExtensions_1.StringExtensions.IsNullOrEmpty(quickSearchState.QuickSearchText)) {
                        return true;
                    }
                    var quickSearchVisibleColumnExpresssions = _this.getState().System
                        .QuickSearchVisibleColumnExpressions;
                    var quickSearchRange = _this.getState().System.QuickSearchRange;
                    if (quickSearchRange == null) {
                        // might not have created so lets do it here
                        quickSearchRange = RangeHelper_1.RangeHelper.CreateValueRangeFromOperand(quickSearchState.QuickSearchText);
                    }
                    if (quickSearchRange != null) {
                        var visibleCols = columns.filter(function (c) { return c.Visible && !c.IsExcludedFromQuickSearch; });
                        var _loop_2 = function (column) {
                            var expression = quickSearchVisibleColumnExpresssions.find(function (exp) { return exp.RangeExpressions[0].ColumnId == column.ColumnId; });
                            if (expression) {
                                if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRowNode(expression, node, [column], _this)) {
                                    return { value: originaldoesExternalFilterPass
                                            ? originaldoesExternalFilterPass(node)
                                            : true };
                                }
                            }
                        };
                        try {
                            for (var visibleCols_1 = tslib_1.__values(visibleCols), visibleCols_1_1 = visibleCols_1.next(); !visibleCols_1_1.done; visibleCols_1_1 = visibleCols_1.next()) {
                                var column = visibleCols_1_1.value;
                                var state_1 = _loop_2(column);
                                if (typeof state_1 === "object")
                                    return state_1.value;
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (visibleCols_1_1 && !visibleCols_1_1.done && (_b = visibleCols_1.return)) _b.call(visibleCols_1);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                    }
                    else {
                        return true; // is this right????
                    }
                    return false;
                }
            }
            return originaldoesExternalFilterPass ? originaldoesExternalFilterPass(node) : true;
        };
        // add any special renderers
        this.addSpecialRendereredColumns();
        // Build the COLUMN HEADER MENU.  Note that we do this EACH time the menu is opened (as items can change)
        var originalgetMainMenuItems = this.gridOptions.getMainMenuItems;
        this.gridOptions.getMainMenuItems = function (params) {
            // couldnt find a way to listen for menu close. There is a Menu Item Select, but you can also close menu from filter and clicking outside menu....
            var colId = params.column.getColId();
            var AdaptableMenuItems = [];
            var adaptableColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(colId, _this.api.gridApi.getColumns());
            if (adaptableColumn != null) {
                _this.strategies.forEach(function (s) {
                    var menuItem = s.addColumnMenuItem(adaptableColumn);
                    if (menuItem) {
                        AdaptableMenuItems.push(menuItem);
                    }
                });
                // add the column menu items from Home Strategy
                var homeStrategy = _this.strategies.get(StrategyConstants.HomeStrategyId);
                AdaptableMenuItems.push.apply(AdaptableMenuItems, tslib_1.__spread(homeStrategy.addBaseColumnMenuItems(adaptableColumn)));
            }
            var colMenuItems;
            // if there was an initial implementation we init the list of menu items with this one; otherwise we take the default items
            if (originalgetMainMenuItems) {
                var originalMenuItems = originalgetMainMenuItems(params);
                colMenuItems = originalMenuItems.slice(0);
            }
            else {
                colMenuItems = params.defaultItems.slice(0);
            }
            colMenuItems.push('separator');
            var menuInfo = {
                GridCell: undefined,
                Column: adaptableColumn,
                IsSelectedCell: false,
                IsSingleSelectedColumn: false,
                RowNode: undefined,
                PrimaryKeyValue: undefined,
            };
            var showAdaptableColumnMenu = _this.adaptableOptions.userInterfaceOptions
                .showAdaptableColumnMenu;
            if (showAdaptableColumnMenu == null || showAdaptableColumnMenu !== false) {
                AdaptableMenuItems.forEach(function (AdaptableMenuItem) {
                    var addContextMenuItem = true;
                    if (showAdaptableColumnMenu != null && typeof showAdaptableColumnMenu === 'function') {
                        addContextMenuItem = showAdaptableColumnMenu(AdaptableMenuItem, menuInfo);
                    }
                    if (addContextMenuItem) {
                        var menuItem = _this.agGridHelper.createAgGridMenuDefFromAdaptableMenu(AdaptableMenuItem);
                        colMenuItems.push(menuItem);
                    }
                });
            }
            var userColumnMenuItems = _this.api.userInterfaceApi.getUserInterfaceState().ColumnMenuItems;
            if (typeof userColumnMenuItems === 'function') {
                userColumnMenuItems = userColumnMenuItems(menuInfo);
            }
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(userColumnMenuItems)) {
                userColumnMenuItems.forEach(function (userMenuItem) {
                    var menuItem = _this.agGridHelper.createAgGridMenuDefFromUsereMenu(userMenuItem, menuInfo);
                    colMenuItems.push(menuItem);
                });
            }
            return colMenuItems;
        };
        // Build the CONTEXT MENU.  Again we do this each time a cell is right clicked as its context-sensitive
        var originalgetContextMenuItems = this.gridOptions.getContextMenuItems;
        this.gridOptions.getContextMenuItems = function (params) {
            var contextMenuItems = [];
            // if there was an initial implementation we init the list of menu items with this one, otherwise we take default items
            // this allows us to ensure that devs can still create their own agGrid context menu without losing ours
            if (originalgetContextMenuItems) {
                var originalContexttems = originalgetContextMenuItems(params);
                contextMenuItems = originalContexttems.slice(0);
            }
            else {
                contextMenuItems = params.defaultItems ? params.defaultItems.slice(0) : [];
            }
            var menuInfo;
            // keep it simple for now - if its a grouped cell then do nothing
            if (!params.node.group) {
                var AdaptableMenuItems_1 = [];
                var agGridColumn = params.column;
                if (agGridColumn) {
                    var adaptableColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(agGridColumn.getColId(), _this.api.gridApi.getColumns());
                    if (adaptableColumn != null) {
                        menuInfo = _this.agGridHelper.createMenuInfo(params, adaptableColumn);
                        _this.strategies.forEach(function (s) {
                            var menuItem = s.addContextMenuItem(menuInfo);
                            if (menuItem) {
                                AdaptableMenuItems_1.push(menuItem);
                            }
                        });
                        // here we create Adaptable adaptable Menu items from OUR internal collection
                        // user has ability to decide whether to show or not
                        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(AdaptableMenuItems_1)) {
                            var showAdaptableContextMenu_1 = _this.adaptableOptions.userInterfaceOptions
                                .showAdaptableContextMenu;
                            if (showAdaptableContextMenu_1 == null || showAdaptableContextMenu_1 !== false) {
                                contextMenuItems.push('separator');
                                AdaptableMenuItems_1.forEach(function (AdaptableMenuItem) {
                                    var addContextMenuItem = true;
                                    if (showAdaptableContextMenu_1 != null &&
                                        typeof showAdaptableContextMenu_1 === 'function') {
                                        addContextMenuItem = showAdaptableContextMenu_1(AdaptableMenuItem, menuInfo);
                                    }
                                    if (addContextMenuItem) {
                                        var menuItem = _this.agGridHelper.createAgGridMenuDefFromAdaptableMenu(AdaptableMenuItem);
                                        contextMenuItems.push(menuItem);
                                    }
                                });
                            }
                        }
                        // here we add any User defined Context Menu Items
                        var userContextMenuItems = _this.api.userInterfaceApi.getUserInterfaceState()
                            .ContextMenuItems;
                        if (typeof userContextMenuItems === 'function') {
                            userContextMenuItems = userContextMenuItems(menuInfo);
                        }
                        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(userContextMenuItems)) {
                            contextMenuItems.push('separator');
                            userContextMenuItems.forEach(function (userMenuItem) {
                                var menuItem = _this.agGridHelper.createAgGridMenuDefFromUsereMenu(userMenuItem, menuInfo);
                                contextMenuItems.push(menuItem);
                            });
                        }
                    }
                }
            }
            return contextMenuItems;
        };
    };
    Adaptable.prototype.postSpecialColumnEditDelete = function (doReload) {
        if (this.isInitialised) {
            //  reload the existing layout if its not default
            var currentlayout = this.api.layoutApi.getCurrentLayout().Name;
            if (currentlayout != GeneralConstants_1.DEFAULT_LAYOUT) {
                if (doReload) {
                    this.api.layoutApi.setLayout(GeneralConstants_1.DEFAULT_LAYOUT);
                    this.api.layoutApi.setLayout(currentlayout);
                    this.setColumnIntoStore();
                }
                else {
                    this.api.layoutApi.setLayout(currentlayout);
                }
            }
        }
        // if grid is initialised then emit AdaptableReady event so we can re-apply any styles
        // and re-apply any specially rendered columns
        if (this.isInitialised) {
            this.api.eventApi.emit('AdaptableReady');
            this.addSpecialRendereredColumns();
        }
    };
    Adaptable.prototype.addSpecialRendereredColumns = function () {
        var _this = this;
        this.forPlugins(function () { });
        this.api.percentBarApi.getAllPercentBar().forEach(function (pcr) {
            _this.addPercentBar(pcr);
        });
        this.api.gradientColumnApi.getAllGradientColumn().forEach(function (gc) {
            _this.addGradientColumn(gc);
        });
        this.api.sparklineColumnApi.getAllSparklineColumn().forEach(function (sparklineColumn) {
            _this.addSparklineColumn(sparklineColumn);
        });
    };
    Adaptable.prototype.addSparklineColumn = function (sparklineColumn) {
        // check that the brushes are set as might not be
        if (sparklineColumn.LineColor == null || sparklineColumn.LineColor == undefined) {
            sparklineColumn.LineColor = DefaultSparklinesChartProperties_1.DefaultSparklinesChartProperties.Brush;
        }
        var renderedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(sparklineColumn.ColumnId, this.api.gridApi.getColumns());
        if (renderedColumn) {
            var cellRendererComp = this.agGridHelper.createSparklineCellRendererComp(sparklineColumn, this.adaptableOptions.adaptableId);
            var vendorGridColumn = this.gridOptions.columnApi.getColumn(sparklineColumn.ColumnId);
            var colDef = vendorGridColumn.getColDef();
            if (cellRendererComp) {
                colDef.cellRenderer = cellRendererComp;
            }
            if (sparklineColumn.ShowToolTip != null && sparklineColumn.ShowToolTip == true) {
                colDef.tooltipField = colDef.field;
            }
            else {
                colDef.tooltipField = '';
            }
        }
    };
    Adaptable.prototype.addPercentBar = function (pcr) {
        var renderedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(pcr.ColumnId, this.api.gridApi.getColumns());
        if (renderedColumn) {
            var cellRendererFunc = this.agGridHelper.createPercentBarCellRendererFunc(pcr, this.adaptableOptions.adaptableId);
            var vendorGridColumn = this.gridOptions.columnApi.getColumn(pcr.ColumnId);
            var colDef = vendorGridColumn.getColDef();
            colDef.cellRenderer = cellRendererFunc;
            // change the style from number-cell temporarily?
            if (colDef.cellClass == 'number-cell') {
                colDef.cellClass = 'number-cell-changed';
            }
            if (pcr.ShowToolTip != null && pcr.ShowToolTip == true) {
                colDef.tooltipField = colDef.field;
                // for now NOT using this PercentBarTooltip but we can add it later and will be powwerful.
                //  coldDef.tooltipComponent = PercentBarTooltip;
                // coldDef.tooltipValueGetter = (params: ITooltipParams) => {
                //   return { value: params.value * 10 };
                // };
            }
            else {
                colDef.tooltipField = '';
            }
        }
    };
    Adaptable.prototype.removeSparklineColumn = function (sparklineColumn) {
        var renderedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(sparklineColumn.ColumnId, this.api.gridApi.getColumns());
        if (renderedColumn) {
            var vendorGridColumn = this.gridOptions.columnApi.getColumn(sparklineColumn.ColumnId);
            // note we dont get it from the original (but I guess it will be applied next time you run...)
            vendorGridColumn.getColDef().cellRenderer = null;
            var coldDef = vendorGridColumn.getColDef();
            coldDef.cellRenderer = null;
        }
    };
    Adaptable.prototype.onRowDataChanged = function (_a) {
        var _this = this;
        var rowNode = _a.rowNode, oldData = _a.oldData, newData = _a.newData;
        // this is not quite right as its breaking for master / detail : openign a Master fires DataChanged Events of update : false and no oldData
        // should we check the event for false?
        // or should we check for oldData?
        // for now will do the second...
        // might need to rethink if we add full cache and then just return if its master / details
        if (oldData == null || oldData == undefined) {
            return;
        }
        if (oldData == newData) {
            return;
        }
        var identifierValue = this.getPrimaryKeyValueFromRowNode(rowNode);
        Object.keys(oldData).forEach(function (key) {
            var oldValue = oldData[key];
            var newValue = newData[key];
            if (oldValue != newValue) {
                var dataChangedInfo = {
                    OldValue: oldValue,
                    NewValue: newValue,
                    ColumnId: key,
                    PrimaryKeyValue: identifierValue,
                    RowNode: rowNode,
                };
                // we cannot check here for cell validation as it will be too late
                // so we have to hope that its been done already - though currently we ONLY do it for direct edits and setCellValue() but not other api updates
                // if we have gone through AdaptableAPI we will be fine but not if they update ag-Grid directly
                // but we can perform the POST EDIT checks
                // probably wrong but seems agGrid is doing it for us
                _this.performPostEditChecks(dataChangedInfo, false, false);
            }
        });
    };
    /**
     * There are a few things that we need to do AFTER we edit a cell and it makes sense to put them in one place
     */
    Adaptable.prototype.performPostEditChecks = function (dataChangedInfo, applyUserDataFilter, applyExternalDataFilter) {
        if (this.AuditLogService.isAuditCellEditsEnabled) {
            this.AuditLogService.addEditCellAuditLog(dataChangedInfo);
        }
        this.FreeTextColumnService.CheckIfDataChangingColumnIsFreeText(dataChangedInfo);
        this.DataService.CreateDataChangedEvent(dataChangedInfo);
        if (applyUserDataFilter) {
            this.filterOnUserDataChange([dataChangedInfo.RowNode]);
        }
        if (applyExternalDataFilter) {
            this.filterOnExternalDataChange([dataChangedInfo.RowNode]);
        }
        this.checkChangedCellCurrentlySelected(dataChangedInfo);
    };
    Adaptable.prototype.checkChangedCellCurrentlySelected = function (dataChangedInfo) {
        var selectedCellInfo = this.api.gridApi.getSelectedCellInfo();
        if (selectedCellInfo && ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(selectedCellInfo.GridCells)) {
            var matchingCell = selectedCellInfo.GridCells.find(function (gc) {
                return gc.primaryKeyValue == dataChangedInfo.PrimaryKeyValue &&
                    gc.columnId == dataChangedInfo.ColumnId;
            });
            if (matchingCell) {
                this.setSelectedCells();
            }
        }
        var selectedRowInfo = this.api.gridApi.getSelectedRowInfo();
        if (selectedRowInfo && ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(selectedRowInfo.GridRows)) {
            var matchingRow = selectedRowInfo.GridRows.find(function (gr) { return gr.primaryKeyValue == dataChangedInfo.PrimaryKeyValue; });
            if (matchingRow) {
                this.setSelectedRows();
            }
        }
    };
    Adaptable.prototype.removePercentBar = function (pcr) {
        var renderedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(pcr.ColumnId, this.api.gridApi.getColumns());
        if (renderedColumn) {
            var vendorGridColumn = this.gridOptions.columnApi.getColumn(pcr.ColumnId);
            // note we dont get it from the original (but I guess it will be applied next time you run...)
            vendorGridColumn.getColDef().cellRenderer = null;
            var coldDef = vendorGridColumn.getColDef();
            coldDef.cellRenderer = null;
            // change the style back if it was changed by us
            if (coldDef.cellClass == 'number-cell-changed') {
                coldDef.cellClass = 'number-cell';
            }
        }
    };
    Adaptable.prototype.editPercentBar = function (pcr) {
        this.removePercentBar(pcr);
        this.addPercentBar(pcr);
    };
    Adaptable.prototype.removeGradientColumn = function (gradientColumn) {
        var agGridColDef = this.gridOptions.api.getColumnDef(gradientColumn.ColumnId);
        if (agGridColDef && agGridColDef.cellStyle) {
            agGridColDef.cellStyle = undefined;
        }
    };
    Adaptable.prototype.addGradientColumn = function (gradientColumn) {
        var agGridColDef = this.gridOptions.api.getColumnDef(gradientColumn.ColumnId);
        if (agGridColDef) {
            agGridColDef.cellStyle = function (params) {
                var color;
                var gradientValue;
                var baseValue = gradientColumn.BaseValue;
                var isNegativeValue = params.value < 0;
                if (isNegativeValue) {
                    color = gradientColumn.NegativeColor;
                    gradientValue = gradientColumn.NegativeValue;
                }
                else {
                    color = gradientColumn.PositiveColor;
                    gradientValue = gradientColumn.PositiveValue;
                }
                if (gradientValue && baseValue !== undefined) {
                    var increase = Math.abs(gradientValue - baseValue);
                    var percentage = ((params.value - baseValue) / increase) * 100;
                    if (isNegativeValue) {
                        percentage = percentage * -1;
                    }
                    var alpha = Number((percentage / 100).toPrecision(2)); //params.
                    return {
                        'background-color': new color_1.Color(color).toRgba(alpha),
                    };
                }
            };
        }
    };
    Adaptable.prototype.editGradientColumn = function (gradientColumn) {
        this.removeGradientColumn(gradientColumn);
        this.addGradientColumn(gradientColumn);
    };
    Adaptable.prototype.editSparklineColumn = function (sparklineColumn) {
        this.removeSparklineColumn(sparklineColumn);
        this.addSparklineColumn(sparklineColumn);
    };
    Adaptable.prototype.onSortChanged = function () {
        var _this = this;
        var sortModel = this.gridOptions.api.getSortModel();
        var columnSorts = [];
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(sortModel)) {
            sortModel.forEach(function (sm) {
                if (ColumnHelper_1.ColumnHelper.isSpecialColumn(sm.colId)) {
                    _this.agGridHelper.createGroupedColumnCustomSort(sm.colId);
                }
                var columnSort = {
                    Column: sm.colId,
                    SortOrder: sm.sort == 'asc' ? Enums_1.SortOrder.Ascending : Enums_1.SortOrder.Descending,
                };
                columnSorts.push(columnSort);
            });
        }
        this.api.internalApi.setColumnSorts(columnSorts);
    };
    Adaptable.prototype.getRowCount = function () {
        return this.gridOptions.rowData
            ? this.gridOptions.rowData.length
            : this.gridOptions.api.getDisplayedRowCount();
    };
    Adaptable.prototype.getColumnCount = function () {
        return this.gridOptions.columnApi.getAllColumns().length;
    };
    Adaptable.prototype.getVisibleRowCount = function () {
        return this.gridOptions.api.getDisplayedRowCount();
    };
    Adaptable.prototype.getVisibleColumnCount = function () {
        return this.gridOptions.columnApi.getAllColumns().filter(function (c) { return c.isVisible(); }).length;
    };
    Adaptable.prototype.selectColumn = function (columnId) {
        this.gridOptions.api.clearRangeSelection();
        var cellRangeParams = {
            rowStartIndex: 0,
            rowEndIndex: this.gridOptions.api.getDisplayedRowCount(),
            columnStart: columnId,
            columnEnd: columnId,
        };
        this.gridOptions.api.addCellRange(cellRangeParams);
    };
    Adaptable.prototype.setColumnSort = function (columnSorts) {
        // get the sort model
        var sortModel = [];
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columnSorts)) {
            columnSorts.forEach(function (gs) {
                var sortDescription = gs.SortOrder == Enums_1.SortOrder.Ascending ? 'asc' : 'desc';
                sortModel.push({ colId: gs.Column, sort: sortDescription });
            });
        }
        this.gridOptions.api.setSortModel(sortModel);
        this.gridOptions.api.onSortChanged();
    };
    Adaptable.prototype.setDataSource = function (dataSource) {
        this.gridOptions.api.setRowData(dataSource);
    };
    Adaptable.prototype.updateRows = function (dataRows, config) {
        config = config || {};
        if (config.batchUpdate) {
            this.gridOptions.api.batchUpdateRowData({ update: dataRows }, config.callback);
        }
        else {
            this.gridOptions.api.updateRowData({ update: dataRows });
        }
    };
    Adaptable.prototype.addRows = function (dataRows) {
        this.gridOptions.api.updateRowData({ add: dataRows });
    };
    Adaptable.prototype.deleteRows = function (dataRows) {
        this.gridOptions.api.updateRowData({ remove: dataRows });
    };
    Adaptable.prototype.updateQuickSearchRangeVisibleColumn = function (columnId) {
        if (this.isInitialised) {
            var quickSearchState = this.api.quickSearchApi.getQuickSearchState();
            // only update if quick search is not highlight and is set - rare use case...
            if (quickSearchState.DisplayAction != Enums_1.DisplayAction.HighlightCell &&
                StringExtensions_1.StringExtensions.IsNotNullOrEmpty(quickSearchState.QuickSearchText)) {
                var column = ColumnHelper_1.ColumnHelper.getColumnFromId(columnId, this.api.gridApi.getColumns());
                if (!column.IsExcludedFromQuickSearch) {
                    var quickSearchRange = this.getState().System.QuickSearchRange;
                    if (quickSearchRange != null) {
                        if (RangeHelper_1.RangeHelper.IsColumnAppropriateForRange(quickSearchRange, column)) {
                            var quickSearchVisibleColumnExpression = ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(column.ColumnId, null, null, null, [quickSearchRange]);
                            var quickSearchVisibleColumnExpressions = [].concat(this.getState().System.QuickSearchVisibleColumnExpressions);
                            quickSearchVisibleColumnExpressions.push(quickSearchVisibleColumnExpression);
                            this.AdaptableStore.TheStore.dispatch(SystemRedux.QuickSearchSetVisibleColumnExpressions(quickSearchVisibleColumnExpressions));
                        }
                    }
                }
            }
        }
    };
    Adaptable.prototype.checkColumnsDataTypeSet = function () {
        // check that we have no unknown columns - if we do then ok
        var firstCol = this.api.gridApi.getColumns()[0];
        if (firstCol && firstCol.DataType == Enums_1.DataType.Unknown) {
            this.setColumnIntoStore();
        }
    };
    Adaptable.prototype.getVendorGridDefaultLayoutInfo = function () {
        return {
            GroupState: null,
            ColumnState: JSON.stringify(this.gridOptions.columnApi.getColumnState()),
            ColumnGroupState: JSON.stringify(this.gridOptions.columnApi.getColumnGroupState()),
            InPivotMode: this.gridOptions.pivotMode,
        };
    };
    Adaptable.prototype.getVendorGridLayoutInfo = function (visibleCols) {
        if (this.adaptableOptions.layoutOptions != null &&
            this.adaptableOptions.layoutOptions.includeVendorStateInLayouts != null &&
            this.adaptableOptions.layoutOptions.includeVendorStateInLayouts) {
            var groupedState = null;
            var displayedColumns = this.gridOptions.columnApi.getAllDisplayedColumns();
            var groupedCol = displayedColumns.find(function (c) { return ColumnHelper_1.ColumnHelper.isSpecialColumn(c.getColId()); });
            if (groupedCol) {
                groupedState = groupedCol.getActualWidth();
            }
            var columnState = this.gridOptions.columnApi.getColumnState();
            // Dont like this but not sure we have a choice to avoid other issues...
            // Going to update the state to make sure that visibility matches those given here
            columnState.forEach(function (c) {
                // to do
                var colId = c.colId;
                if (visibleCols.find(function (v) { return v == colId; })) {
                    c.hide = false;
                }
                else {
                    c.hide = true;
                }
            });
            var columnGroupState = this.gridOptions.columnApi.getColumnGroupState();
            return {
                GroupState: groupedState,
                ColumnState: JSON.stringify(columnState),
                ColumnGroupState: ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columnGroupState)
                    ? JSON.stringify(columnGroupState)
                    : null,
                InPivotMode: this.gridOptions.columnApi.isPivotMode(),
            };
        }
        return null; // need this?
    };
    Adaptable.prototype.setVendorGridLayoutInfo = function (vendorGridInfo) {
        if (vendorGridInfo) {
            if (vendorGridInfo.ColumnState) {
                var columnState = JSON.parse(vendorGridInfo.ColumnState);
                if (columnState) {
                    this.setColumnState(this.gridOptions.columnApi, columnState, 'api');
                }
            }
            if (vendorGridInfo.GroupState) {
                var groupedState = vendorGridInfo.GroupState;
                if (groupedState) {
                    // assume for now its just a number
                    var column = this.gridOptions.columnApi.getColumn('ag-Grid-AutoColumn');
                    if (column) {
                        this.gridOptions.columnApi.setColumnWidth(column, groupedState, true);
                    }
                }
            }
            if (vendorGridInfo.ColumnGroupState) {
                var columnGroupState = vendorGridInfo.ColumnGroupState;
                if (columnGroupState) {
                    this.gridOptions.columnApi.setColumnGroupState(JSON.parse(columnGroupState));
                }
            }
            if (vendorGridInfo.InPivotMode && vendorGridInfo.InPivotMode == true) {
                this.gridOptions.columnApi.setPivotMode(true);
            }
            else {
                this.gridOptions.columnApi.setPivotMode(false);
            }
        }
    };
    Adaptable.prototype.setGroupedColumns = function (groupedCols) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(groupedCols)) {
            this.gridOptions.columnApi.setRowGroupColumns(groupedCols);
        }
        else {
            this.gridOptions.columnApi.setRowGroupColumns([]);
        }
        if (this.adaptableOptions.layoutOptions.autoSizeColumnsInLayout == true) {
            this.gridOptions.columnApi.autoSizeAllColumns();
        }
    };
    Adaptable.prototype.setPivotingDetails = function (pivotDetails) {
        var isPivotLayout = this.LayoutService.isPivotedLayout(pivotDetails);
        // if its not a pivot layout then turn off pivot mode and get out
        if (!isPivotLayout) {
            this.gridOptions.columnApi.setPivotMode(false);
            return;
        }
        if (ArrayExtensions_1.ArrayExtensions.IsNotNull(pivotDetails.PivotColumns)) {
            this.gridOptions.columnApi.setPivotColumns(pivotDetails.PivotColumns);
        }
        if (ArrayExtensions_1.ArrayExtensions.IsNotNull(pivotDetails.AggregationColumns)) {
            this.gridOptions.columnApi.setValueColumns(pivotDetails.AggregationColumns);
        }
    };
    Adaptable.prototype.setPivotMode = function (pivotDetails, vendorGridInfo) {
        if (vendorGridInfo == null) {
            if (this.LayoutService.isPivotedLayout(pivotDetails)) {
                this.turnOnPivoting();
            }
            else {
                this.turnOffPivoting();
            }
        }
        else {
            if (vendorGridInfo.InPivotMode && vendorGridInfo.InPivotMode == true) {
                this.turnOnPivoting();
            }
            else {
                this.turnOffPivoting();
            }
        }
    };
    Adaptable.prototype.turnOnPivoting = function () {
        this.gridOptions.columnApi.setPivotMode(true);
    };
    Adaptable.prototype.turnOffPivoting = function () {
        this.gridOptions.columnApi.setPivotMode(false);
    };
    // these 3 methods are strange as we shouldnt need to have to set a columnEventType but it seems agGrid forces us to
    // not sure why as its not in the api
    Adaptable.prototype.setColumnVisible = function (columnApi, col, isVisible, columnEventType) {
        columnApi.setColumnVisible(col, isVisible, columnEventType);
    };
    Adaptable.prototype.moveColumn = function (columnApi, col, index, columnEventType) {
        columnApi.moveColumn(col, index, columnEventType);
    };
    Adaptable.prototype.setColumnState = function (columnApi, columnState, columnEventType) {
        columnApi.setColumnState(columnState, columnEventType);
    };
    Adaptable.prototype.isSelectable = function () {
        var isRangeSelectionModuleRegistered = this.agGridHelper.isModulePresent('range-selection');
        if (isRangeSelectionModuleRegistered &&
            this.gridOptions.enableRangeSelection != null &&
            this.gridOptions.enableRangeSelection) {
            return true;
        }
        return false;
    };
    Adaptable.prototype.isQuickFilterActive = function () {
        return (this.gridOptions.floatingFilter === true &&
            this.adaptableOptions.filterOptions.useAdaptableQuickFilter);
    };
    Adaptable.prototype.showQuickFilter = function () {
        var _this = this;
        if (this.adaptableOptions.filterOptions.useAdaptableQuickFilter) {
            this.gridOptions.floatingFilter = true;
            this.gridOptions.columnApi.getAllGridColumns().forEach(function (col) {
                _this.createQuickFilterWrapper(col);
            });
            this.gridOptions.api.refreshHeader();
        }
    };
    Adaptable.prototype.hideQuickFilter = function () {
        if (this.adaptableOptions.filterOptions.useAdaptableQuickFilter) {
            this.gridOptions.floatingFilter = false;
            this.gridOptions.api.refreshHeader();
        }
    };
    Adaptable.prototype.applyAdaptableTheme = function (theme) {
        var themeName = typeof theme === 'string' ? theme : theme.Name;
        var themeNamesToRemove = [];
        var themesToRemove = [];
        var allThemes = this.api.themeApi.getAllTheme();
        var allThemesMap = allThemes.reduce(function (acc, theme) {
            acc[theme.Name] = theme;
            return acc;
        }, {});
        // const themePrefix = 'ab--theme-'
        var el = document.documentElement;
        el.classList.forEach(function (cssClassName) {
            var index = cssClassName.indexOf(StyleConstants.THEME_STYLE);
            if (index === 0) {
                themeNamesToRemove.push(cssClassName);
                var themeName_1 = cssClassName.substring(StyleConstants.THEME_STYLE.length);
                if (allThemesMap[themeName_1]) {
                    themesToRemove.push(allThemesMap[themeName_1]);
                }
            }
        });
        themeNamesToRemove.forEach(function (cssClassName) { return el.classList.remove(cssClassName); });
        var newTheme = allThemesMap[themeName];
        var newThemeClassName = StyleConstants.THEME_STYLE + themeName;
        el.classList.add(newThemeClassName);
        var computedDocumentStyle = getComputedStyle(el);
        var _a = tslib_1.__read(['--ab-loaded', '--ab-theme-loaded'].map(function (variable) {
            var val = computedDocumentStyle.getPropertyValue(variable);
            if (typeof val === 'string' && val.trim) {
                val = val.trim();
            }
            return val;
        }), 2), abLoaded = _a[0], abThemeLoaded = _a[1];
        var systemThemes = this.api.themeApi.getAllSystemTheme();
        var isSystemTheme = !!systemThemes.filter(function (t) { return t.Name === themeName; })[0];
        var container = this.getGridContainerElement();
        if (newTheme && isSystemTheme) {
            if (themeName === GeneralConstants_1.LIGHT_THEME) {
                newTheme.VendorGridClassName = this.agGridHelper.getVendorLightThemeName();
            }
            if (themeName === GeneralConstants_1.DARK_THEME) {
                newTheme.VendorGridClassName = this.agGridHelper.getVendorDarkThemeName();
            }
        }
        if (!newTheme.VendorGridClassName) {
            // default the vendor grid to the light theme
            newTheme.VendorGridClassName = this.agGridHelper.getVendorLightThemeName();
        }
        if (container != null) {
            if (themesToRemove.length) {
                themesToRemove.forEach(function (theme) {
                    if (theme.VendorGridClassName) {
                        container.classList.remove(theme.VendorGridClassName);
                    }
                });
            }
            if (newTheme && newTheme.VendorGridClassName) {
                container.classList.add(newTheme.VendorGridClassName);
            }
            container.classList.add('ab-Grid');
            if (this.adaptableOptions.filterOptions.indicateFilteredColumns) {
                container.classList.add('ab-Grid--indicate-filtered-columns');
            }
        }
        // if (isSystemTheme) {
        //   const container = this.getGridContainerElement();
        //   if (container != null) {
        //     const vendorLight = this.agGridHelper.getVendorLightThemeName();
        //     const vendorDark = this.agGridHelper.getVendorDarkThemeName();
        //     container.classList.remove(vendorLight);
        //     container.classList.remove(vendorDark);
        //     container.classList.add(themeName === LIGHT_THEME ? vendorLight : vendorDark);
        //   }
        // }
        if (abLoaded !== '777') {
            LoggingHelper_1.LoggingHelper.LogError('Please import Adaptable styles from "adaptableadaptable/index.css"');
        }
        // every theme should define a custom css variable: --ab-theme-loaded: <themeName> defined on the document element.
        if (abThemeLoaded !== themeName) {
            LoggingHelper_1.LoggingHelper.LogWarning("Theme \"" + themeName + "\" doesn't seem to be loaded! Make sure you import the css file for the \"" + themeName + "\" theme!\n\nIf it's a default theme, try\n\nimport \"@adaptabletools/adaptable/themes/" + themeName + ".css\"");
        }
    };
    Adaptable.prototype.setUpRowStyles = function () {
        this.agGridHelper.setUpRowStyles();
    };
    Adaptable.prototype.clearRowStyles = function () {
        this.agGridHelper.clearRowStyles();
    };
    // Method called after we have rendered the grid
    // where we apply our stuff but also any ag-Grid props that we control
    Adaptable.prototype.applyFinalRendering = function () {
        var _this = this;
        // Apply row styles here?  weird that it cannot find the method in Helper.
        this.setUpRowStyles();
        // not sure if this is the right place here.
        // perhaps we need some onDataLoaded event??
        var editLookUpCols = this.api.userInterfaceApi.getUserInterfaceState().EditLookUpColumns;
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(editLookUpCols)) {
            var colDefs = this.mapColumnDefs(function (colDef) {
                editLookUpCols.forEach(function (editLookUpColumn) {
                    if (colDef.field === editLookUpColumn.ColumnId) {
                        colDef.cellEditor = 'agRichSelectCellEditor';
                        if (editLookUpColumn.LookUpValues) {
                            colDef.cellEditorParams = {
                                values: _this.api.userInterfaceApi.getEditLookUpValuesForColumn(editLookUpColumn.ColumnId),
                            };
                        }
                        else {
                            colDef.cellEditorParams = {
                                values: _this.getColumnValueDisplayValuePairDistinctList(editLookUpColumn.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue, false).map(function (t) { return t.DisplayValue; }),
                            };
                        }
                    }
                });
                return colDef;
            });
            this.safeSetColDefs(colDefs);
        }
        // sometimes the header row looks wrong when using quick filter so to be sure...
        if (this.isQuickFilterActive()) {
            this.api.internalApi.showQuickFilterBar();
            this.gridOptions.api.refreshHeader();
        }
        // if user layout and a percent bar sometimes the first few cells are pre-rendered so we frig it like this
        var currentlayout = this.api.layoutApi.getCurrentLayoutName();
        if (currentlayout != GeneralConstants_1.DEFAULT_LAYOUT &&
            ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.api.percentBarApi.getAllPercentBar())) {
            this.api.layoutApi.setLayout(GeneralConstants_1.DEFAULT_LAYOUT);
        }
        // at the end so load the current layout
        this.api.layoutApi.setLayout(currentlayout);
        // in case we have an existing quick search we need to make sure its applied
        this.api.quickSearchApi.applyQuickSearch(this.api.quickSearchApi.getQuickSearchValue());
    };
    // A couple of state management functions
    Adaptable.prototype.getState = function () {
        return this.AdaptableStore.TheStore.getState();
    };
    return Adaptable;
}());
exports.Adaptable = Adaptable;
//export const init = (adaptableOptions: AdaptableOptions): AdaptableApi =>
//  Adaptable.init(adaptableOptions);
var AdaptableNoCodeWizard = /** @class */ (function () {
    /**
     * @param adaptableOptions
     */
    function AdaptableNoCodeWizard(adaptableOptions, extraOptions) {
        if (extraOptions === void 0) { extraOptions = {}; }
        var defaultInit = function (_a) {
            var gridOptions = _a.gridOptions, adaptableOptions = _a.adaptableOptions;
            adaptableOptions.vendorGrid = gridOptions;
            return new Adaptable(adaptableOptions);
        };
        this.adaptableOptions = adaptableOptions;
        this.init = extraOptions.onInit || defaultInit;
        this.extraOptions = extraOptions;
        this.render();
    }
    AdaptableNoCodeWizard.prototype.render = function (container) {
        var _this = this;
        var id = DefaultAdaptableOptions_1.DefaultAdaptableOptions.containerOptions.adaptableContainer || 'adaptable';
        if (!container) {
            if (this.adaptableOptions.containerOptions) {
                id = this.adaptableOptions.containerOptions.adaptableContainer || 'adaptable';
            }
        }
        container = container || document.getElementById(id);
        if (!container) {
            throw new Error('Cannot find container in which to render Adaptable No Code Wizard');
        }
        ReactDOM.render(React.createElement(AdaptableWizardView_1.default, tslib_1.__assign(tslib_1.__assign({ adaptableOptions: this.adaptableOptions }, this.extraOptions), { onInit: function (adaptableOptions) {
                var adaptable;
                ReactDOM.unmountComponentAtNode(container);
                adaptable = _this.init({
                    adaptableOptions: adaptableOptions,
                    gridOptions: adaptableOptions.vendorGrid,
                });
                adaptable = adaptable || new Adaptable(adaptableOptions);
            } })), container);
    };
    return AdaptableNoCodeWizard;
}());
exports.AdaptableNoCodeWizard = AdaptableNoCodeWizard;
