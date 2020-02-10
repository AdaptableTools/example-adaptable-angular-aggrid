"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var QuickSearchRedux = require("../../Redux/ActionsReducers/QuickSearchRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ApiBase_1 = require("./ApiBase");
var QuickSearchApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(QuickSearchApiImpl, _super);
    function QuickSearchApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuickSearchApiImpl.prototype.getQuickSearchState = function () {
        return this.getAdaptableState().QuickSearch;
    };
    QuickSearchApiImpl.prototype.setQuickSearchState = function (quickSearchState) {
        var currentQuickSearchState = this.getQuickSearchState();
        // apply QuickSearch if different
        if (currentQuickSearchState.QuickSearchText != quickSearchState.QuickSearchText) {
            this.applyQuickSearch(quickSearchState.QuickSearchText);
        }
        if (currentQuickSearchState.DisplayAction != quickSearchState.DisplayAction) {
            this.setQuickSearchDisplayAction(quickSearchState.DisplayAction);
        }
        if (currentQuickSearchState.Style != quickSearchState.Style) {
            this.setQuickSearchStyle(quickSearchState.Style);
        }
    };
    QuickSearchApiImpl.prototype.applyQuickSearch = function (quickSearchText) {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(quickSearchText));
    };
    QuickSearchApiImpl.prototype.clearQuickSearch = function () {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(''));
    };
    QuickSearchApiImpl.prototype.getQuickSearchValue = function () {
        return this.getQuickSearchState().QuickSearchText;
    };
    QuickSearchApiImpl.prototype.getQuickSearchStyle = function () {
        return this.getQuickSearchState().Style;
    };
    QuickSearchApiImpl.prototype.getQuickSearchDisplayAction = function () {
        return this.getQuickSearchState().DisplayAction;
    };
    QuickSearchApiImpl.prototype.setQuickSearchDisplayAction = function (displayAction) {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetDisplay(displayAction));
    };
    QuickSearchApiImpl.prototype.setQuickSearchStyle = function (style) {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetStyle(style));
    };
    QuickSearchApiImpl.prototype.showQuickSearchPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.QuickSearchStrategyId, ScreenPopups.QuickSearchPopup);
    };
    return QuickSearchApiImpl;
}(ApiBase_1.ApiBase));
exports.QuickSearchApiImpl = QuickSearchApiImpl;
