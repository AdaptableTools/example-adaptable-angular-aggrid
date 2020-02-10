"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function orderBy(collection, iteratees, orders, functions) {
    var index = -1;
    var result = baseMap(collection, function (value, key, collection) {
        var criteria = iteratees.map(function (iteratee) { return iteratee(value); });
        return { criteria: criteria, index: ++index, value: value };
    });
    return sortBy(result, function (object, other) {
        return compareMultiple(object, other, orders, functions);
    });
}
exports.orderBy = orderBy;
function baseMap(collection, iteratee) {
    var index = -1, result = Array(collection.length);
    baseEach(collection, function (value, key, collection) {
        result[++index] = iteratee(value, key, collection);
    });
    return result;
}
function compareMultiple(object, other, orders, functions) {
    var index = -1;
    var objCriteria = object.criteria;
    var othCriteria = other.criteria;
    var length = objCriteria.length;
    while (++index < length) {
        var order = orders[index];
        var sortFunction = functions[index];
        var result = void 0;
        result = sortFunction(objCriteria[index], othCriteria[index], order);
        if (result) {
            return result;
        }
    }
    return object.index - other.index;
}
function sortBy(array, comparer) {
    var length = array.length;
    array.sort(comparer);
    while (length--) {
        array[length] = array[length].value.OriginalIndex;
    }
    return array;
}
function baseEach(collection, iteratee) {
    if (collection == null) {
        return collection;
    }
    var length = collection.length;
    var iterable = Object(collection);
    var index = -1;
    while (++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
            break;
        }
    }
    return collection;
}
exports.SortHelper = {
    orderBy: orderBy,
};
exports.default = exports.SortHelper;
