"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var FormatColumnStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(FormatColumnStrategy, _super);
    function FormatColumnStrategy(adaptable) {
        return _super.call(this, StrategyConstants.FormatColumnStrategyId, adaptable) || this;
    }
    FormatColumnStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.FormatColumnStrategyFriendlyName,
            ComponentName: ScreenPopups.FormatColumnPopup,
            Icon: StrategyConstants.FormatColumnGlyph,
        });
    };
    FormatColumnStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable, 'style')) {
            var formatExists = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.adaptable.api.formatColumnApi.getAllFormatColumn().map(function (f) { return f.ColumnId; }), column.ColumnId);
            var label = formatExists ? 'Edit ' : 'Create ';
            var popupParam = {
                columnId: column.ColumnId,
                action: formatExists ? 'Edit' : 'New',
                source: 'ColumnMenu',
            };
            return this.createColumnMenuItemShowPopup(label + StrategyConstants.FormatColumnStrategyFriendlyName, ScreenPopups.FormatColumnPopup, StrategyConstants.FormatColumnGlyph, popupParam);
        }
    };
    return FormatColumnStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.FormatColumnStrategy = FormatColumnStrategy;
