"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var CellValidationStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(CellValidationStrategy, _super);
    function CellValidationStrategy(adaptable) {
        return _super.call(this, StrategyConstants.CellValidationStrategyId, adaptable) || this;
    }
    CellValidationStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.CellValidationStrategyFriendlyName,
            ComponentName: ScreenPopups.CellValidationPopup,
            Icon: StrategyConstants.CellValidationGlyph,
        });
    };
    CellValidationStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable, 'editable')) {
            var popupParam = {
                columnId: column.ColumnId,
                action: 'New',
                source: 'ColumnMenu',
            };
            return this.createColumnMenuItemShowPopup('Create Cell Validation Rule', ScreenPopups.CellValidationPopup, StrategyConstants.CellValidationGlyph, popupParam);
        }
    };
    return CellValidationStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.CellValidationStrategy = CellValidationStrategy;
