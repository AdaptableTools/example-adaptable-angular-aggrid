"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var all_modules_1 = require("@ag-grid-community/all-modules");
var StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var AdvancedSearchStrategy_1 = require("../Strategy/AdvancedSearchStrategy");
var BulkUpdateStrategy_1 = require("../Strategy/BulkUpdateStrategy");
var CalculatedColumnStrategy_1 = require("../Strategy/CalculatedColumnStrategy");
var CalendarStrategy_1 = require("../Strategy/CalendarStrategy");
var CellValidationStrategy_1 = require("../Strategy/CellValidationStrategy");
var ColumnChooserStrategy_1 = require("../Strategy/ColumnChooserStrategy");
var ColumnFilterStrategy_1 = require("../Strategy/ColumnFilterStrategy");
var ColumnInfoStrategy_1 = require("../Strategy/ColumnInfoStrategy");
var ConditionalStyleStrategyagGrid_1 = require("./Strategy/ConditionalStyleStrategyagGrid");
var CustomSortStrategyagGrid_1 = require("./Strategy/CustomSortStrategyagGrid");
var DashboardStrategy_1 = require("../Strategy/DashboardStrategy");
var StateManagementStrategy_1 = require("../Strategy/StateManagementStrategy");
var DataSourceStrategy_1 = require("../Strategy/DataSourceStrategy");
var ExportStrategy_1 = require("../Strategy/ExportStrategy");
var FlashingCellsStrategyagGrid_1 = require("./Strategy/FlashingCellsStrategyagGrid");
var FormatColumnStrategyagGrid_1 = require("./Strategy/FormatColumnStrategyagGrid");
var FreeTextColumnStrategy_1 = require("../Strategy/FreeTextColumnStrategy");
var HomeStrategy_1 = require("../Strategy/HomeStrategy");
var LayoutStrategy_1 = require("../Strategy/LayoutStrategy");
var ColumnCategoryStrategy_1 = require("../Strategy/ColumnCategoryStrategy");
var PercentBarStrategy_1 = require("../Strategy/PercentBarStrategy");
var PlusMinusStrategy_1 = require("../Strategy/PlusMinusStrategy");
var QuickSearchStrategy_1 = require("../Strategy/QuickSearchStrategy");
var SmartEditStrategy_1 = require("../Strategy/SmartEditStrategy");
var ShortcutStrategy_1 = require("../Strategy/ShortcutStrategy");
var TeamSharingStrategy_1 = require("../Strategy/TeamSharingStrategy");
var ThemeStrategy_1 = require("../Strategy/ThemeStrategy");
var CellSummaryStrategy_1 = require("../Strategy/CellSummaryStrategy");
var UserFilterStrategy_1 = require("../Strategy/UserFilterStrategy");
var SystemStatusStrategy_1 = require("../Strategy/SystemStatusStrategy");
var ReminderStrategy_1 = require("../Strategy/ReminderStrategy");
var ScheduleStrategy_1 = require("../Strategy/ScheduleStrategy");
var LoggingHelper_1 = require("../Utilities/Helpers/LoggingHelper");
var ColumnHelper_1 = require("../Utilities/Helpers/ColumnHelper");
var AlertStrategyagGrid_1 = require("./Strategy/AlertStrategyagGrid");
var UpdatedRowStrategyagGrid_1 = require("./Strategy/UpdatedRowStrategyagGrid");
var Helper_1 = require("../Utilities/Helpers/Helper");
var AdaptableHelper_1 = require("../Utilities/Helpers/AdaptableHelper");
var icons_1 = require("../components/icons");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var Uuid_1 = require("../PredefinedConfig/Uuid");
var PushPullStrategy_1 = require("../Strategy/PushPullStrategy");
var Glue42Strategy_1 = require("../Strategy/Glue42Strategy");
var GradientColumnStrategy_1 = require("../Strategy/GradientColumnStrategy");
var ObjectFactory_1 = require("../Utilities/ObjectFactory");
/**
 * Adaptable ag-Grid implementation is getting really big and unwieldy
 * So lets put some of the more obvious 'Helper' functions here
 * This is a bit crap - it should take a GridOptions object...
 */
