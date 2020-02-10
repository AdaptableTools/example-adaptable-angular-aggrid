"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ConditionalStyleStrategy_1 = require("../../Strategy/ConditionalStyleStrategy");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var ConditionalStyleStrategyagGrid = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionalStyleStrategyagGrid, _super);
    function ConditionalStyleStrategyagGrid(adaptable) {
        var _this = _super.call(this, adaptable) || this;
        _this.conditionalStyleColumnIds = [];
        _this.columnsForConditionalStyles = new Map();
        return _this;
    }
    // The sole purpose that i can see for this method is to tell Adaptable to refresh the row or other columns in the case where the Grid would not automtically do it
    // and we need to tell the grid that the whole row has changed and not just this column
    // Note that we can have Col A changing when Col B updates so need to look at all 3 but should make it as quick as possible: in and out.
    ConditionalStyleStrategyagGrid.prototype.handleDataSourceChanged = function (dataChangedEvent) {
        var _this = this;
        var conditionalStyles = this.adaptable.api.conditionalStyleApi.getAllConditionalStyle();
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)) {
            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(this.conditionalStyleColumnIds, dataChangedEvent.ColumnId)) {
                var colsToRefresh_1 = [];
                conditionalStyles.forEach(function (cs) {
                    var colList = _this.columnsForConditionalStyles.get(cs.Uuid);
                    if (ArrayExtensions_1.ArrayExtensions.ContainsItem(colList, dataChangedEvent.ColumnId)) {
                        switch (cs.ConditionalStyleScope) {
                            case 'Row':
                                colsToRefresh_1.push.apply(colsToRefresh_1, tslib_1.__spread(_this.adaptable.api.gridApi.getColumns().map(function (c) { return c.ColumnId; })));
                                break;
                            case 'ColumnCategory':
                                var columnCategory = _this.adaptable.api.columnCategoryApi
                                    .getAllColumnCategory()
                                    .find(function (lc) { return lc.ColumnCategoryId == cs.ColumnCategoryId; });
                                if (columnCategory) {
                                    colsToRefresh_1.push.apply(colsToRefresh_1, tslib_1.__spread(columnCategory.ColumnIds));
                                }
                                break;
                            case 'Column':
                                colsToRefresh_1.push(cs.ColumnId);
                                break;
                        }
                    }
                });
                if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(colsToRefresh_1)) {
                    var listOfColumnsToRefresh = Array.from(new Set(colsToRefresh_1));
                    // we dont want to refresh the actual column as that has been updated
                    var index = listOfColumnsToRefresh.indexOf(dataChangedEvent.ColumnId);
                    if (index !== -1) {
                        listOfColumnsToRefresh.splice(index, 1);
                    }
                    if (listOfColumnsToRefresh.length > 0) {
                        var theadaptable = this.adaptable;
                        theadaptable.refreshCells([dataChangedEvent.RowNode], listOfColumnsToRefresh);
                    }
                }
            }
        }
    };
    // this initialises styles and creates the list of which columns have styles (will be used in onDataChanged)
    ConditionalStyleStrategyagGrid.prototype.initStyles = function () {
        var e_1, _a;
        var _this = this;
        var columns = this.adaptable.api.gridApi.getColumns();
        var theadaptable = this.adaptable;
        var conditionalStyles = this.adaptable.api.conditionalStyleApi.getAllConditionalStyle();
        this.conditionalStyleColumnIds = [];
        this.columnsForConditionalStyles.clear();
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columns) &&
            ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)) {
            var _loop_1 = function (column) {
                var cellClassRules = {};
                conditionalStyles.forEach(function (cs, index) {
                    var styleName = StringExtensions_1.StringExtensions.IsNullOrEmpty(cs.Style.ClassName)
                        ? theadaptable.StyleService.CreateUniqueStyleName(StrategyConstants.ConditionalStyleStrategyId, cs)
                        : cs.Style.ClassName;
                    if (cs.ConditionalStyleScope == 'Column' && cs.ColumnId == column.ColumnId) {
                        cellClassRules[styleName] = function (params) {
                            return ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRowNode(cs.Expression, params.node, columns, theadaptable);
                        };
                    }
                    else if (cs.ConditionalStyleScope == 'ColumnCategory') {
                        var columnCategory = _this.adaptable.api.columnCategoryApi
                            .getAllColumnCategory()
                            .find(function (lc) { return lc.ColumnCategoryId == cs.ColumnCategoryId; });
                        if (columnCategory) {
                            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(columnCategory.ColumnIds, column.ColumnId)) {
                                cellClassRules[styleName] = function (params) {
                                    return ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRowNode(cs.Expression, params.node, columns, theadaptable);
                                };
                            }
                        }
                        /*
                      } else if (cs.ConditionalStyleScope == 'DataType') {
                        let dataType: 'String' | 'Number' | 'Boolean' | 'Date' = cs.DataType;
            
                        if (dataType) {
                          if (column.DataType == dataType) {
                            cellClassRules[styleName] = function(params: any) {
                              return ExpressionHelper.checkForExpressionFromRowNode(
                                cs.Expression,
                                params.node,
                                columns,
                                theadaptable
                              );
                            };
                          }
                        }
                        */
                    }
                    else if (cs.ConditionalStyleScope == 'Row') {
                        cellClassRules[styleName] = function (params) {
                            return ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRowNode(cs.Expression, params.node, columns, theadaptable);
                        };
                    }
                });
                theadaptable.setCellClassRules(cellClassRules, column.ColumnId, 'ConditionalStyle');
            };
            try {
                for (var columns_1 = tslib_1.__values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                    var column = columns_1_1.value;
                    _loop_1(column);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        //  create the list of columns that are in Expressions here so that we dont need to do it each time data updates
        var colList = [];
        conditionalStyles.forEach(function (x) {
            var colsForCS = ExpressionHelper_1.ExpressionHelper.GetColumnListFromExpression(x.Expression);
            colList.push.apply(colList, tslib_1.__spread(colsForCS));
            _this.columnsForConditionalStyles.set(x.Uuid, colsForCS);
        });
        this.conditionalStyleColumnIds = tslib_1.__spread(new Set(colList));
        // Redraw Adaptableto be on safe side (its rare use case)
        this.adaptable.redraw();
    };
    return ConditionalStyleStrategyagGrid;
}(ConditionalStyleStrategy_1.ConditionalStyleStrategy));
exports.ConditionalStyleStrategyagGrid = ConditionalStyleStrategyagGrid;
