"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var UserFilterStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(UserFilterStrategy, _super);
    function UserFilterStrategy(adaptable) {
        return _super.call(this, StrategyConstants.UserFilterStrategyId, adaptable) || this;
    }
    UserFilterStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.UserFilterStrategyFriendlyName,
            ComponentName: ScreenPopups.UserFilterPopup,
            Icon: StrategyConstants.UserFilterGlyph,
        });
    };
    UserFilterStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable, 'columnfilter')) {
            var popupParam = {
                columnId: column.ColumnId,
                action: 'New',
                source: 'ColumnMenu',
            };
            return this.createColumnMenuItemShowPopup('Create User Filter', ScreenPopups.UserFilterPopup, StrategyConstants.UserFilterGlyph, popupParam);
        }
    };
    return UserFilterStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.UserFilterStrategy = UserFilterStrategy;
