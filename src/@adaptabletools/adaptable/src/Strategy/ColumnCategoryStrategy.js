"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ColumnCategoryStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnCategoryStrategy, _super);
    function ColumnCategoryStrategy(adaptable) {
        return _super.call(this, StrategyConstants.ColumnCategoryStrategyId, adaptable) || this;
    }
    ColumnCategoryStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.ColumnCategoryStrategyFriendlyName,
            ComponentName: ScreenPopups.ColumnCategoryPopup,
            Icon: StrategyConstants.ColumnCategoryGlyph,
        });
    };
    return ColumnCategoryStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.ColumnCategoryStrategy = ColumnCategoryStrategy;
