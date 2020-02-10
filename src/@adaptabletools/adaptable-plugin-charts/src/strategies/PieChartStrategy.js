"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var ScreenPopups = require("@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups");
var Enums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums");
var PieChartStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(PieChartStrategy, _super);
    function PieChartStrategy(adaptable) {
        return _super.call(this, StrategyConstants.PieChartStrategyId, adaptable) || this;
    }
    PieChartStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.PieChartStrategyFriendlyName,
            ComponentName: ScreenPopups.PieChartPopup,
            Icon: StrategyConstants.PieChartGlyph,
        });
    };
    PieChartStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable) &&
            column.DataType !== Enums_1.DataType.NumberArray) {
            var popUpParams = {
                columnId: column.ColumnId,
                source: 'ColumnMenu',
            };
            return this.createColumnMenuItemShowPopup('View as Pie Chart', ScreenPopups.PieChartPopup, StrategyConstants.PieChartGlyph, popUpParams);
        }
    };
    // Add a context menu item - ONLY if the cell clicked one which is part of the current cell selection
    // and if the cell selection is a single column
    // not that we pass the primary kev values in the Strategy params
    PieChartStrategy.prototype.addContextMenuItem = function (menuInfo) {
        var menuItemShowPopup = undefined;
        if (menuInfo.Column && menuInfo.IsSelectedCell && menuInfo.IsSingleSelectedColumn) {
            var pkValues = this.adaptable.api.gridApi.getSelectedCellInfo().GridCells.map(function (gc) {
                return gc.primaryKeyValue;
            });
            var popUpParams = {
                columnId: menuInfo.Column.ColumnId,
                primaryKeyValues: pkValues,
                source: 'ContextMenu',
            };
            menuItemShowPopup = this.createMainMenuItemShowPopup({
                Label: 'View as Pie Chart',
                ComponentName: ScreenPopups.PieChartPopup,
                Icon: StrategyConstants.PieChartGlyph,
                PopupParams: popUpParams,
            });
        }
        return menuItemShowPopup;
    };
    return PieChartStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.PieChartStrategy = PieChartStrategy;
