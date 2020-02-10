"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultSparklinesChartProperties_1 = require("@adaptabletools/adaptable/src/Utilities/Defaults/DefaultSparklinesChartProperties");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var EnumExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/EnumExtensions");
/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
 */
function setChartDisplayPopupState(chartDefinition) {
    var sparklinesChartProperties = Object.assign({}, DefaultSparklinesChartProperties_1.DefaultSparklinesChartProperties, chartDefinition.ChartProperties);
    return {
        ChartProperties: sparklinesChartProperties,
        IsChartSettingsVisible: false,
    };
}
exports.setChartDisplayPopupState = setChartDisplayPopupState;
function getChartTypeOptions() {
    return EnumExtensions_1.default.getNames(ChartEnums_1.SparklineTypeEnum).map(function (enumName) {
        return {
            label: enumName,
            value: enumName,
        };
    });
}
exports.getChartTypeOptions = getChartTypeOptions;
// TODO see a note in BuildChartData function
function getDataProperties(chartData) {
    if (chartData === undefined) {
        return [];
    }
    var dataItem = chartData[0];
    if (dataItem === undefined || dataItem === null) {
        return [];
    }
    var dataProps = Object.keys(dataItem);
    return dataProps;
}
exports.getDataProperties = getDataProperties;
// TODO ideally we should get names of numeric using ChartDefinition.YAxisColumnIds instead of:
function getNumericProperties(chartData) {
    if (chartData === undefined || chartData === null) {
        return [];
    }
    var dataItem = chartData[0];
    if (dataItem === undefined || dataItem === null) {
        return [];
    }
    var allProps = Object.keys(dataItem);
    var dataProps = [];
    allProps.forEach(function (name) {
        var dataValue = dataItem[name];
        if (typeof dataValue === 'number') {
            dataProps.push(name);
        }
    });
    return dataProps;
}
exports.getNumericProperties = getNumericProperties;
exports.SparklinesChartUIHelper = {
    setChartDisplayPopupState: setChartDisplayPopupState,
    getChartTypeOptions: getChartTypeOptions,
    getDataProperties: getDataProperties,
    getNumericProperties: getNumericProperties,
};
exports.default = exports.SparklinesChartUIHelper;
