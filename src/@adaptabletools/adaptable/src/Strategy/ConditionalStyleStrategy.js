"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ConditionalStyleStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionalStyleStrategy, _super);
    function ConditionalStyleStrategy(adaptable) {
        var _this = _super.call(this, StrategyConstants.ConditionalStyleStrategyId, adaptable) || this;
        _this.adaptable.DataService.on('DataChanged', function (dataChangedInfo) {
            _this.handleDataSourceChanged(dataChangedInfo);
        });
        return _this;
    }
    ConditionalStyleStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.ConditionalStyleStrategyFriendlyName,
            ComponentName: ScreenPopups.ConditionalStylePopup,
            Icon: StrategyConstants.ConditionalStyleGlyph,
        });
    };
    ConditionalStyleStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable, 'style')) {
            var popupParam = {
                columnId: column.ColumnId,
                action: 'New',
                source: 'ColumnMenu',
            };
            return this.createColumnMenuItemShowPopup('Create ' + StrategyConstants.ConditionalStyleStrategyFriendlyName, ScreenPopups.ConditionalStylePopup, StrategyConstants.ConditionalStyleGlyph, popupParam);
        }
    };
    return ConditionalStyleStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.ConditionalStyleStrategy = ConditionalStyleStrategy;
