"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var AdaptableHelper_1 = require("../Utilities/Helpers/AdaptableHelper");
var TeamSharingStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(TeamSharingStrategy, _super);
    function TeamSharingStrategy(adaptable) {
        return _super.call(this, StrategyConstants.TeamSharingStrategyId, adaptable) || this;
    }
    TeamSharingStrategy.prototype.addFunctionMenuItem = function () {
        if (AdaptableHelper_1.AdaptableHelper.isConfigServerEnabled(this.adaptable.adaptableOptions)) {
            return this.createMainMenuItemShowPopup({
                Label: StrategyConstants.TeamSharingStrategyFriendlyName,
                ComponentName: ScreenPopups.TeamSharingPopup,
                Icon: StrategyConstants.TeamSharingGlyph,
            });
        }
    };
    return TeamSharingStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.TeamSharingStrategy = TeamSharingStrategy;
