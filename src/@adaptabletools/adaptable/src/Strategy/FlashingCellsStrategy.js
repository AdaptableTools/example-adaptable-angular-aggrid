"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ObjectFactory_1 = require("../Utilities/ObjectFactory");
var FlashingCellsRedux = require("../Redux/ActionsReducers/FlashingCellsRedux");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var FlashingCellsStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(FlashingCellsStrategy, _super);
    function FlashingCellsStrategy(adaptable) {
        return _super.call(this, StrategyConstants.FlashingCellsStrategyId, adaptable) || this;
    }
    FlashingCellsStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.FlashingCellsStrategyFriendlyName,
            ComponentName: ScreenPopups.FlashingCellsPopup,
            Icon: StrategyConstants.FlashingCellGlyph,
        });
    };
    FlashingCellsStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable)) {
            if (column.DataType == Enums_1.DataType.Number) {
                if (this.adaptable.api.calculatedColumnApi
                    .getAllCalculatedColumn()
                    .find(function (c) { return c.ColumnId == column.ColumnId; }) == null) {
                    var flashingCell = this.adaptable.api.flashingCellApi
                        .getAllFlashingCell()
                        .find(function (x) { return x.ColumnId == column.ColumnId; });
                    if (flashingCell && flashingCell.IsLive) {
                        return this.createColumnMenuItemReduxAction('Turn Flashing Cell Off', StrategyConstants.FlashingCellGlyph, FlashingCellsRedux.FlashingCellSelect(flashingCell));
                    }
                    else {
                        if (!flashingCell) {
                            var flashingCellState = this.adaptable.api.flashingCellApi.getFlashingCellState();
                            flashingCell = ObjectFactory_1.ObjectFactory.CreateDefaultFlashingCell(column, flashingCellState.DefaultUpColor, flashingCellState.DefautDownColor, flashingCellState.DefaultDuration);
                        }
                        return this.createColumnMenuItemReduxAction('Turn Flashing Cell On', StrategyConstants.FlashingCellGlyph, FlashingCellsRedux.FlashingCellSelect(flashingCell));
                    }
                }
            }
        }
    };
    return FlashingCellsStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.FlashingCellsStrategy = FlashingCellsStrategy;
