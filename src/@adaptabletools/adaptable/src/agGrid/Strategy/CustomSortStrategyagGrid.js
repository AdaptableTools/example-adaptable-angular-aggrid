"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CustomSortStrategy_1 = require("../../Strategy/CustomSortStrategy");
var CustomSortStrategyagGrid = /** @class */ (function (_super) {
    tslib_1.__extends(CustomSortStrategyagGrid, _super);
    function CustomSortStrategyagGrid(adaptable) {
        return _super.call(this, adaptable) || this;
    }
    CustomSortStrategyagGrid.prototype.getComparerFunction = function (customSort) {
        var theadaptable = this.adaptable;
        return function compareItemsOfCustomSort(valueA, valueB, nodeA, nodeB) {
            var firstElementValueString = theadaptable.getDisplayValueFromRowNode(nodeA, customSort.ColumnId);
            var secondElementValueString = theadaptable.getDisplayValueFromRowNode(nodeB, customSort.ColumnId);
            var firstElementValue = valueA;
            var secondElementValue = valueB;
            var indexFirstElement = customSort.SortedValues.indexOf(firstElementValueString);
            var containsFirstElement = indexFirstElement >= 0;
            var indexSecondElement = customSort.SortedValues.indexOf(secondElementValueString);
            var containsSecondElement = indexSecondElement >= 0;
            //if none of the element are in the list we jsut return normal compare
            if (!containsFirstElement && !containsSecondElement) {
                if (firstElementValue == secondElementValue) {
                    return 0;
                }
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
    return CustomSortStrategyagGrid;
}(CustomSortStrategy_1.CustomSortStrategy));
exports.CustomSortStrategyagGrid = CustomSortStrategyagGrid;
