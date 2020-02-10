"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function abbreviateNumber(numberToAbbreviate) {
    var str = '';
    if (numberToAbbreviate >= 1000000000) {
        str = (numberToAbbreviate / 1000000000).toFixed(1) + 'B';
    }
    else if (numberToAbbreviate >= 1000000) {
        str = (numberToAbbreviate / 1000000).toFixed(1) + 'M';
    }
    else if (numberToAbbreviate >= 1000) {
        str = (numberToAbbreviate / 1000).toFixed(1) + 'K';
    }
    else {
        str = numberToAbbreviate.toString();
    }
    return str;
}
exports.abbreviateNumber = abbreviateNumber;
exports.NumberExtensions = {
    abbreviateNumber: abbreviateNumber,
};
exports.default = exports.NumberExtensions;
