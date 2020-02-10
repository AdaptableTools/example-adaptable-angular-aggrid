"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
function LogAlert(message, messageType) {
    var optionalParams = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        optionalParams[_i - 2] = arguments[_i];
    }
    switch (messageType) {
        case Enums_1.MessageType.Info:
            LogAdaptableInfo(message, optionalParams);
            break;
        case Enums_1.MessageType.Success:
            LogAdaptableSuccess(message, optionalParams);
            break;
        case Enums_1.MessageType.Warning:
            LogAdaptableWarning(message, optionalParams);
            break;
        case Enums_1.MessageType.Error:
            LogAdaptableError(message, optionalParams);
            break;
    }
}
exports.LogAlert = LogAlert;
function LogAdaptableInfo(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
        console.info('Adaptable Info: ' + message, optionalParams);
    }
    else {
        console.info('Adaptable Info: ' + message);
    }
}
exports.LogAdaptableInfo = LogAdaptableInfo;
function LogAdaptableSuccess(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
        console.log('Adaptable Success: ' + message, optionalParams);
    }
    else {
        console.log('Adaptable Success: ' + message);
    }
}
exports.LogAdaptableSuccess = LogAdaptableSuccess;
function LogAdaptableWarning(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
        console.warn('Adaptable Warning: ' + message, optionalParams);
    }
    else {
        console.warn('Adaptable Warning: ' + message);
    }
}
exports.LogAdaptableWarning = LogAdaptableWarning;
function LogAdaptableError(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
        console.error('Adaptable Error: ' + message, optionalParams);
    }
    else {
        console.error('Adaptable Error: ' + message);
    }
}
exports.LogAdaptableError = LogAdaptableError;
function LogWarning(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
        console.warn(message, optionalParams);
    }
    else {
        console.warn(message);
    }
}
exports.LogWarning = LogWarning;
function LogError(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
        console.error(message, optionalParams);
    }
    else {
        console.error(message);
    }
}
exports.LogError = LogError;
function LogInfo(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
        console.info(message, optionalParams);
    }
    else {
        console.info(message);
    }
}
exports.LogInfo = LogInfo;
function LogObject(objectToLog) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(optionalParams)) {
        console.log(objectToLog, optionalParams);
    }
    else {
        console.log(objectToLog);
    }
}
exports.LogObject = LogObject;
exports.LoggingHelper = {
    LogAlert: LogAlert,
    LogAdaptableInfo: LogAdaptableInfo,
    LogAdaptableSuccess: LogAdaptableSuccess,
    LogAdaptableWarning: LogAdaptableWarning,
    LogAdaptableError: LogAdaptableError,
    LogWarning: LogWarning,
    LogError: LogError,
    LogInfo: LogInfo,
    LogObject: LogObject,
};
exports.default = exports.LoggingHelper;
