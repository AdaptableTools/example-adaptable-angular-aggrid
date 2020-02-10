"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var EnumExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/EnumExtensions");
var React = require("react");
var ColumnHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper");
var DefaultCategoryChartProperties_1 = require("@adaptabletools/adaptable/src/Utilities/Defaults/DefaultCategoryChartProperties");
/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
 */
function setChartDisplayPopupState(chartDefinition, columns) {
    var categoryChartProperties = Object.assign({}, DefaultCategoryChartProperties_1.DefaultCategoryChartProperties, chartDefinition.ChartProperties);
    return {
        ChartProperties: categoryChartProperties,
        IsChartSettingsVisible: false,
        // General
        IsGeneralMinimised: false,
        // Y Axis
        IsYAxisMinimised: true,
        SetYAxisMinimumValue: categoryChartProperties.YAxisMinimumValue != undefined,
        SetYAxisMaximumValue: categoryChartProperties.YAxisMaximumValue != undefined,
        SetYAxisLabelColor: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(categoryChartProperties.YAxisLabelColor),
        SetYAxisTitleColor: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(categoryChartProperties.YAxisTitleColor),
        UseDefaultYAxisTitle: isDefaultYAxisTitle(chartDefinition, columns),
        // X Axis
        IsXAxisMinimised: true,
        SetXAxisLabelColor: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(categoryChartProperties.XAxisLabelColor),
        SetXAxisTitleColor: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(categoryChartProperties.XAxisTitleColor),
        UseDefaultXAxisTitle: isDefaultXAxisTitle(chartDefinition, columns),
        // Highlights
        IsHighlightsMinimised: true,
        // Misc
        IsMiscMinimised: true,
        TitleMargin: categoryChartProperties.TitleAlignment == ChartEnums_1.HorizontalAlignment.Right ? 5 : 0,
        SubTitleMargin: categoryChartProperties.SubTitleAlignment == ChartEnums_1.HorizontalAlignment.Right ? 5 : 0,
    };
}
exports.setChartDisplayPopupState = setChartDisplayPopupState;
function isDefaultYAxisTitle(chartDefinition, columns) {
    var categoryChartProperties = chartDefinition.ChartProperties;
    return (StringExtensions_1.StringExtensions.IsNullOrEmpty(categoryChartProperties.YAxisTitle) ||
        categoryChartProperties.YAxisTitle == createDefaultYAxisTitle(chartDefinition, columns));
}
function isDefaultXAxisTitle(chartDefinition, columns) {
    var categoryChartProperties = chartDefinition.ChartProperties;
    return (StringExtensions_1.StringExtensions.IsNullOrEmpty(categoryChartProperties.XAxisTitle) ||
        categoryChartProperties.XAxisTitle == createDefaultXAxisTitle(chartDefinition, columns));
}
function createDefaultYAxisTitle(chartDefinition, columns) {
    return chartDefinition.YAxisColumnIds.map(function (c) {
        return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(c, columns);
    }).join(', ');
}
exports.createDefaultYAxisTitle = createDefaultYAxisTitle;
function createDefaultXAxisTitle(chartDefinition, columns) {
    return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns);
}
exports.createDefaultXAxisTitle = createDefaultXAxisTitle;
function setDefaultChartDisplayPopupState() {
    var defaultState = {
        IsGeneralMinimised: false,
        IsYAxisMinimised: true,
        SetYAxisMinimumValue: false,
        SetYAxisLabelColor: false,
        SetYAxisTitleColor: false,
        IsXAxisMinimised: true,
        SetXAxisLabelColor: false,
        SetXAxisTitleColor: false,
        IsMiscMinimised: true,
        TitleMargin: 0,
        SubTitleMargin: 0,
        UseDefaultXAxisTitle: true,
    };
    return defaultState;
}
exports.setDefaultChartDisplayPopupState = setDefaultChartDisplayPopupState;
function getChartTypeOptions() {
    return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.CategoryChartType).map(function (enumName) {
        return {
            label: enumName,
            value: enumName,
        };
    });
}
exports.getChartTypeOptions = getChartTypeOptions;
function getToolTipOptions() {
    var optionToolTipTypes = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.ToolTipType).map(function (enumName) {
        return {
            label: enumName,
            value: enumName,
        };
    });
    return optionToolTipTypes;
}
exports.getToolTipOptions = getToolTipOptions;
function getCrossHairModeOptions() {
    return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.CrosshairDisplayMode).map(function (enumName) {
        return {
            label: enumName,
            value: enumName,
        };
    });
}
exports.getCrossHairModeOptions = getCrossHairModeOptions;
function getAlignmentOptions() {
    return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.HorizontalAlignment).map(function (enumName) {
        return {
            label: enumName,
            value: enumName,
        };
    });
}
exports.getAlignmentOptions = getAlignmentOptions;
function getMarkerTypeOptions() {
    return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.MarkerType).map(function (enumName) {
        var name = enumName.toString();
        return {
            label: name,
            value: name,
        };
    });
}
exports.getMarkerTypeOptions = getMarkerTypeOptions;
function getMarkerFromProps(chartProps) {
    var chartType = chartProps.CategoryChartType;
    var markerType = chartProps.MarkerType;
    // resolves marker for specified chart type since some chart types should hide markers by default
    if (markerType === 'Default' || markerType === 'Unset') {
        return chartType == ChartEnums_1.CategoryChartType.Point ? 'Circle' : 'None';
    }
    else {
        return markerType; // return marker that the user selected
    }
}
exports.getMarkerFromProps = getMarkerFromProps;
function getYAxisLabelsLocations() {
    return [
        { value: ChartEnums_1.AxisLabelsLocation.OutsideLeft, label: 'Left' },
        { value: ChartEnums_1.AxisLabelsLocation.OutsideRight, label: 'Right' },
    ];
}
exports.getYAxisLabelsLocations = getYAxisLabelsLocations;
function getXAxisLabelsLocations() {
    var options = [
        React.createElement("option", { key: "Top", value: ChartEnums_1.AxisLabelsLocation.OutsideTop }, "Top"),
        React.createElement("option", { key: "Bottom", value: ChartEnums_1.AxisLabelsLocation.OutsideBottom }, "Bottom"),
    ];
    return options;
}
exports.getXAxisLabelsLocations = getXAxisLabelsLocations;
function getAxisAngleOptions() {
    return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.AxisAngle).map(function (enumName) {
        return { value: enumName, label: enumName };
    });
}
exports.getAxisAngleOptions = getAxisAngleOptions;
function getAxisLabelScales() {
    return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.AxisScale).map(function (enumName) {
        return {
            value: enumName,
            label: enumName,
        };
    });
}
exports.getAxisLabelScales = getAxisLabelScales;
function getCalloutTypeOptions() {
    return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.CalloutsType).map(function (enumName) {
        var name = enumName.toString();
        // adding known callouts as strings because we will add non-numeric properties from data source in future
        return { label: name, value: name };
    });
}
exports.getCalloutTypeOptions = getCalloutTypeOptions;
function getAngleFromEnum(axisAngle) {
    switch (axisAngle) {
        case ChartEnums_1.AxisAngle.Horizontal:
            return 0;
        case ChartEnums_1.AxisAngle.Diagonal:
            return 45;
        case ChartEnums_1.AxisAngle.Vertical:
            return 90;
    }
}
exports.getAngleFromEnum = getAngleFromEnum;
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
function getCalloutsData(chartData, chartProps) {
    // TODO ideally we should get names of numeric using ChartDefinition.YAxisColumnIds instead of this:
    var numericProps = getNumericProperties(chartData);
    var callouts = [];
    if (chartProps.CalloutsType == ChartEnums_1.CalloutsType.DataRanges) {
        // skipping filtering of callouts for DataRanges because there are only 2 callouts for each Y-column
        return getCalloutsDataRanges(chartData, numericProps);
    }
    else if (chartProps.CalloutsType == ChartEnums_1.CalloutsType.DataChangesInValues) {
        callouts = getCalloutsDataChanges(chartData, numericProps, false);
    }
    else if (chartProps.CalloutsType == ChartEnums_1.CalloutsType.DataChangesInPercentage) {
        callouts = getCalloutsDataChanges(chartData, numericProps, true);
    }
    else if (chartProps.CalloutsType == ChartEnums_1.CalloutsType.DataPoints) {
        callouts = getCalloutsDataPoints(chartData, numericProps);
    }
    else if (chartProps.CalloutsType == ChartEnums_1.CalloutsType.None) {
        return [];
    }
    else {
        // TODO implement a function for getting values a column named dataColumn from chartData
    }
    // users can filter out callouts and thus improve chart performance using ChartProperties.CalloutsInterval
    // perhaps this should depend on ChartProperties.XAxisInterval (when added) so that callouts align with labels on XAxis
    var filtered = [];
    for (var i = 0; i < callouts.length; i++) {
        if (i % chartProps.CalloutsInterval == 0) {
            filtered.push(callouts[i]);
        }
    }
    return filtered;
}
exports.getCalloutsData = getCalloutsData;
function getCalloutsDataRanges(chartData, numericProps) {
    var callouts = [];
    numericProps.forEach(function (columnName) {
        // setting initial values that will catch first values of an item
        var minValue = Number.MAX_VALUE;
        var maxValue = Number.MIN_VALUE;
        var minIndex = 0;
        var maxIndex = 0;
        // find index and MIN/MAX values of each data column
        for (var i = 0; i < chartData.length; i++) {
            var item = chartData[i];
            var itemValue = item[columnName];
            if (minValue > itemValue) {
                minValue = itemValue;
                minIndex = i;
            }
            if (maxValue < itemValue) {
                maxValue = itemValue;
                maxIndex = i;
            }
        }
        // add callouts for MIN/MAX values of each data column
        callouts.push({
            CalloutsLabel: 'MAX ' + maxValue.toFixed(1),
            CalloutsIndex: maxIndex,
            CalloutsValue: maxValue,
            MemberPath: columnName,
        });
        callouts.push({
            CalloutsLabel: 'MIN ' + minValue.toFixed(1),
            CalloutsIndex: minIndex,
            CalloutsValue: minValue,
            MemberPath: columnName,
        });
    });
    return callouts;
}
exports.getCalloutsDataRanges = getCalloutsDataRanges;
function getCalloutsDataChanges(chartData, numericProps, showPercentages) {
    var callouts = [];
    if (chartData.length < 2) {
        return callouts;
    }
    numericProps.forEach(function (column) {
        // calculate changes between consecutive items for each data column
        for (var i = 1; i < chartData.length; i++) {
            var itemCurrent = chartData[i];
            var itemPrevious = chartData[i - 1];
            var itemChange = itemCurrent[column] - itemPrevious[column];
            var itemLabel = itemChange >= 0 ? '+' : '';
            if (showPercentages) {
                itemChange = (itemChange / itemPrevious[column]) * 100.0;
                itemLabel = itemLabel + itemChange.toFixed(0) + '%';
            }
            else {
                itemLabel = itemLabel + itemChange.toFixed(1);
            }
            callouts.push({
                CalloutsLabel: itemLabel,
                CalloutsValue: itemCurrent[column],
                CalloutsIndex: i,
                MemberPath: column,
            });
        }
    });
    return callouts;
}
exports.getCalloutsDataChanges = getCalloutsDataChanges;
function getCalloutsDataPoints(chartData, numericProps) {
    var callouts = [];
    numericProps.forEach(function (column) {
        // get values of consecutive items for each data column
        for (var i = 0; i < chartData.length; i++) {
            var itemCurrent = chartData[i];
            callouts.push({
                CalloutsLabel: itemCurrent[column].toFixed(1),
                CalloutsValue: itemCurrent[column],
                CalloutsIndex: i,
                MemberPath: column,
            });
        }
    });
    return callouts;
}
exports.getCalloutsDataPoints = getCalloutsDataPoints;
exports.CategoryChartUIHelper = {
    setChartDisplayPopupState: setChartDisplayPopupState,
    createDefaultYAxisTitle: createDefaultYAxisTitle,
    createDefaultXAxisTitle: createDefaultXAxisTitle,
    setDefaultChartDisplayPopupState: setDefaultChartDisplayPopupState,
    getChartTypeOptions: getChartTypeOptions,
    getToolTipOptions: getToolTipOptions,
    getCrossHairModeOptions: getCrossHairModeOptions,
    getAlignmentOptions: getAlignmentOptions,
    getMarkerTypeOptions: getMarkerTypeOptions,
    getMarkerFromProps: getMarkerFromProps,
    getYAxisLabelsLocations: getYAxisLabelsLocations,
    getXAxisLabelsLocations: getXAxisLabelsLocations,
    getAxisAngleOptions: getAxisAngleOptions,
    getAxisLabelScales: getAxisLabelScales,
    getCalloutTypeOptions: getCalloutTypeOptions,
    getAngleFromEnum: getAngleFromEnum,
    getDataProperties: getDataProperties,
    getNumericProperties: getNumericProperties,
    getCalloutsData: getCalloutsData,
    getCalloutsDataRanges: getCalloutsDataRanges,
    getCalloutsDataChanges: getCalloutsDataChanges,
    getCalloutsDataPoints: getCalloutsDataPoints,
};
exports.default = exports.CategoryChartUIHelper;
