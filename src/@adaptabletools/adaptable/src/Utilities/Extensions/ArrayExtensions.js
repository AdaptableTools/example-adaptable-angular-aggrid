"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
function GetLength(arrayToCheck) {
    return IsNotNull(arrayToCheck) ? arrayToCheck.length : 0;
}
exports.GetLength = GetLength;
function CorrectLength(arrayToCheck, requiredLength) {
    return GetLength(arrayToCheck) == requiredLength;
}
exports.CorrectLength = CorrectLength;
function NotCorrectLength(arrayToCheck, requiredLength) {
    return !CorrectLength(arrayToCheck, requiredLength);
}
exports.NotCorrectLength = NotCorrectLength;
function AddItem(array, itemToAdd) {
    if (NotContainsItem(array, itemToAdd)) {
        array.push(itemToAdd);
    }
}
exports.AddItem = AddItem;
function ContainsItem(array, itemToCheck) {
    if (array == null) {
        return false;
    }
    return array.indexOf(itemToCheck) > -1;
}
exports.ContainsItem = ContainsItem;
function ContainsAnyItem(array, itemsToCheck) {
    if (array == null) {
        return false;
    }
    var foundItem = false;
    itemsToCheck.forEach(function (item) {
        if (!foundItem) {
            if (ContainsItem(array, item)) {
                foundItem = true;
            }
        }
    });
    return foundItem;
}
exports.ContainsAnyItem = ContainsAnyItem;
function NotContainsItem(array, itemToCheck) {
    return !ContainsItem(array, itemToCheck);
}
exports.NotContainsItem = NotContainsItem;
function RetrieveDistinct(array) {
    return Array.from(new Set(array.map(function (item) { return item; })));
}
exports.RetrieveDistinct = RetrieveDistinct;
function IsNull(arrayToCheck) {
    return arrayToCheck == null || arrayToCheck == undefined;
}
exports.IsNull = IsNull;
function IsNotNull(arrayToCheck) {
    return !IsNull(arrayToCheck);
}
exports.IsNotNull = IsNotNull;
function IsEmpty(arrayToCheck) {
    return arrayToCheck.length == 0;
}
exports.IsEmpty = IsEmpty;
function IsNotEmpty(arrayToCheck) {
    return !IsEmpty(arrayToCheck);
}
exports.IsNotEmpty = IsNotEmpty;
function IsNullOrEmpty(arrayToCheck) {
    return IsNull(arrayToCheck) || IsEmpty(arrayToCheck);
}
exports.IsNullOrEmpty = IsNullOrEmpty;
function IsNotNullOrEmpty(arrayToCheck) {
    return IsNotNull(arrayToCheck) && IsNotEmpty(arrayToCheck);
}
exports.IsNotNullOrEmpty = IsNotNullOrEmpty;
function hasOneItem(arrayToCheck) {
    return hasItemsOfCount(arrayToCheck, 1);
}
exports.hasOneItem = hasOneItem;
function hasItemsOfCount(arrayToCheck, numberOfItems) {
    return arrayToCheck.length == numberOfItems;
}
exports.hasItemsOfCount = hasItemsOfCount;
function moveArray(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
}
exports.moveArray = moveArray;
//This deliberately only checks contents equality and not positional so [1, 2, 3]== [1, 3, 2]
function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    return arr1.every(function (x) { return arr2.indexOf(x) != -1; });
}
exports.areArraysEqual = areArraysEqual;
function areArraysNotEqual(arr1, arr2) {
    return !areArraysEqual(arr1, arr2);
}
exports.areArraysNotEqual = areArraysNotEqual;
function areArraysEqualWithOrder(arr1, arr2) {
    if (arr1 == null) {
        return true;
    }
    if (arr1.length !== arr2.length) {
        return false;
    }
    return arr1.every(function (x, index) { return arr2.indexOf(x) == index; });
}
exports.areArraysEqualWithOrder = areArraysEqualWithOrder;
function areArraysEqualWithOrderandProperties(value, other) {
    var type = Object.prototype.toString.call(value);
    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) {
        return false;
    }
    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
        return false;
    }
    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) {
        return false;
    }
    // Compare two items
    var compare = function (item1, item2) {
        // Get the object type
        var itemType = Object.prototype.toString.call(item1);
        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!areArraysEqualWithOrderandProperties(item1, item2)) {
                return false;
            }
        }
        // Otherwise, do a simple comparison
        else {
            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2)) {
                return false;
            }
            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString()) {
                    return false;
                }
            }
            else {
                if (item1 !== item2) {
                    return false;
                }
            }
        }
    };
    // Compare properties
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) {
                return false;
            }
        }
    }
    else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) {
                    return false;
                }
            }
        }
    }
    // If nothing failed, return true
    return true;
}
exports.areArraysEqualWithOrderandProperties = areArraysEqualWithOrderandProperties;
function sortArrayWithProperty(sortOrder, values, sortProperty) {
    if (sortProperty) {
        var newValues = [].concat(values);
        var direction_1 = 1;
        if (sortOrder == Enums_1.SortOrder.Descending) {
            direction_1 = -1;
        }
        return newValues.sort(function (a, b) {
            var aSortProperty = a[sortProperty];
            var bSortProperty = b[sortProperty];
            if (typeof aSortProperty == 'string' && typeof bSortProperty == 'string') {
                return aSortProperty.localeCompare(bSortProperty) * direction_1;
            }
            else {
                return aSortProperty < bSortProperty
                    ? -1 * direction_1
                    : aSortProperty > bSortProperty
                        ? 1 * direction_1
                        : 0;
            }
        });
    }
    else {
        return sortArray(values, sortOrder);
    }
}
exports.sortArrayWithProperty = sortArrayWithProperty;
function sortArray(values, sortOrder) {
    if (sortOrder === void 0) { sortOrder = Enums_1.SortOrder.Ascending; }
    var newValues = [].concat(values);
    var direction = 1;
    if (sortOrder == Enums_1.SortOrder.Descending) {
        direction = -1;
    }
    return newValues.sort(function (a, b) { return (a < b ? -1 * direction : a > b ? 1 * direction : 0); });
}
exports.sortArray = sortArray;
function groupArrayBy(array, prop) {
    return array.reduce(function (acc, item) {
        var key = item[prop];
        acc[key] = acc[key] || [];
        acc[key].push(item);
        return acc;
    }, {});
}
exports.groupArrayBy = groupArrayBy;
function createCommaSeparatedString(values) {
    return values.join(', ');
}
exports.createCommaSeparatedString = createCommaSeparatedString;
exports.ArrayExtensions = {
    GetLength: GetLength,
    CorrectLength: CorrectLength,
    NotCorrectLength: NotCorrectLength,
    groupArrayBy: groupArrayBy,
    AddItem: AddItem,
    ContainsItem: ContainsItem,
    NotContainsItem: NotContainsItem,
    ContainsAnyItem: ContainsAnyItem,
    RetrieveDistinct: RetrieveDistinct,
    IsNull: IsNull,
    IsNotNull: IsNotNull,
    IsEmpty: IsEmpty,
    IsNotEmpty: IsNotEmpty,
    IsNullOrEmpty: IsNullOrEmpty,
    IsNotNullOrEmpty: IsNotNullOrEmpty,
    hasOneItem: hasOneItem,
    hasItemsOfCount: hasItemsOfCount,
    moveArray: moveArray,
    areArraysEqual: areArraysEqual,
    areArraysNotEqual: areArraysNotEqual,
    areArraysEqualWithOrder: areArraysEqualWithOrder,
    areArraysEqualWithOrderandProperties: areArraysEqualWithOrderandProperties,
    sortArray: sortArray,
    sortArrayWithProperty: sortArrayWithProperty,
    createCommaSeparatedString: createCommaSeparatedString,
};
exports.default = exports.ArrayExtensions;
