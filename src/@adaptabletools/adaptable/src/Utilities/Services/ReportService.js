"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var ObjectFactory_1 = require("../ObjectFactory");
var ColumnHelper_1 = require("../Helpers/ColumnHelper");
var ExpressionHelper_1 = require("../Helpers/ExpressionHelper");
var OpenfinHelper_1 = require("../Helpers/OpenfinHelper");
var AdaptableHelper_1 = require("../Helpers/AdaptableHelper");
exports.ALL_DATA_REPORT = 'All Data';
exports.VISIBLE_DATA_REPORT = 'Visible Data';
exports.SELECTED_CELLS_REPORT = 'Selected Cells';
exports.SELECTED_ROWS_REPORT = 'Selected Rows';
var ReportService = /** @class */ (function () {
    function ReportService(adaptable) {
        this.adaptable = adaptable;
        this.adaptable = adaptable;
    }
    ReportService.prototype.IsSystemReport = function (report) {
        return (report == null ||
            report.Name == exports.ALL_DATA_REPORT ||
            report.Name == exports.VISIBLE_DATA_REPORT ||
            report.Name == exports.SELECTED_CELLS_REPORT ||
            report.Name == exports.SELECTED_ROWS_REPORT);
    };
    ReportService.prototype.IsSystemReportActive = function (report) {
        if (report.Name == exports.SELECTED_CELLS_REPORT || report.Name == exports.SELECTED_ROWS_REPORT) {
            return this.adaptable.isSelectable();
        }
        return true;
    };
    ReportService.prototype.GetReportColumnsDescription = function (report, cols) {
        switch (report.ReportColumnScope) {
            case Enums_1.ReportColumnScope.AllColumns:
                return '[All Columns]';
            case Enums_1.ReportColumnScope.VisibleColumns:
                return '[Visible Columns]';
            case Enums_1.ReportColumnScope.SelectedCellColumns:
                return '[Selected Columns]';
            case Enums_1.ReportColumnScope.BespokeColumns:
                return ColumnHelper_1.default.getFriendlyNamesFromColumnIds(report.ColumnIds, cols).join(', ');
        }
    };
    ReportService.prototype.GetReportExpressionDescription = function (Report, cols) {
        if (this.IsSystemReport(Report)) {
            if (Report.Name == exports.ALL_DATA_REPORT) {
                return '[All Data]';
            }
            else if (Report.Name == exports.VISIBLE_DATA_REPORT) {
                return '[All Visible Data]';
            }
            else if (Report.Name == exports.SELECTED_CELLS_REPORT) {
                return '[Selected Cells Data]';
            }
            else if (Report.Name == exports.SELECTED_ROWS_REPORT) {
                return '[Selected Rows Data]';
            }
        }
        else {
            switch (Report.ReportRowScope) {
                case Enums_1.ReportRowScope.AllRows:
                    return '[All Rows]';
                case Enums_1.ReportRowScope.VisibleRows:
                    return '[Visible Rows]';
                case Enums_1.ReportRowScope.SelectedRows:
                    return '[Selected Rows]';
                case Enums_1.ReportRowScope.ExpressionRows:
                    return ExpressionHelper_1.default.ConvertExpressionToString(Report.Expression, cols);
            }
        }
    };
    ReportService.prototype.IsReportDestinationActive = function (exportDestination) {
        switch (exportDestination) {
            case Enums_1.ExportDestination.CSV:
            case Enums_1.ExportDestination.Clipboard:
            case Enums_1.ExportDestination.JSON:
                return true;
            case Enums_1.ExportDestination.OpenfinExcel:
                return OpenfinHelper_1.default.isRunningInOpenfin() && OpenfinHelper_1.default.isExcelOpenfinLoaded();
            case Enums_1.ExportDestination.Glue42:
                return this.adaptable.api.glue42Api.isGlue42Available();
        }
        return false;
    };
    ReportService.prototype.getReportColumnsForReport = function (report) {
        var reportColumns = [];
        var gridColumns = this.adaptable.api.gridApi.getColumns();
        // first get the cols depending on the Column Scope
        switch (report.ReportColumnScope) {
            case Enums_1.ReportColumnScope.AllColumns:
                reportColumns = gridColumns;
                break;
            case Enums_1.ReportColumnScope.VisibleColumns:
                reportColumns = gridColumns.filter(function (c) { return c.Visible; });
                break;
            case Enums_1.ReportColumnScope.SelectedCellColumns:
                var selectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();
                // otherwise get columns
                reportColumns = selectedCellInfo.Columns;
                break;
            case Enums_1.ReportColumnScope.BespokeColumns:
                reportColumns = report.ColumnIds.map(function (c) { return gridColumns.find(function (col) { return col.ColumnId == c; }); });
                break;
        }
        return reportColumns;
    };
    ReportService.prototype.ConvertReportToArray = function (report) {
        var _this = this;
        var reportColumns = this.getReportColumnsForReport(report);
        if (ArrayExtensions_1.default.IsNullOrEmpty(reportColumns)) {
            // some way of saying we cannot export anything
            return {
                ActionReturn: dataToExport,
                Alert: {
                    Header: 'Export Error',
                    Msg: 'No cells are selected',
                    AlertDefinition: ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error),
                },
            };
        }
        // populate the first row
        var dataToExport = [];
        dataToExport[0] = reportColumns.map(function (c) { return c.FriendlyName; });
        // now populate the rest of the rows
        switch (report.ReportRowScope) {
            case Enums_1.ReportRowScope.AllRows:
                this.adaptable.forAllRowNodesDo(function (row) {
                    var newRow = _this.getRowValues(row, reportColumns, report);
                    dataToExport.push(newRow);
                });
                break;
            case Enums_1.ReportRowScope.VisibleRows:
                this.adaptable.forAllVisibleRowNodesDo(function (row) {
                    var newRow = _this.getRowValues(row, reportColumns, report);
                    dataToExport.push(newRow);
                });
                break;
            case Enums_1.ReportRowScope.ExpressionRows:
                var expressionToCheck_1 = report.Expression;
                this.adaptable.forAllRowNodesDo(function (row) {
                    if (ExpressionHelper_1.default.checkForExpressionFromRowNode(expressionToCheck_1, row, reportColumns, _this.adaptable)) {
                        var newRow = _this.getRowValues(row, reportColumns, report);
                        dataToExport.push(newRow);
                    }
                });
                break;
            case Enums_1.ReportRowScope.SelectedCellRows:
                var selectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();
                var GridCells_1 = selectedCellInfo.GridCells;
                // Im sure this can be done better... but this is how I do it
                // 1.  Get - and sort - all the distinct primary key values
                var distinctPKValues = tslib_1.__spread(new Set(GridCells_1.map(function (gc) { return gc.primaryKeyValue; }).sort(function (a, b) {
                    return a < b ? -1 : 1;
                })));
                // 2.  Loop through eaach of the primary key values to get all the Grid Cells that contain that pk value
                distinctPKValues.forEach(function (pkValue) {
                    var newRow = [];
                    var matchingGridCells = GridCells_1.filter(function (gc) { return gc.primaryKeyValue === pkValue; });
                    // 3.  Loop through each column to see if we have a GridCell in our group for the current PK
                    // If we do then we add the value; otherwise we add null
                    reportColumns.forEach(function (rc) {
                        var matchingGridCell = matchingGridCells.find(function (gc) { return gc.columnId === rc.ColumnId; });
                        // for now always adding raw value - but this might change...
                        var cellValue = matchingGridCell
                            ? _this.getCellValueFromGridCell(matchingGridCell, rc, report)
                            : null;
                        newRow.push(cellValue);
                    });
                    dataToExport.push(newRow);
                });
                break;
            case Enums_1.ReportRowScope.SelectedRows:
                var selectedRowInfo = this.adaptable.api.gridApi.getSelectedRowInfo();
                if (selectedRowInfo != null && ArrayExtensions_1.default.IsNotNullOrEmpty(selectedRowInfo.GridRows)) {
                    var columnIds_1 = reportColumns.map(function (rc) { return rc.ColumnId; });
                    selectedRowInfo.GridRows.filter(function (gr) { return gr.rowInfo.isGroup == false; }).forEach(function (gridRow) {
                        var rowData = gridRow.rowData;
                        var newRow = [];
                        columnIds_1.forEach(function (colId) {
                            var cellValue = rowData[colId];
                            newRow.push(cellValue ? String(cellValue) : '');
                        });
                        dataToExport.push(newRow);
                    });
                }
                break;
        }
        return { ActionReturn: dataToExport };
    };
    ReportService.prototype.GetPrimaryKeysForReport = function (report) {
        var _this = this;
        var pkValues = [];
        var reportColumns = this.getReportColumnsForReport(report);
        switch (report.ReportRowScope) {
            case Enums_1.ReportRowScope.AllRows:
                this.adaptable.forAllRowNodesDo(function (row) {
                    var pkValue = _this.adaptable.getPrimaryKeyValueFromRowNode(row);
                    pkValues.push(pkValue);
                });
                break;
            case Enums_1.ReportRowScope.VisibleRows:
                this.adaptable.forAllVisibleRowNodesDo(function (row) {
                    var pkValue = _this.adaptable.getPrimaryKeyValueFromRowNode(row);
                    pkValues.push(pkValue);
                });
                break;
            case Enums_1.ReportRowScope.ExpressionRows:
                var expressionToCheck_2 = report.Expression;
                this.adaptable.forAllRowNodesDo(function (row) {
                    if (ExpressionHelper_1.default.checkForExpressionFromRowNode(expressionToCheck_2, row, reportColumns, _this.adaptable)) {
                        var pkValue = _this.adaptable.getPrimaryKeyValueFromRowNode(row);
                        pkValues.push(pkValue);
                    }
                });
                break;
            case Enums_1.ReportRowScope.SelectedCellRows:
                var selectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();
                var Columns = selectedCellInfo.Columns, GridCells = selectedCellInfo.GridCells;
                var colCount = Columns.length;
                var rowCount = GridCells.length / colCount;
                for (var i = 0; i < rowCount; i++) {
                    for (var j = 0; j < colCount; j++) {
                        var index = i + j * rowCount;
                        var pkValue = GridCells[index].primaryKeyValue;
                        ArrayExtensions_1.default.AddItem(pkValues, pkValue);
                    }
                }
                break;
            case Enums_1.ReportRowScope.SelectedRows:
                var selectedRowInfo = this.adaptable.api.gridApi.getSelectedRowInfo();
                if (selectedRowInfo != null && ArrayExtensions_1.default.IsNotNullOrEmpty(selectedRowInfo.GridRows)) {
                    selectedRowInfo.GridRows.filter(function (gr) { return gr.rowInfo.isGroup == false; }).forEach(function (gridRow) {
                        pkValues.push(gridRow.primaryKeyValue);
                    });
                }
                break;
        }
        return pkValues;
    };
    ReportService.prototype.getRowValues = function (rowNode, reportColumns, report) {
        var _this = this;
        var newRow = [];
        reportColumns.forEach(function (col) {
            var columnValue;
            var useRawValue = false;
            var exportColumnRawValue = _this.adaptable.adaptableOptions.exportOptions
                .exportColumnRawValue;
            if (exportColumnRawValue) {
                useRawValue = exportColumnRawValue(col, report);
            }
            if (useRawValue) {
                columnValue = _this.adaptable.getRawValueFromRowNode(rowNode, col.ColumnId);
            }
            else {
                columnValue = _this.adaptable.getDisplayValueFromRowNode(rowNode, col.ColumnId);
            }
            newRow.push(columnValue);
        });
        return newRow;
    };
    ReportService.prototype.getCellValueFromGridCell = function (gridCell, reportColumn, report) {
        var useRawValue = false;
        var exportColumnRawValue = this.adaptable.adaptableOptions.exportOptions.exportColumnRawValue;
        if (exportColumnRawValue) {
            useRawValue = exportColumnRawValue(reportColumn, report);
        }
        return useRawValue ? gridCell.rawValue : gridCell.displayValue;
    };
    ReportService.prototype.PublishLiveLiveDataChangedEvent = function (reportDestination, liveDataTrigger, liveReport) {
        var liveDataChangedInfo = {
            ReportDestination: reportDestination,
            LiveDataTrigger: liveDataTrigger,
            LiveReport: liveReport,
        };
        var liveDataChangedEventArgs = AdaptableHelper_1.default.createFDC3Message('Live Data Changed Args', liveDataChangedInfo);
        this.adaptable.api.eventApi.emit('LiveDataChanged', liveDataChangedEventArgs);
    };
    return ReportService;
}());
exports.ReportService = ReportService;
