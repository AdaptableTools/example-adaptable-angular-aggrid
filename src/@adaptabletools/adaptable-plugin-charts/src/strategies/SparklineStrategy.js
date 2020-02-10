"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var ScreenPopups = require("@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups");
var Enums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums");
var SparklineStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(SparklineStrategy, _super);
    function SparklineStrategy(adaptable) {
        return _super.call(this, StrategyConstants.SparklineStrategyId, adaptable) || this;
    }
    SparklineStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable, 'numeric')) {
            var popUpParams = {
                columnId: column.ColumnId,
                source: 'ColumnMenu',
            };
            return this.createColumnMenuItemShowPopup('View as Sparkline', ScreenPopups.ViewAsSparklinesPopup, StrategyConstants.SparklinesGlyph, popUpParams);
        }
    };
    SparklineStrategy.prototype.addContextMenuItem = function (menuInfo) {
        var menuItemShowPopup = undefined;
        if (menuInfo.Column &&
            menuInfo.IsSelectedCell &&
            menuInfo.Column.DataType == Enums_1.DataType.Number &&
            menuInfo.IsSingleSelectedColumn) {
            var pkValues = this.adaptable.api.gridApi.getSelectedCellInfo().GridCells.map(function (gc) {
                return gc.primaryKeyValue;
            });
            var popUpParams = {
                columnId: menuInfo.Column.ColumnId,
                primaryKeyValues: pkValues,
                source: 'ContextMenu',
            };
            menuItemShowPopup = this.createMainMenuItemShowPopup({
                Label: 'View as Sparkline',
                ComponentName: ScreenPopups.ViewAsSparklinesPopup,
                Icon: StrategyConstants.SparklinesGlyph,
                PopupParams: popUpParams,
            });
        }
        return menuItemShowPopup;
    };
    return SparklineStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.SparklineStrategy = SparklineStrategy;
