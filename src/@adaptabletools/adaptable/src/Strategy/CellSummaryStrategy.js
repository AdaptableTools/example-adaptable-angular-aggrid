"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var Helper_1 = require("../Utilities/Helpers/Helper");
var CellSummaryStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(CellSummaryStrategy, _super);
    function CellSummaryStrategy(adaptable) {
        return _super.call(this, StrategyConstants.CellSummaryStrategyId, adaptable) || this;
    }
    CellSummaryStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.CellSummaryStrategyFriendlyName,
            ComponentName: ScreenPopups.CellSummaryPopup,
            Icon: StrategyConstants.CellSummaryGlyph,
        });
    };
    CellSummaryStrategy.prototype.addContextMenuItem = function (menuInfo) {
        var menuItemShowPopup = undefined;
        var popUpParams = {
            source: 'ContextMenu',
        };
        if (menuInfo.Column && menuInfo.IsSelectedCell) {
            menuItemShowPopup = this.createMainMenuItemShowPopup({
                Label: 'See Cell Summary',
                ComponentName: ScreenPopups.CellSummaryPopup,
                Icon: StrategyConstants.CellSummaryGlyph,
                PopupParams: popUpParams,
            });
        }
        return menuItemShowPopup;
    };
    CellSummaryStrategy.prototype.CreateCellSummary = function (selectedCellInfo) {
        var selectedCellSummary;
        if (selectedCellInfo && ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(selectedCellInfo.Columns)) {
            var numericValues_1 = [];
            var allValues_1 = [];
            var numericColumns_1 = [];
            selectedCellInfo.Columns.map(function (c) {
                if (c && c.DataType == Enums_1.DataType.Number) {
                    numericColumns_1.push(c.ColumnId);
                }
            });
            selectedCellInfo.GridCells.forEach(function (selectedCell) {
                var value = selectedCell.rawValue;
                allValues_1.push(value);
                if (ArrayExtensions_1.ArrayExtensions.ContainsItem(numericColumns_1, selectedCell.columnId)) {
                    var valueAsNumber = Number(value);
                    // possible that its not a number despite it being a numeric column
                    if (!isNaN(Number(valueAsNumber))) {
                        numericValues_1.push(valueAsNumber);
                    }
                }
            });
            var hasNumericColumns = numericValues_1.length > 0;
            var distinctCount_1 = ArrayExtensions_1.ArrayExtensions.RetrieveDistinct(allValues_1).length;
            selectedCellSummary = {
                Sum: hasNumericColumns ? Helper_1.Helper.RoundNumberTo4dp(Helper_1.Helper.sumNumberArray(numericValues_1)) : '',
                Average: hasNumericColumns
                    ? Helper_1.Helper.RoundNumberTo4dp(Helper_1.Helper.meanNumberArray(numericValues_1))
                    : '',
                Median: hasNumericColumns
                    ? Helper_1.Helper.RoundNumberTo4dp(Helper_1.Helper.medianNumberArray(numericValues_1))
                    : '',
                Mode: hasNumericColumns
                    ? Helper_1.Helper.RoundNumberTo4dp(Helper_1.Helper.modeNumberArray(numericValues_1))
                    : '',
                Distinct: distinctCount_1,
                Max: hasNumericColumns ? Helper_1.Helper.RoundNumberTo4dp(Math.max.apply(Math, tslib_1.__spread(numericValues_1))) : '',
                Min: hasNumericColumns ? Helper_1.Helper.RoundNumberTo4dp(Math.min.apply(Math, tslib_1.__spread(numericValues_1))) : '',
                Count: allValues_1.length,
            };
            var operationDefinitions = this.adaptable.api.cellSummaryApi.getCellSummaryOperationDefinitions();
            operationDefinitions.forEach(function (operation) {
                if (operation.OperationFunction) {
                    selectedCellSummary[operation.OperationName] = operation.OperationFunction({
                        selectedCellInfo: selectedCellInfo,
                        distinctCount: distinctCount_1,
                        allValues: allValues_1,
                        numericValues: numericValues_1,
                        numericColumns: numericColumns_1,
                    });
                }
            });
        }
        return selectedCellSummary;
    };
    return CellSummaryStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.CellSummaryStrategy = CellSummaryStrategy;
