"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var CustomSortStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(CustomSortStrategy, _super);
    function CustomSortStrategy(adaptable) {
        return _super.call(this, StrategyConstants.CustomSortStrategyId, adaptable) || this;
    }
    CustomSortStrategy.prototype.InitState = function () {
        if (this.CustomSorts != this.adaptable.api.customSortApi.getAllCustomSort()) {
            this.removeCustomSorts();
            this.CustomSorts = this.adaptable.api.customSortApi.getAllCustomSort();
            this.applyCustomSorts();
        }
    };
    CustomSortStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.CustomSortStrategyFriendlyName,
            ComponentName: ScreenPopups.CustomSortPopup,
            Icon: StrategyConstants.CustomSortGlyph,
        });
    };
    CustomSortStrategy.prototype.addColumnMenuItem = function (column) {
        if (this.canCreateColumnMenuItem(column, this.adaptable, 'sort')) {
            var customSort = this.CustomSorts.find(function (x) { return x.ColumnId == column.ColumnId; });
            var label = customSort ? 'Edit ' : 'Create ';
            var popupParam = {
                columnId: column.ColumnId,
                action: customSort ? 'Edit' : 'New',
                source: 'ColumnMenu',
            };
            return this.createColumnMenuItemShowPopup(label + StrategyConstants.CustomSortStrategyFriendlyName, ScreenPopups.CustomSortPopup, StrategyConstants.CustomSortGlyph, popupParam);
        }
    };
    CustomSortStrategy.prototype.removeCustomSorts = function () {
        var _this = this;
        if (this.CustomSorts) {
            this.CustomSorts.forEach(function (customSort) {
                _this.adaptable.removeCustomSort(customSort.ColumnId);
            });
        }
    };
    CustomSortStrategy.prototype.applyCustomSorts = function () {
        var _this = this;
        this.CustomSorts.forEach(function (customSort) {
            var customSortComparerFunction = customSort.CustomSortComparerFunction
                ? customSort.CustomSortComparerFunction
                : _this.getComparerFunction(customSort);
            _this.adaptable.setCustomSort(customSort.ColumnId, customSortComparerFunction);
        });
    };
    // make this an abstract function?
    CustomSortStrategy.prototype.getComparerFunction = function (customSort) {
        var theadaptable = this.adaptable;
        return function compareItemsOfCustomSort(firstElement, secondElement) {
            var firstElementValueString = theadaptable.getDisplayValue(theadaptable.getPrimaryKeyValueFromRowNode(firstElement), customSort.ColumnId); //firstElement[customSort.ColumnId];
            var secondElementValueString = theadaptable.getDisplayValue(theadaptable.getPrimaryKeyValueFromRowNode(secondElement), customSort.ColumnId); //secondElement[customSort.ColumnId];
            var firstElementValue = firstElement[customSort.ColumnId];
            var secondElementValue = secondElement[customSort.ColumnId];
            var indexFirstElement = customSort.SortedValues.indexOf(firstElementValueString);
            var containsFirstElement = indexFirstElement >= 0;
            var indexSecondElement = customSort.SortedValues.indexOf(secondElementValueString);
            var containsSecondElement = indexSecondElement >= 0;
            //if none of the element are in the list we jsut return normal compare
            if (!containsFirstElement && !containsSecondElement) {
                return firstElementValue < secondElementValue ? -1 : 1;
            }
            //if first item not in the list make sure we put it after the second item
            if (!containsFirstElement) {
                return 1;
            }
            //if second item not in the list make sure we put it after the first item
            if (!containsSecondElement) {
                return -1;
            }
            //return the comparison from the list if the two items are in the list
            return indexFirstElement - indexSecondElement;
        };
    };
    return CustomSortStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.CustomSortStrategy = CustomSortStrategy;
