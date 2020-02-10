"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function IsNull(stringToCheck) {
    return stringToCheck == null || stringToCheck == undefined;
}
exports.IsNull = IsNull;
function IsNotNull(stringToCheck) {
    return !IsNull(stringToCheck);
}
exports.IsNotNull = IsNotNull;
function IsEmpty(stringToCheck) {
    return stringToCheck == '';
}
exports.IsEmpty = IsEmpty;
function IsNotEmpty(stringToCheck) {
    return !IsEmpty(stringToCheck);
}
exports.IsNotEmpty = IsNotEmpty;
function IsNullOrEmpty(stringToCheck) {
    return IsNull(stringToCheck) || IsEmpty(stringToCheck);
}
exports.IsNullOrEmpty = IsNullOrEmpty;
function IsNotNullOrEmpty(stringToCheck) {
    return !IsNullOrEmpty(stringToCheck);
}
exports.IsNotNullOrEmpty = IsNotNullOrEmpty;
function PlaceSpaceBetweenCapitalisedWords(stringToCheck) {
    return stringToCheck.replace(/([A-Z])/g, ' $1').trim();
}
exports.PlaceSpaceBetweenCapitalisedWords = PlaceSpaceBetweenCapitalisedWords;
function RemoveTrailingComma(stringToCheck) {
    return stringToCheck.replace(/,\s*$/, '');
}
exports.RemoveTrailingComma = RemoveTrailingComma;
function ToLowerCase(stringToCheck) {
    return IsNullOrEmpty(stringToCheck) ? stringToCheck : stringToCheck.toLowerCase();
}
exports.ToLowerCase = ToLowerCase;
function Includes(stringToCheck, valueToCheck) {
    return stringToCheck.includes(valueToCheck);
}
exports.Includes = Includes;
function NotIncludes(stringToCheck, valueToCheck) {
    return !Includes(stringToCheck, valueToCheck);
}
exports.NotIncludes = NotIncludes;
function abbreviateString(stringToAbbreviate, maxLength) {
    return stringToAbbreviate.length < maxLength
        ? stringToAbbreviate
        : stringToAbbreviate.substr(0, maxLength) + '...';
}
exports.abbreviateString = abbreviateString;
exports.StringExtensions = {
    IsNull: IsNull,
    IsNotNull: IsNotNull,
    IsEmpty: IsEmpty,
    IsNotEmpty: IsNotEmpty,
    IsNullOrEmpty: IsNullOrEmpty,
    IsNotNullOrEmpty: IsNotNullOrEmpty,
    PlaceSpaceBetweenCapitalisedWords: PlaceSpaceBetweenCapitalisedWords,
    RemoveTrailingComma: RemoveTrailingComma,
    ToLowerCase: ToLowerCase,
    Includes: Includes,
    NotIncludes: NotIncludes,
    abbreviateString: abbreviateString,
};
exports.default = exports.StringExtensions;
