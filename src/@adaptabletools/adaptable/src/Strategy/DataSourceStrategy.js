"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var DataSourceStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(DataSourceStrategy, _super);
    function DataSourceStrategy(adaptable) {
        return _super.call(this, StrategyConstants.DataSourceStrategyId, adaptable) || this;
    }
    DataSourceStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.DataSourceStrategyFriendlyName,
            ComponentName: ScreenPopups.DataSourcePopup,
            Icon: StrategyConstants.DataSourceGlyph,
        });
    };
    return DataSourceStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.DataSourceStrategy = DataSourceStrategy;
