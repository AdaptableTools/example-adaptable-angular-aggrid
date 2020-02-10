export declare function getNames(e: any): string[];
export declare function getValues<T extends number>(e: any): T[];
export declare function getObjValues(e: any): (number | string)[];
export declare function getCssFontSizeFromFontSizeEnum(fontSize: any): string;
export declare const EnumExtensions: {
    getNames: typeof getNames;
    getValues: typeof getValues;
    getObjValues: typeof getObjValues;
    getCssFontSizeFromFontSizeEnum: typeof getCssFontSizeFromFontSizeEnum;
};
export default EnumExtensions;
