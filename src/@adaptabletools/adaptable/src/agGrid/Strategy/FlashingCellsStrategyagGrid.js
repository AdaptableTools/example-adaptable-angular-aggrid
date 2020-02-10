"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FlashingCellsStrategy_1 = require("../../Strategy/FlashingCellsStrategy");
var StyleConstants = require("../../Utilities/Constants/StyleConstants");
var IDataService_1 = require("../../Utilities/Services/Interface/IDataService");
var FlashingCellStrategyagGrid = /** @class */ (function (_super) {
    tslib_1.__extends(FlashingCellStrategyagGrid, _super);
    function FlashingCellStrategyagGrid(adaptable) {
        var _this = _super.call(this, adaptable) || this;
        _this.currentFlashing = new Map();
        return _this;
    }
    FlashingCellStrategyagGrid.prototype.initStyles = function () {
        var numericColumns = this.adaptable.api.gridApi.getNumericColumns();
        var theadaptable = this.adaptable;
        var currentFlashing = this.currentFlashing;
        var flashingCells = this.adaptable.api.flashingCellApi.getAllFlashingCell();
        numericColumns.forEach(function (col) {
            var fc = flashingCells.find(function (x) { return x.ColumnId == col.ColumnId && x.IsLive; });
            var cellClassRules = {};
            if (fc) {
                cellClassRules[StyleConstants.FLASH_CELL_UP_STYLE + '-' + fc.Uuid] = function (params) {
                    var primaryKey = theadaptable.getPrimaryKeyValueFromRowNode(params.node);
                    var key = primaryKey + col.ColumnId + 'up';
                    var currentFlashTimer = currentFlashing.get(key);
                    if (currentFlashTimer) {
                        return true;
                    }
                    var oldValue = theadaptable.DataService.GetPreviousColumnValue(col.ColumnId, primaryKey, params.value, IDataService_1.ChangeDirection.Up);
                    if (oldValue && params.value > oldValue) {
                        if (currentFlashTimer) {
                            window.clearTimeout(currentFlashTimer);
                        }
                        var timer = window.setTimeout(function () {
                            currentFlashing.set(key, null);
                            theadaptable.refreshCells([params.node], [col.ColumnId]);
                        }, fc.FlashingCellDuration);
                        currentFlashing.set(key, timer);
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                cellClassRules[StyleConstants.FLASH_CELL_DOWN_STYLE + '-' + fc.Uuid] = function (params) {
                    var primaryKey = theadaptable.getPrimaryKeyValueFromRowNode(params.node);
                    var key = primaryKey + col.ColumnId + 'down';
                    var currentFlashTimer = currentFlashing.get(key);
                    if (currentFlashTimer) {
                        return true;
                    }
                    var oldValue = theadaptable.DataService.GetPreviousColumnValue(col.ColumnId, primaryKey, params.value, IDataService_1.ChangeDirection.Down);
                    if (oldValue && params.value < oldValue) {
                        if (currentFlashTimer) {
                            window.clearTimeout(currentFlashTimer);
                        }
                        var timer = window.setTimeout(function () {
                            currentFlashing.set(key, null);
                            theadaptable.refreshCells([params.node], [col.ColumnId]);
                        }, fc.FlashingCellDuration);
                        currentFlashing.set(key, timer);
                        return true;
                    }
                    else {
                        return false;
                    }
                };
            }
            theadaptable.setCellClassRules(cellClassRules, col.ColumnId, 'FlashingCell');
        });
    };
    return FlashingCellStrategyagGrid;
}(FlashingCellsStrategy_1.FlashingCellsStrategy));
exports.FlashingCellStrategyagGrid = FlashingCellStrategyagGrid;