// tslint:disable-next-line: class-name
var agGridHelper = /** @class */ (function () {
    function agGridHelper(adaptable, gridOptions) {
        this.adaptable = adaptable;
        this.gridOptions = gridOptions;
        this.adaptable = adaptable;
        this.gridOptions = gridOptions;
    }
    agGridHelper.prototype.getVendorLightThemeName = function () {
        return 'ag-theme-balham';
    };
    agGridHelper.prototype.getVendorDarkThemeName = function () {
        return 'ag-theme-balham-dark';
    };
    agGridHelper.prototype.setUpStrategies = function () {
        var strategies = new Map();
        var adaptable = this.adaptable;
        strategies.set(StrategyConstants.AlertStrategyId, new AlertStrategyagGrid_1.AlertStrategyagGrid(adaptable));
        strategies.set(StrategyConstants.AdvancedSearchStrategyId, new AdvancedSearchStrategy_1.AdvancedSearchStrategy(adaptable));
        strategies.set(StrategyConstants.BulkUpdateStrategyId, new BulkUpdateStrategy_1.BulkUpdateStrategy(adaptable));
        strategies.set(StrategyConstants.CalculatedColumnStrategyId, new CalculatedColumnStrategy_1.CalculatedColumnStrategy(adaptable));
        strategies.set(StrategyConstants.CalendarStrategyId, new CalendarStrategy_1.CalendarStrategy(adaptable));
        strategies.set(StrategyConstants.CellValidationStrategyId, new CellValidationStrategy_1.CellValidationStrategy(adaptable));
        strategies.set(StrategyConstants.ColumnChooserStrategyId, new ColumnChooserStrategy_1.ColumnChooserStrategy(adaptable));
        strategies.set(StrategyConstants.ColumnFilterStrategyId, new ColumnFilterStrategy_1.ColumnFilterStrategy(adaptable));
        strategies.set(StrategyConstants.ColumnInfoStrategyId, new ColumnInfoStrategy_1.ColumnInfoStrategy(adaptable));
        strategies.set(StrategyConstants.ConditionalStyleStrategyId, new ConditionalStyleStrategyagGrid_1.ConditionalStyleStrategyagGrid(adaptable));
        strategies.set(StrategyConstants.CustomSortStrategyId, new CustomSortStrategyagGrid_1.CustomSortStrategyagGrid(adaptable));
        strategies.set(StrategyConstants.DashboardStrategyId, new DashboardStrategy_1.DashboardStrategy(adaptable));
        strategies.set(StrategyConstants.DataSourceStrategyId, new DataSourceStrategy_1.DataSourceStrategy(adaptable));
        strategies.set(StrategyConstants.ExportStrategyId, new ExportStrategy_1.ExportStrategy(adaptable));
        strategies.set(StrategyConstants.FlashingCellsStrategyId, new FlashingCellsStrategyagGrid_1.FlashingCellStrategyagGrid(adaptable));
        strategies.set(StrategyConstants.UpdatedRowStrategyId, new UpdatedRowStrategyagGrid_1.UpdatedRowStrategyagGrid(adaptable));
        strategies.set(StrategyConstants.FormatColumnStrategyId, new FormatColumnStrategyagGrid_1.FormatColumnStrategyagGrid(adaptable));
        strategies.set(StrategyConstants.FreeTextColumnStrategyId, new FreeTextColumnStrategy_1.FreeTextColumnStrategy(adaptable));
        strategies.set(StrategyConstants.GradientColumnStrategyId, new GradientColumnStrategy_1.GradientColumnStrategy(adaptable));
        strategies.set(StrategyConstants.HomeStrategyId, new HomeStrategy_1.HomeStrategy(adaptable));
        strategies.set(StrategyConstants.LayoutStrategyId, new LayoutStrategy_1.LayoutStrategy(adaptable));
        strategies.set(StrategyConstants.ColumnCategoryStrategyId, new ColumnCategoryStrategy_1.ColumnCategoryStrategy(adaptable));
        strategies.set(StrategyConstants.PercentBarStrategyId, new PercentBarStrategy_1.PercentBarStrategy(adaptable));
        strategies.set(StrategyConstants.PlusMinusStrategyId, new PlusMinusStrategy_1.PlusMinusStrategy(adaptable));
        strategies.set(StrategyConstants.QuickSearchStrategyId, new QuickSearchStrategy_1.QuickSearchStrategy(adaptable));
        strategies.set(StrategyConstants.SmartEditStrategyId, new SmartEditStrategy_1.SmartEditStrategy(adaptable));
        strategies.set(StrategyConstants.ShortcutStrategyId, new ShortcutStrategy_1.ShortcutStrategy(adaptable));
        strategies.set(StrategyConstants.StateManagementStrategyId, new StateManagementStrategy_1.StateManagementStrategy(adaptable));
        strategies.set(StrategyConstants.TeamSharingStrategyId, new TeamSharingStrategy_1.TeamSharingStrategy(adaptable));
        strategies.set(StrategyConstants.SystemStatusStrategyId, new SystemStatusStrategy_1.SystemStatusStrategy(adaptable));
        strategies.set(StrategyConstants.ThemeStrategyId, new ThemeStrategy_1.ThemeStrategy(adaptable));
        strategies.set(StrategyConstants.CellSummaryStrategyId, new CellSummaryStrategy_1.CellSummaryStrategy(adaptable));
        strategies.set(StrategyConstants.UserFilterStrategyId, new UserFilterStrategy_1.UserFilterStrategy(adaptable));
        strategies.set(StrategyConstants.ReminderStrategyId, new ReminderStrategy_1.ReminderStrategy(adaptable));
        strategies.set(StrategyConstants.ScheduleStrategyId, new ScheduleStrategy_1.ScheduleStrategy(adaptable));
        // should probably both be plugins
        strategies.set(StrategyConstants.IPushPullStrategyId, new PushPullStrategy_1.PushPullStrategy(adaptable));
        strategies.set(StrategyConstants.Glue42StrategyId, new Glue42Strategy_1.Glue42Strategy(adaptable));
        return strategies;
    };
    agGridHelper.prototype.TrySetUpNodeIds = function () {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.adaptable.adaptableOptions.primaryKey)) {
            // if no valid pk then always false
            return false;
        }
        // need some way of checking if running on client on server: if on server then we return false
        if (this.gridOptions.getRowNodeId != null) {
            return true;
        }
        // also we can check if they have done it
        var primaryKey = this.adaptable.adaptableOptions.primaryKey;
        // otherwise lets set the Id so that it returns the primaryKey
        this.gridOptions.getRowNodeId = function (data) {
            return data[primaryKey];
        };
        return true;
    };
    agGridHelper.prototype.createSparklineCellRendererComp = function (sparkline, adaptableId) {
        return this.adaptable.lookupPlugins('sparklineColumnRenderer', sparkline);
    };
    agGridHelper.prototype.createPercentBarCellRendererFunc = function (pcr, adaptableId) {
        var _this = this;
        var showNegatives = pcr.NegativeValue != undefined && pcr.NegativeValue < 0;
        var showPositives = pcr.PositiveValue != undefined && pcr.PositiveValue >= 0;
        var cellRendererFunc = function (params) {
            var isNegativeValue = params.value < 0;
            var value = params.value;
            if (Helper_1.default.objectNotExists(value)) {
                value = 0;
            }
            var positiveValue = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(pcr.PositiveValueColumnId)
                ? _this.adaptable.getRawValueFromRowNode(params.node, pcr.PositiveValueColumnId)
                : pcr.PositiveValue;
            var negativeValue = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(pcr.NegativeValueColumnId)
                ? _this.adaptable.getRawValueFromRowNode(params.node, pcr.NegativeValueColumnId)
                : pcr.NegativeValue;
            if (isNegativeValue) {
                value *= -1;
            }
            var percentagePositiveValue = (100 / positiveValue) * value;
            var percentageNegativeValue = (100 / (negativeValue * -1)) * value;
            if (showNegatives && showPositives) {
                // if need both then half the space
                percentagePositiveValue /= 2;
                percentageNegativeValue /= 2;
            }
            var eOuterDiv = document.createElement('div');
            eOuterDiv.className = 'ab_div-colour-render-div';
            if (pcr.ShowValue) {
                var showValueBar = document.createElement('div');
                showValueBar.id = "ab_div-colour-render-text_" + adaptableId + "_" + pcr.ColumnId;
                showValueBar.className = 'ab_div-colour-render-text';
                if (showNegatives && showPositives) {
                    showValueBar.style.paddingLeft = isNegativeValue ? '50%' : '20%';
                }
                else {
                    showValueBar.style.paddingLeft = '5px';
                }
                showValueBar.innerHTML = params.value;
                eOuterDiv.appendChild(showValueBar);
            }
            if (showNegatives) {
                var fullWidth = showPositives ? 50 : 100;
                var negativeDivBlankBar = document.createElement('div');
                negativeDivBlankBar.className = 'ab_div-colour-render-bar';
                negativeDivBlankBar.id = "ab_div-colour-blank-bar_" + adaptableId + "_" + pcr.ColumnId;
                negativeDivBlankBar.style.width = fullWidth - percentageNegativeValue + "%";
                eOuterDiv.appendChild(negativeDivBlankBar);
                var negativeDivPercentBar = document.createElement('div');
                negativeDivPercentBar.className = 'ab_div-colour-render-bar';
                negativeDivBlankBar.id = "ab_div-colour-negative-bar_" + adaptableId + "_" + pcr.ColumnId;
                negativeDivPercentBar.style.width = percentageNegativeValue + "%";
                if (isNegativeValue) {
                    negativeDivPercentBar.style.backgroundColor = pcr.NegativeColor;
                }
                eOuterDiv.appendChild(negativeDivPercentBar);
            }
            if (showPositives) {
                var positivePercentBarDiv = document.createElement('div');
                positivePercentBarDiv.className = 'ab_div-colour-render-bar';
                positivePercentBarDiv.id = "ab_div-colour-positive-bar_" + adaptableId + "_" + pcr.ColumnId;
                positivePercentBarDiv.style.width = percentagePositiveValue + "%";
                if (!isNegativeValue) {
                    positivePercentBarDiv.style.backgroundColor = pcr.PositiveColor;
                }
                eOuterDiv.appendChild(positivePercentBarDiv);
            }
            return eOuterDiv;
        };
        return cellRendererFunc;
    };
    agGridHelper.prototype.getCleanValue = function (value) {
        if (value == null || value == 'null' || value == undefined || value == 'undefined') {
            return undefined;
        }
        return String(value) || '';
    };
    agGridHelper.prototype.getRenderedValue = function (percentBars, colDef, valueToRender) {
        var isRenderedColumn = ArrayExtensions_1.ArrayExtensions.ContainsItem(percentBars, colDef.field);
        if (isRenderedColumn) {
            return valueToRender;
        }
        var render = colDef.cellRenderer;
        if (typeof render === 'string') {
            return this.getCleanValue(valueToRender);
        }
        return render({ value: valueToRender }) || '';
    };
    agGridHelper.prototype.createAdaptableColumnFromVendorColumn = function (vendorColumn) {
        var colId = vendorColumn.getColId();
        var colDef = vendorColumn.getColDef();
        var abColumn = {
            Uuid: Uuid_1.createUuid(),
            ColumnId: colId,
            FriendlyName: this.gridOptions.columnApi.getDisplayNameForColumn(vendorColumn, 'header'),
            DataType: this.getColumnDataType(vendorColumn),
            Visible: vendorColumn.isVisible(),
            ReadOnly: this.isColumnReadonly(colDef),
            Sortable: this.isColumnSortable(colDef),
            Filterable: this.isColumnFilterable(colDef),
            IsSparkline: this.adaptable.api.sparklineColumnApi.isSparklineColumn(colId),
            Groupable: this.isColumnGroupable(colDef),
            Pivotable: this.isColumnPivotable(colDef),
            Aggregatable: this.isColumnAggregetable(colDef),
            SpecialColumn: false,
            IsExcludedFromQuickSearch: false,
        };
        // lets set this here one as the function cannot change the result so dont need to run it each time
        var excludeColumnFromQuickSearch = this.adaptable.adaptableOptions.searchOptions
            .excludeColumnFromQuickSearch;
        if (excludeColumnFromQuickSearch) {
            if (excludeColumnFromQuickSearch(abColumn)) {
                abColumn.IsExcludedFromQuickSearch = true;
            }
        }
        return abColumn;
    };
    agGridHelper.prototype.createAdaptableSideBarDefs = function (showFilterPanel, showColumnsPanel) {
        var toolPanelDef = [];
        if (showFilterPanel) {
            var filterToolPanel = {
                id: 'filters',
                labelDefault: 'Filters',
                labelKey: 'filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
            };
            toolPanelDef.push(filterToolPanel);
        }
        if (showColumnsPanel) {
            var columnsToolPanel = {
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
            };
            toolPanelDef.push(columnsToolPanel);
        }
        toolPanelDef.push(this.createAdaptableToolPanel());
        var abSideBarDef = {
            toolPanels: toolPanelDef,
            defaultToolPanel: '',
        };
        return abSideBarDef;
    };
    agGridHelper.prototype.createAdaptableToolPanel = function () {
        return {
            id: 'AdaptableToolPanel',
            labelDefault: this.adaptable.adaptableOptions.userInterfaceOptions.adaptableToolPanelTitle,
            labelKey: 'AdaptableToolPanel',
            iconKey: 'menu',
            toolPanel: 'AdaptableToolPanel',
        };
    };
    // This method reselects cells - only IF they are in a single column
    // Might be able to change that later
    // We do this by gettng the selected cells, clearing the selection and then re-applying
    agGridHelper.prototype.reselectSelectedCells = function () {
        var selectedCellRanges = this.gridOptions.api.getCellRanges();
        if (ArrayExtensions_1.ArrayExtensions.CorrectLength(selectedCellRanges, 1)) {
            var selectedCellRange = selectedCellRanges[0];
            var cellRangeParams = {
                rowStartIndex: selectedCellRange.startRow.rowIndex,
                rowEndIndex: selectedCellRange.endRow.rowIndex,
                columns: selectedCellRange.columns,
            };
            this.gridOptions.api.clearRangeSelection();
            this.gridOptions.api.addCellRange(cellRangeParams);
        }
    };
    agGridHelper.prototype.clearRowStyles = function () {
        this.gridOptions.rowStyle = undefined;
        this.gridOptions.rowClass = undefined;
        this.gridOptions.getRowClass = undefined;
        this.gridOptions.getRowStyle = undefined;
    };
    agGridHelper.prototype.setUpRowStyles = function () {
        var rowStyles = this.adaptable.api.userInterfaceApi.getUserInterfaceState()
            .RowStyles;
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(rowStyles)) {
            // First lets deal with Alls - we will get the first one and then get out
            var allRowStyle = rowStyles.find(function (rs) { return rs.RowType == 'All'; });
            if (allRowStyle) {
                if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(allRowStyle.Style.ClassName)) {
                    // we have a row style name so we can just set that for the whole grid and no need to use the function
                    this.gridOptions.rowClass = allRowStyle.Style.ClassName;
                }
                else {
                    // no row style name so se the rowstyle - again no need to use a function
                    this.gridOptions.rowStyle = {
                        background: allRowStyle.Style.BackColor,
                        color: allRowStyle.Style.ForeColor,
                        fontWeight: allRowStyle.Style.FontWeight,
                        fontStyle: allRowStyle.Style.FontStyle,
                    };
                }
            }
            else {
                // we dont have an all row style so now things get hard and we need to see if we have one alternating style or 2
                var evenRowStyle_1 = rowStyles.find(function (rs) { return rs.RowType == 'Even'; });
                var oddRowStyle_1 = rowStyles.find(function (rs) { return rs.RowType == 'Odd'; });
                // this logic feels a bit OTT but the idea is to avoid having to create this getRowClass or getRowStyle functions when not needed.
                var evenRowStyleName_1 = evenRowStyle_1 && evenRowStyle_1.Style.ClassName;
                var oddRowStyleName_1 = oddRowStyle_1 && oddRowStyle_1.Style.ClassName;
                var emptyEvenRowStyleName_1 = StringExtensions_1.StringExtensions.IsNullOrEmpty(evenRowStyleName_1);
                var emptyOddRowStyleName_1 = StringExtensions_1.StringExtensions.IsNullOrEmpty(oddRowStyleName_1);
                var atLeastOneNormalStyle = (evenRowStyle_1 && emptyEvenRowStyleName_1) || (oddRowStyle_1 && emptyOddRowStyleName_1);
                if (evenRowStyleName_1 || oddRowStyleName_1) {
                    this.gridOptions.getRowClass = function (params) {
                        if (evenRowStyleName_1) {
                            if (params.node.rowIndex % 2 === 0) {
                                return evenRowStyleName_1;
                            }
                        }
                        if (oddRowStyleName_1) {
                            if (params.node.rowIndex % 2 === 1) {
                                return oddRowStyleName_1;
                            }
                        }
                    };
                }
                if (atLeastOneNormalStyle) {
                    this.gridOptions.getRowStyle = function (params) {
                        if (evenRowStyle_1 && emptyEvenRowStyleName_1) {
                            if (params.node.rowIndex % 2 === 0) {
                                return {
                                    background: evenRowStyle_1.Style.BackColor,
                                    color: evenRowStyle_1.Style.ForeColor,
                                    fontWeight: evenRowStyle_1.Style.FontWeight,
                                    fontStyle: evenRowStyle_1.Style.FontStyle,
                                };
                            }
                        }
                        if (oddRowStyle_1 && emptyOddRowStyleName_1) {
                            if (params.node.rowIndex % 2 === 1) {
                                return {
                                    background: oddRowStyle_1.Style.BackColor,
                                    color: oddRowStyle_1.Style.ForeColor,
                                    fontWeight: oddRowStyle_1.Style.FontWeight,
                                    fontStyle: oddRowStyle_1.Style.FontStyle,
                                };
                            }
                        }
                    };
                }
            }
        }
    };
    agGridHelper.prototype.fireSelectionChangedEvent = function () {
        var selectionChangedInfo = {
            selectedCellInfo: this.adaptable.api.gridApi.getGridState().SelectedCellInfo,
            selectedRowInfo: this.adaptable.api.gridApi.getGridState().SelectedRowInfo,
        };
        var selectionChangedArgs = AdaptableHelper_1.default.createFDC3Message('Selection Changed Args', selectionChangedInfo);
        this.adaptable.api.eventApi.emit('SelectionChanged', selectionChangedArgs);
    };
    agGridHelper.prototype.createMenuInfo = function (params, column) {
        // lets build a picture of what has been right clicked.  Will take time to get right but lets start
        var colId = params.column.getColId();
        var primaryKeyValue = this.adaptable.getPrimaryKeyValueFromRowNode(params.node);
        var isSingleSelectedColumn = false;
        var isSelectedCell = false;
        var clickedCell = {
            columnId: colId,
            rawValue: params.value,
            displayValue: this.adaptable.getDisplayValueFromRowNode(params.node, colId),
            primaryKeyValue: primaryKeyValue,
        };
        var selectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();
        if (selectedCellInfo) {
            var matchedCell = selectedCellInfo.GridCells.find(function (gc) {
                return gc != null &&
                    gc.columnId == clickedCell.columnId &&
                    gc.primaryKeyValue == clickedCell.primaryKeyValue;
            });
            isSelectedCell = matchedCell != null;
            if (isSelectedCell) {
                isSingleSelectedColumn = ArrayExtensions_1.ArrayExtensions.CorrectLength(selectedCellInfo.Columns, 1);
            }
        }
        return {
            IsSelectedCell: isSelectedCell,
            GridCell: clickedCell,
            Column: column,
            RowNode: params.node,
            IsSingleSelectedColumn: isSingleSelectedColumn,
            PrimaryKeyValue: primaryKeyValue,
        };
    };
    agGridHelper.prototype.createAgGridMenuDefFromAdaptableMenu = function (x) {
        var _this = this;
        return {
            name: x.Label,
            action: x.ClickFunction
                ? x.ClickFunction
                : function () { return _this.adaptable.api.internalApi.dispatchReduxAction(x.ReduxAction); },
            icon: icons_1.iconToString(x.Icon, {
                style: {
                    fill: 'var(--ab-color-text-on-primary)',
                },
            }),
        };
    };
    agGridHelper.prototype.createAgGridMenuDefFromUsereMenu = function (x, menuInfo) {
        var _this = this;
        return {
            name: x.Label,
            action: function () { return x.UserMenuItemClickedFunction(menuInfo); },
            icon: x.Icon,
            subMenu: ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(x.SubMenuItems)
                ? undefined
                : x.SubMenuItems.map(function (s) {
                    return _this.createAgGridMenuDefFromUsereMenu(s, menuInfo);
                }),
        };
    };
    agGridHelper.prototype.isColumnReadonly = function (colDef) {
        // currently we do not support the fact that some rows are editable and some are not
        // if editable is a function then we return that its not readonly since we assume that some rowNode will be editable
        // that's wrong but we ll see if we face the issue later
        if (colDef && typeof colDef.editable === 'boolean') {
            return !colDef.editable;
        }
        return true;
    };
    agGridHelper.prototype.isColumnSortable = function (colDef) {
        if (colDef && colDef.sortable != null) {
            return colDef.sortable;
        }
        return false;
    };
    agGridHelper.prototype.isColumnGroupable = function (colDef) {
        if (colDef && colDef.enableRowGroup != null) {
            return colDef.enableRowGroup;
        }
        return false;
    };
    agGridHelper.prototype.isColumnPivotable = function (colDef) {
        if (colDef && colDef.enablePivot != null) {
            return colDef.enablePivot;
        }
        return false;
    };
    agGridHelper.prototype.isColumnAggregetable = function (colDef) {
        if (colDef && colDef.enableValue != null) {
            return colDef.enableValue;
        }
        return false;
    };
    agGridHelper.prototype.isColumnFilterable = function (colDef) {
        // follow agGrid logic which is that ONLY filterable if one explicitly set
        return colDef != null && colDef.filter != null && colDef.filter != false;
    };
    agGridHelper.prototype.getColumnDataType = function (column) {
        var _this = this;
        // Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!column) {
            LoggingHelper_1.default.LogAdaptableWarning('column is undefined returning String for Type');
            return Enums_1.DataType.String;
        }
        var dataType = Enums_1.DataType.Unknown;
        // get the column type if already in store (and not unknown)
        var existingColumn = ColumnHelper_1.default.getColumnFromId(column.getId(), this.adaptable.api.gridApi.getColumns());
        if (existingColumn && existingColumn.DataType != Enums_1.DataType.Unknown) {
            return existingColumn.DataType;
        }
        // check for column type
        var colType = column.getColDef().type;
        if (colType) {
            if (Array.isArray(colType)) {
                colType.forEach(function (c) {
                    if (dataType == Enums_1.DataType.Unknown) {
                        dataType = _this.getabColDefValue(c);
                    }
                });
            }
            else {
                dataType = this.getabColDefValue(colType);
            }
            if (dataType != Enums_1.DataType.Unknown) {
                return dataType;
            }
        }
        var model = this.gridOptions.api.getModel();
        if (model == null) {
            LoggingHelper_1.default.LogAdaptableWarning("No model so returning type \"Unknown\" for Column: \"" + column.getColId() + "\"");
            return Enums_1.DataType.Unknown;
        }
        var row = model.getRow(0);
        if (row == null) {
            // possible that there will be no data.
            LoggingHelper_1.default.LogAdaptableWarning("No data in grid so returning type \"Unknown\" for Column: \"" + column.getColId() + "\"");
            return Enums_1.DataType.Unknown;
        }
        // if it's a group we need the content of the group
        if (row.group) {
            var childNodes = row.childrenAfterGroup;
            if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(childNodes)) {
                LoggingHelper_1.default.LogAdaptableWarning("No data in grid so returning type \"Unknown\" for Column: \"" + column.getColId() + "\"");
                return Enums_1.DataType.Unknown;
            }
            row = childNodes[0];
        }
        var value = this.gridOptions.api.getValue(column, row);
        if (value instanceof Date) {
            dataType = Enums_1.DataType.Date;
        }
        else if (Array.isArray(value) && value.length && typeof value[0] === 'number') {
            dataType = Enums_1.DataType.NumberArray;
        }
        else {
            switch (typeof value) {
                case 'string':
                    dataType = Enums_1.DataType.String;
                    break;
                case 'number':
                    dataType = Enums_1.DataType.Number;
                    break;
                case 'boolean':
                    dataType = Enums_1.DataType.Boolean;
                    break;
                case 'object':
                    dataType = Enums_1.DataType.Object;
                    break;
                default:
                    break;
            }
        }
        LoggingHelper_1.default.LogAdaptableWarning("No defined type for column '" + column.getColId() + "'. Defaulting to type of first value: " + dataType);
        return dataType;
    };
    agGridHelper.prototype.getabColDefValue = function (colType) {
        if (colType == 'numericColumn') {
            return Enums_1.DataType.Number;
        }
        if (colType.startsWith('abColDef')) {
            switch (colType) {
                case 'abColDefNumber':
                    return Enums_1.DataType.Number;
                case 'abColDefNumberArray':
                    return Enums_1.DataType.NumberArray;
                case 'abColDefString':
                    return Enums_1.DataType.String;
                case 'abColDefBoolean':
                    return Enums_1.DataType.Boolean;
                case 'abColDefDate':
                    return Enums_1.DataType.Date;
                case 'abColDefObject':
                    return Enums_1.DataType.Object;
                default:
                    return Enums_1.DataType.Unknown;
            }
        }
        return Enums_1.DataType.Unknown;
    };
    agGridHelper.prototype.isModulePresent = function (moduleName) {
        var modules = all_modules_1.ModuleRegistry.getRegisteredModules();
        var moduleNames = modules.map(function (m) { return m.moduleName; });
        return ArrayExtensions_1.ArrayExtensions.ContainsAnyItem(moduleNames, [
            "@ag-grid-enterprise/" + moduleName,
            '@ag-grid-enterprise/all-modules',
        ]);
    };
    agGridHelper.prototype.createGroupedColumnCustomSort = function (colId) {
        var groupedColumn = this.gridOptions.columnApi
            .getAllColumns()
            .find(function (c) { return c.isRowGroupActive() == true; });
        if (groupedColumn) {
            var customSort = this.adaptable.api.customSortApi
                .getAllCustomSort()
                .find(function (cs) { return cs.ColumnId == groupedColumn.getColId(); });
            if (customSort) {
                // check that not already applied
                if (!this.adaptable.api.gridApi
                    .getColumnSorts()
                    .find(function (gs) { return ColumnHelper_1.default.isSpecialColumn(gs.Column); })) {
                    var customSortStrategy = this.adaptable.strategies.get(StrategyConstants.CustomSortStrategyId);
                    var groupCustomSort = ObjectFactory_1.default.CreateEmptyCustomSort();
                    groupCustomSort.ColumnId = colId;
                    groupCustomSort.SortedValues = customSort.SortedValues;
                    var customSortComparerFunction = customSort.CustomSortComparerFunction
                        ? customSort.CustomSortComparerFunction
                        : customSortStrategy.getComparerFunction(groupCustomSort);
                    this.adaptable.setCustomSort(colId, customSortComparerFunction);
                }
            }
        }
    };
    return agGridHelper;
}());
exports.agGridHelper = agGridHelper;
