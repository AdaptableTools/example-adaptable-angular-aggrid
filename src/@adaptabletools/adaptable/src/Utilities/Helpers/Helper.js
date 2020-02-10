"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var StringExtensions_1 = require("../Extensions/StringExtensions");
var LoggingHelper_1 = require("./LoggingHelper");
function objectExists(item) {
    return item != null && item != undefined;
}
exports.objectExists = objectExists;
function objectNotExists(item) {
    return !objectExists(item);
}
exports.objectNotExists = objectNotExists;
function getStringRepresentionFromKey(event) {
    if (event.key == null) {
        return event.char; // IE
    }
    return event.key;
}
exports.getStringRepresentionFromKey = getStringRepresentionFromKey;
function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.cloneObject = cloneObject;
function humanize(s) {
    return lodash_1.startCase(s);
}
exports.humanize = humanize;
function capitalize(string) {
    return (/[a-z]/.test(string) ? string : string.toLowerCase())
        .replace(/[\s\-_]*([^\s\-_])([^\s\-_]+)/g, replacer)
        .replace(/[A-Z]/g, ' $&')
        .trim();
}
exports.capitalize = capitalize;
exports.arrayToKeyMap = function (arr) {
    var defaultAccumulator = {};
    if (!arr || !Array.isArray(arr)) {
        return defaultAccumulator;
    }
    return arr.reduce(function (acc, key) {
        acc[key] = true;
        return acc;
    }, defaultAccumulator);
};
function replacer(b, c) {
    return b.toUpperCase() + c;
}
// converts an array (or an array of arrays) to CSV
function convertArrayToCsv(array, separator) {
    if (separator === void 0) { separator = " ' "; }
    var csvContent = '';
    array.forEach(function (infoArray, index) {
        var line = [];
        var item;
        var i;
        for (i = 0; i < infoArray.length; ++i) {
            item = infoArray[i];
            if (separator == ',') {
                if (item != null && item != undefined) {
                    if (typeof item === 'string' || item instanceof String) {
                        if (item.indexOf(',') !== -1 || item.indexOf('"') !== -1) {
                            item = "\"" + item.replace(/"/g, '""') + "\"";
                        }
                        // bit of a hack but we have a user where they have "+2502+S" as a value which Excel then thinks is a formula
                        if (item.indexOf('+') == 0) {
                            item = "'" + item + "'";
                        }
                    }
                }
            }
            line.push(item);
        }
        csvContent += line.join(separator) + (index != array.length - 1 ? '\n' : '');
    });
    return csvContent;
}
exports.convertArrayToCsv = convertArrayToCsv;
function createDownloadedFile(content, fileName, mimeType) {
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';
    if (navigator.msSaveBlob) {
        // IE10
        navigator.msSaveBlob(new Blob([content], {
            type: mimeType,
        }), fileName);
    }
    else if (URL && 'download' in a) {
        // html5 A[download]
        a.href = URL.createObjectURL(new Blob([content], {
            type: mimeType,
        }));
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    else {
        location.href = "data:application/octet-stream," + encodeURIComponent(content); // only this mime type is supported
    }
}
exports.createDownloadedFile = createDownloadedFile;
// Copies a string to the clipboard. Must be called from within an
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+,
// Firefox 42+, Safari 10+, Edge and IE 10+.
// IE: The clipboard feature may be disabled by an administrator. By
// default a prompt is shown the first time the clipboard is
// used (per session).
function copyToClipboard(text) {
    if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        var textarea = document.createElement('textarea');
        textarea.textContent = text;
        textarea.style.width = '1px';
        textarea.style.height = '1px';
        textarea.style.top = '0px';
        textarea.style.left = '0px';
        textarea.style.position = 'absolute';
        textarea.style.opacity = '0.0';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.focus();
        try {
            return document.execCommand('copy'); // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            LoggingHelper_1.LoggingHelper.LogAdaptableWarning('Copy to clipboard failed.', ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
    LoggingHelper_1.LoggingHelper.LogAdaptableWarning('Copy not available on this computer.');
}
exports.copyToClipboard = copyToClipboard;
function ReturnItemCount(items, itemName) {
    if (items.length == 0) {
        return "No " + itemName + "s";
    }
    return items.length == 1 ? "1 " + itemName : items.length + " " + itemName + "s";
}
exports.ReturnItemCount = ReturnItemCount;
function IsInputNullOrEmpty(itemToCheck) {
    if (typeof itemToCheck === 'string') {
        return StringExtensions_1.StringExtensions.IsNullOrEmpty(itemToCheck);
    }
    if (typeof itemToCheck === 'number') {
        return StringExtensions_1.StringExtensions.IsNullOrEmpty(itemToCheck.toString());
    }
    if (itemToCheck instanceof Date) {
        return StringExtensions_1.StringExtensions.IsNullOrEmpty(itemToCheck.toString());
    }
    return itemToCheck == null;
}
exports.IsInputNullOrEmpty = IsInputNullOrEmpty;
function IsInputNotNullOrEmpty(itemToCheck) {
    return !IsInputNullOrEmpty(itemToCheck);
}
exports.IsInputNotNullOrEmpty = IsInputNotNullOrEmpty;
function areObjectsEqual(obj1, obj2) {
    // if both are null return true
    if (obj1 == null && obj2 == null) {
        return true;
    }
    if (obj1 != null && obj2 == null) {
        return false;
    }
    if (obj1 == null && obj2 != null) {
        return false;
    }
    // Loop through properties in object 1
    for (var p in obj1) {
        // Check property exists on both objects
        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
            return false;
        }
        switch (typeof obj1[p]) {
            // Deep compare objects
            case 'object':
                if (!areObjectsEqual(obj1[p], obj2[p])) {
                    return false;
                }
                break;
            // Compare function code
            case 'function':
                if (typeof obj2[p] === 'undefined' ||
                    (p != 'compare' && obj1[p].toString() != obj2[p].toString())) {
                    return false;
                }
                break;
            // Compare values
            default:
                if (obj1[p] != obj2[p]) {
                    return false;
                }
                break;
        }
        // Check object 2 for any extra properties
        for (var p2 in obj2) {
            if (typeof obj1[p2] === 'undefined') {
                return false;
            }
        }
        return true;
    }
}
exports.areObjectsEqual = areObjectsEqual;
function StringifyValue(value) {
    if (!isNaN(Number(value))) {
        return Number(value).toString();
    }
    return value;
}
exports.StringifyValue = StringifyValue;
function RoundNumber(numberToRound, decimalPlaces) {
    switch (decimalPlaces) {
        case 1:
            return Math.round(numberToRound * 10) / 10;
        case 2:
            return Math.round(numberToRound * 100) / 100;
        case 3:
            return Math.round(numberToRound * 1000) / 1000;
        case 4:
            return Math.round(numberToRound * 10000) / 10000;
        case 5:
            return Math.round(numberToRound * 100000) / 100000;
        case 6:
            return Math.round(numberToRound * 1000000) / 1000000;
    }
}
exports.RoundNumber = RoundNumber;
function RoundNumberTo4dp(numberToRound) {
    return RoundNumber(numberToRound, 4);
}
exports.RoundNumberTo4dp = RoundNumberTo4dp;
function RoundValueIfNumeric(numberToRound, decimalPlaces) {
    var returnValue;
    if (!isNaN(Number(numberToRound))) {
        returnValue = RoundNumber(numberToRound, decimalPlaces);
    }
    else {
        returnValue = numberToRound;
    }
    return returnValue;
}
exports.RoundValueIfNumeric = RoundValueIfNumeric;
function sumNumberArray(numericValues) {
    if (numericValues.length) {
        var sum = numericValues.reduce(function (a, b) {
            return a + b;
        });
        return sum;
    }
    else {
        return 0;
    }
}
exports.sumNumberArray = sumNumberArray;
function meanNumberArray(numericValues) {
    // dividing by 0 will return Infinity
    // arr must contain at least 1 element to use reduce
    if (numericValues.length) {
        var sum = sumNumberArray(numericValues);
        return sum / numericValues.length;
    }
    else {
        return 0;
    }
}
exports.meanNumberArray = meanNumberArray;
function medianNumberArray(numericValues) {
    // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
    var median = 0, numsLen = numericValues.length;
    numericValues.sort();
    if (numsLen % 2 ===
        0 // is even
    ) {
        // average of two middle numbers
        median = (numericValues[numsLen / 2 - 1] + numericValues[numsLen / 2]) / 2;
    }
    else {
        // is odd
        // middle number only
        median = numericValues[(numsLen - 1) / 2];
    }
    return median;
}
exports.medianNumberArray = medianNumberArray;
function modeNumberArray(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    var m = numbers
        .reduce(function (items, current) {
        var item = items.length === 0 ? null : items.find(function (x) { return x.value === current; });
        item ? item.occurrence++ : items.push({ value: current, occurrence: 1 });
        return items;
    }, [])
        .sort(function (a, b) {
        if (a.occurrence < b.occurrence) {
            return 1;
        }
        else if (a.occurrence > b.occurrence || a.value < b.value) {
            return -1;
        }
        else {
            return a.value === b.value ? 0 : 1;
        }
    });
    return m[0].value;
}
exports.modeNumberArray = modeNumberArray;
exports.Helper = {
    objectExists: objectExists,
    objectNotExists: objectNotExists,
    getStringRepresentionFromKey: getStringRepresentionFromKey,
    cloneObject: cloneObject,
    capitalize: capitalize,
    convertArrayToCsv: convertArrayToCsv,
    createDownloadedFile: createDownloadedFile,
    copyToClipboard: copyToClipboard,
    ReturnItemCount: ReturnItemCount,
    IsInputNullOrEmpty: IsInputNullOrEmpty,
    IsInputNotNullOrEmpty: IsInputNotNullOrEmpty,
    areObjectsEqual: areObjectsEqual,
    StringifyValue: StringifyValue,
    RoundNumber: RoundNumber,
    RoundNumberTo4dp: RoundNumberTo4dp,
    RoundValueIfNumeric: RoundValueIfNumeric,
    sumNumberArray: sumNumberArray,
    meanNumberArray: meanNumberArray,
    medianNumberArray: medianNumberArray,
    modeNumberArray: modeNumberArray,
};
exports.default = exports.Helper;
