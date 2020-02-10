"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EditableConfigEntityState_1 = require("./Components/SharedProps/EditableConfigEntityState");
var Enums_1 = require("../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
var LoggingHelper_1 = require("../Utilities/Helpers/LoggingHelper");
var ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
var ExpressionHelper_1 = require("../Utilities/Helpers/ExpressionHelper");
exports.BLACK = 'Black';
exports.WHITE = 'White';
exports.LIGHT_GRAY = 'LightGray';
exports.GRAY = 'Gray';
exports.BROWN = 'Brown';
exports.DARK_GREEN = 'DarkGreen';
exports.GREEN = 'Green';
exports.LIME_GREEN = 'LimeGreen';
exports.YELLOW = 'Yellow';
exports.LIGHT_YELLOW = 'LightYellow';
exports.DARK_BLUE = 'DarkBlue';
exports.BLUE = 'Blue';
exports.LIGHT_BLUE = 'LightBlue';
//xport const LIGHT_GREEN: string = 'LightGreen';
exports.CYAN = 'Cyan';
exports.MAGENTA = 'Magenta';
exports.PURPLE = 'Purple';
exports.DARK_RED = 'DarkRed';
exports.RED = 'Red';
exports.LIGHT_RED = 'LightRed';
exports.ORANGE = 'Orange';
function getHexForName(name) {
    switch (name) {
        case exports.BLACK:
            return '#000000';
        case exports.WHITE:
            return '#FFFFFF';
        case exports.LIGHT_GRAY:
            return '#D3D3D3';
        case exports.GRAY:
            return '#808080';
        case exports.BROWN:
            return '#A52A2A';
        case exports.DARK_GREEN:
            return '#006400';
        case exports.GREEN:
            return '#008000';
        case exports.LIME_GREEN:
            return '#32CD32';
        case exports.YELLOW:
            return '#FFFF00';
        case exports.LIGHT_YELLOW:
            return '#FFFFE0';
        case exports.DARK_BLUE:
            return '#00008B';
        case exports.BLUE:
            return '#0000FF';
        case exports.LIGHT_BLUE:
            return '#87CEFA';
        case exports.CYAN:
            return '#00FFFF';
        case exports.MAGENTA:
            return '#FF00FF';
        case exports.PURPLE:
            return '#800080';
        case exports.DARK_RED:
            return '#8B0000';
        case exports.RED:
            return '#FF0000';
        case exports.LIGHT_RED:
            return '#DC143C';
        case exports.ORANGE:
            return '#FFA500';
        default:
            return 'not found';
    }
}
exports.getHexForName = getHexForName;
function getDefaultColors() {
    return [
        getHexForName(exports.BLACK),
        getHexForName(exports.WHITE),
        getHexForName(exports.LIGHT_GRAY),
        getHexForName(exports.GRAY),
        getHexForName(exports.BROWN),
        getHexForName(exports.DARK_GREEN),
        getHexForName(exports.GREEN),
        getHexForName(exports.LIME_GREEN),
        getHexForName(exports.YELLOW),
        getHexForName(exports.LIGHT_YELLOW),
        getHexForName(exports.DARK_BLUE),
        getHexForName(exports.BLUE),
        getHexForName(exports.LIGHT_BLUE),
        getHexForName(exports.CYAN),
        getHexForName(exports.MAGENTA),
        getHexForName(exports.PURPLE),
        getHexForName(exports.DARK_RED),
        getHexForName(exports.RED),
        getHexForName(exports.LIGHT_RED),
        getHexForName(exports.ORANGE),
    ];
}
exports.getDefaultColors = getDefaultColors;
function getEmptyConfigState() {
    return {
        EditedAdaptableObject: null,
        WizardStartIndex: 0,
        WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
    };
}
exports.getEmptyConfigState = getEmptyConfigState;
function getExpressionBuilderState(expression) {
    // add any missing arrays here to avoid issues later
    ExpressionHelper_1.default.AddMissingProperties(expression);
    return {
        Expression: expression,
        SelectedColumnId: '',
        SelectedTab: null,
    };
}
exports.getExpressionBuilderState = getExpressionBuilderState;
function getExpressionBuilderStateWithColumn(expression, columnId) {
    return {
        Expression: expression,
        SelectedColumnId: columnId,
        SelectedTab: null,
    };
}
exports.getExpressionBuilderStateWithColumn = getExpressionBuilderStateWithColumn;
function getDescriptionForDataType(dataType) {
    switch (dataType) {
        case Enums_1.DataType.String:
            return 'string';
        case Enums_1.DataType.Number:
            return 'number';
        case Enums_1.DataType.Date:
            return 'date';
    }
}
exports.getDescriptionForDataType = getDescriptionForDataType;
function getPlaceHolderforDataType(dataType) {
    switch (dataType) {
        case Enums_1.DataType.String:
            return 'Enter Value';
        case Enums_1.DataType.Number:
            return 'Enter Number';
        case Enums_1.DataType.Date:
            return 'Enter Date';
    }
}
exports.getPlaceHolderforDataType = getPlaceHolderforDataType;
function getModalContainer(adaptableOptions, document) {
    var modalContainer;
    if (adaptableOptions.containerOptions.modalContainer) {
        // this has been set, so we use the property
        modalContainer = document.getElementById(adaptableOptions.containerOptions.modalContainer);
        if (modalContainer) {
            var modalContainerClassName = ' modal-container';
            if (!modalContainer.className.includes(modalContainerClassName)) {
                modalContainer.className += modalContainerClassName;
            }
        }
    }
    if (!modalContainer) {
        modalContainer = document.body;
    }
    return modalContainer;
}
exports.getModalContainer = getModalContainer;
function getChartContainer(adaptableOptions, document, showModal) {
    var chartContainer;
    if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(adaptableOptions.containerOptions.chartContainer)) {
        // they have provided one so get that
        chartContainer = document.getElementById(adaptableOptions.containerOptions.chartContainer);
        if (chartContainer) {
            var chartContainerClassName = ' chart-container';
            if (!chartContainer.className.includes(chartContainerClassName)) {
                chartContainer.className += chartContainerClassName;
            }
        }
        else {
            LoggingHelper_1.LoggingHelper.LogAdaptableError("Chart div called '" + adaptableOptions.containerOptions.chartContainer + "' not found: so creating standard div");
            chartContainer = document.getElementById('ad');
        }
    }
    else {
        // not provided one so return whole document if modal, or 'chart' if not
        chartContainer = showModal ? document.body : document.getElementById('ad');
    }
    return chartContainer;
}
exports.getChartContainer = getChartContainer;
function isValidUserChartContainer(adaptableOptions, document) {
    if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(adaptableOptions.containerOptions.chartContainer)) {
        return document.getElementById(adaptableOptions.containerOptions.chartContainer) != null;
    }
    return false;
}
exports.isValidUserChartContainer = isValidUserChartContainer;
function IsNotEmptyStyle(style) {
    return (style.BackColor != null ||
        style.ForeColor != null ||
        style.FontWeight != Enums_1.FontWeight.Normal ||
        style.FontStyle != Enums_1.FontStyle.Normal ||
        style.FontSize != null ||
        StringExtensions_1.StringExtensions.IsNotNullOrEmpty(style.ClassName));
}
exports.IsNotEmptyStyle = IsNotEmptyStyle;
function getMessageTypeByStatusColour(statusColour) {
    switch (statusColour) {
        case Enums_1.StatusColour.Red:
            return Enums_1.MessageType.Error;
        case Enums_1.StatusColour.Amber:
            return Enums_1.MessageType.Warning;
        case Enums_1.StatusColour.Green:
            return Enums_1.MessageType.Success;
        case Enums_1.StatusColour.Blue:
            return Enums_1.MessageType.Info;
    }
}
exports.getMessageTypeByStatusColour = getMessageTypeByStatusColour;
function getGlyphByMessageType(messageType) {
    switch (messageType) {
        case Enums_1.MessageType.Info:
            return 'info';
        case Enums_1.MessageType.Success:
            return 'check';
        case Enums_1.MessageType.Warning:
            return 'warning';
        case Enums_1.MessageType.Error:
            return 'error';
    }
}
exports.getGlyphByMessageType = getGlyphByMessageType;
function getColorByMessageType(messageType) {
    switch (messageType) {
        case Enums_1.MessageType.Error:
            return 'var(--ab-color-error)';
        case Enums_1.MessageType.Warning:
            return 'var(--ab-color-warn)';
        case Enums_1.MessageType.Success:
            return 'var(--ab-color-success)';
        case Enums_1.MessageType.Info:
            return 'var(--ab-color-info)';
    }
}
exports.getColorByMessageType = getColorByMessageType;
function getStyleForStatusColour(statusColour) {
    var result;
    switch (statusColour) {
        case Enums_1.StatusColour.Blue:
            result = {
                fill: 'var(--ab-color-info)',
            };
            break;
        case Enums_1.StatusColour.Green:
            result = {
                fill: 'var(--ab-color-success)',
            };
            break;
        case Enums_1.StatusColour.Amber:
            result = {
                fill: 'var(--ab-color-warn)',
            };
            break;
        case Enums_1.StatusColour.Red:
            result = {
                fill: 'var(--ab-color-error)',
            };
            break;
    }
    if (result) {
        result.color = result.fill;
    }
    return result;
}
exports.getStyleForStatusColour = getStyleForStatusColour;
function getStyleForMessageType(messageType) {
    var result;
    switch (messageType) {
        case Enums_1.MessageType.Info:
            result = {
                fill: 'var(--ab-color-info)',
            };
            break;
        case Enums_1.MessageType.Success:
            result = {
                fill: 'var(--ab-color-success)',
            };
            break;
        case Enums_1.MessageType.Warning:
            result = {
                fill: 'var(--ab-color-warn)',
            };
            break;
        case Enums_1.MessageType.Error:
            result = {
                fill: 'var(--ab-color-error)',
            };
            break;
    }
    if (result) {
        result.color = result.fill;
    }
    return result;
}
exports.getStyleForMessageType = getStyleForMessageType;
function getGlyphForStatusColour(statusColour) {
    switch (statusColour) {
        case Enums_1.StatusColour.Blue:
            return 'info';
        case Enums_1.StatusColour.Green:
            return 'check';
        case Enums_1.StatusColour.Amber:
            return 'warning';
        case Enums_1.StatusColour.Red:
            return 'error';
    }
}
exports.getGlyphForStatusColour = getGlyphForStatusColour;
function getGlyphForMessageType(messageType) {
    switch (messageType) {
        case Enums_1.MessageType.Info:
            return 'info';
        case Enums_1.MessageType.Success:
            return 'check';
        case Enums_1.MessageType.Warning:
            return 'warning';
        case Enums_1.MessageType.Error:
            return 'error';
    }
}
exports.getGlyphForMessageType = getGlyphForMessageType;
function getButtonToneForMessageType(messageType) {
    switch (messageType) {
        case Enums_1.MessageType.Info:
            return 'info';
        case Enums_1.MessageType.Warning:
            return 'warning';
        case Enums_1.MessageType.Error:
            return 'error';
        case Enums_1.MessageType.Success:
            return 'success';
    }
}
exports.getButtonToneForMessageType = getButtonToneForMessageType;
function getScheduleDescription(schedule) {
    if (schedule == null) {
        return '[No Schedule]';
    }
    var dateString;
    if (schedule.OneOffDate == null) {
        if (ArrayExtensions_1.default.ContainsItem(schedule.DaysOfWeek, Enums_1.DayOfWeek.Monday) &&
            ArrayExtensions_1.default.ContainsItem(schedule.DaysOfWeek, Enums_1.DayOfWeek.Tuesday) &&
            ArrayExtensions_1.default.ContainsItem(schedule.DaysOfWeek, Enums_1.DayOfWeek.Wednesday) &&
            ArrayExtensions_1.default.ContainsItem(schedule.DaysOfWeek, Enums_1.DayOfWeek.Thursday) &&
            ArrayExtensions_1.default.ContainsItem(schedule.DaysOfWeek, Enums_1.DayOfWeek.Friday)) {
            if (ArrayExtensions_1.default.ContainsItem(schedule.DaysOfWeek, Enums_1.DayOfWeek.Sunday) &&
                ArrayExtensions_1.default.ContainsItem(schedule.DaysOfWeek, Enums_1.DayOfWeek.Saturday)) {
                dateString = 'Everyday';
            }
            else {
                dateString = 'Weekdays';
            }
        }
        else {
            var names = schedule.DaysOfWeek.sort().map(function (d) { return getShortenedDayString(d); });
            dateString = ArrayExtensions_1.default.createCommaSeparatedString(names);
        }
    }
    else {
        dateString = new Date(schedule.OneOffDate).toDateString();
    }
    return dateString + " @ " + addLeadingZero(schedule.Hour) + ":" + addLeadingZero(schedule.Minute);
}
exports.getScheduleDescription = getScheduleDescription;
function getShortenedDayString(dayOfWeek) {
    switch (dayOfWeek) {
        case Enums_1.DayOfWeek.Sunday:
            return 'Sun';
        case Enums_1.DayOfWeek.Monday:
            return 'Mon';
        case Enums_1.DayOfWeek.Tuesday:
            return 'Tues';
        case Enums_1.DayOfWeek.Wednesday:
            return 'Weds';
        case Enums_1.DayOfWeek.Thursday:
            return 'Thurs';
        case Enums_1.DayOfWeek.Friday:
            return 'Fri';
        case Enums_1.DayOfWeek.Saturday:
            return 'Sat';
    }
}
function addLeadingZero(item) {
    item = item || 0;
    if (item < 10) {
        return "0" + (item && item.toString ? item.toString() : item);
    }
    return item.toString();
}
function getMessageTypeFromAdaptableAlerts(adaptableAlerts) {
    if (adaptableAlerts.find(function (a) { return a.AlertDefinition.MessageType == Enums_1.MessageType.Error; }) != null) {
        return Enums_1.MessageType.Error;
    }
    if (adaptableAlerts.find(function (a) { return a.AlertDefinition.MessageType == Enums_1.MessageType.Warning; }) != null) {
        return Enums_1.MessageType.Warning;
    }
    if (adaptableAlerts.find(function (a) { return a.AlertDefinition.MessageType == Enums_1.MessageType.Success; }) != null) {
        return Enums_1.MessageType.Success;
    }
    return Enums_1.MessageType.Info;
}
exports.getMessageTypeFromAdaptableAlerts = getMessageTypeFromAdaptableAlerts;
function getButtonColourForAdaptableAlerts(adaptableAlerts, messageTypeColor) {
    return ArrayExtensions_1.default.IsNotNullOrEmpty(adaptableAlerts) ? messageTypeColor : 'primary';
}
exports.getButtonColourForAdaptableAlerts = getButtonColourForAdaptableAlerts;
function getButtonTextColourForArrayandMessageType(adaptableAlerts, messageType) {
    if (ArrayExtensions_1.default.IsNullOrEmpty(adaptableAlerts)) {
        return 'text-on-primary';
    }
    return this.getButtonTextColourForMessageType(messageType);
}
exports.getButtonTextColourForArrayandMessageType = getButtonTextColourForArrayandMessageType;
function getButtonTextColourForMessageType(messageType) {
    switch (messageType) {
        case Enums_1.MessageType.Info:
            return 'var( --ab-color-text-on-info)';
        case Enums_1.MessageType.Success:
            return 'var( --ab-color-text-on-success)';
        case Enums_1.MessageType.Warning:
            return 'var( --ab-color-text-on-warn)';
        case Enums_1.MessageType.Error:
            return 'var( --ab-color-text-on-error)';
    }
}
exports.getButtonTextColourForMessageType = getButtonTextColourForMessageType;
exports.UIHelper = {
    getHexForName: getHexForName,
    getDefaultColors: getDefaultColors,
    getEmptyConfigState: getEmptyConfigState,
    getExpressionBuilderState: getExpressionBuilderState,
    getExpressionBuilderStateWithColumn: getExpressionBuilderStateWithColumn,
    getDescriptionForDataType: getDescriptionForDataType,
    getPlaceHolderforDataType: getPlaceHolderforDataType,
    getModalContainer: getModalContainer,
    getChartContainer: getChartContainer,
    isValidUserChartContainer: isValidUserChartContainer,
    IsNotEmptyStyle: IsNotEmptyStyle,
    getMessageTypeByStatusColour: getMessageTypeByStatusColour,
    getGlyphByMessageType: getGlyphByMessageType,
    getStyleForStatusColour: getStyleForStatusColour,
    getGlyphForStatusColour: getGlyphForStatusColour,
    getButtonToneForMessageType: getButtonToneForMessageType,
    getScheduleDescription: getScheduleDescription,
    getColorByMessageType: getColorByMessageType,
    getGlyphForMessageType: getGlyphForMessageType,
    getStyleForMessageType: getStyleForMessageType,
    getMessageTypeFromAdaptableAlerts: getMessageTypeFromAdaptableAlerts,
    getButtonColourForAdaptableAlerts: getButtonColourForAdaptableAlerts,
    getButtonTextColourForArrayandMessageType: getButtonTextColourForArrayandMessageType,
    getButtonTextColourForMessageType: getButtonTextColourForMessageType,
};
exports.default = exports.UIHelper;
