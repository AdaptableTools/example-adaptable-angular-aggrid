"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var GlyphConstants = require("../Utilities/Constants/GlyphConstants");
var GridRedux = require("../Redux/ActionsReducers/GridRedux");
// This is a special strategy that the user can never remove but which is useful to us
// We use it to manage internal state changes and menu items that are not directly strategy related
var HomeStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(HomeStrategy, _super);
    function HomeStrategy(adaptable) {
        var _this = _super.call(this, StrategyConstants.HomeStrategyId, adaptable) || this;
        // useful for when grid reloads (e.g. at midnight);
        _this.adaptable._on('GridReloaded', function () {
            _this.adaptable.applyGridFiltering();
        });
        return _this;
    }
    HomeStrategy.prototype.addBaseColumnMenuItems = function (column) {
        var baseMenuItems = [];
        if (this.canCreateColumnMenuItem(column, this.adaptable, 'quickfilter')) {
            var isFilterActive = this.adaptable.api.gridApi.getGridState().IsQuickFilterActive;
            baseMenuItems.push(this.createColumnMenuItemReduxAction(isFilterActive ? 'Hide Quick Filter Bar' : 'Show Quick Filter Bar', isFilterActive ? GlyphConstants.OK_GLYPH : GlyphConstants.REMOVE_GLYPH, isFilterActive ? GridRedux.QuickFilterBarHide() : GridRedux.QuickFilterBarShow()));
        }
        if (this.adaptable.isSelectable()) {
            if (this.canCreateColumnMenuItem(column, this.adaptable)) {
                baseMenuItems.push(this.createColumnMenuItemReduxAction('Select Column', 'tab-unselected', GridRedux.GridSelectColumn(column.ColumnId)));
            }
        }
        if (this.canCreateColumnMenuItem(column, this.adaptable)) {
            baseMenuItems.push(this.createColumnMenuItemReduxAction('Hide Column', StrategyConstants.ColumnChooserGlyph, GridRedux.GridHideColumn(column.ColumnId)));
        }
        return baseMenuItems;
    };
    return HomeStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.HomeStrategy = HomeStrategy;
