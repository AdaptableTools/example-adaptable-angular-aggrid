"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ignores time
function IsDateInPast(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
}
exports.IsDateInPast = IsDateInPast;
function IsDateInFuture(date) {
    return !IsDateInPast(date);
}
exports.IsDateInFuture = IsDateInFuture;
exports.DateExtensions = {
    IsDateInFuture: IsDateInFuture,
    IsDateInPast: IsDateInPast,
};
exports.default = exports.DateExtensions;
