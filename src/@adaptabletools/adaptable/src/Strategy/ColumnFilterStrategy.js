"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ColumnFilterRedux = require("../Redux/ActionsReducers/ColumnFilterRedux");
var ColumnFilterStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnFilterStrategy, _super);
    function ColumnFilterStrategy(adaptable) {
        return _super.call(this, StrategyConstants.ColumnFilterStrategyId, adaptable) || this;
    }
    ColumnFilterStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.ColumnFilterStrategyFriendlyName,
            ComponentName: ScreenPopups.ColumnFilterPopup,
            Icon: StrategyConstants.ColumnFilterGlyph,
        });
    };
    ColumnFilterStrategy.prototype.addContextMenuItem = function (menuInfo) {
        var _this = this;
        var menuItemClickFunction = undefined;
        if (menuInfo.Column && menuInfo.GridCell != null) {
            var isMultiple = menuInfo.IsSelectedCell && menuInfo.IsSingleSelectedColumn;
            var pkValues_1 = isMultiple
                ? this.adaptable.api.gridApi.getSelectedCellInfo().GridCells.map(function (gc) {
                    return gc.primaryKeyValue;
                })
                : [menuInfo.GridCell.primaryKeyValue];
            var clickFunction = function () {
                _this.adaptable.api.columnFilterApi.createColumnFilterForCell(menuInfo.Column.ColumnId, pkValues_1);
            };
            menuItemClickFunction = this.createColumnMenuItemClickFunction(isMultiple ? 'Filter on Cell Values' : 'Filter on Cell Value', StrategyConstants.ColumnFilterGlyph, clickFunction);
        }
        return menuItemClickFunction;
    };
    ColumnFilterStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable, 'columnfilter')) {
            var existingColumnFilter = this.adaptable.api.columnFilterApi
                .getAllColumnFilter()
                .find(function (x) { return x.ColumnId == column.ColumnId; });
            if (existingColumnFilter) {
                return this.createColumnMenuItemReduxAction('Clear Column Filter', StrategyConstants.ColumnFilterGlyph, ColumnFilterRedux.ColumnFilterClear(existingColumnFilter));
            }
        }
    };
    return ColumnFilterStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.ColumnFilterStrategy = ColumnFilterStrategy;
