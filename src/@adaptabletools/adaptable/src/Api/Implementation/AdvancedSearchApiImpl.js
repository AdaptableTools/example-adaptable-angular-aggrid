"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var AdvancedSearchRedux = require("../../Redux/ActionsReducers/AdvancedSearchRedux");
var ApiBase_1 = require("./ApiBase");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var AdaptableHelper_1 = require("../../Utilities/Helpers/AdaptableHelper");
var AdvancedSearchApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(AdvancedSearchApiImpl, _super);
    function AdvancedSearchApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdvancedSearchApiImpl.prototype.getAdvancedSearchState = function () {
        return this.getAdaptableState().AdvancedSearch;
    };
    AdvancedSearchApiImpl.prototype.setAdvancedSearchState = function (advancedSearchState) {
        var _this = this;
        // add/update each advanced search where the states are different
        var advancedSearches = this.getAllAdvancedSearch();
        if (advancedSearches != advancedSearchState.AdvancedSearches) {
            advancedSearchState.AdvancedSearches.forEach(function (advancedSearch) {
                if (AdaptableHelper_1.default.AdaptableObjectExistsInState(advancedSearches, advancedSearch)) {
                    _this.editAdvancedSearch(advancedSearch);
                }
                else {
                    _this.addAdvancedSearch(advancedSearch);
                }
            });
        }
        // set or clear the current one
        if (this.getAdvancedSearchState().CurrentAdvancedSearch !=
            advancedSearchState.CurrentAdvancedSearch) {
            if (StringExtensions_1.default.IsNotNullOrEmpty(advancedSearchState.CurrentAdvancedSearch)) {
                this.setAdvancedSearch(advancedSearchState.CurrentAdvancedSearch);
            }
            else {
                this.clearAdvancedSearch();
            }
        }
    };
    AdvancedSearchApiImpl.prototype.setAdvancedSearch = function (advancedSearchName) {
        var advancedSearch = this.getAdaptableState().AdvancedSearch.AdvancedSearches.find(function (a) { return a.Name == advancedSearchName; });
        if (this.checkItemExists(advancedSearch, advancedSearchName, StrategyConstants.AdvancedSearchStrategyFriendlyName)) {
            this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName));
        }
    };
    AdvancedSearchApiImpl.prototype.clearAdvancedSearch = function () {
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(''));
    };
    AdvancedSearchApiImpl.prototype.addAdvancedSearch = function (advancedSearch) {
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAdd(advancedSearch));
    };
    AdvancedSearchApiImpl.prototype.editAdvancedSearch = function (advancedSearch) {
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchEdit(advancedSearch));
    };
    AdvancedSearchApiImpl.prototype.deleteAdvancedSearch = function (advancedSearch) {
        // todo something if doesnt exist?
        if (advancedSearch) {
            this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(advancedSearch));
        }
    };
    AdvancedSearchApiImpl.prototype.deleteAdvancedSearchByName = function (advancedSearchName) {
        var searchToDelete = this.getAdvancedSearchByName(advancedSearchName);
        this.deleteAdvancedSearch(searchToDelete);
    };
    AdvancedSearchApiImpl.prototype.deleteAdvancedSearchByUuid = function (uid) {
        var searchToDelete = this.getAdvancedSearchByUuid(uid);
        this.deleteAdvancedSearch(searchToDelete);
    };
    AdvancedSearchApiImpl.prototype.getCurrentAdvancedSearch = function () {
        return this.getAdvancedSearchByName(this.getCurrentAdvancedSearchName());
    };
    AdvancedSearchApiImpl.prototype.getCurrentAdvancedSearchName = function () {
        return this.getAdaptableState().AdvancedSearch.CurrentAdvancedSearch;
    };
    AdvancedSearchApiImpl.prototype.getAdvancedSearchByName = function (advancedSearchName) {
        return this.getAllAdvancedSearch().find(function (a) { return a.Name == advancedSearchName; });
    };
    AdvancedSearchApiImpl.prototype.getAdvancedSearchByUuid = function (uuid) {
        return this.getAllAdvancedSearch().find(function (a) { return a.Uuid == uuid; });
    };
    AdvancedSearchApiImpl.prototype.getAllAdvancedSearch = function () {
        var searches = this.getAdaptableState().AdvancedSearch
            .AdvancedSearches;
        if (searches == undefined) {
            searches = [];
        }
        return searches;
    };
    AdvancedSearchApiImpl.prototype.showAdvancedSearchPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.AdvancedSearchStrategyId, ScreenPopups.AdvancedSearchPopup);
    };
    return AdvancedSearchApiImpl;
}(ApiBase_1.ApiBase));
exports.AdvancedSearchApiImpl = AdvancedSearchApiImpl;
