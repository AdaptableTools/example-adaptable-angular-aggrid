"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var DefaultPieChartProperties_1 = require("@adaptabletools/adaptable/src/Utilities/Defaults/DefaultPieChartProperties");
/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
 */
function getBrushesEven() {
    return ['#7446B9', '#9FB328', '#F96232', '#2E9CA6', '#DC3F76', '#FF9800', '#3F51B5', '#439C47'];
}
exports.getBrushesEven = getBrushesEven;
function getBrushesOdd() {
    return [
        '#7446B9',
        '#9FB328',
        '#F96232',
        '#2E9CA6',
        '#DC3F76',
        '#FF9800',
        '#3F51B5',
        '#439C47',
        '#795548',
    ];
}
exports.getBrushesOdd = getBrushesOdd;
function setChartDisplayPopupState(chartDefinition, dataSource) {
    var pieChartProperties = Object.assign({}, DefaultPieChartProperties_1.DefaultPieChartProperties, chartDefinition.ChartProperties);
    var data = dataSource != null ? dataSource.Data : [];
    return {
        DataSource: data,
        ChartProperties: pieChartProperties,
        IsChartSettingsVisible: true,
        IsGeneralMinimised: false,
        SliceSortOption: ChartEnums_1.SliceSortOption.ValueDescending,
        SliceBrushes: data.length % 2 == 0 ? getBrushesOdd() : getBrushesEven(),
    };
}
exports.setChartDisplayPopupState = setChartDisplayPopupState;
function setDefaultChartDisplayPopupState() {
    var defaultState = {
        IsChartSettingsVisible: true,
        IsGeneralMinimised: false,
        SliceSortOption: ChartEnums_1.SliceSortOption.ValueDescending,
    };
    return defaultState;
}
exports.setDefaultChartDisplayPopupState = setDefaultChartDisplayPopupState;
function sortDataSource(sliceSortOption, oldData) {
    if (oldData == null || oldData.length == 0) {
        return [];
    }
    var newData = tslib_1.__spread(oldData);
    switch (sliceSortOption) {
        case ChartEnums_1.SliceSortOption.ValueAscending:
            newData.sort(sortByValueAscending);
            break;
        case ChartEnums_1.SliceSortOption.ValueDescending:
            newData.sort(sortByValueDescending);
            break;
        case ChartEnums_1.SliceSortOption.NameAscending:
            newData.sort(sortByNameAscending);
            break;
        case ChartEnums_1.SliceSortOption.NameDescending:
            newData.sort(sortByNameDescending);
            break;
    }
    return newData;
}
exports.sortDataSource = sortDataSource;
function sortByNameAscending(a, b) {
    var nameA = a.Name.toLowerCase();
    var nameB = b.Name.toLowerCase();
    if (nameA > nameB) {
        return 1;
    }
    if (nameA < nameB) {
        return -1;
    }
    return 0;
}
exports.sortByNameAscending = sortByNameAscending;
function sortByNameDescending(a, b) {
    var nameA = a.Name.toLowerCase();
    var nameB = b.Name.toLowerCase();
    if (nameA > nameB) {
        return -1;
    }
    if (nameA < nameB) {
        return 1;
    }
    return 0;
}
exports.sortByNameDescending = sortByNameDescending;
function sortByValueAscending(a, b) {
    if (a.Value > b.Value) {
        return 1;
    }
    if (a.Value < b.Value) {
        return -1;
    }
    return 0;
}
exports.sortByValueAscending = sortByValueAscending;
function sortByValueDescending(a, b) {
    if (a.Value > b.Value) {
        return -1;
    }
    if (a.Value < b.Value) {
        return 1;
    }
    return 0;
}
exports.sortByValueDescending = sortByValueDescending;
exports.PieChartUIHelper = {
    getBrushesEven: getBrushesEven,
    getBrushesOdd: getBrushesOdd,
    setChartDisplayPopupState: setChartDisplayPopupState,
    setDefaultChartDisplayPopupState: setDefaultChartDisplayPopupState,
    sortDataSource: sortDataSource,
    sortByNameAscending: sortByNameAscending,
    sortByNameDescending: sortByNameDescending,
    sortByValueAscending: sortByValueAscending,
    sortByValueDescending: sortByValueDescending,
};
exports.default = exports.PieChartUIHelper;
