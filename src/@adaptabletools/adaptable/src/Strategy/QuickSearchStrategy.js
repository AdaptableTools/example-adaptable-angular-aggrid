"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
var RangeHelper_1 = require("../Utilities/Helpers/RangeHelper");
var ExpressionHelper_1 = require("../Utilities/Helpers/ExpressionHelper");
var SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
var QuickSearchStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(QuickSearchStrategy, _super);
    function QuickSearchStrategy(adaptable) {
        return _super.call(this, StrategyConstants.QuickSearchStrategyId, adaptable) || this;
    }
    QuickSearchStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.QuickSearchStrategyFriendlyName,
            ComponentName: ScreenPopups.QuickSearchPopup,
            Icon: StrategyConstants.QuickSearchGlyph,
        });
    };
    QuickSearchStrategy.prototype.createQuickSearchRange = function () {
        var e_1, _a;
        // if searchText is empty then set clear both types, otherwise set them
        if (StringExtensions_1.default.IsNullOrEmpty(this.adaptable.api.quickSearchApi.getQuickSearchValue())) {
            this.adaptable.AdaptableStore.TheStore.dispatch(SystemRedux.QuickSearchClearRange());
            this.adaptable.AdaptableStore.TheStore.dispatch(SystemRedux.QuickSearchClearVisibleColumnExpressions());
        }
        else {
            var quickSearchRange = RangeHelper_1.default.CreateValueRangeFromOperand(this.adaptable.api.quickSearchApi.getQuickSearchValue());
            this.adaptable.AdaptableStore.TheStore.dispatch(SystemRedux.QuickSearchSetRange(quickSearchRange));
            // we just create expressions for the visible columns that are not excluded from quick search - in Adaptable we will check for those missing;
            // we dont keep this updated - just set once as good for majority of use cases
            var quickSearchVisibleColumnExpressions = [];
            try {
                for (var _b = tslib_1.__values(this.adaptable.api.gridApi.getVisibleColumns()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var column = _c.value;
                    if (!column.IsExcludedFromQuickSearch &&
                        RangeHelper_1.default.IsColumnAppropriateForRange(quickSearchRange, column)) {
                        var quickSearchVisibleColumnExpression = ExpressionHelper_1.default.CreateSingleColumnExpression(column.ColumnId, null, null, null, [quickSearchRange]);
                        quickSearchVisibleColumnExpressions.push(quickSearchVisibleColumnExpression);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.adaptable.AdaptableStore.TheStore.dispatch(SystemRedux.QuickSearchSetVisibleColumnExpressions(quickSearchVisibleColumnExpressions));
        }
    };
    return QuickSearchStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.QuickSearchStrategy = QuickSearchStrategy;
