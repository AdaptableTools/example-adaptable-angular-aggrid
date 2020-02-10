"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
// export function getNamesAndValues<T extends number>(e: any) {
//     return EnumExtensions.getNames(e).map(n => ({ name: n, value: e[n] as T }));
// }
function getNames(e) {
    return exports.EnumExtensions.getObjValues(e).filter(function (v) { return typeof v === 'string'; });
}
exports.getNames = getNames;
function getValues(e) {
    return exports.EnumExtensions.getObjValues(e).filter(function (v) { return typeof v === 'number'; });
}
exports.getValues = getValues;
function getObjValues(e) {
    return Object.keys(e).map(function (k) { return e[k]; });
}
exports.getObjValues = getObjValues;
function getCssFontSizeFromFontSizeEnum(fontSize) {
    switch (fontSize) {
        case Enums_1.FontSize.XLarge:
            return 'x-large';
        case Enums_1.FontSize.Large:
            return 'large';
        case Enums_1.FontSize.Medium:
            return 'medium';
        case Enums_1.FontSize.Small:
            return 'small';
        case Enums_1.FontSize.XSmall:
            return 'x-small';
    }
}
exports.getCssFontSizeFromFontSizeEnum = getCssFontSizeFromFontSizeEnum;
exports.EnumExtensions = {
    getNames: getNames,
    getValues: getValues,
    getObjValues: getObjValues,
    getCssFontSizeFromFontSizeEnum: getCssFontSizeFromFontSizeEnum,
};
exports.default = exports.EnumExtensions;
